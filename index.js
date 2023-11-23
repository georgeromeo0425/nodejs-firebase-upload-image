const keyFilename = "./config/face-recognition-7f0db-aa3af157943e.json";
const { projectId } = require(keyFilename);
const bucketName = `${projectId}.appspot.com`;

const gcs = require("@google-cloud/storage")({
  projectId,
  keyFilename,
});

const bucket = gcs.bucket(bucketName);

const filePath = `./resources/google.jpg`;
const uploadTo = `images/google.jpg`;
const fileMime = mime.getType(filePath);

bucket.upload(
  filePath,
  {
    destination: uploadTo,
    public: true,
    metadata: { contentType: fileMime, cacheControl: "public, max-age=300" },
  },
  function (err, file) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(createPublicFileURL(uploadTo));
  }
);

function createPublicFileURL(storageName) {
  return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(
    storageName
  )}`;
}

// const srcFilename = `img/gg.jpg`;
// const destFilename = `google.jpg`;

// const options = {
//   destination: destFilename,
// };

// bucket
//   .file(srcFilename)
//   .download(options)
//   .then(() => {
//     console.log(
//       `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
//     );
//   })
//   .catch((err) => {
//     console.error("ERROR:", err);
//   });

// /*
// //// you can check if a files exists or delete a file using the following
// const gcFile = bucket.file(uploadTo);
// gcFile.exists((err,exists)=>console.log(err||exists));
// gcFile.delete((err,res)=>console.log(err||res));

// */
