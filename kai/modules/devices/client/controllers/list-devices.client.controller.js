(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesListController', DevicesListController);

  DevicesListController.$inject = ['DevicesStatesService', 'DevicesService', '$scope', '$state', 'Authentication', 'Socket'];

  function DevicesListController(DevicesStatesService, DevicesService, $scope, $state, Authentication, Socket) {
    var vm = this;
    var messages = [];
    vm.devices = [{
      _id: 0,
      _devid: 'light',
      _name: 'Light',
      _des: 'This is the light in the living room',
      _devType: 1,
      _state: true,
      _status: true
    }, {
      _id: 1,
      _devid: 'door',
      _name: 'Door',
      _des: 'This is the front door of the house',
      _devType: 1,
      _state: true,
      _status: false
    }, {
      _id: 2,
      _devid: 'coffee',
      _name: 'Coffee Machine',
      _des: 'Coffee machine in my kitchen',
      _devType: 1,
      _state: true,
      _status: false
    }, {
      _id: 3,
      _devid: 'wind',
      _name: 'Windows',
      _des: 'Living room windows',
      _devType: 1,
      _state: true,
      _status: 1
    }];
    // vm.devices = DevicesService.query();
    vm.messages = messages;
    vm.sendMessage = sendMessage;

    init();

    function init() {
      console.log('Okay what is going on');
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
        console.log('Socket connection created');
      }

      // Add an event listener to the 'chatMessage' event
      console.log('right before');
      Socket.on('device status', function (message) {
        console.log('message received!' + message);
        vm.messages.unshift(message);
      });

      // Remove the event listener when the controller instance is destroyed
      // Destroy the socket when the user logout instead
      $scope.$on('$destroy', function () {
        console.log('socket destruction');
        Socket.removeListener('device status');
      });
    }

    // Create a controller method for sending messages
    function sendMessage(device) {
      // console.log('Send message: \n');

      // Create a new message object
      var message = {
        id: '#' + device._devid,
        name: device._name,
        status: device._status
      };

      console.log('Send message: {id: ' + message.id + ', name: ' + message.name + ', status: ' + message.status + '}\n');

      // Emit a 'device status' message event
      Socket.emit('device status', message);
    }
  }
}());
