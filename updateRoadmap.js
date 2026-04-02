const fs = require("fs");
const path = require("path");
const https = require("https");

const packages = [
  {
    name: "Web Components",
    localPackage: "@ukic/web-components",
    changelogUrl:
      "https://raw.githubusercontent.com/mi6/ic-ui-kit/main/packages/web-components/CHANGELOG.md",
  },
  {
    name: "Canary Web Components",
    localPackage: "@ukic/canary-web-components",
    changelogUrl:
      "https://raw.githubusercontent.com/mi6/ic-ui-kit/main/packages/canary-web-components/CHANGELOG.md",
  },
];

/**
 * Node 16–safe text fetcher
 */
function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(
            new Error(`Failed to fetch ${url} (status ${res.statusCode})`)
          );
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

/**
 * Removes all the stuff we wouldn't want from the changelog markdown.
 * **web-components/canary-web-components:**, the commit ID, and the link for the issue it closes.
 * Also adds backticks to any html tags e.g. `<ic-button>`.
 */
function formatChangelogMarkdown(entry) {
  let text = entry
    .replace(/^[-*]\s*/, "")
    .replace(/^(\*\*)?\s*(web-components|canary-web-components):\s*/i, "")
    .replace(/\*\*/g, "")
    .replace(/, closes \[[^\]]+\]\([^)]*\)/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+\.$/, ".")
    .replace(/\s+$/, "")
    .replace(/\.$/, "")
    .replace(/\)+$/, "")
    .trim();

  text = text.replace(/(<[^>]+>)/g, (match) => {
    const before = text.slice(0, text.indexOf(match));
    const after = text.slice(text.indexOf(match) + match.length);
    if (before.endsWith("`") && after.startsWith("`")) return match;
    return "`" + match + "`";
  });

  text = text.length > 0 ? text[0].toUpperCase() + text.slice(1) : text;
  if (!text.endsWith(".")) text += ".";
  return text;
}

/**
 * Gets the declared version of a package from the root package.json.
 */
function getDeclaredVersion(pkgName) {
  const pkgPath = path.join(process.cwd(), "package.json");
  const rootPkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

  return (
    rootPkg.dependencies?.[pkgName] ||
    rootPkg.devDependencies?.[pkgName] ||
    null
  );
}

/**
 * Returns only the entry from the changelog for the specified version.
 */
async function getChangelogEntriesForVersion(url, version) {
  const markdown = await fetchText(url);

  const regex = new RegExp(
    `^#\\s*\\[?${version.replace(
      /\\./g,
      "\\."
    )}\\][^\\n]*\\n([\\s\\S]+?)(?=^# |\\Z)`,
    "m"
  );

  const match = markdown.match(regex);
  if (!match) {
    throw new Error(`Version ${version} not found in changelog: ${url}`);
  }

  const body = match[1];
  let entries = [];

  const bugFixes = body.indexOf("### Bug Fixes");
  const features = body.indexOf("### Features");

  if (bugFixes !== -1) {
    const end = features !== -1 && features > bugFixes ? features : body.length;

    const bugFixesSection = body.slice(bugFixes + "### Bug Fixes".length, end);

    const bugFixesLines = bugFixesSection
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("###"));

    entries = entries.concat(bugFixesLines);
  }

  if (features !== -1) {
    let featuresSection = body.slice(features + "### Features".length);

    const nextHeadingIdx = featuresSection.search(/^###|^##|^#|\Z/m);
    if (nextHeadingIdx !== -1) {
      featuresSection = featuresSection.slice(0, nextHeadingIdx);
    }

    const featuresLines = featuresSection
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("###"));

    entries = entries.concat(featuresLines);
  }

  return entries.map(formatChangelogMarkdown);
}

(async () => {
  console.log("Starting roadmap update");
  console.log("Version source: package.json");

  let allEntries = [];

  for (const pkg of packages) {
    try {
      const rawVersion = getDeclaredVersion(pkg.localPackage);
      if (!rawVersion) {
        console.warn(
          `No version found for ${pkg.localPackage} in package.json, skipping.`
        );
        continue;
      }
      const version = rawVersion.replace(/^[^\d]*/, "");
      console.log(
        `Processing ${pkg.name} version ${version} (from package.json: ${rawVersion})`
      );
      const entries = await getChangelogEntriesForVersion(
        pkg.changelogUrl,
        version
      );
      if (entries.length === 0) {
        console.warn(
          `No changelog entries found for ${pkg.name} version ${version}, skipping.`
        );
        continue;
      }
      allEntries = allEntries.concat(entries);
    } catch (err) {
      console.warn(`Error processing ${pkg.name}: ${err.message}. Skipping.`);
      continue;
    }
  }

  allEntries = [...new Set(allEntries)].filter(Boolean);

  if (allEntries.length === 0) {
    throw new Error("No changelog entries found across all packages");
  }

  const componentsList = allEntries.map((entry) => `- ${entry}`).join("\n");

  const roadmapPath = path.join(
    __dirname,
    "src/content/structured/community/roadmap.mdx"
  );

  let content = fs.readFileSync(roadmapPath, "utf8");

  const componentsSectionRegex =
    /(### Components\n)([\s\S]*?)(?=^### |^## |\Z)/m;

  // Replaces the last modified date
  const today = new Date().toISOString().slice(0, 10);
  content = content.replace(/date: "\d{4}-\d{2}-\d{2}"/, `date: "${today}"`);

  // Keeps the link consistent with the one in the changelog
  const forFullListLine =
    'For a full list of recent component changes made, please read the <ic-link target="_blank" href="https://github.com/mi6/ic-ui-kit/blob/main/packages/web-components/CHANGELOG.md" rel="noreferrer noopener">changelog</ic-link>.';

  const mdxComment =
    "{/* Please check the information below. Adjust or add extra details if necessary, and then remove this comment, before merging this PR. */}";

  const newSection = `### Components\n\n${mdxComment}\n\n${componentsList}\n\n${forFullListLine}\n\n`;

  if (!componentsSectionRegex.test(content)) {
    throw new Error("Could not find ### Components section to update");
  }

  content = content.replace(componentsSectionRegex, newSection);
  fs.writeFileSync(roadmapPath, content);

  console.log("roadmap.mdx updated!");
})();
