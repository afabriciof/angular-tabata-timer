(function () {
    'use strict';

    angular
        .module('timer')
        .factory('TimerService', TimerService);

    function TimerService() {
        var service = {};

        service.decrement = decrement;
        service.countIsNotZero = countIsNotZero;
        service.numberIsThreeOrTwoOrOne = numberIsThreeOrTwoOrOne;

        return service;

        function decrement(number) {
            var ret = number;
            if (number > 0) ret = --number;
            else ret = 59;
            return ret;
        }

        function countIsNotZero(hours, minutes, seconds) {
            return !(hours === 0 && minutes === 0 && seconds === 0);
        }

        function numberIsThreeOrTwoOrOne(number) {
            var threeOrTwoOrOne = [3,2,1];

            var found = threeOrTwoOrOne.filter(function ( i ) {
                    return number === i;
                });

            return (found && found.length > 0);
        }
    }

})();