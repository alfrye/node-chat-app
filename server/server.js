const path = require('path');

const express = require('express');
const socketIO = require('socket.io');
const http =  require('http');


const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {generateMessage , generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');

var users = new Users();
app.use('/',express.static(publicPath));

io.on('connection', (socket) => {
   console.log('new connection was made');
   //  socket.emit('newMessage', generateMessage('admin','Welcome to chat!'));

   //  socket.broadcast.emit('newMessage', generateMessage('admin', 'New User Joined'));


    //socket.emit to a single connections
   //  socket.emit('newMessage', {
   //    from: 'alan',
   //   text: "Hey, What's going on?",
   //   created: 234
   //  });

   socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)) {
         return callback('Name and room name are required!');
      }
       
      socket.join(params.room);
      users.removeUser(socket.id);

      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUsersList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('admin','Welcome to chat!'));

      socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined the room`));
  
      callback();
   });
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
    var user =  users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
     io.to(user.room).emit('newMessage', generateMessage('admin', `User ${user.name} has left the ${user.room} room`));
    }
   });
});



server.listen(port, () => {
  console.log(`Server is started on port ${port}`); 
}); 