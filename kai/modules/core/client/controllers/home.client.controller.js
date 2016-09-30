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
    // if (vm.authentication.user) {
    //   $location.path('/');
    // } else {
    //   // Redirect to Sign in page
    //   // i.e. this makes the Sign in Page the landing page
    //   $state.go('authentication.signin');
    // }
  }
}());
