// All required generator fields
const requiredFields = [
  "id",
  "label",
  "icon",
  "description",
  "tech_tags",
  "type_tags",
  "self_configuring",
  "project_path",
  "github_url",
  "version",
  "official",
  "experience",
  "defaultSchemas",
  "defaultConfiguration",
  "supportedDatatypes",
  "supportedRelations",
  "configuration_groups",
]

// validateGenerator
// Returns an array of { valid: boolean, property: string } objects
// representing if each required property is present in the generator's definition
function validateGenerator({ generator }) {
  const validations = requiredFields.map((property) => {
    if (generator[property] !== undefined) {
      return { property, valid: true }
    }
    return { property, valid: false }
  })


  // Returns validations
  return validations;
}

// // // //

module.exports = validateGenerator
