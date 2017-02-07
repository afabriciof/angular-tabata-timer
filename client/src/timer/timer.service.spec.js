(function () {
    'use strict';

    describe('TimerService', function() {

        beforeEach(module('timer'));

        var TimerService;

        beforeEach(inject(function(_TimerService_){
            TimerService = _TimerService_;
        }));

        it('should decrement in mod 60', function() {
            expect(TimerService.decrement(5)).toBe(4);
            expect(TimerService.decrement(4)).toBe(3);
            expect(TimerService.decrement(1)).toBe(0);
            expect(TimerService.decrement(0)).toBe(59);
        });

        it('should recognize a zero timer', function() {
            var hours = 0;
            var minutes = 0;
            var seconds = 0;
            expect(TimerService.countIsNotZero(hours, minutes, seconds)).toBe(false);

            hours = 1;
            minutes = 0;
            seconds = 0;
            expect(TimerService.countIsNotZero(hours, minutes, seconds)).toBe(true);

            hours = 0;
            minutes = 1;
            seconds = 0;
            expect(TimerService.countIsNotZero(hours, minutes, seconds)).toBe(true);

            hours = 0;
            minutes = 0;
            seconds = 1;
            expect(TimerService.countIsNotZero(hours, minutes, seconds)).toBe(true);
        });

        it('should recognize the last 3 ticks of the timer', function() {
            expect(TimerService.numberIsThreeOrTwoOrOne(5)).toBe(false);
            expect(TimerService.numberIsThreeOrTwoOrOne(4)).toBe(false);
            expect(TimerService.numberIsThreeOrTwoOrOne(3)).toBe(true);
            expect(TimerService.numberIsThreeOrTwoOrOne(2)).toBe(true);
            expect(TimerService.numberIsThreeOrTwoOrOne(1)).toBe(true);
            expect(TimerService.numberIsThreeOrTwoOrOne(0)).toBe(false);
        });


    });

})();