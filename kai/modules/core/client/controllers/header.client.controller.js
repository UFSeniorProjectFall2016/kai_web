(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$mdSidenav', 'Socket'];

  function HeaderController($scope, $state, Authentication, menuService, $mdSidenav, Socket) {
    var vm = this;
    var statusProperties = [{
      _id: 0,
      color: '#dcdcdc',
    }, {
      _id: 1,
      color: '#ffab00',
    }, {
      _id: 2,
      color: '#4caf50',
    }];

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    vm.currStatus = statusProperties[0];

    init();

    function init() {
      if (Authentication.user) {
        // Make sure the Socket is connected
        if (!Socket.socket) {
          Socket.connect();
        }

        Socket.on('ping_res', function (message) {
          vm.currStatus = statusProperties[message];
        });
      }
    }

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    // Added for Side navigation
    $scope.toggleLeft = buildToggler('left');
    // $scope.isOpenLeft = function() {
    //   return $mdSidenav('left').isOpen();
    // };

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  }
}());
