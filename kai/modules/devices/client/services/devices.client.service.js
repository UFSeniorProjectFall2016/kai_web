//Devices service used to communicate Devices REST endpoints
(function () {
  'use strict';

  angular
    .module('devices')
    .factory('DevicesService', DevicesService);

  DevicesService.$inject = ['$resource'];

  function DevicesService($resource) {
    return $resource('api/devices/:deviceId', {
      deviceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
