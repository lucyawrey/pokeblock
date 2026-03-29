import { Glob } from "bun";

const glob = new Glob("**/*.json");
const path = "./datapacks/spawn_pool_stub_all";
const outputPath = "./pokemon_ids.csv";

const pokemonIds = [];
const csvLines = ["dex,id,implemented"];

for (const filePath of glob.scanSync(path)) {
  try {
    const match = /([0-9]{4})_([a-z]+?)\.json/g.exec(filePath);
    if (match) {
      const [_, _dex, id] = match;
      const dex = parseInt(_dex || "1");
      pokemonIds[dex - 1] = id;
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}
for (let i = 0; i < pokemonIds.length; i++) {
  const dex = i + 1;
  const id = pokemonIds[i];
  const implemented = id ? "yes" : "no";
  csvLines.push(`${dex},${id || ""},${implemented}`);
}

Bun.write(outputPath, csvLines.join("\n"));
