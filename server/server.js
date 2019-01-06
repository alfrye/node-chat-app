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
    socket.emit('newMessage', {
       from: 'admin',
       text: 'Welcome to chat room',
       createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
      from: 'admin',
      text: 'New user joined'

    });


    //socket.emit to a single connections
   //  socket.emit('newMessage', {
   //    from: 'alan',
   //   text: "Hey, What's going on?",
   //   created: 234
   //  });

    socket.on('createMessage', (msg) => {
       console.log('create new message',msg);
       // io.emit will emit messages to all conneceted clients
      //  io.emit('newMessage', {
      //    from: msg.from,
      //    text: msg.text,
      //    createdAt: new Date().getTime()
      //  });
    });
   socket.on('disconnect', () => {
    console.log('Server disconnected');
   });
});



server.listen(port, () => {
  console.log(`Server is started on port ${port}`); 
}); 