const fs = require("fs");
const path = require("path");

// Specify the directory where the JSON files are located
const directoryPath = path.join(__dirname, "/output/metadata"); // replace 'jsonDirectory' with your directory name

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function (file) {
    if (path.extname(file) === ".json") {
      let filePath = path.join(directoryPath, file);
      fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
          console.log(`Error reading file from disk: ${err}`);
        } else {
          // parse JSON string to JSON object
          const jsonObj = JSON.parse(data);

          if (jsonObj.dna) {
            // rename file using dna
            const splitPath = filePath.split("/");
            const lastSplitPiece = splitPath[splitPath.length - 1];
            const newFilePath = filePath.replace(
              lastSplitPiece,
              jsonObj.dna + ".json"
            );
            fs.renameSync(filePath, newFilePath);
          }
        }
      });
    }
  });
});
