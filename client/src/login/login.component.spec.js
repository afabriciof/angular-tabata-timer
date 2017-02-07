(function () {
    'use strict';

    describe('LoginComponent', function() {

        function PersonServiceMock($q) {
            var service = {};
            service.getPerson = getPerson;
            return service;

            function getPerson(userName) {
                if (userName === 'afernandez') {
                    var data = {};
                    data.setting = {};
                    data.setting.prepare = 10;
                    data.setting.work = 20;
                    data.setting.rest = 10;
                    data.setting.cycles = 8;
                    data.setting.tabatas = 1;
                    return $q(function(resolve, reject) {
                        resolve(data);
                        });
                } else {
                    return $q(function(resolve, reject) {
                        reject("user not found");
                        });
                }
            }
        };

        beforeEach(module('login'));
        beforeEach(module('common'));

        var $controller;
        var $rootScope;
        var $timeout;
        var LoginService;
        var PersonService;

        beforeEach(function() {
            module('login', function($provide) {
                $provide.factory('PersonService', PersonServiceMock);
            });


            inject(function(_$controller_,_$rootScope_, _$timeout_,_LoginService_, _PersonService_){
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                $timeout = _$timeout_;
                LoginService = _LoginService_;
                PersonService = _PersonService_;
            });
        });

        it('form should start empty', function() {
            var ctrl = $controller('LoginController', {
              $timeout: $timeout,
              LoginService: LoginService
            });

            expect(ctrl.userName).toBe('');
            expect(ctrl.password).toBe('');
        });

        it('should show log form on login fail due to incorrect password', function() {
            var ctrl = $controller('LoginController', {
              $timeout: $timeout,
              LoginService: LoginService
            });

            ctrl.userName = 'afernandez';
            ctrl.password = 'afernandez2';

            expect(ctrl.showLoginFrom).toBe(true);

            ctrl.login();
            $rootScope.$apply();

            expect(ctrl.showLoginFrom).toBe(true);
        });

        it('should show log form on login fail due to user not exist', function() {
            var ctrl = $controller('LoginController', {
              $timeout: $timeout,
              LoginService: LoginService
            });

            ctrl.userName = 'rsmith';
            ctrl.password = 'rsmith';

            expect(ctrl.showLoginFrom).toBe(true);

            ctrl.login();
            $rootScope.$apply();

            expect(ctrl.showLoginFrom).toBe(true);
        });

        it('should log in and show logout button', function() {
            var ctrl = $controller('LoginController', {
              $timeout: $timeout,
              LoginService: LoginService
            });

            ctrl.userName = 'afernandez';
            ctrl.password = 'afernandez';

            expect(ctrl.showLoginFrom).toBe(true);

            ctrl.login();
            $rootScope.$apply();

            expect(ctrl.showLoginFrom).toBe(false);
        });

    });

})();