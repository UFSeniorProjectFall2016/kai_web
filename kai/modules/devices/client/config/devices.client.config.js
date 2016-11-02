(function () {
  'use strict';

  angular
    .module('devices')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Devices',
      state: 'devices',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'devices', {
      title: 'List Devices',
      state: 'devices.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'devices', {
      title: 'Create Device',
      state: 'devices.create',
      roles: ['user']
    });
  }
})();
