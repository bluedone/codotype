// Chai configuration
const chai = require("chai");
chai.should();

// Import all library tests here
require('../lib/buildDefault.spec');

// // // //

// const fs = require('fs')
// const blueprint = require('@codotype/blueprints/lib/team-lists.json')
// const { inflateSchema, inflateRelation, inflate } = require('../lib/inflate')
// // console.log(blueprint);
// const inflatedBlueprint = inflate({ blueprint })