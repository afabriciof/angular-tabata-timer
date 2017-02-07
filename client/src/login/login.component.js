(function () {
    'use strict';

    angular.module('login')

    .component('login', {
        templateUrl: 'login/login.view.html',
        controller: "LoginController as vm"
    })

    .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', 'LoginService'];

    function LoginController($rootScope, LoginService) {
        // Public attributes
        var vm = this;
        vm.showLoginFrom = true;
        vm.loginFailed = false;
        vm.userName = '';
        vm.password = '';

        // Private attributes

        // Init
        init();

        // Public Methods
        vm.reset = reset;
        vm.login = login;
        vm.logout = logout;

        // Test Visible Methods

        // Private Methods
        function init() {
            console.debug('init');
            if (LoginService.isUserLoggedIn()) {
                vm.showLoginFrom = false;
                vm.userName = LoginService.getUserName();
            } else {
                vm.showLoginFrom = true;
            }
            console.debug('vm.showLoginFrom ' + vm.showLoginFrom);

            $rootScope.$on('userLoggedIn', function(event,value) {
              console.debug('tabata callback' + value);
              if (value) {
                  vm.showLoginFrom = false;
              } else {
                  vm.showLoginFrom = true;
              }
            });
        }

        function reset() {
            console.debug('reset');
            vm.userName = '';
            vm.password = '';
            vm.showLoginFrom = true;
            vm.loginFailed = false;
            vm.loginForm.$setPristine();
            vm.loginForm.$setUntouched();
        }

        function login() {
            console.debug('login');

            LoginService.performLogin(vm.userName, vm.password)
                .then(function(response) {
                    console.debug('login success');
                    vm.showLoginFrom = false;
                    vm.loginFailed = false;

                    $rootScope.userLoggedIn = true;
                    $rootScope.$broadcast('userLoggedIn', $rootScope.userLoggedIn);
                    $rootScope.userData = response.data;
                    $rootScope.$broadcast('userData', $rootScope.userData);
                    $rootScope.userName = vm.userName;
                    $rootScope.$broadcast('userName', $rootScope.userName);
                })
                .catch(function(error) {
                    console.debug('login failed');
                    vm.loginFailed = true;

                    $rootScope.userLoggedIn = false;
                    $rootScope.$broadcast('userLoggedIn', $rootScope.userLoggedIn);
                    $rootScope.userData = undefined;
                    $rootScope.$broadcast('userData', $rootScope.userData);
                    $rootScope.userName = undefined;
                    $rootScope.$broadcast('userName', $rootScope.userName);
                });
        }

        function logout() {
            console.debug('logout');
            LoginService.performLogout();
            reset();
        }

    }

})();