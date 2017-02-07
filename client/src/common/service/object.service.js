(function () {
    'use strict';

    angular
        .module('common')
        .factory('ObjectService', ObjectService);

    function ObjectService() {
        var service = {};

        service.DeepClone = DeepClone;

        return service;

        // This will not work for objects with functions inside
        function DeepClone(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    };

})();