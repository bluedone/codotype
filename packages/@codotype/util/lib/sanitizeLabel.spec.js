const assert = require('chai').assert;
const sanitizeLabel = require('./sanitizeLabel');

// // // //

describe('/lib/sanitizeLabel.js', () => {

  describe('lowercase, two words', () => {
    it('properly titlecased', () => {
      assert.equal(sanitizeLabel('my amazing todo list app'), 'My Amazing Todo List App')
    });
  });

  describe('lowercase with symbols', () => {
    it('symbols should be removed', () => {
      assert.equal(sanitizeLabel('todo!@#$%^&*()-_=+[{]}\|\'\";:<>/?,.~` list'), 'Todo List')
    });
  });

  describe('lowercase with numbers', () => {
    it('numbers should be removed', () => {
      assert.equal(sanitizeLabel('todo 1234567890 list'), 'Todo List')
    });
  });

  describe('lowercase with extra whitespace', () => {
    it('extra whitespace should be removed', () => {
      assert.equal(sanitizeLabel('todo   list'), 'Todo List')
    });
  });

  describe('lowercase with whitespace between numbers/characters', () => {
    it('trailing whitespace should be removed', () => {
      assert.equal(sanitizeLabel('todo 123'), 'Todo')
    });
  });

});
