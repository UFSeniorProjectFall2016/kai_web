'use strict';

// Create the device configuration
module.exports = function (io, socket) {

  // Emit the status event when a new socket client is connected
  io.emit('connected_user', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now()
  });
  // io.emit('status_req', {});

  // Send message connection notifications to all clients connected to Kai
  socket.on('device status', function (message) {
    message.type = 'device status';
    message.date = Date.now();

    // Emit the 'chatMessage' event
    io.emit('device status', message);
    io.emit('notification', {});
  });

  // Listen for home condition status
  socket.on('condition_req', function (message) {
    io.emit('condition_req', message);
  });
  socket.on('condition_res', function (message) {
    io.emit('condition_res', message);
  });

  // Listen for pinging connection
  socket.on('ping_res', function (message) {
    console.log('ping request received: ' + JSON.stringify(message));
    var convDate = message.date;
    message.date = new Date(convDate);
    io.emit('ping_res', message);
    io.emit('notification', {});
  });

  socket.on('status_req', function (message) {
    io.emit('status_req', message);
  });

  socket.on('status_res', function (message) {
    io.emit('status_res', message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('connected_user', {
      type: 'status',
      text: 'disconnected',
      created: Date.now()
      // username: socket.request.user.username
    });
  });
};
