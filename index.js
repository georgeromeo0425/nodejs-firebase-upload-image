const mime = require("mime");

const keyFilename = "./config/face-recognition-7f0db-aa3af157943e.json";
const { project_id } = require(keyFilename);
const bucketName = `${project_id}.appspot.com`;

const gcs = require("@google-cloud/storage")({
  project_id,
  keyFilename,
});

const bucket = gcs.bucket(bucketName);

///////////////////// This is for uploading //////////////////////////////
//////////////////////////////////////////////////////////////////////////

// const filePath = `./resources/google.jpg`;
// const uploadTo = `images/google.jpg`;
// const fileMime = mime.getType(filePath);

// bucket.upload(
//   filePath,
//   {
//     destination: uploadTo,
//     public: true,
//     metadata: { contentType: fileMime, cacheControl: "public, max-age=300" },
//   },
//   function (err, file) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(createPublicFileURL(uploadTo));
//   }
// );

// function createPublicFileURL(storageName) {
//   return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(
//     storageName
//   )}`;
// }

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

///////////////////// This is for downloading //////////////////////////////
//////////////////////////////////////////////////////////////////////////

const folderPath = `images`;

const getFilesInFolder = async () => {
  const options = {
    prefix: folderPath,
  };

  try {
    const [files] = await bucket.getFiles(options);

    for (const file of files) {
      const filePath = `${file.name}`;
      await file.download({ destination: filePath });
      console.log(`Downloaded file: ${file.name}`);
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

getFilesInFolder();

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
//// you can check if a files exists or delete a file using the following
// const gcFile = bucket.file(uploadTo);
// gcFile.exists((err,exists)=>console.log(err||exists));
// gcFile.delete((err,res)=>console.log(err||res));
