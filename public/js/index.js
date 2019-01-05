var socket = io();

         socket.on('connect', () => {
             console.log('connected to Server');

            
         });

         socket.on('disconnect', () => {
           console.log('Disconnected from server');
         });

         socket.on('newMessage', function(msg) {
           console.log('Got Message', msg);
          
         });