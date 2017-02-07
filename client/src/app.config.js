(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

        config.$inject = ['$locationProvider' ,'$routeProvider'];

        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/timer', {
                    template: '<timer></timer>'
                }).
                when('/tabata', {
                    template: '<tabata></tabata>'
                }).
                otherwise('/timer');
        }

})();