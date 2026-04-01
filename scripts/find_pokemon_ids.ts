import { Glob } from "bun";

const idMap: any = {
  gougingfire: "gouging-fire",
  brutebonnet: "brute-bonnet",
  ironthorns: "iron-thorns",
  ironleaves: "iron-leaves",
  greattusk: "great-tusk",
  sandyshocks: "sandy-shocks",
  walkingwake: "walking-wake",
  ironvaliant: "iron-valiant",
  irontreads: "iron-treads",
  roaringmoon: "roaring-moon",
  ironcrown: "iron-crown",
  ironbundle: "iron-bundle",
  fluttermane: "flutter-mane",
  screamtail: "scream-tail",
  ragingbolt: "raging-bolt",
  ironmoth: "iron-moth",
  slitherwing: "slither-wing",
  chienpao: "chien-pao",
  tapukoko: "tapu-koko",
  wochien: "wo-chien",
  tapulele: "tapu-lele",
  chiyu: "chi-yu",
  tapubulu: "tapu-bulu",
  tapufini: "tapu-fini",
  hooh: "ho-oh",
};

const glob = new Glob("**/*.json");
const path = "./reference_data/spawn_pool_world";
const pathLegends = "./reference_data/legendary_spawns_atm/spawn_pool_world";
const outputPath = "./pokemon_ids.csv";

const pokemonIds: any = [];
const csvLines = ["dex,id,implemented,spawn,bucket"];

await getPokemonIds(path);
await getPokemonIds(pathLegends, true);

for (let i = 0; i < pokemonIds.length; i++) {
  let dex: any = i + 1;
  const id = pokemonIds[i]?.id || "";
  const legendary = pokemonIds[i]?.legendary || "";
  dex = id ? dex : "";
  const implemented = id ? "yes" : "";
  const spawn = id ? "no" : "";
  csvLines.push(`${dex},${id},${implemented},${spawn},${legendary}`);
}

Bun.write(outputPath, csvLines.join("\n"));

async function getPokemonIds(path: string, legendary = false) {
  for (const filePath of glob.scanSync(path)) {
    try {
      const match = /^([a-z]+)\.json/g.exec(filePath);
      if (match) {
        let id = match[1];
        if (!id) continue;
        let dbId = idMap[id] ? idMap[id] : id;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${dbId}`,
        );
        if (res.ok) {
          const data = (await res.json()) as { id: number };
          const dex = data.id;
          pokemonIds[dex - 1] = {
            id,
            legendary: legendary ? "legendary" : "common",
          };
        } else {
          console.error(`${id}`);
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }
}
