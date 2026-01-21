const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

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
 * Gets the local version of web-components/canary-web-components from the package.json.
 */
function getLocalVersion(pkgName) {
  try {
    const packagePath = require.resolve(`${pkgName}/package.json`, {
      paths: [process.cwd()],
    });
    const package = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    return package.version;
  } catch (e) {
    return null;
  }
}

/**
 * Returns only the entry from the changelog for the specified version.
 */
async function getChangelogEntriesForVersion(url, version) {
  const res = await fetch(url);
  const markdown = await res.text();

  const regex = new RegExp(
    `^#\\s*\\[?${version.replace(
      /\\./g,
      "\\."
    )}\\][^\\n]*\\n([\\s\\S]+?)(?=^# |\\Z)`,
    "m"
  );
  const match = markdown.match(regex);
  if (!match) return [];
  const body = match[1];

  const sections = ["Bug Fixes", "Features"];
  let entries = [];
  for (const section of sections) {
    const sectionRegex = new RegExp(
      `^###\\s+${section}\\n([\\s\\S]+?)(?=^### |\\Z)`,
      "m"
    );
    const sectionMatch = body.match(sectionRegex);
    if (sectionMatch) {
      const lines = sectionMatch[1]
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("###"));
      entries = entries.concat(lines);
    }
  }
  return entries.map(formatChangelogMarkdown);
}

(async () => {
  let allEntries = [];
  for (const package of packages) {
    const version = getLocalVersion(package.localPackage);
    console.log(`Processing ${package.name} version ${version}`);
    if (!version) {
      console.warn(`Could not find local version for ${package.localPackage}`);
      continue;
    }
    const entries = await getChangelogEntriesForVersion(
      package.changelogUrl,
      version
    );
    allEntries = allEntries.concat(entries);
  }
  allEntries = [...new Set(allEntries)].filter(Boolean);

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

  // Replaces the recently shipped components section
  if (componentsSectionRegex.test(content)) {
    content = content.replace(componentsSectionRegex, newSection);
    fs.writeFileSync(roadmapPath, content);
    console.log("roadmap.mdx updated!");
  } else {
    console.warn("Could not find ### Components section to update.");
  }
})();
