var socket = io();

socket.on('connect', () => {
  console.log('connected to Server');


});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  console.log('Got Message', msg);
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${formattedTime} ${msg.text}`);
  jQuery("#messages").append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target=_blank> My Location</a>');

  li.text(`${message.from}: ${formattedTime}`);
  a.attr(`href`, message.url);
  li.append(a);
  jQuery("#messages").append(li);


});

jQuery("#message-form").on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {
    jQuery('[name=message]').val('');
  });

});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude

    });
    locationButton.removeAttr('disabled').text('Send Location');
  }, function () {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('unable to fetch location');
  });
});