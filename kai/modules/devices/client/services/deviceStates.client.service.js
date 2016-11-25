(function () {
  'use strict';

  angular
    .module('devices')
    .factory('DevicesStatesService', DevicesStatesService);

  var devices = {};

  devices.list = [];
  devices.notifications = [];

  devices.contains = function(device) {
    // Check if that specific device is already in list of devices
    var index = devices.list.indexOf(device);
    if (index !== -1) {
      return index;
    }

    var i;
    for (i = 0; i < devices.list.length; i++) {
      if (device._devid === devices.list[i]._devid) {
        return i;
      }
    }

    // Elements is not in the list of devices
    return -1;
  };

  devices.addNotification = function(notification) {
    devices.notifications.unshift(notification);
  };

  devices.getNotification = function(numOfNotifications) {
    var res = new Array(numOfNotifications);
    var counter = 0;
    if ((devices.notifications === undefined) || (devices.notifications.length < numOfNotifications)) {
      while (counter < devices.notifications.length) {
        res[counter] = devices.notifications[counter];
        counter++;
      }

      while (counter < numOfNotifications) {
        res[counter] = { date: null, msg: '' };
        counter++;
      }
    } else {
      res = devices.notifications.slice(0, numOfNotifications);
    }

    return res;
  };

  devices.add = function(device) {
    var devLoc = devices.contains(device);
    console.log('device State add (ID): ' + device._devid + '; ret: ' + devLoc);
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
