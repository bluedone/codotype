// Chai configuration
const chai = require("chai");
chai.should();

// Import all library tests here

// // // //

const assert = chai.assert;

describe('@codotype/generator', () => {

  describe('tests should load', () => {
    it('should not through an error', () => {
      const input = 'foo'
      assert.equal(input, 'foo')
    });
  });

});
