var socket = io();

function scrollToBottom () {
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight =  newMessage.prev().innerHeight();

  if(clientHeight+scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
  }
  
}

socket.on('connect', () => {
  console.log('connected to Server');


});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (msg) {
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);

  scrollToBottom();
  // console.log('Got Message', msg);
  // var formattedTime = moment(msg.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${msg.from}: ${formattedTime} ${msg.text}`);
  // jQuery("#messages").append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target=_blank> My Location</a>');

  // li.text(`${message.from}: ${formattedTime}`);
  // a.attr(`href`, message.url);
  // li.append(a);
  jQuery("#messages").append(html);
  scrollToBottom();

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