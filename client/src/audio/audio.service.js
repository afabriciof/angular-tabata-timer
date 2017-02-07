(function () {
    'use strict';

    angular
        .module('audio')
        .factory('AudioService', AudioService);

    AudioService.$inject = ['$http'];

    function AudioService($http) {
        var service = {
            resourceBase: 'audio/resources/',
            playSound: playSound
        };

        return service;
        //////////////////////////////////////////////////////////

        function playSound(soundName) {
            var audio = new Audio(service.resourceBase+soundName+'.mp3');
            audio.play();
        }
    }

})();