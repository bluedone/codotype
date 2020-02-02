const { uploadFileToS3, uploadBuildToS3, getSignedDownloadUrl } = require('./s3')
const { zipFilename, compressBuild } = require('./compress')
const ObjectId = require('bson-objectid')

// // // //

// TODO - clean up this mess, soon
export function handleRequest({ runtime, generateBuildId, zipBuild, uploadZipToS3 }) {

  // TODO - this should be exported as a separate function (broadens deployment context)
  return async function handleRequest(req, res) {

    // Pulls build from req.body
    // CLEANUP - verify build
    const { build } = req.body

    // Generates unique build ID
    // CLEANUP - this should be a helper function
    if (generateBuildId) {
      const build_id = 'app_' + ObjectId()
      build.id = build_id
    } else {
      build.id = build.blueprint.identifier
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

    // Compress and send to client as a local download URL
    } else if (zipBuild) {
      // Compresses the build
      await compressBuild({ build })
      const filename = zipFilename(build.id)

      // Send the client to download zipped build
      const download_url = `/api/download?filename=${build.id}.zip`

      // Sends the local download URL to the client
      return res.json({
        downloadUrl: download_url,
        type: 'S3_DOWNLOAD'
      });

      // CLEANUP - purge old builds && zips
      return;

    // Send the location of the directory in the local environment
    } else {

      // Sends the local directory path to the client
      // CLEANUP - pull the destination directory from the runtime?
      return res.json({
        filepath: process.cwd() + '/codotype-build/' + build.blueprint.identifier,
        type: 'LOCAL_PATH'
      })

    }
  }

}