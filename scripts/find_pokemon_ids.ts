import { Glob } from "bun";

const glob = new Glob("**/*.json");
const path = "../reference_data/legendary_spawns_atm/spawn_pool_world";
const outputPath = "./pokemon_ids.csv";

const csvLines = ["name,implemented"];

for (const filePath of glob.scanSync(path)) {
  try {
    const match = /^([a-z]+)\.json/g.exec(filePath);
    if (match) {
      const [_, id] = match;
      csvLines.push(`${id},TRUE`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

Bun.write(outputPath, csvLines.join("\n"));
