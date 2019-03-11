const blueprint = require('@codotype/blueprints/lib/todo-list.json')
const { buildDefault } = require('../lib/buildDefault')


// CLEANUP - write some ACTUAL tests
blueprint.schemas.forEach((schema) => {
  const defaultObject = buildDefault({
    schema: schema,
    schemas: blueprint.schemas
  })

  console.log(defaultObject)
})
