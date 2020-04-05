import { MockRuntime } from "../mock_runtime";
import {
  CodotypeGenerator,
  ConstructorOptions,
  GeneratorOptions,
} from "../generator";

// // // //

// compileTemplatesInPlace
// renderComponent
// copyTemplate
// composeWith

// // // //

const baseGeneratorOptions: GeneratorOptions = {
  dest: "destination",
  template: "template.json",
  resolved: "my/resolved/path",
  runtime: new MockRuntime(),
};

const generatorPrototype: ConstructorOptions = {
  write: jest.fn(),
  compileInPlace: jest.fn(),
  forEachSchema: jest.fn(),
  forEachRelation: jest.fn(),
  forEachReverseRelation: jest.fn(),
};
7;

describe("@codotype/generator", () => {
  describe("templatePath method", () => {
    it("should define correct template path", () => {
      const dest = "destination";
      const template = "template.json";
      const resolved = "my/resolved/path";
      const runtime = new MockRuntime();

      const generatorOptions = {
        ...baseGeneratorOptions,
        runtime,
        dest,
        resolved,
      };
      const generatorInstance = new CodotypeGenerator(
        generatorPrototype,
        generatorOptions
      );

      const templatePath = generatorInstance.templatePath(template);
      expect(templatePath).toBe(`${resolved}/templates/${template}`);
    });
  });

  describe("destinationPath method", () => {
    it("should define correct destination path", () => {
      const dest = "destination";
      const dirName = "testyMcTestface";
      const runtime = new MockRuntime();

      const generatorOptions = {
        ...baseGeneratorOptions,
        runtime,
        dest,
        resolved: __dirname,
      };

      const generatorInstance = new CodotypeGenerator(
        generatorPrototype,
        generatorOptions
      );

      const destinationPath = generatorInstance.destinationPath(dirName);
      expect(destinationPath).toBe(`${dest}/${dirName}`);
    });
  });

  describe("ensureDir method", () => {
    it("should properly define mockRuntime._mocks_.ensuredDir", () => {
      const dest = "destination";
      const dirName = "testyMcTestface";
      const runtime = new MockRuntime();

      const generatorOptions = {
        ...baseGeneratorOptions,
        runtime,
        dest,
        resolved: __dirname,
      };
      const generatorInstance = new CodotypeGenerator(
        generatorPrototype,
        generatorOptions
      );

      generatorInstance.ensureDir(dirName).then(() => {
        expect(runtime._mocks_.ensuredDir).toBe(`${dest}/${dirName}`);
      });
    });
  });

  describe("copyDir method", () => {
    it("should properly define copiedDirSrc and copiedDirDest on mockRuntime._mocks_", () => {
      const src = "mySrc";
      const dest = "myDest";
      const runtime = new MockRuntime();

      const generatorOptions = {
        ...baseGeneratorOptions,
        runtime,
        dest,
        resolved: "dir",
      };

      const generatorInstance = new CodotypeGenerator(
        generatorPrototype,
        generatorOptions
      );

      generatorInstance.copyDir({ src, dest }).then(() => {
        expect(runtime._mocks_.copiedDirSrc).toBe("dir/templates/mySrc");
        expect(runtime._mocks_.copiedDirDest).toBe("myDest/myDest"); // TODO - why is it like that?
      });
    });
  });
});

// // // //
// OLD CONSTRUCTOR TESTS

// const CodotypeGenerator = require('../../lib/generator.js')
// const chai = require("chai");
// const assert = chai.assert;

// // // // //

// describe('@codotype/generator', () => {

//   describe('constructor', () => {

//     it('throw error if options.runtime is undefined', () => {
//       const generatorPrototype = {}
//       const generatorOptions = {}

//       try {
//         new CodotypeGenerator(generatorPrototype, generatorOptions)
//       } catch (err) {
//         assert.equal(true, true)
//       }
//     });

//     it('throw error if options.resolved is undefined', () => {
//       const generatorPrototype = {}
//       const generatorOptions = { runtime: true }

//       try {
//         new CodotypeGenerator(generatorPrototype, generatorOptions)
//       } catch (err) {
//         assert.equal(true, true)
//       }
//     });

//     it('throw error if generatorPrototype is missing write, writeSchema, and compileInPlace properties ', () => {
//       const generatorPrototype = {}
//       const generatorOptions = { runtime: true, resolved: true }

//       try {
//         new CodotypeGenerator(generatorPrototype, generatorOptions)
//       } catch (err) {
//         assert.equal(true, true)
//       }
//     });

//   });

// });
