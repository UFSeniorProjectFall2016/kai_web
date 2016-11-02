(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$state', 'UsersService', '$location', 'Authentication'];

  function HomeController($state, UsersService, $location, Authentication) {
    var vm = this;

    vm.authentication = Authentication;

    // If user is signed in then redirect back home
    if (!vm.authentication.user) {
      $location.path('/authentication/signin');
      $state.go('authentication.signin');
    }
  }
}());
