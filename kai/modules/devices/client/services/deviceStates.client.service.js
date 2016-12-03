(function () {
  'use strict';

  angular
    .module('devices')
    .factory('DevicesStatesService', DevicesStatesService);

  var devices = {};

  devices.homeCond = {
    T: '--',
    H: '--',
    L: '--'
  };
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

  devices.addHomeCond = function(condition) {
    devices.homeCond.T = (condition.T !== undefined) ? condition.T : devices.homeCond.T;
    devices.homeCond.H = (condition.H !== undefined) ? condition.H : devices.homeCond.H;
    devices.homeCond.L = (condition.L !== undefined) ? condition.L : devices.homeCond.L;
  };

  devices.getCondition = function() {
    return [devices.homeCond.T, devices.homeCond.H, devices.homeCond.L];
  };

  devices.addNotification = function(notification) {
    if ((devices.notifications !== undefined) && (devices.notifications.length !== 0)) {
      if ((devices.notifications[0].date !== notification.date) && (devices.notifications[0].msg !== notification.msg)) {
        devices.notifications.unshift(notification);
      }
    } else {
      devices.notifications.unshift(notification);
    }
  };

  devices.getNotification = function(numOfNotifications) {
    var res = new Array(numOfNotifications);
    var counter = 0;
    if ((devices.notifications === undefined) || (devices.notifications.length === 0)) {
      res = [{
        date: new Date(),
        msg: 'No notifications posted yet'
      }];
    } else if (devices.notifications.length < numOfNotifications) {
      res = devices.notifications;
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
