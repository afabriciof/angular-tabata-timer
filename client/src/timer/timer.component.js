(function () {
    'use strict';

    angular.module('timer')

    .component('timer', {
        templateUrl: 'src/timer/timer.view.html',
        controller: "TimerController as vm"
    })

    .controller('TimerController', TimerController);

    TimerController.$inject = ['$timeout', '$rootScope', '$cookies', 'LoginService', 'TimerService', 'AudioService'];

    function TimerController($timeout, $rootScope, $cookies, LoginService, TimerService, AudioService) {
        // Public attributes
        var vm = this;

        vm.cookieUrl = 'com.alex.tabata.';

        vm.hours = 0;
        vm.minutes = 0;
        vm.seconds = 0;

        vm.isRunning = false;

        vm.debugOn = false;

        // Private attributes
        vm.StartStop = 'Start';
        vm.timeConfig = {hours:0,minutes:0,seconds:0};
        vm.timeoutPromise = null;

        vm.userLoggedIn = LoginService.isUserLoggedIn();

        // Init
        init();

        // Public Methods
        vm.startStop = startStop;
        vm.reset = reset;

        function startStop() {
            console.debug('startStop');

            if (vm.isRunning) {
                console.debug('Stopping...');
                stop();
            } else {
                console.debug('Starting...');
                start();
            }
        }

        function reset() {
            console.debug('Reset');

            stop();

            vm.hours = vm.timeConfig.hours;
            vm.minutes = vm.timeConfig.minutes;
            vm.seconds = vm.timeConfig.seconds;
        }

        // Test Visible Methods

        // Private Methods
        function init() {
            resetCounter();

            getCookieConfig();

            $rootScope.$on('userLoggedIn', function(event,value) {
                vm.userLoggedIn = value;
            });

            $rootScope.$on('userName', function(event,value) {
                vm.userName = value;
                getCookieConfig();
            });
        }

        function getCookieConfig() {
            console.debug('getCookieConfig');
            var userName = LoginService.getUserName();
            if (userName) {
                var cookieName = vm.cookieUrl + userName;
                console.debug('cookieName: ' + cookieName);
                var cookie = $cookies.get(cookieName);
                if (cookie) {
                    vm.timeConfig = JSON.parse(cookie);
                    vm.hours = vm.timeConfig.hours;
                    vm.minutes = vm.timeConfig.minutes;
                    vm.seconds = vm.timeConfig.seconds;
                }
            }
        }

        function setCookieConfig() {
            console.debug('setCookieConfig');
            var userName = LoginService.getUserName();
            if (userName) {
                var cookieName = vm.cookieUrl + userName;
                var cookieExpireDate = new Date();
                cookieExpireDate.setFullYear(new Date().getFullYear() + 50);
                $cookies.put(cookieName, JSON.stringify(vm.timeConfig), {'expires': cookieExpireDate});
            }
        }

        function resetCounter() {
            console.debug('resetCounter');
            vm.hours = 0;
            vm.minutes = 0;
            vm.seconds = 0;
        }

        function start() {
            console.debug('Start');

            vm.timeConfig.hours = vm.hours;
            vm.timeConfig.minutes = vm.minutes;
            vm.timeConfig.seconds = vm.seconds;

            if (TimerService.countIsNotZero(vm.hours, vm.minutes, vm.seconds)) {

                setCookieConfig();

                vm.timeoutPromise = $timeout(decrementCounter, 1000);
                vm.isRunning = true;
                vm.StartStop = 'Stop';
            }
        }

        function stop() {
            console.debug('Stop');

            if (vm.isRunning) {
                $timeout.cancel(vm.timeoutPromise);
                vm.isRunning = false;
            }
            vm.StartStop = 'Start';
        }

        function decrementCounter() {
            console.debug('decrementCounter');
            if (vm.seconds > 0) {
                vm.seconds--;
            } else if (vm.minutes > 0) {
                vm.minutes--;
                vm.seconds = TimerService.decrement(vm.seconds);
            } else if (vm.hours > 0) {
                vm.hours--;
                vm.minutes = TimerService.decrement(vm.minutes);
                vm.seconds = TimerService.decrement(vm.seconds);
            }
            if (TimerService.countIsNotZero(vm.hours, vm.minutes, vm.seconds)) vm.timeoutPromise = $timeout(decrementCounter, 1000);
            else {
                stop();
                AudioService.playSound('button-1');
            }
        }
    }

})();