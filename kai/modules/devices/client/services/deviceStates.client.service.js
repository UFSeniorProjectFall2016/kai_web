(function () {
  'use strict';

  angular
    .module('devices')
    .factory('DevicesStatesService', DevicesStatesService);

  var devices = {};

  devices.list = [];

  devices.contains = function(device) {
    // Check if that specific device is already in list of devices
    var index = devices.list.indexOf(device);
    if (index !== -1) {
      return index;
    }

    var i;
    for (i = 0; i < devices.list.length; i++) {
      if (device._id === devices.list[i]._id) {
        return i;
      }
    }

    // Elements is not in the list of devices
    return -1;
  };

  devices.add = function(device) {
    var devLoc = devices.contains(device);
    if (devLoc === -1) {
      devices.list.push(device);
    } else {
      devices.list[devLoc] = device;
    }
  };


  function DevicesStatesService() {
    return devices;
  }
}());
