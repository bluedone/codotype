const chai = require("chai");
const assert = chai.assert;
const MockRuntime = require('./mockRuntime');
const CodotypeGenerator = require('../lib/generator.js')

// // // //

// return this.runtime.ensureDir(this.destinationPath(dir))
// return this.runtime.copyDir(src, dest)
// const compiledTemplate = await this.runtime.renderTemplate(this, src, options)
// const exists = this.runtime.existsSync(dest)
// this.runtime.compareFile(dest, compiledTemplate)
// this.runtime.writeFile(dest, compiledTemplate)
// this.runtime.templatePath(this.resolved, template_path)
// this.runtime.destinationPath(this.options.dest, destination_path)
// this.runtime.composeWith(this, generatorModule, options)

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
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      const templatePath = generatorInstance.templatePath(template)
      assert.equal(templatePath, `${resolved}/templates/${template}`)

    });
  });

  describe('destinationPath method', () => {
    it('should define correct destination path', () => {

      const dest = 'destination'
      const dirName = 'testyMcTestface'
      const runtime = new MockRuntime()

      const generatorPrototype = { write () {} }
      const generatorOptions = { runtime, dest, resolved: __dirname }
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      const destinationPath = generatorInstance.destinationPath(dirName)
      assert.equal(destinationPath, `${dest}/${dirName}`)

    });
  });

  describe('ensureDir method', () => {
    it('should properly define mockRuntime._mocks_.ensuredDir', () => {

      const dest = 'destination'
      const dirName = 'testyMcTestface'
      const runtime = new MockRuntime()

      const generatorPrototype = { write () {} }
      const generatorOptions = { runtime, dest, resolved: __dirname }
      const generatorInstance = new CodotypeGenerator(generatorPrototype, generatorOptions)

      generatorInstance.ensureDir(dirName)
      .then(() => {
        assert.equal(runtime._mocks_.ensuredDir, `${dest}/${dirName}`)
      })

    });
  });

});
