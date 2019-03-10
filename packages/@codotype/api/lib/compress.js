const fs = require('fs');
const archiver = require('archiver');

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
      // console.log('ZIP COMPLETE')
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
    // TODO - clean this up so process.cwd can be passed in as
    // configuration, and codotype-build is treated as a constant
    archive.directory(process.cwd + `/codotype-build/${id}/`, false);

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    return archive.finalize();
  })
}

module.exports = {
  zipFilename,
  compressBuild
}