(function () {
    'use strict';

    describe('LoginService', function() {

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
        }

        beforeEach(module('login'));

        var LoginService;
        var PersonService;
        var $rootScope;

        beforeEach(function() {
            module('login', function($provide) {
                $provide.factory('PersonService', PersonServiceMock);
            });

            inject(function(_$rootScope_, _LoginService_, _PersonService_){
                LoginService = _LoginService_;
                PersonService = _PersonService_;
                $rootScope = _$rootScope_;
            });
        });

        it('should reject if username is not equals to password', function() {
            var loginSuccessResult;
            var loginErrorResult;

            var userName = 'Alex';
            var password = 'Paul';
            LoginService.performLogin(userName, password)
                .then(function(response) {
                    loginSuccessResult = response;
                })
                .catch(function(error) {
                    loginErrorResult = error;
                });

            $rootScope.$apply();

            expect(loginSuccessResult).toBeUndefined();
            expect(loginErrorResult).toBe(LoginService.INCORRECT_LOGIN);
        });

        it('should login successully if username is equals to password', function() {
            var loginSuccessResult;
            var loginErrorResult;

            var userName = 'afernandez';
            var password = 'afernandez';
            LoginService.performLogin(userName, password)
                .then(function(response) {
                    loginSuccessResult = response;
                })
                .catch(function(error) {
                    loginErrorResult = error;
                });

            $rootScope.$apply();

            expect(loginErrorResult).toBeUndefined();
            expect(loginSuccessResult.setting.prepare).toBe(10);
        });

        it('should show user not logged in after logout', function() {
            LoginService.performLogout();
            expect(LoginService.isUserLoggedIn()).toBe(false);
        });

    });

})();