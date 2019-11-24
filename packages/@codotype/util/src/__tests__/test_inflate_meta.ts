import { inflateMeta } from '../inflateMeta';

// // // //

describe('/lib/inflateMeta.js', () => {

  describe('one word label', () => {
    test('properly pluralized labels, identifiers, and class_names, and camel_cases', () => {

      const {
        label,
        label_plural,
        identifier,
        identifier_plural,
        class_name,
        class_name_plural,
        camel_case,
        camel_case_plural
      } = inflateMeta('User')

      expect(label).toBe('User')
      expect(label_plural).toBe('Users')
      expect(identifier).toBe('user')
      expect(identifier_plural).toBe('users')
      expect(class_name).toBe('User')
      expect(class_name_plural).toBe('Users')
      expect(camel_case).toBe('user')
      expect(camel_case_plural).toBe('users')

    });
  });

  describe('two word label', () => {
    test('properly pluralized labels, identifiers, and class_names', () => {

      const {
        label,
        label_plural,
        identifier,
        identifier_plural,
        class_name,
        class_name_plural,
        camel_case,
        camel_case_plural
      } = inflateMeta('User Registration')

      expect(label).toBe('User Registration');
      expect(label_plural).toBe('User Registrations');
      expect(identifier).toBe('user_registration');
      expect(identifier_plural).toBe('user_registrations');
      expect(class_name).toBe('UserRegistration');
      expect(class_name_plural).toBe('UserRegistrations');
      expect(camel_case).toBe('userRegistration');
      expect(camel_case_plural).toBe('userRegistrations');

    });
  });

});
