const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Specify the folder path
const inputMetadataPath = "./output/metadata";
const outputPath = "./final";
const inputImagesPath = "./output/images";

// Read all files in the folder
fs.readdir(inputMetadataPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
    fs.mkdirSync(path.join(outputPath, "metadata"));
    fs.mkdirSync(path.join(outputPath, "images"));
  }

  // Shuffle the files randomly
  shuffleArray(files);

  // Take the first few files
  const selectedFiles = files.slice(0, process.env.TOTAL_IMG_PER_BATCH);

  // Move the selected files to outputPath
  selectedFiles.forEach((file) => {
    const oldMetadataPath = path.join(inputMetadataPath, file);
    const newMetadataPath = path.join(outputPath, "metadata", file);
    fs.rename(oldMetadataPath, newMetadataPath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    const uid = file.split(".json")[0];
    const oldImgPath = path.join(inputImagesPath, uid + ".png");
    const newImgPath = path.join(outputPath, "images", uid + ".png");
    fs.rename(oldImgPath, newImgPath, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

// Function to shuffle an array in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
