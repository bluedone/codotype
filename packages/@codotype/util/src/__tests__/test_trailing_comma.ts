import { trailingComma } from "../trailingComma";

// // // //

describe('/lib/trailingComma.js', () => {

  describe('empty array', () => {
    it('should return empty string at 0th index', () => {
      expect(trailingComma([], 0)).toBe('')
    });
  });

  describe('array with length 1', () => {
    it('should return empty string at 0th index', () => {
      expect(trailingComma([1], 0)).toBe('')
    });
  });

  describe('array with length 2', () => {
    it('should return comma at 0th index', () => {
      expect(trailingComma([1, 2], 0)).toBe(',')
    });

    it('should return empty string at 1st index', () => {
      expect(trailingComma([1, 2], 1)).toBe('')
    });
  });

});
