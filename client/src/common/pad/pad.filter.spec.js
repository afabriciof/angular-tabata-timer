(function () {
    'use strict';

    describe('Common - Pad filter', function() {

        beforeEach(module('common'));

        it('should pad 1 character numbers to 2 characters with leading 0',
            inject(function(padFilter) {
                expect(padFilter(1)).toBe('01');
            })
        );

        it('should keep 2 character numbers as they are',
            inject(function(padFilter) {
                expect(padFilter(20)).toBe('20');
            })
        );

    });

})();