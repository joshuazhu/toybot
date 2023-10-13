import { floorMod } from './utils'; // Replace 'your-module' with the actual path to your module

describe('utils', () => {
  describe('floorMod', () => {
    it('should return 2 when given 5 and 3', () => {
      expect(floorMod(5, 3)).toBe(2);
    });

    it('should return 1 when given -4 and 5', () => {
      expect(floorMod(-4, 5)).toBe(1);
    });

    it('should return 0 when given 0 and 7', () => {
      expect(floorMod(0, 7)).toBe(0);
    });
  })
});
