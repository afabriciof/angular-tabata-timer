(function () {
    'use strict';

    describe('TabataComponent', function() {

        function LoginServiceMock() {
            var service = {};
            service.isUserLoggedIn = isUserLoggedIn;
            service.getUserName = getUserName;
            return service;

            function isUserLoggedIn(userName) {
                return true;
            }

            function getUserName() {
                return 'testUser';
            }
        }

        function AudioServiceMock() {
            var service = {};
            service.playSound = playSound;
            return service;

            function playSound(soundName) {
                console.debug('playing tabata: ' + soundName +'.mp3');
            }
        }

        function PersonServiceMock($q) {
            var service = {};
            service.getPerson = getPerson;
            service.updatePerson = updatePerson;
            return service;

            function getPerson(userName) {
                data.setting = {};
                data.setting.prepare = 1;
                data.setting.work = 2;
                data.setting.rest = 3;
                data.setting.cycles = 4;
                data.setting.tabatas = 5;
                return $q(function(resolve, reject) {
                    resolve(data);
                    });
            }

            function updatePerson(personId, person) {
                var data = "Success";
                return $q(function(resolve, reject) {
                    resolve(data);
                    });
            }

        }

        beforeEach(module('tabata'));
        beforeEach(module('timer'));

        var $controller;

        var $timeout;
        var $rootScope;
        var ObjectService;
        var PersonService;
        var LoginService;
        var TimerService;
        var AudioService;

        var vm;

        beforeEach(function() {
            module('tabata', function($provide) {
                $provide.factory('LoginService', LoginServiceMock);
                $provide.factory('AudioService', AudioServiceMock);
                $provide.factory('PersonService', PersonServiceMock);
            });

            inject(function(_$controller_,_$timeout_, _$rootScope_, _ObjectService_, _PersonService_, _LoginService_, _TimerService_, _AudioService_){
                $controller = _$controller_;

                $timeout = _$timeout_;
                $rootScope = _$rootScope_;
                ObjectService = _ObjectService_;
                PersonService = _PersonService_;

                LoginService = _LoginService_;
                TimerService = _TimerService_;
                AudioService = _AudioService_;

                // Simulate person is logged in
                var data = {};
                data.setting = {};
                data.setting.prepare = 1;
                data.setting.work = 2;
                data.setting.rest = 3;
                data.setting.cycles = 4;
                data.setting.tabatas = 5;
                $rootScope.userData = data;
                $rootScope.$apply();

                vm = $controller('TabataController', {
                        $timeout: $timeout,
                        $rootScope: $rootScope,
                        ObjectService: ObjectService,
                        PersonService: PersonService,
                        LoginService: LoginService,
                        TimerService: TimerService,
                        AudioService: AudioService
                    });
            });
        });

        it('should get configuration from PersonService', function() {
            expect(vm.userLoggedIn).toBe(true);
            expect(vm.userData).toBeDefined();
            expect(vm.userData.setting).toBeDefined();

            expect(vm.userData.setting.prepare).toBe(1);
            expect(vm.userData.setting.work).toBe(2);
            expect(vm.userData.setting.rest).toBe(3);
            expect(vm.userData.setting.cycles).toBe(4);
            expect(vm.userData.setting.tabatas).toBe(5);
        });

        it('should properly save the settings', function() {
            // user configures the tabata settings
            vm.userData.setting.prepare = 30;
            vm.userData.setting.work = 29;
            vm.userData.setting.rest = 28;
            vm.userData.setting.cycles = 27;
            vm.userData.setting.tabatas = 26;

            // user clicks the "Save Settings" button
            vm.saveSettings();

            expect(vm.showHttpError).toBe(false);
        });

        it('should properly save the settings', function() {
            // user configures the tabata settings
            vm.userData.setting.prepare = 30;
            vm.userData.setting.work = 29;
            vm.userData.setting.rest = 28;
            vm.userData.setting.cycles = 27;
            vm.userData.setting.tabatas = 26;

            // user clicks the "Save Settings" button
            vm.saveSettings();

            expect(vm.showHttpError).toBe(true);
        });

    });

})();