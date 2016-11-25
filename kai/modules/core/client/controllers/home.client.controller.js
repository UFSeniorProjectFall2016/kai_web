(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'UsersService', '$location', 'Authentication', 'DevicesService', 'DevicesStatesService', 'Socket'];

  function HomeController($state, UsersService, $location, Authentication, DevicesService, DevicesStatesService, Socket) {
    var vm = this;
    var greetings = [{
      strtHr: 0,
      msg: 'Good morning'
    }, {
      strtHr: 12,
      msg: 'Good afternoon'
    }, {
      strtHr: 17,
      msg: 'Good evening'
    }];
    var notifications = [];

    vm.greet = greet;
    vm.homeCondition = ['00', '00', '00'];
    vm.formatTime = formatTime;
    vm.notifications = DevicesStatesService.getNotification(5);
    vm.devState = DevicesStatesService.list;
    vm.devices = DevicesService.query();
    vm.authentication = Authentication;
    vm.deviceOn = deviceOn;
    vm.deviceOff = deviceOff;

    init();

    function init() {
      // If user is signed in then redirect back home
      if (!Authentication.user) {
        $state.go('authentication.signin', {});
      }

      // Make sure the Socket is connected
      if (!Socket.socket) {
        Socket.connect();
      }

      // Request the states of every devices
      Socket.emit('status_req', {});

      // Listen for home condition being broadcasted
      Socket.on('condition_res', function (message) {
        // Emit the 'chatMessage' event
        io.emit('condition_res', message);
      });

      // Listen connection ping made by web client
      Socket.on('notification', function (message) {
        vm.notifications = DevicesStatesService.getNotification(5);
      });

      // Listen for device states
      Socket.on('status_res', function (message) {
        console.log('This should be an array of messages' + message);
        var i;
        for (i = 0; i < message.length; i++) {
          console.log('_devid: ' + message[i]);
          DevicesStatesService.add(message[i]);
        }
        vm.devState = DevicesStatesService.list;
      });

      // Shared last save states from user devices
      if (DevicesStatesService.list === undefined) {
        vm.devState = DevicesService.query();
      }
    }

    function formatTime(date) {
      var d = new Date(date);
      var hr = d.getHours();
      var min = d.getMinutes();
      var sec = d.getSeconds();
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      var am = (hr < 12) ? 'AM' : 'PM';
      return (hr % 12) + ':' + min + ':' + sec + am;
    }

    function greet() {
      var d = new Date();
      var i = greetings.length;
      for (i; i > 0; i--) {
        if ((d.getHours() - greetings[i - 1].strtHr) >= 0) {
          return greetings[i - 1].msg;
        }
      }
    }

    function greetMessage() {
      var dOff = deviceOn();
    }

    function deviceOn() {
      var i = 0;
      var res = 0;
      for (i = 0; i < vm.devState.length; i++) {
        if ((vm.devState[i]._status !== undefined) && (vm.devState[i]._status > 0)) {
          res += 1;
        }
      }
      return res;
    }

    function deviceOff() {
      return vm.devState.length - deviceOn();
    }
  }
}());
