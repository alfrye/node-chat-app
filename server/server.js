const path = require('path');

const express = require('express');
const socketIO = require('socket.io');
const http =  require('http');


const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {generateMessage , generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
app.use('/',express.static(publicPath));

io.on('connection', (socket) => {
   console.log('new connection was made');
    socket.emit('newMessage', generateMessage('admin','Welcome to chat!'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New User Joined'));


    //socket.emit to a single connections
   //  socket.emit('newMessage', {
   //    from: 'alan',
   //   text: "Hey, What's going on?",
   //   created: 234
   //  });

    socket.on('createMessage', (msg,callback) => {
       console.log('create new message',msg);
       // io.emit will emit messages to all conneceted clients
       io.emit('newMessage', generateMessage(msg.from,msg.text));
       callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
         io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude,coords.longitude));
    });
   socket.on('disconnect', () => {
    console.log('Server disconnected');
   });
});



server.listen(port, () => {
  console.log(`Server is started on port ${port}`); 
}); 