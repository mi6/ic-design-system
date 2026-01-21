const fs = require("fs");
const path = require("path");
const glob = require("glob");

const folderGlob = "src/content/structured/components/*/";
const folders = glob
  .sync(folderGlob)
  .filter((f) => fs.lstatSync(f).isDirectory());

folders.sort((a, b) =>
  path.basename(a).toLowerCase().localeCompare(path.basename(b).toLowerCase())
);

folders.forEach((folder, folderIdx) => {
  const indexFile = path.join(folder, "index.mdx");
  if (fs.existsSync(indexFile)) {
    let content = fs.readFileSync(indexFile, "utf8");
    const expectedPriority = folderIdx + 3;
    const navPriorityMatch = content.match(/navPriority: (\d+)/);
    if (navPriorityMatch && Number(navPriorityMatch[1]) !== expectedPriority) {
      content = content.replace(
        /navPriority: \d+/,
        `navPriority: ${expectedPriority}`
      );
      fs.writeFileSync(indexFile, content);
      console.log(`Updated ${indexFile} to navPriority ${expectedPriority}`);
    }
  }

  const guidanceFiles = glob.sync(path.join(folder, "*/guidance.mdx"));
  guidanceFiles.sort((a, b) =>
    path
      .basename(path.dirname(a))
      .toLowerCase()
      .localeCompare(path.basename(path.dirname(b)).toLowerCase())
  );
  guidanceFiles.forEach((file, idx) => {
    let content = fs.readFileSync(file, "utf8");
    const expectedPriority = idx + 1;
    const navPriorityMatch = content.match(/navPriority: (\d+)/);
    if (navPriorityMatch && Number(navPriorityMatch[1]) !== expectedPriority) {
      content = content.replace(
        /navPriority: \d+/,
        `navPriority: ${expectedPriority}`
      );
      fs.writeFileSync(file, content);
      console.log(`Updated ${file} to navPriority ${expectedPriority}`);
    }
  });
});

console.log("navPriority update complete.");
