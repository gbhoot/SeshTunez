var socketio = require('socket.io'),
    io, clients = {};

module.exports = function(server) {
    io = socketio.listen(server);
    
    io.sockets.on('connection', function(socket) {
        console.log("New client has connected");
    });

    io.sockets.on('disconnect', function(socket) {
        console.log("Client has disconnected", socket.id);
    });
}