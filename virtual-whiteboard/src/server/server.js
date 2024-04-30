const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

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

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
