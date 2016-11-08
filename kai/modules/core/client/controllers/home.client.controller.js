(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'UsersService', '$location', 'Authentication', 'DevicesService'];

  function HomeController($state, UsersService, $location, Authentication, DevicesService) {
    var vm = this;

    vm.devices = [{
      _id: 0,
      _devid: 'light',
      _name: 'Light',
      _des: 'This is the light in the living room',
      _devType: 1,
      _state: true,
      _status: false
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
    vm.authentication = Authentication;
    vm.deviceOn = deviceOn;
    vm.deviceOff = deviceOff;

    // If user is signed in then redirect back home
    if (!vm.authentication.user) {
      $location.path('/authentication/signin');
      $state.go('authentication.signin');
    }

    function deviceOn() {
      var i, res = 0;
      for (i = 0; i < vm.devices.length; i++) {
        if( (vm.devices[i]._status === true) || (vm.devices[i]._status > 0) ) {
          res += 1;
        }
      }
      return res;
    }

    function deviceOff() {
      return this.devices.length - vm.deviceOn();
    }
  }
}());
