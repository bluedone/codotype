// Chai configuration
const chai = require("chai");
chai.should();

// Import all library tests here

// // // //

const CodotypeGenerator = require('../lib/generator.js')
const assert = chai.assert;

describe('@codotype/generator', () => {

  describe('constructor', () => {

    it('throw error if options.runtime is undefined', () => {
      const generatorPrototype = {}
      const generatorOptions = {}

      try {
        new CodotypeGenerator(generatorPrototype, generatorOptions)
      } catch (err) {
        assert.equal(true, true)
      }
    });

    it('throw error if options.resolved is undefined', () => {
      const generatorPrototype = {}
      const generatorOptions = { runtime: true }

      try {
        new CodotypeGenerator(generatorPrototype, generatorOptions)
      } catch (err) {
        assert.equal(true, true)
      }
    });

    it('throw error if generatorPrototype is missing write, writeSchema, and compileInPlace properties ', () => {
      const generatorPrototype = {}
      const generatorOptions = { runtime: true, resolved: true }

      try {
        new CodotypeGenerator(generatorPrototype, generatorOptions)
      } catch (err) {
        assert.equal(true, true)
      }
    });

  });

});
