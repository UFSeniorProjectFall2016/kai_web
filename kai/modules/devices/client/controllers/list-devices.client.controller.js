(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesListController', DevicesListController);

  DevicesListController.$inject = ['DevicesService'];

  function DevicesListController(DevicesService) {
    var vm = this;

    vm.devices = [{
      _id: 0,
      _devid: 'light',
      _name: 'Light',
      _des: 'This is the light in the living room',
      _devType: 1,
      _state: 1,
      _status: 1
    }, {
      _id: 1,
      _devid: 'door',
      _name: 'Door',
      _des: 'This is the front door of the house',
      _devType: 1,
      _state: 1,
      _status: 1
    }, {
      _id: 2,
      _devid: 'coffee',
      _name: 'Coffee Machine',
      _des: 'Coffee machine in my kitchen',
      _devType: 1,
      _state: 1,
      _status: 1
    }, {
      _id: 3,
      _devid: 'wind',
      _name: 'Windows',
      _des: 'Living room windows',
      _devType: 1,
      _state: 1,
      _status: 1
    }];
    // vm.devices = DevicesService.query();
  }
}());
