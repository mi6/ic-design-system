/* eslint-disable no-console */
const Metalsmith = require("metalsmith");
const filter = require("metalsmith-filter");
const { writeJsonSync } = require("fs-extra");

try {
  Metalsmith("./")
    .source("./src/content/structured/components")
    .use(filter("**/guidance.mdx"))
    .use((files, _, done) => {
      const data = Object.keys(files).map((key) => {
        const { path, title, subTitle } = files[key];
        return { path, title, subTitle };
      });
      writeJsonSync("src/icds-pages-data.json", { data }, { spaces: 2 });
      done();
    })
    .process();
} catch (err) {
  console.log(`Error: ${err}`);
} finally {
  console.log("Extracted frontmatter from guidance pages!");
}
