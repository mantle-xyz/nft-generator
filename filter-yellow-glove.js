const fs = require("fs");
const path = require("path");
const util = require("util");

const readDir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);

const attribute1 = {
  trait: "HAND",
  value: "YELLOW GLOVE",
};

const attribute2 = {
  trait: "OUTFIT",
  value: "SPACESUIT",
};

async function findIncompatibleFiles(directory) {
  const filteredNftIds = [];

  const files = await readDir(directory);
  const jsonFiles = files.filter((file) => path.extname(file) === ".json");

  for (const file of jsonFiles) {
    const data = fs.readFileSync(path.join(directory, file), "utf8");
    const nft = JSON.parse(data);

    const hasAttribute1 = nft.attributes.some(
      (attr) =>
        attr.trait_type === attribute1.trait && attr.value === attribute1.value
    );

    const hasAttribute2 = nft.attributes.some(
      (attr) =>
        attr.trait_type === attribute2.trait && attr.value === attribute2.value
    );

    // if it is yellow glove but not spacesuit, push the nft to incompatible
    if (hasAttribute1 && !hasAttribute2) {
      filteredNftIds.push(nft.uid);
    }
  }

  return filteredNftIds;
}

async function moveIncompatibleFilesToFolder(
  metadataPath,
  imagesPath,
  incompatibleFolderPath,
  uids
) {
  for (const uid of uids) {
    if (!fs.existsSync(incompatibleFolderPath)) {
      fs.mkdirSync(incompatibleFolderPath);
    }

    const oldMetadataPath = path.join(metadataPath, uid + ".json");
    const newMetadataPath = path.join(incompatibleFolderPath, uid + ".json");
    fs.rename(oldMetadataPath, newMetadataPath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    const oldImgPath = path.join(imagesPath, uid + ".png");
    const newImgPath = path.join(incompatibleFolderPath, uid + ".png");
    fs.rename(oldImgPath, newImgPath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
}

const metadataPath = "./output/metadata";
const imagesPath = "./output/images";
const incompatibleFolderPath = "./incompatible";

findIncompatibleFiles(metadataPath)
  .then((files) => {
    writeFile("./incompatible.json", JSON.stringify(files));
    moveIncompatibleFilesToFolder(
      metadataPath,
      imagesPath,
      incompatibleFolderPath,
      files
    );
  })
  .catch((err) => console.error(err));
