var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

console.log('I AM ALIVE!')

wss.on('connection', (socket) => {
    console.log('Another client connected')


    socket.on('message', (message) => {
        let inputMess = JSON.parse(message);
        console.log('message from client', inputMess)

        switch (inputMess.type) {
            case 'echo':
                socket.send(inputMess.data);
                break;
            case 'ping':
                socket.send(JSON.stringify({ type: 'pong' }))
                break;
            default:
                console.log('unknown command');
        }
    });

    socket.on('close', () => {
        console.log('I lost a client');
    });
});
