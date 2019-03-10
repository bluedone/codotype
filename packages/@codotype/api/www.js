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
// TODO - add a postman collection & environment to this repo
// TODO - can we run this app as a serverless function?
// TODO - create GitHub issues for these TODOs
app.listen(port, () => {
  console.log(`Codotype Express.js app is running on port ${port}`)
})