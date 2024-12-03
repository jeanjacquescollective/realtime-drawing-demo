const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

let users = [];

app.use(express.static(__dirname  + '/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game.html');
}); 

io.on('connection', (socket) => {
    console.log('a user connected');
    users.push(socket.id);

    io.emit('users', users);

    socket.on('draw', (data) => {
        console.log(data);
        io.emit('draw', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        users = users.filter(user => user !== socket.id);

        io.emit('users', users);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});