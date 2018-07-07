const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');

var publicPath=path.join(__dirname,'../public');
var app=express();
var server=http.createServer(app);
const port=process.env.PORT || 3000;
app.use(express.static(publicPath));
var io=socketIO(server);

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
  });

  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  });

});



server.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
