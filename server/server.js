const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const{generateMessage,generateLocationMessage}=require('./utils/message');

var publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
const port=process.env.PORT || 3000;
app.use(express.static(publicPath));
var io=socketIO(server);

io.on('connection',(socket)=>{
  console.log('new user connected');
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'));

  socket.on('createMessage',(message,callback)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  //socket.broadcast.emit()
  });
 socket.on('createLocationMessage',(coords)=>{
   io.emit('newLocaionMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));

 });
  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });

});



server.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
