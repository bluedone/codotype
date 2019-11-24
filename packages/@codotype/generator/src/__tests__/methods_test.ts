import { MockRuntime } from './mock_runtime';
import { CodotypeGenerator } from '../generator'

// // // //

// compileTemplatesInPlace
// renderComponent
// copyTemplate
// composeWith

// // // //

describe('@codotype/generator', () => {

  describe('templatePath method', () => {
    it('should define correct template path', () => {

      const dest = 'destination'
      const template = 'template.json'
      const resolved = 'my/resolved/path'
      const runtime = new MockRuntime()

      const generatorPrototype = { write () {} }
      const generatorOptions = { runtime, dest, resolved }
      // @ts-ignore
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      const templatePath = generatorInstance.templatePath(template)
      expect(templatePath).toBe(`${resolved}/templates/${template}`)

    });
  });

  describe('destinationPath method', () => {
    it('should define correct destination path', () => {

      const dest = 'destination'
      const dirName = 'testyMcTestface'
      const runtime = new MockRuntime()

      const generatorPrototype = { write () {} }
      const generatorOptions = { runtime, dest, resolved: __dirname }
      // @ts-ignore
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      const destinationPath = generatorInstance.destinationPath(dirName)
      expect(destinationPath).toBe(`${dest}/${dirName}`)

    });
  });

  describe('ensureDir method', () => {
    it('should properly define mockRuntime._mocks_.ensuredDir', () => {

      const dest = 'destination'
      const dirName = 'testyMcTestface'
      const runtime = new MockRuntime()

      const generatorPrototype = { write () {} }
      const generatorOptions = { runtime, dest, resolved: __dirname }
      // @ts-ignore
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      generatorInstance.ensureDir(dirName)
      .then(() => {
        expect(runtime._mocks_.ensuredDir).toBe(`${dest}/${dirName}`)
      })

    });
  });

  describe('copyDir method', () => {
    it('should properly define copiedDirSrc and copiedDirDest on mockRuntime._mocks_', () => {

      const src = 'mySrc'
      const dest = 'myDest'
      const runtime = new MockRuntime()

      const generatorPrototype = { write () {} }
      const generatorOptions = { runtime, dest, resolved: __dirname }
      // @ts-ignore
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      generatorInstance.copyDir(src, dest)
      .then(() => {
        expect(runtime._mocks_.copiedDirSrc).toBe(src)
        expect(runtime._mocks_.copiedDirDest).toBe(dest)
      })

    });
  });

});
