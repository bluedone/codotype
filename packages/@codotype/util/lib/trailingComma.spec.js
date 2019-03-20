const assert = require('chai').assert;
const trailingComma = require('./trailingComma');

// // // //

describe('/lib/trailingComma.js', () => {

  describe('empty array', () => {
    it('should return empty string at 0th index', () => {
      assert.equal(trailingComma([],0), '')
    });
  });

  describe('array with length 1', () => {
    it('should return empty string at 0th index', () => {
      assert.equal(trailingComma([1],0), '')
    });
  });

  describe('array with length 2', () => {
    it('should return comma at 0th index', () => {
      assert.equal(trailingComma([1,2],0), ',')
    });

    it('should return empty string at 1st index', () => {
      assert.equal(trailingComma([1,2],1), '')
    });
  });

});
