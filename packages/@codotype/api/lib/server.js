const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const omit = require('lodash/omit');
const handleRequest = require('./handleRequest');

// // // //

// Exports a basic Express.js app
module.exports = ({ port, runtime, zipBuild, generateBuildId, uploadZipToS3 }) => {

  // Generates requestHandler
  const requestHandler = handleRequest({ runtime, zipBuild, generateBuildId, uploadZipToS3 });

  // Express.js App & Configuration
  const app = express();

  // Print the request log on console
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

  // Parse JSON and url-encoded query
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // List available generators
  app.get('/api/generators', (req, res) => {
    return res.send(runtime.getGenerators().map(g => omit(g, 'generator_path')));
  })

  // Run generator
  app.post('/api/generate', requestHandler);

  // Returns the app instance
  return app;
}