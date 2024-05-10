const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Import path module
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Whiteboard')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a mongoose schema and model for the documents collection
const documentSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Documents = mongoose.model('Documents', documentSchema, 'Documents');

// Create a GET endpoint to fetch all documents
app.get('/documents', async(req, res) => {
  try {
    const entries = await Documents.find();
    console.log(entries);
    res.json(entries);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

// Create document
// POST route to create a new document
app.post('/createDocument', async (req, res) => {
  try {
    // Extract data from request body
    const { title, content } = req.body;

    // Create new document
    const newDocument = new Documents({ title, content });
    await newDocument.save();

    // Send success response
    res.status(201).json({ message: 'Document created successfully', document: newDocument });
  } catch (error) {
    // Send error response
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});