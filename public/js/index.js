var socket=io();
socket.on('connect',function () {
  console.log('connected to server');
});

socket.on('disconnect',function () {
  console.log('disconnected from server');
});

socket.on('newEmail',function (email) {
  console.log('new Email',email);
});

socket.on('newMessage',function (message) {
  console.log('newMessage',message);
  var li=jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocaionMessage',function(message){
  var li=jQuery('<li></li>');
  var a= jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from: 'user',
    text: jQuery('[name=message]').val()
  },function(){
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation is not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function(position){
  socket.emit('createLocationMessage',{
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  });
  },function(){
    alert('Unable to fetch location');
  });
});
