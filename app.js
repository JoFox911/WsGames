const WS_PORT = process.env.WS_PORT || 3030;

let WebSocketModule = require('ws')
let server = WebSocketModule.Server;
let newSocket = new server({ port: WS_PORT });

console.log('I AM ALIVE!')

newSocket.on('connection', (socket) => {
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
