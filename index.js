const express = require('express');
const app = express();
const socket = require('socket.io');

app.get('/',(req, res) => {
    res.sendFile(__dirname+'/template.html');
});

const PORT = process.env.PORT || 4000

const server = app.listen(PORT, function(){
    console.log(`Server is up and running on port ${PORT}`);
});

const io = socket(server)

io.on('connection', (socket) => {
    console.log('socket connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    })
});
