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
            // rewrite uid using dna value
            jsonObj.uid = jsonObj.dna;

            // write updated data back to the file
            fs.writeFile(
              filePath,
              JSON.stringify(jsonObj, null, 4),
              "utf8",
              function (err) {
                if (err) {
                  console.log(`Error writing file: ${err}`);
                }
              }
            );
          }
        }
      });
    }
  });
});
