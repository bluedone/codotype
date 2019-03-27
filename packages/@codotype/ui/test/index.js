// Chai configuration
const chai = require("chai");
chai.should();

// Import all library tests here
// require('../lib/buildDefault.spec');
// require('../lib/indent.spec');
// require('../lib/inflateMeta.spec');
// require('../lib/sanitizeLabel.spec');
// require('../lib/trailingComma.spec');

// // // //

const assert = chai.assert;

describe('@codotype/ui', () => {

  describe('tests should load', () => {
    it('should not through an error', () => {
      const input = 'foo'
      assert.equal(input, 'foo')
    });
  });

});
