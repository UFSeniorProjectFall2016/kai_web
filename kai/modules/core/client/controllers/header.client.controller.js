(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$mdSidenav', 'Socket', 'DevicesStatesService'];

  function HeaderController($scope, $state, Authentication, menuService, $mdSidenav, Socket, DevicesStatesService) {
    var vm = this;
    var statusProperties = [{
      _id: 0,
      color: '#dcdcdc'
    }, {
      _id: 1,
      color: '#ffab00'
    }, {
      _id: 2,
      color: '#4caf50'
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

        Socket.emit('ping_req', {});

        Socket.on('ping_res', function (message) {
          console.log('status: ' + message.data.statusChg);
          vm.currStatus = statusProperties[message.data.status];
          if (message.data.statusChg === true) {
            DevicesStatesService.addNotification({
              date: message.date,
              msg: message.data.msg
            });
          }
        });

        // Destroy the socket when the user logout instead
        $scope.$on('$destroy', function () {
          console.log('socket destruction');
          Socket.removeListener('device status');
        });
      } else {
        $state.go('authentication.signin', {});
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
