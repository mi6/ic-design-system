const { execSync } = require("child_process");
const fs = require("fs");

const today = new Date().toISOString().slice(0, 10);

const stagedFiles = execSync("git diff --cached --name-only --diff-filter=ACM")
  .toString()
  .split("\n")
  .filter((f) => f.endsWith(".mdx"));

stagedFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf8");
  const newContent = content.replace(
    /date: "\d{4}-\d{2}-\d{2}"/,
    `date: "${today}"`
  );
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, "utf8");
    execSync(`git add "${file}"`);
    console.log(`Updated date in ${file}`);
  }
});
