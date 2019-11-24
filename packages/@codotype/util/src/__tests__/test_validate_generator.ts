import validateGenerator from '../validateGenerator';

// // // //

// Defines validGenerator
const validGenerator = {
  id: "",
  label: "",
  icon: "",
  description: "",
  tech_tags: "",
  type_tags: "",
  self_configuring: "",
  project_path: "",
  github_url: "",
  version: "",
  official: "",
  experience: "",
  defaultSchemas: "",
  defaultConfiguration: "",
  supportedDatatypes: "",
  supportedRelations: "",
  configuration_groups: "",
}

// Defines invalidGenerator (deletes `id` property to invalidate)
const invalidGenerator = { ...validGenerator }
delete invalidGenerator.id

describe('/lib/validateGenerator.js', () => {

  it('valid generator should return no errors', () => {
    const validations = validateGenerator({ generator: validGenerator })
    // @ts-ignore
    const hasErrors = validations.map(v => v.valid).includes(false)
    expect(hasErrors).toBe(false)
  });

  it('invalid generator should return an error', () => {
    const validations = validateGenerator({ generator: invalidGenerator })
    // @ts-ignore
    const hasErrors = validations.map(v => v.valid).includes(false)
    expect(hasErrors).toBe(true)
  });

});
