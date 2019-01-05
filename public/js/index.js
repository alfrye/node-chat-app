var socket = io();

         socket.on('connect', () => {
             console.log('connected to Server');

             socket.emit('createMessage', {
               to: 'jen@example.com',
               text: 'Hello '
             });
         });

         socket.on('disconnect', () => {
           console.log('Disconnected from server');
         });

         socket.on('newMessage', function(msg) {
           console.log('Got Message', msg);
          
         });