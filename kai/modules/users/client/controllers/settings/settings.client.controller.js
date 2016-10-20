(function () {
  'use strict';

  angular
    .module('users')
    .controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$scope', 'Authentication'];

  function SettingsController($scope, Authentication) {
    var vm = this;
    vm.choice = [{
      _id: 0,
      _name: 'Edit Profile',
      _state: 'settings.profile'
    },
    {
      _id: 1,
      _name: 'Change Profile Picture',
      _state: 'settings.picture'
    },
    {
      _id: 2,
      _name: 'Change Password',
      _state: 'settings.password'
    },
    {
      _id: 3,
      _name: 'Manage Social Accounts',
      _state: 'settings.accounts'
    }
  ];

    vm.user = Authentication.user;

  }
}());
