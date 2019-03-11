const { uploadFileToS3, uploadBuildToS3, getSignedDownloadUrl } = require('./s3')
const { zipFilename, compressBuild } = require('./compress')

// // // //

// TODO - clean up this mess, soon
module.exports = ({ runtime, zipBuild, generateBuildId }) => {

  // TODO - this should be exported as a separate function (broadens deployment context)
  return async function handleRequest(req, res) {

    // Pulls build from req.body
    // CLEANUP - verify build.app && build.stages
    const { build } = req.body

    // Generates unique build ID
    // CLEANUP - this should be a helper function
    if (generateBuildId) {
      const build_id = 'app_' + ObjectId()
      build.id = build_id
    }

    // Generates the application
    // CLEANUP - wrap this in an error hander?
    await runtime.execute({ build })

    // Pulls filename for zipped build
    if (zipBuild && uploadZipToS3) {

      // Compresses the build
      await compressBuild({ build })
      const filename = zipFilename(build.id)

      // Defines key for storage in S3
      const key = filename.split('/').pop();

      // Uploads the renamed filing download to S3
      await uploadFileToS3(filename, key);

      // Send the signed URL to the client to download zipped build
      const download_url = await getSignedDownloadUrl(key);

      // Sends the S3 download URL to the client
      res.json({
        downloadUrl: download_url,
        type: 'S3_DOWNLOAD'
      });

      // Writes the build manifest and sends the result to S3
      await uploadBuildToS3(build);

      // CLEANUP - purge old builds && zips
      return;

    // Send the location of the directory in the local environment
    } else {

      // Pull the filepath from the runtime

      // Sends the local directory path to the client
      return res.json({
        filepath: process.cwd(),
        type: 'LOCAL_PATH'
      })

    }
  }

}