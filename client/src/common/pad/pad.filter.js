(function () {
    'use strict';

    angular
        .module('common')
        .filter('pad', pad);


    function pad() {
        return function (number) {
            if (number < 10) number = '0' + number;
            return ''+number;
        }
    }

})();