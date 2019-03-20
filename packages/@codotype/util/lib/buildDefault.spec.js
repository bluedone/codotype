const assert = require('chai').assert;
const blueprint = require('@codotype/blueprints/lib/todo-list.json');
const { buildDefault } = require('../lib/buildDefault');

// // // //

describe('/lib/buildDefault.js', () => {

  // Defines variables scoped for usage inside test blocks
  let userSchema = {};
  let taskSchema = {};
  let defaultUser = {};
  let defaultTask = {};

  // Creates defaultUser and defaultTask objects before running tests
  before(() => {

    // Isolates test schemas
    userSchema = blueprint.schemas[0]
    taskSchema = blueprint.schemas[1]

    // Builds default user and task objects
    defaultUser = buildDefault({ schema: userSchema, schemas: blueprint.schemas })
    defaultTask = buildDefault({ schema: taskSchema, schemas: blueprint.schemas })

  });

  describe('user schema', () => {
    it('has "email" attribute', () => {
      assert.equal(defaultUser.email, '')
    });
  });

  describe('task schema', () => {
    it('has "title" and "completed" attributes and "assignee_id" field', () => {
      assert.equal(defaultTask.title, '')
      assert.equal(defaultTask.completed, false)
      assert.equal(defaultTask.assignee_id, '')
    });
  });

});
