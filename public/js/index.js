var socket=io();
socket.on('connect',function () {
  console.log('connected to server');

  socket.emit('createMessage',{
    to: "abc@def",
    text: "hello ji"
  });
});

socket.on('disconnect',function () {
  console.log('disconnected from server');
});

socket.on('newEmail',function (email) {
  console.log('new Email',email);
});

socket.on('newMessage',function (message) {
  console.log('newMessage',message);
});
