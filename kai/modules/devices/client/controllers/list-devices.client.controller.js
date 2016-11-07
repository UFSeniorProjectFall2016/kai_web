(function () {
  'use strict';

  angular
    .module('devices')
    .controller('DevicesListController', DevicesListController);

  DevicesListController.$inject = ['DevicesService'];

  function DevicesListController(DevicesService) {
    var vm = this;

    vm.devices = DevicesService.query();
  }
})();
