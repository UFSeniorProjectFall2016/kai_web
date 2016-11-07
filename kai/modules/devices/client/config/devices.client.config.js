(function () {
  'use strict';

  angular
    .module('devices')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Devices',
      state: 'devices',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'devices', {
      title: 'List Devices',
      state: 'devices.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'devices', {
      title: 'Create Device',
      state: 'devices.create',
      roles: ['user']
    });
  }
})();
