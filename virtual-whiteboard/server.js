const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { validationResult, body } = require('express-validator');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('A user connected');

// Handle text change events
socket.on('textChange', (newValue) => {
  // Sanitize the input using express-validator
  body('newValue').trim().escape()(newValue, '', () => {
    // Broadcast the sanitized new value to all connected clients except the sender
    socket.broadcast.emit('textChange', newValue);
  });
});

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Define the endpoint to trigger the function
app.get('/triggerFunction', (req, res) => {
  // Emit a socket event to all connected clients
  io.emit('triggerFunction');
  res.sendStatus(200);
});

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')));

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Whiteboard')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a mongoose schema and model for the Documents collection
const documentSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Documents = mongoose.model('Documents', documentSchema, 'Documents');

// Create a GET endpoint to fetch a specific document with title Notes 1
app.get('/getDocument', async(req, res) => {
  try {
    const document = await Documents.findOne({ title: 'Notes 1' });
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    const content = document.content;
    console.log(content);
    res.send(content); 
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
    const newDocument = new Documents({ title: 'Notes 3', content: 'derp' });
    await newDocument.save();

    // Send success response
    res.status(201).json({ message: 'Document created successfully', document: newDocument });
  } catch (error) {
    // Send error response
    console.error('Error creating document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle updating document
app.put('/updateDocument', async (req, res) => {
  const { title, content } = req.body;

  try {
    // Find and update document with the provided title
    const updatedDocument = await Documents.findOneAndUpdate({ title }, { content }, { new: true });
    res.json(updatedDocument);
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Error updating document' });
  }
});

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});