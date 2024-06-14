const PizZip = require("pizzip");
var piexif = require("piexifjs");
const { DOMParser, XMLSerializer } = require("@xmldom/xmldom");
const fs = require("fs");
const path = require("path");

/**
 * Given the pathname of a JPG file, this function returns the data contained in that file converted into a Base64 string.
 * @param {*} filename path of the jpg
 * @returns {string} the data as a Base64 string
 */
function getBase64DataFromJpgFile(filename) {
  return fs.readFileSync(filename).toString("binary");
}

/**
 * Recursively search for files in the provided directory
 * @param {string} dir directory within which to search
 * @param {string} fileName the filename to search for
 * @returns {Array} list of file paths that match
 */
function searchFile(dir, fileName) {
  let fileArray = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      searchFile(filePath, fileName);
    } else if (file.endsWith(fileName)) {
      fileArray.push(filePath);
    }
  }
  return fileArray;
}

function removeAuthorFromWordDoc(fileName) {
  // Load the docx file as binary content
  const content = fs.readFileSync(path.resolve(fileName), "binary");

  // Unzip the content of the file
  const zip = new PizZip(content);

  // Get the docprops core.xml file where the exif data is
  const core = zip.file("docProps/core.xml").asText();
  const coreDOM = new DOMParser().parseFromString(core);

  if (
    coreDOM.documentElement.getElementsByTagName("dc:creator")[0].textContent ==
      "" &&
    coreDOM.documentElement.getElementsByTagName("cp:lastModifiedBy")[0]
      .textContent == ""
  ) {
    console.log(fileName + " is already without author");
    return;
  }

  // Set the author-related exif fields to empty
  coreDOM.documentElement.getElementsByTagName("dc:creator")[0].textContent =
    "";
  coreDOM.documentElement.getElementsByTagName(
    "cp:lastModifiedBy"
  )[0].textContent = "";

  const newCore = new XMLSerializer().serializeToString(coreDOM);

  // Insert modified core.xml back into the docx
  zip.file("docProps/core.xml", newCore);

  // Wrap the docx back into its original file
  const updatedDoc = zip.generate({
    type: "nodebuffer",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    compression: "DEFLATE",
  });

  fs.writeFile(fileName, updatedDoc, function (err) {
    if (err) {
      console.log(err);
    }
  });
  console.log("Removed author from " + fileName);
}

function removeExifFromJPG(fileName) {
  // Get the data from the file
  const imageData = getBase64DataFromJpgFile(fileName);
  // Remove exif data with piexif
  const scrubbedImageData = piexif.remove(imageData);
  fileBuffer = Buffer.from(scrubbedImageData, "binary");
  // Replace the image
  fs.writeFileSync(fileName, fileBuffer);
  console.log("Removed EXIF data from " + fileName);
}

let wordDocs = [];
wordDocs.push(...searchFile(`${__dirname}/../src`, ".docx"));
wordDocs.push(...searchFile(`${__dirname}/../static`, ".docx"));

let jpgs = [];
jpgs.push(...searchFile(`${__dirname}/../src`, ".jpg"));
jpgs.push(...searchFile(`${__dirname}/../static`, ".jpg"));

console.log("Checking all word docs for author");
wordDocs.forEach((file) => {
  removeAuthorFromWordDoc(file);
});

console.log("Removing EXIF from JPGs");
jpgs.forEach((file) => {
  removeExifFromJPG(file);
});

return 0;
