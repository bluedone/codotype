const assert = require('chai').assert;
const indent = require('./indent');

// // // //

describe('/lib/indent.js', () => {

  describe('input text has no newline characters', () => {
    it('not change the input text at all', () => {
      const input = 'this should not change at all'
      assert.equal(indent(input, 2), input)
    });
  });

  describe('input text has a single newline character', () => {
    it('indent the text 2 spaces after the newline character', () => {
      const input = 'this should not change at all\nbut this part should'
      const expected = 'this should not change at all\n  but this part should'
      assert.equal(indent(input, 2), expected)
    });
  });

  describe('input text has multiple newline characters', () => {
    it('indent the text 4 spaces after each newline character', () => {
      const input = 'this should not change at all\nbut this part should\nand this part as well'
      const expected = 'this should not change at all\n    but this part should\n    and this part as well'
      assert.equal(indent(input, 4), expected)
    });
  });

});
