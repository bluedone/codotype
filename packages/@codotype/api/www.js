require('dotenv').config();

const port = process.env.PORT || 3000
const runtime = require('./runtime')
const server = require('./lib/server')

// Configures API to run as a standalone Express app
const app = server({
  port,
  runtime,
  zipBuild: true,
  generateBuildId: true
})

// Starts Express app
// CLEANUP - add a postman collection & environment to this repo
// CLEANUP - can we run this app as a serverless function?
// CLEANUP - create GitHub issues for these TODOs
// CLEANUP - split this out into a separate library
app.listen(port, () => {
  console.log(`Codotype Express.js app is running on port ${port}`)
})