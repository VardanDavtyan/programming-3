var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

server.listen(3000, () => console.log("Game is Running"));
