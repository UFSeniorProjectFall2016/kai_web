(function () {
  'use strict';

  angular
    .module('devices')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('kaidevice', {
      title: '',
      state: 'devices',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('kaidevice', 'devices', {
      title: 'List Devices',
      state: 'devices.list'
    });
  }
}());
