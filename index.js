const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3001;

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket logic
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen to a custom event with acknowledgment
  socket.on('clientMessage', (data, callback) => {
    console.log(`Received from client: ${data}`);

    // Acknowledge back to client
    callback(`Server received your message: "${data}"`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}`);
});
