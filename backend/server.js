// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust as needed
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('playPause', ({ time, playing }) => {
    socket.broadcast.emit('sync', { time, playing });
  });

  socket.on('seek', (time) => {
    socket.broadcast.emit('sync', { time, playing: true });
  });

  socket.on('selectFile', (src) => {
    socket.broadcast.emit('fileSelected', src);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Listening on port 3001');
});
