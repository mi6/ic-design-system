const fs = require("fs");
const path = require("path");
const glob = require("glob");

const files = glob.sync("src/content/structured/components/*/guidance.mdx");

files.sort((a, b) => {
  const nameA = path.basename(path.dirname(a)).toLowerCase();
  const nameB = path.basename(path.dirname(b)).toLowerCase();
  return nameA.localeCompare(nameB);
});

files.forEach((file, idx) => {
  let content = fs.readFileSync(file, "utf8");
  const expectedPriority = idx + 3;
  const navPriorityMatch = content.match(/navPriority: (\d+)/);
  if (navPriorityMatch && Number(navPriorityMatch[1]) !== expectedPriority) {
    content = content.replace(/navPriority: \d+/, `navPriority: ${expectedPriority}`);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file} to navPriority ${expectedPriority}`);
  }
});

console.log("navPriority update complete.");
