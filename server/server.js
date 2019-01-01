const path = require('path');

const express = require('express');
const socketIO = require('socket.io');
const http =  require('http');


const port = process.env.PORT || 3001; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use('/',express.static(publicPath));

io.on('connection', (socket) => {
   console.log('new connection was made');

   socket.on('disconnect', () => {
    console.log('Server disconnected');
   });
});



server.listen(port, () => {
  console.log(`Server is started on port ${port}`); 
}); 