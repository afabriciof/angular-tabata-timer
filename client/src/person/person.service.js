(function () {
    'use strict';

    angular
        .module('person')
        .factory('PersonService', PersonService);

    PersonService.$inject = ['$http'];

    function PersonService($http) {
        var service = {};

        var urlBase = 'http://localhost:8081/person/';

        service.getPerson = getPerson;
        service.getPersons = getPersons;
        service.updatePerson = updatePerson;
        service.insertPerson = insertPerson;
        service.deletePerson = deletePerson;

        return service;

        function getPerson(userName) {
          return $http.get(urlBase+'get', {params:  {userName: userName}});
        }

        function getPersons() {
          return $http.get(urlBase);
        }

        function updatePerson(personId, person) {
          return $http.put(urlBase+'update/'+personId,JSON.stringify(person));
        }

        function insertPerson(person) {
          return $http.post(urlBase, person);
        }

        function deletePerson(id) {
          return $http.delete(urlBase + '/' + id);
        }
    }

})();