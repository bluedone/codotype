// Chai configuration
const chai = require("chai");
chai.should();

// Import all library tests here

// // // //

const assert = chai.assert;

describe('@codotype/ui', () => {

  describe('tests should load', () => {
    it('should not throw an error', () => {
      const input = 'foo'
      assert.equal(input, 'foo')
    });
  });

});
