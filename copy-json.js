const fs = require("fs-extra");

const sourcePath = "./src/icds-pages-data.json";
const destinationPath = "public/icds-pages-data.json";

fs.copy(sourcePath, destinationPath)
  .then(() => {
    console.log("File copied successfully!");
  })
  .catch((error) => {
    console.error("Error copying file:", error);
  });
