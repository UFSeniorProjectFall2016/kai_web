(function () {
  'use strict';

  angular
    .module('users')
    .controller('ProfileViewController', ProfileViewController);

  ProfileViewController.$inject = ['$scope', 'Authentication', 'menuService'];

  function ProfileViewController($scope, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.choice = [{
      _id: 0,
      _name: 'Edit Profile',
      _state: 'settings.profile',
      _icon: 'ic_account_circle_black_24px.svg'
    },
    {
      _id: 1,
      _name: 'Change Profile Picture',
      _state: 'settings.picture',
      _icon: 'ic_picture_in_picture_black_24px.svg'
    },
    {
      _id: 2,
      _name: 'Change Password',
      _state: 'settings.password',
      _icon: 'ic_lock_outline_black_24px.svg'
    },
    {
      _id: 3,
      _name: 'Manage Social Accounts',
      _state: 'settings.accounts',
      _icon: 'ic_settings_black_24px.svg'
    }
  ];

    vm.user = Authentication.user;

  }
}());
