const {
  createReadStream,
  promises: { readdir, stat: getStats },
} = require("fs");
const { resolve, join } = require("path");
const { Upload } = require("@aws-sdk/lib-storage"),
  { S3 } = require("@aws-sdk/client-s3");
const { getMIMEType } = require("node-mime-types");
require("dotenv").config();

const s3 = new S3({
  signatureVersion: "v4",
  region: process.env.S3_REGION,
});

// upload file
const uploadFile = async function uploadFile({ path, params, options } = {}) {
  const parameters = { ...params };
  const opts = { ...options };

  try {
    const rstream = createReadStream(resolve(path));

    rstream.once("error", (err) => {
      console.error(`unable to upload file ${path}, ${err.message}`);
    });

    parameters.Body = rstream;
    parameters.ContentType = getMIMEType(path);
    await new Upload({
      client: s3,
      params: parameters,
      ...opts,
    }).done();

    console.info(
      `${parameters.Key} (${parameters.ContentType}) uploaded in bucket ${parameters.Bucket}`
    );
  } catch (e) {
    throw new Error(
      `unable to upload file ${path} at ${parameters.Key}, ${e.message}`
    );
  }

  return true;
};

// upload directory and its sub-directories if any
const uploadDirectory = async function uploadDirectory({
  path,
  params,
  options,
  rootKey,
} = {}) {
  const parameters = { ...params };
  const opts = { ...options };
  const root = rootKey && rootKey.constructor === String ? rootKey : "";
  let dirPath;

  try {
    dirPath = resolve(path);
    const dirStats = await getStats(dirPath);

    if (!dirStats.isDirectory()) {
      throw new Error(`${dirPath} is not a directory`);
    }

    console.info(`uploading directory ${dirPath}...`);

    const filenames = await readdir(dirPath);

    if (Array.isArray(filenames)) {
      await Promise.all(
        filenames.map(async (filename) => {
          const filepath = `${dirPath}/${filename}`;
          const fileStats = await getStats(filepath);

          if (fileStats.isFile()) {
            parameters.Key = join(root, filename);
            await uploadFile({
              path: filepath,
              params: parameters,
              options: opts,
            });
          } else if (fileStats.isDirectory()) {
            await uploadDirectory({
              params,
              options,
              path: filepath,
              rootKey: join(root, filename),
            });
          }
        })
      );
    }
  } catch (e) {
    throw new Error(`unable to upload directory ${path}, ${e.message}`);
  }

  console.info(`directory ${dirPath} successfully uploaded`);
  return true;
};

// example
(async () => {
  try {
    console.time("s3 upload");

    await uploadDirectory({
      path: "./output",
      params: {
        Bucket: process.env.S3_BUCKET,
      },
      options: {},
      rootKey: "citizensofmantle",
    });

    console.timeEnd("s3 upload");
  } catch (e) {
    console.error(e);
  }
})();
