const fs = require("fs");
const path = require("path");

// directory where your metadata and images are
const metadataDir = "./output/metadata";
const imagesDir = "./output/images";

// read all the json files from the metadata directory
fs.readdir(metadataDir, (err, files) => {
  if (err) {
    console.log(err);
    return;
  }

  files.forEach((file) => {
    // ensure we're reading a json file
    if (path.extname(file) === ".json") {
      // read the json file
      fs.readFile(path.join(metadataDir, file), (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        // parse the json file
        const json = JSON.parse(data);

        // find the outfit attribute
        const outfitAttribute = json.attributes.find(
          (attribute) => attribute.trait_type === "OUTFIT"
        );

        if (outfitAttribute) {
          // create a new directory for the outfit if it doesn't exist
          const newDir = path.join(imagesDir, outfitAttribute.value);
          fs.mkdir(newDir, { recursive: true }, (err) => {
            if (err) {
              console.log(err);
              return;
            }

            // move the image to the new directory
            const oldPath = path.join(imagesDir, `${json.uid}.png`);
            const newPath = path.join(newDir, `${json.uid}.png`);

            fs.rename(oldPath, newPath, (err) => {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      });
    }
  });
});
