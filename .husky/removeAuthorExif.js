const PizZip = require("pizzip");
const { DOMParser, XMLSerializer } = require("@xmldom/xmldom");
const fs = require("fs");
const path = require("path");

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

  //get the docprops core.xml file where the exif data is
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

  //Set the author-related exif fields to empty
  coreDOM.documentElement.getElementsByTagName("dc:creator")[0].textContent =
    "";
  coreDOM.documentElement.getElementsByTagName(
    "cp:lastModifiedBy"
  )[0].textContent = "";

  const newCore = new XMLSerializer().serializeToString(coreDOM);

  //Insert modified core.xml back into the docx
  zip.file("docProps/core.xml", newCore);

  //wrap the docx back into its original file
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

let wordDocs = [];
wordDocs.push(...searchFile(`${__dirname}/../src`, ".docx"));
wordDocs.push(...searchFile(`${__dirname}/../static`, ".docx"));

console.log("Checking all word docs for author");
wordDocs.forEach((file) => {
  removeAuthorFromWordDoc(file);
});

return 0;
