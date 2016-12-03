(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesListController', DevicesListController);

  DevicesListController.$inject = ['DevicesStatesService', 'DevicesService', '$scope', '$state', 'Authentication', 'Socket'];

  function DevicesListController(DevicesStatesService, DevicesService, $scope, $state, Authentication, Socket) {
    var vm = this;
    var messages = [];
    vm.devices = DevicesStatesService.list;
    vm.messages = messages;
    vm.sendMessage = sendMessage;

    init();

    function init() {
      // If user is not signed in then redirect back home
      if (!Authentication.user) {
        $state.go('home');
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
        console.log('Socket connection created');
      }

      // Load devices last state
      if (vm.devices === undefined || vm.devices.length === 0) {
        vm.devices = DevicesService.query();
      }

      // Request the states of every devices
      // Socket.emit('status_req', {});

      // Listen for status response
      Socket.on('status_res', function (message) {
        // console.log('I receive ' + message.length + ' devices');
        var i;
        for (i = 0; i < message.length; i++) {
          if (message[i] !== undefined) {
            updateUI(message[i]);
          }
        }
      });

      // Add an event listener to the 'chatMessage' event
      Socket.on('device status', function (message) {
        if (message.origin !== 'Web') {
          // console.log('message received from' + message.origin);
          console.log('message: ' + JSON.stringify(message));
          // updateUI(message);
        }

        console.log('message: ' + JSON.stringify(message));
        // Send notification
        var tmp;
        if (message.devid === '#wind') {
          tmp = (message._status > 0) ? ' OPEN' : ' CLOSED';
        } else {
          tmp = (message._status > 0) ? ' turned ON' : ' turned OFF';
        }

        var o = {
          date: message.date,
          msg: message._name + tmp + ' from ' + message.origin
        };

        DevicesStatesService.add(message);
        DevicesStatesService.addNotification(o);

      });

      Socket.on('condition_res', function (message) {
        var msg2JSON = JSON.parse(message);
        var status2JSON = JSON.parse(msg2JSON._status);
        DevicesStatesService.addHomeCond({
          T: status2JSON.T,
          H: status2JSON.H,
          L: undefined
        });
      });

      // Remove the event listener when the controller instance is destroyed
      // Destroy the socket when the user logout instead
      $scope.$on('$destroy', function () {
        console.log('Scope destroyed');
        // Socket.removeListener('device status');
      });
    }

    function updateUI(device) {
      var i;
      for (i = 0; i < vm.devices.length; i++) {
        if (vm.devices[i]._devid === device._devid) {
          console.log('Change UI occured');
          vm.devices[i]._status = device._status;
          return;
        }
      }
    }

    // Create a controller method for sending messages
    function sendMessage(device) {
      console.log('device index: ' + device);

      // Create a new message object
      var message = {
        date: new Date(),
        origin: 'Web',
        _devid: device._devid,
        _devType: device._devType,
        _name: device._name,
        _des: device._des,
        _state: device._state,
        _status: device._status
      };

      // Emit a 'device status' message event
      Socket.emit('device status', message);
    }
  }
}());
