const path = require('path');

const publicPath = path.join(__dirname, '../public');

const app = require('express');
 const port = process.env.PORT || 3000; 
var server = app();


server.use('/',app.static(publicPath));

server.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});