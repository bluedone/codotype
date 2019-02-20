require('dotenv').config();
const fs = require('fs');
const morgan = require('morgan');
const express = require('express');
const archiver = require('archiver');
const ObjectId = require('bson-objectid');
const bodyParser = require('body-parser');
const omit = require('lodash/omit');
// const runtime = require('./runtime')

// // // //

module.exports = (({ runtime }) => {

  // Executes build
  async function generateApplication({ build }) {
    // Executes the build
    // Invoke runtime directly with parameters
    return runtime.execute({ build })
  }

  // // // //

  function zipFilename(id) {
    return __dirname + `/zip/${id}.zip`;
  }

  // compressBuild
  // Zips the build's files
  function compressBuild ({ build }) {
    return new Promise((resolve, reject) => {
      // Logs build success
      // bplog(`Build ${buildId} application generated & sanitized`)

      // Pulls build id
      const { id } = build

      // create a file to stream archive data to.
      let output = fs.createWriteStream(zipFilename(id));
      let archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level (?)
      });

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on('close', function() {
        // bplog(archive.pointer() + ' total bytes');
        // bplog('archiver has been finalized and the output file descriptor has closed.');
        console.log('ZIP COMPLETE')
        return resolve();
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on('end', function() {
        bplog('Data has been drained');
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
          // log warning
        } else {
          // throw error
          throw err;
        }
      });

      // good practice to catch this error explicitly
      archive.on('error', function(err) {
        throw err;
        return reject(err);
      });

      // pipe archive data to the file
      archive.pipe(output);

      // append files from a sub-directory, putting its contents at the root of archive
      archive.directory(__dirname + `/build/${id}/`, false);

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
      return archive.finalize();
    })
  }

  // // // //

  // Express.js App & Configuration
  const app = express();

  // Print the request log on console
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

  // parse JSON and url-encoded query
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // // // //

  async function handleRequest(req, res) {
    // Generates unique build ID
    const build_id = 'app_' + ObjectId()

    // TODO - verify build.app && build.stages
    // TODO - write build manifest to file
    // TODO - write build manifest to database / S3 <- S3 might be the easiest option short-term
    // TODO - purge old builds && zips

    // Pulls build from req.body
    const { build } = req.body
    build.id = build_id

    // Generates the application
    // TODO - wrap this in an error hander?
    await generateApplication({ build })
    await compressBuild({ build })

    // Pulls filename for zipped build
    const filename = zipFilename(build.id)

    // Defines key for storage in S3
    const key = filename.split('/').pop();

    // Uploads the renamed filing download to S3
    // await uploadFileToS3(filename, key);

    // Send the signed URL to the client to download zipped build
    // const download_url = await getSignedDownloadUrl(key);
    // res.json({ download_url });

    // Writes the build manifest and sends the result to S3
    // uploadBuildToS3(build)

    return res.json({ success: true })
  }

  // // // //

  // POST /api/generate
  // Whats sent to the server:
  // const build = {
  //   blueprint: blueprint,
  //   stages: [{
  //     generator_id: 'NUXT_GENERATOR_ID',
  //     configuration: {}, // TODO - this will be populated by the UI
  //   }]
  // }
  app.post('/api/generate', handleRequest)

  // GET /api/generators
  app.get('/api/generators', (req, res) => {
    return res.send(runtime.getGenerators().map(g => omit(g, 'generator_path')))
  })

  // // // //

  // Port configuration (move to bottom, not needed with serverless)
  const port = process.env.PORT || 9090;

  // Starts Express app
  // TODO - can we run this app as a serverless function?
  // TODO - add a postman collection & environment to this repo
  // TODO - create GitHub issues for these TODOs
  // TODO - add a controller and some more structure to this app
  app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
  })

  // Returns the app instance
  return app
})