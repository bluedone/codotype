import { MockRuntime } from "../MockRuntime";
import { CodotypeGenerator } from "../generator";
import {
    project,
    runtimeConstructorOptions,
    baseGeneratorOptions,
    generatorPrototype,
    generatorPrototype01,
    generatorPrototype02,
} from "./test_state";

// // // //

describe("templatePath method", () => {
    it("should define correct template path", () => {
        const dest = "destination";
        const template = "template.json";
        const resolved = "my/resolved/path";
        const runtime = new MockRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved,
        };
        const generatorInstance = new CodotypeGenerator(
            generatorPrototype,
            generatorOptions,
        );

        const templatePath = generatorInstance.templatePath(template);
        expect(templatePath).toBe(`${resolved}/templates/${template}`);
    });
});

describe("destinationPath method", () => {
    it("should define correct destination path", () => {
        const dest = "destination";
        const dirName = "testyMcTestface";
        const runtime = new MockRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: __dirname,
        };

        // NOTE - this will ALWAYS be handled by the runtime
        // Perhaps this `CodotypeGenerator` should be called `RuntimeAdaptor`?
        // WHAT DOES IT DO? -> this takes the generator properties defined by the a plugin author
        // and links them to an active Codotype Runtime instance
        // WHY - this prevents plugin/generator authors from having to worry about the runtime altogether - the runtime adaptor "joins" a generator to
        // its runtime so it can produce files. Without the runtime, the generator is little more than an object.
        const generatorInstance = new CodotypeGenerator(
            generatorPrototype,
            generatorOptions,
        );

        const destinationPath = generatorInstance.destinationPath(dirName);
        expect(destinationPath).toBe(`${dest}/${dirName}`);
    });
});

describe("ensureDir method", () => {
    it("should properly define mockRuntime._mocks_.ensuredDir", () => {
        const dest = "destination";
        const dirName = "testyMcTestface";
        const runtime = new MockRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: __dirname,
        };
        const generatorInstance = new CodotypeGenerator(
            generatorPrototype,
            generatorOptions,
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
        const runtime = new MockRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: "dir",
        };

        const generatorInstance = new CodotypeGenerator(
            generatorPrototype,
            generatorOptions,
        );

        generatorInstance.copyDir({ src, dest }).then(() => {
            expect(runtime._mocks_.copiedDirSrc).toBe("dir/templates/mySrc");
            expect(runtime._mocks_.copiedDirDest).toBe("myDest/myDest"); // TODO - why is it like that?
        });
    });
});

describe("renderComponent", () => {
    test("renders", async () => {
        const dest = "destination";
        const runtime = new MockRuntime(runtimeConstructorOptions);

        // // // //
        // NOTE - all of this is handled by the runtime -> should this be handled inside the RuntimeGeneratorAdaptor?
        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: __dirname, // NOTE - need to use __dirname here beacuse the `templates` directory sits next to this test
        };

        const generatorInstance = new CodotypeGenerator(
            generatorPrototype01,
            generatorOptions,
        );

        // Tests write function
        await generatorInstance.write({ project, runtime: generatorInstance });

        // @ts-ignore
        await generatorInstance.forEachSchema({
            project,
            schema: project.schemas[1],
            runtime: generatorInstance,
        });

        // @ts-ignore
        await generatorInstance.forEachSchema({
            project,
            schema: project.schemas[0],
            runtime: generatorInstance,
        });
        //
        // // // //

        // console.log(runtime._mocks_);
        expect(runtime._mocks_.files).toMatchSnapshot();
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
