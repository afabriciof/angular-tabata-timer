(function () {
    'use strict';

    angular.module('tabata')

    .component('tabata', {
        templateUrl: 'tabata/tabata.view.html',
        controller: "TabataController as vm"
        })

    .controller('TabataController', TabataController);

    TabataController.$inject = ['$timeout', '$rootScope', 'ObjectService', 'PersonService', 'LoginService', 'TimerService', 'AudioService'];

    function TabataController($timeout, $rootScope, ObjectService, PersonService, LoginService, TimerService, AudioService) {
        // Public attributes
        var vm = this;

        vm.showHttpError = false;
        vm.showHttpSuccess = false;
        vm.disablePauseResume = true;
        vm.isRunning = false;
        vm.debugOn = false;

        // Private attributes
        vm.state = 'Idle';
        vm.StartStop = 'Start';
        vm.PauseResume = 'Pause';
        vm.timeoutPromise = null;

        vm.userLoggedIn = LoginService.isUserLoggedIn();
        vm.runningConfig = {};

        // Init
        init();

        // Public Methods
        vm.startStop = startStop;
        vm.pauseResume = pauseResume;
        vm.saveSettings = saveSettings;

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

        function pauseResume() {
            console.debug('PauseResume');
            if (vm.isRunning) {
              pause();
            } else {
              resume();
            }
        }

        function saveSettings() {
            console.debug('saveSettings');
            vm.showHttpError = false;
            vm.showHttpSuccess = false;

            var person = vm.userData;

            person.setting.prepare = vm.setting.prepare;
            person.setting.work = vm.setting.work;
            person.setting.rest = vm.setting.rest;
            person.setting.cycles = vm.setting.cycles;
            person.setting.tabatas = vm.setting.tabatas;

            var personId = person.id;

            PersonService.updatePerson(personId, person)
              .then(function(response) {
                console.debug('update Person http success!');
                vm.showHttpSuccess = true;
              })
              .catch(function(error) {
                console.debug('update Person http error');
                vm.showHttpError = true;
              });
        }

        // Test Visible Methods

        // Private Methods
        function init() {
            resetCounter();

            updateUserData($rootScope.userData);

            $rootScope.$on('userLoggedIn', function(event,value) {
              console.debug('tabata callback' + value);
              vm.userLoggedIn = value;
            });

            $rootScope.$on('userData', function(event,value) {
              console.debug('tabata callback' + value);
              updateUserData(value);
            });

        }

        function updateUserData(userData) {
            vm.userData = userData;

            if (angular.isUndefined(vm.userData) || angular.isUndefined(vm.userData.setting)) {
              vm.setting = {};

              vm.setting.prepare = 10;
              vm.setting.work = 20;
              vm.setting.rest = 10;
              vm.setting.cycles = 8;
              vm.setting.tabatas = 1;
            } else {
              vm.setting = vm.userData.setting;
            }

            vm.setting.timer = {hours:0,minutes:0,seconds:0};
        }

        function resetCounter() {
            console.debug('resetCounter');
            vm.runningConfig.timer = {hours:0,minutes:0,seconds:0};
            vm.runningConfig.cycles = 0;
            vm.runningConfig.tabatas = 0;
        }

        function start() {
            console.debug('Start');

            loadRunningConfig();
            if (vm.runningConfig.tabatas > 0) {
              --vm.runningConfig.tabatas;
              loadPrepare();
              vm.state = 'Prepare';
              vm.timeoutPromise = $timeout(decrementCounter, 1000);
              vm.isRunning = true;
              vm.StartStop = 'Stop';
              vm.disablePauseResume = false;
              vm.PauseResume = 'Pause';
            }
        }

        function resume() {
            console.debug('Resume');
            vm.isRunning = true;
            vm.StartStop = 'Stop';
            vm.disablePauseResume = false;
            vm.PauseResume = 'Pause';
            vm.timeoutPromise = $timeout(decrementCounter, 1000);
        }

        function loadRunningConfig() {
            vm.runningConfig = ObjectService.DeepClone(vm.setting);
        }

        function loadPrepare() {
            AudioService.playSound('starting');
            vm.runningConfig.timer = {hours:0,minutes:0,seconds: vm.runningConfig.prepare};
        }

        function loadWork() {
            AudioService.playSound('work');
            vm.runningConfig.timer = {hours:0,minutes:0,seconds: vm.runningConfig.work};
        }

        function loadRest() {
            AudioService.playSound('rest');
            vm.runningConfig.timer = {hours:0,minutes:0,seconds: vm.runningConfig.rest};
        }

        function pause() {
            console.debug('Pause');

            $timeout.cancel(vm.timeoutPromise);
            vm.isRunning = false;

            vm.StartStop = 'Start';
            vm.PauseResume = 'Resume';
        }

        function stop() {
            console.debug('Stop');

            if (vm.isRunning) {
              $timeout.cancel(vm.timeoutPromise);
              vm.isRunning = false;
            }

            vm.StartStop = 'Start';
            vm.disablePauseResume = true;
            vm.PauseResume = 'Pause';
        }

        function decrementCounter() {
            console.debug('decrementCounter');

            if (TimerService.numberIsThreeOrTwoOrOne(vm.runningConfig.timer.seconds)) AudioService.playSound('button-1');

            if (vm.runningConfig.timer.seconds > 0) {
                vm.runningConfig.timer.seconds--;
            } else if (vm.runningConfig.timer.minutes > 0) {
                vm.runningConfig.timer.minutes--;
                vm.runningConfig.timer.seconds = TimerService.decrement(vm.runningConfig.timer.seconds);
            } else if (vm.runningConfig.timer.hours > 0) {
                vm.runningConfig.timer.hours--;
                vm.runningConfig.timer.minutes = TimerService.decrement(vm.runningConfig.timer.minutes);
                vm.runningConfig.timer.seconds = TimerService.decrement(vm.runningConfig.timer.seconds);
            }

            if (TimerService.countIsNotZero(vm.runningConfig.timer.hours,vm.runningConfig.timer.minutes,vm.runningConfig.timer.seconds)) {
                vm.timeoutPromise = $timeout(decrementCounter, 1000);
            } else if (vm.state === 'Prepare') {
                if (vm.runningConfig.cycles > 0) --vm.runningConfig.cycles;
                loadWork();
                vm.state = 'Work';
                vm.timeoutPromise = $timeout(decrementCounter, 1000);
            } else if (vm.state === 'Work') {
                loadRest();
                vm.state = 'Rest';
                vm.timeoutPromise = $timeout(decrementCounter, 1000);
            } else if (vm.state === 'Rest') {
                if (vm.runningConfig.cycles !== 0) {
                    --vm.runningConfig.cycles;
                    loadWork();
                    vm.state = 'Work';
                    vm.timeoutPromise = $timeout(decrementCounter, 1000);
                } else if (vm.runningConfig.tabatas !== 0) {
                    vm.runningConfig.cycles = vm.setting.cycles;
                    --vm.runningConfig.tabatas;
                    loadPrepare();
                    vm.state = 'Prepare';
                    vm.timeoutPromise = $timeout(decrementCounter, 1000);
                } else {
                    vm.state = 'Idle';
                    stop();
                    AudioService.playSound('button-1');
                }
            }
        }

    }

})();