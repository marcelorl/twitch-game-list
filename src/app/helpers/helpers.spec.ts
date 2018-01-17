import { calcLimit } from './helpers';

describe('#Helpers', () => {
  describe('#calcLimit', () => {
    it('should check if desktop size returns 100', () => {
      const window = {
        innerWidth: 992
      };

      expect(calcLimit({ window })).toBe(100);
    });

    it('should check if tablet size returns 50', () => {
      const window = {
        innerWidth: 991
      };

      expect(calcLimit({ window })).toBe(50);
    });

    it('should check if mobile size returns 25', () => {
      const window = {
        innerWidth: 400
      };

      expect(calcLimit({ window })).toBe(25);
    });
  });
});
