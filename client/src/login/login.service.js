(function () {
    'use strict';

    angular
        .module('login')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$rootScope', '$q', 'PersonService'];

    function LoginService($rootScope, $q, PersonService) {
        var service = {};

        service.INCORRECT_LOGIN ='User or password is incorrect.';

        service.isUserLoggedIn = isUserLoggedIn;
        service.performLogin = performLogin;
        service.performLogout = performLogout;
        service.getUserName = getUserName;

        return service;

        function isUserLoggedIn() {
            return ($rootScope.userLoggedIn);
        }

        function getUserName() {
            return $rootScope.userName;
        }

        function performLogin(userName, password) {
            if (userName !== null && userName !== '' && userName === password) {
                return PersonService.getPerson(userName);
            } else {
                return $q.reject(service.INCORRECT_LOGIN);
            }
        }

        function performLogout() {
            $rootScope.userName = '';
            $rootScope.userData = {};
            $rootScope.$broadcast('userData', $rootScope.userData);
            $rootScope.userLoggedIn = false;
            $rootScope.$broadcast('userLoggedIn', $rootScope.userLoggedIn);
        }

    }

})();