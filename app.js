const http= require('http');
const express = require("express");
const app= express();

const server= http.createServer(app);
const port = process.env.PORT || 3000;


var io = require('socket.io').listen(server);

app.use(express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
    res.sendFile( __dirname +'/index.html');
})





const users= {};

/// Entire documentation is provided on socket-io website
// Will listen to every user
io.on('connection', socket=>{
   
    
    /// For individul user- event
    socket.on('new-user-joined', name =>{
        
        users[socket.id] = name;
        

        
        // When someone joins, send notification to all
        socket.broadcast.emit('user-joined', name);
        
        
    });

    // Anyone sends any message
    socket.on('send', message => {
       
        socket.broadcast.emit('receive', {message: message, name : users[socket.id]});
      
    })

    //If anyone disconnects
    socket.on('disconnect', name => {
        // Emitting event
       
        socket.broadcast.emit("left",  users[socket.id]);

        delete users[socket.id];
    })
    
});



server.listen(port, ()=>{
    console.log("Server started at "+ port);
})