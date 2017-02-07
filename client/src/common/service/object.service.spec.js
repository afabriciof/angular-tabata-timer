(function () {
    'use strict';

    describe('Common - ObjectService', function() {

        beforeEach(module('common'));

        var ObjectService;

        beforeEach(inject(function(_ObjectService_){
            ObjectService = _ObjectService_;
        }));

        it('should clone a string attribute', function() {
            var source = {name: 'Alex'};
            var target = ObjectService.DeepClone(source);
            expect(target.name).toBe('Alex');
        });

        it('should clone a numeric attribute', function() {
            var source = {age: 14};
            var target = ObjectService.DeepClone(source);
            expect(target.age).toBe(14);
        });

        it('should clone a two level depth object', function() {
            var source = {};
            source.age = 14;
            source.address = {};
            source.address.streetName = 'Karma Avenue';
            source.address.streetNumber = 1234;
            var target = ObjectService.DeepClone(source);
            expect(target.age).toBe(14);
            expect(target.address.streetName).toBe('Karma Avenue');
            expect(target.address.streetNumber).toBe(1234);
        });

    });

})();