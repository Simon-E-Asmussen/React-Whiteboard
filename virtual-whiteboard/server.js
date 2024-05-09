const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import path module
const mongoose = require('mongoose');
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle text change events
  socket.on('textChange', (newValue) => {
    // Broadcast the new value to all connected clients except the sender
    socket.broadcast.emit('textChange', newValue);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/Whiteboard');

// Create a mongoose schema and model for the documents collection
const documentSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Documents = mongoose.model('Document', documentSchema, 'Documents');

// create GET endpoint
app.get('/', async(req, res) => {
  try{
    const entries = await Documents.find({title: "Notes 1"});
    console.log(entries);
    res.json(entries);
  } catch(error){
    res.status(500).json({ error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
