(function () {
    'use strict';

    describe('Timer', function() {

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
                console.debug('playing timer: ' + soundName +'.mp3');
            }
        }

        beforeEach(module('timer'));

        var $controller;

        var $timeout;
        var $rootScope;
        var $cookies;
        var LoginService;
        var TimerService;
        var AudioService;

        var vm;

        beforeEach(function() {
            module('timer', function($provide) {
                $provide.factory('AudioService', AudioServiceMock);
                $provide.factory('LoginService', LoginServiceMock);
            });

            inject(function(_$controller_, _$timeout_, _$rootScope_, _$cookies_, _LoginService_, _TimerService_, _AudioService_){
                $controller = _$controller_;

                $timeout = _$timeout_;
                $rootScope = _$rootScope_;
                $cookies = _$cookies_;
                LoginService = _LoginService_;
                TimerService = _TimerService_;
                AudioService = _AudioService_;

                // Set test cookie
                var cookieName = 'com.alex.tabata.testUser';
                var cookieExpireDate = new Date();
                cookieExpireDate.setFullYear(new Date().getFullYear() + 50);
                var timeConfig = {hours:0,minutes:0,seconds:0};
                $cookies.put(cookieName, JSON.stringify(timeConfig), {'expires': cookieExpireDate});

                vm = $controller('TimerController', {
                        $timeout: $timeout,
                        $rootScope: $rootScope,
                        $cookies: $cookies,
                        LoginService: LoginService,
                        TimerService: TimerService,
                        AudioService: AudioService
                    });
            });
        });

        it('should start with zero time', function() {
            expect(vm.hours).toBe(0);
            expect(vm.minutes).toBe(0);
            expect(vm.seconds).toBe(0);

            expect(vm.isRunning).toBe(false);
        });

        it('should finish the count properly', function() {
            // Set some time
            vm.seconds = 2;

            // Start the timer
            vm.startStop();
            expect(vm.isRunning).toBe(true);

            // Wait two seconds
            $timeout.flush(4000);

            expect(vm.isRunning).toBe(false);
            expect(vm.hours).toBe(0);
            expect(vm.minutes).toBe(0);
            expect(vm.seconds).toBe(0);
        });

        it('Reset button should restore the last run setting', function() {
            // Set some time
            vm.hours = 1;

            // Start the timer
            vm.startStop();
            expect(vm.isRunning).toBe(true);

            // Wait two seconds
            $timeout.flush(2000);

            // Stop the timer
            vm.startStop();
            expect(vm.isRunning).toBe(false);
            expect(vm.hours).toBe(0);

            // Call the reset
            vm.reset();
            expect(vm.hours).toBe(1);
        });

    });

})();