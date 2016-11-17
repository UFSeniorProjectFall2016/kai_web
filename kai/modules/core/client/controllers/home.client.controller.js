(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'UsersService', '$location', 'Authentication', 'DevicesService', 'DevicesStatesService'];

  function HomeController($state, UsersService, $location, Authentication, DevicesService, DevicesStatesService) {
    var vm = this;

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

      // Shared last save states from user devices
      if (DevicesStatesService.list === undefined) {
        vm.devState = DevicesService.query();
      }
      console.log('devices state: ' + vm.devState.length);
      console.log('devices vm: ' + vm.devices.length);
    }

    function deviceOn() {
      var i = 0;
      var res = 0;
      for (i = 0; i < this.devState.length; i++) {
        if ((this.devState[i]._status !== undefined) && (this.devState[i]._status > 0)) {
          res += 1;
        }
      }
      return res;
    }

    function deviceOff() {
      return this.devState.length - this.deviceOn();
    }
  }
}());
