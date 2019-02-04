var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Set = require('set')

http.listen(8080, function(){
    console.log('Server started...');
});

app.get('/', (req, res)=>{
       res.sendFile(path.join(__dirname +'/Index.html'));  
});

app.get('/loadcss', (req, res)=>{
    res.sendFile(path.join(__dirname +'/CSS/main.css'));
});

var userList=new Set();;
app.get('/chatterBox', function(req, res){
    console.log(req.query.userName);
    userList.add(req.query.userName);
    res.sendFile(path.join(__dirname +'/MessageBox.html'));
});

io.on('connection', (socket)=>{
    socket.on('chat message', (msg)=>{
        msg = JSON.parse(msg);
        msg['senderName'] = (msg['senderName']).split('=')[1];
        console.log(msg);
        io.emit('chat message', msg);
    });
    io.emit('user-name', userList.get());
});
