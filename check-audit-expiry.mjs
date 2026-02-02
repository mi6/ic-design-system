import fs from "node:fs/promises";

async function main() {
  try {
    const data = await fs.readFile("audit-ci.json", "utf8");
    const jsonData = JSON.parse(data);
    const { allowlist } = jsonData;
    for (const item of allowlist) {
      const advisoryId = Object.keys(item)[0];
      const itemObj = item[advisoryId];
      if (!itemObj.active) {
        console.warn(`Advisory ${advisoryId} is not active.`);
      }
    }
  } catch (parseError) {
    console.error("Error parsing JSON in audit-ci.json:", parseError);
  }
}

await main();