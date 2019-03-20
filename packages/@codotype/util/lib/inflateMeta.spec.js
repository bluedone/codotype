const assert = require('chai').assert;
const inflateMeta = require('./inflateMeta');

// // // //

describe('/lib/inflateMeta.js', () => {

  describe('one word label', () => {
    it('properly pluralized labels, identifiers, and class_names', () => {

      const {
        label,
        label_plural,
        identifier,
        identifier_plural,
        class_name,
        class_name_plural
      } = inflateMeta('User')

      assert.equal(label, 'User')
      assert.equal(label_plural, 'Users')
      assert.equal(identifier, 'user')
      assert.equal(identifier_plural, 'users')
      assert.equal(class_name, 'User')
      assert.equal(class_name_plural, 'Users')

    });
  });

  describe('two word label', () => {
    it('properly pluralized labels, identifiers, and class_names', () => {

      const {
        label,
        label_plural,
        identifier,
        identifier_plural,
        class_name,
        class_name_plural
      } = inflateMeta('User Registration')

      assert.equal(label, 'User Registration')
      assert.equal(label_plural, 'User Registrations')
      assert.equal(identifier, 'user_registration')
      assert.equal(identifier_plural, 'user_registrations')
      assert.equal(class_name, 'UserRegistration')
      assert.equal(class_name_plural, 'UserRegistrations')

    });
  });

});
