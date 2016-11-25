(function () {
  'use strict';

  // Devices controller
  angular
    .module('devices')
    .controller('DevicesController', DevicesController);

  DevicesController.$inject = ['$scope', '$state', 'Authentication', 'deviceResolve'];

  function DevicesController ($scope, $state, Authentication, device) {
    var vm = this;
    var devType = [{
      id: 0,
      name: 'Light',
      type: 1,
      tagId: '#light'
    }, {
      id: 1,
      name: 'Door',
      type: 1,
      tagId: '#door'
    }, {
      id: 2,
      name: 'Coffee machine',
      type: 1,
      tagId: '#coffee'
    }, {
      id: 3,
      name: 'Windows',
      type: 2,
      tagId: '#wind'
    }];

    vm.devType = devType;
    vm.selTypeId = -1;
    vm.getSelectedType = getSelectedType;
    vm.authentication = Authentication;
    vm.device = device;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.cancel = cancel;

    function getSelectedType() {
      if (vm.selTypeId < 0) {
        return 'Select a device type';
      }

      vm.device._devType = devType[vm.selTypeId].type;
      vm.device._devid = devType[vm.selTypeId].tagId;
      return devType[vm.selTypeId].name;
    }

    // Remove existing Device
    function remove() {
      vm.device.$remove($state.go('devices.list'));
      // if (confirm('Are you sure you want to delete?')) {
      // }
    }

    // Cancel Editing or new addition
    function cancel() {
      if (vm.device._id) {
        $state.go('devices.view', {
          deviceId: device._id
        });
      } else {
        $state.go('devices.list', {});
      }
    }

    // Save Device
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.deviceForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.device._id) {
        vm.device.$update(successCallback, errorCallback);
      } else {
        vm.device.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('devices.view', {
          deviceId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
