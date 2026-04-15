import { Glob } from "bun";
import { pullCsv } from "./lib";
import { parse } from "csv-parse/browser/esm/sync";

const ignoreList = [
  "articuno",
  "zapdos",
  "moltres",
  "mewtwo",
  "mew",
  "raikou",
  "entei",
  "suicune",
  "lugia",
  "hooh",
  "celebi",
  "regirock",
  "regice",
  "registeel",
  "latias",
  "latios",
  "kyogre",
  "groudon",
  "rayquaza",
  "jirachi",
  "deoxys",
  "uxie",
  "mesprit",
  "azelf",
  "dialga",
  "palkia",
  "heatran",
  "regigigas",
  "giratina",
  "cresselia",
  "phione",
  "manaphy",
  "darkrai",
  "shaymin",
  "arceus",
  "victini",
  "cobalion",
  "terrakion",
  "tornadus",
  "thundurus",
  "reshiram",
  "zekrom",
  "landorus",
  "kyurem",
  "keldeo",
  "meloetta",
  "genesect",
  "xerneas",
  "yveltal",
  "zygarde",
  "diancie",
  "hoopa",
  "volcanion",
  "typenull",
  "tapukoko",
  "tapulele",
  "tapubulu",
  "tapufini",
  "cosmog",
  "necrozma",
  "magearna",
  "marshadow",
  "zeraora",
  "meltan",
  "zacian",
  "zamazenta",
  "eternatus",
  "kubfu",
  "zarude",
  "regieleki",
  "regidrago",
  "glastrier",
  "spectrier",
  "calyrex",
  "enamorus",
  "wochien",
  "chienpao",
  "chiyu",
  "koraidon",
  "miraidon",
  "walkingwake",
  "okidogi",
  "munkidori",
  "fezandipiti",
  "ogerpon",
  "gougingfire",
  "ragingbolt",
  "ironcrown",
  "terapagos",
  "pecharunt",
  "hisuian",
  "wochien",
  "h",
  "a",
  "ff",
  "galarian",
  "alolan",
  "nid",
  "cosmetic",
  "ine",
  "trik",
  "in",
  "n",
  "trash",
  "mrrime",
  "mrmime",
  "r",
  "herd",
  "mimejr",
  "bloodmoon",
];

const idMap: any = {
  hakamoo: "hakamo-o",
  sandy: "sandy-shocks",
  porygonz: "porygon-z",
  jangmoo: "jangmo-o",
  nidoranf: "nidoran-f",
  nidoranm: "nidoran-m",
  kommoo: "kommo-o",
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
  ironmoth: "iron-moth",
  slitherwing: "slither-wing",
};

const path = "./reference_data/data";
const outputPath = "./spawn_data.csv";
const cachePath = "./script_cache.json";
const biomesSheetUrl = `https://docs.google.com/spreadsheets/d/1FWfVOOkkR-UtFYkn13PoNO_Y5szipLEBCEys_gZecF0/gviz/tq?tqx=out:csv&sheet=biomes`;

let biomes: { biome?: string; neededNearbyBlocks?: string }[] = parse(
  await pullCsv(biomesSheetUrl),
  {
    columns: true,
    skip_empty_lines: true,
  },
);
let pokemon: any[];
const csvLines = [
  "dex,pokemon,bucket,weight,level,dimension,types,timeRange,canSeeSky,illumination,weather,height,moonPhase,neededNearbyBlocks,data,isGenerated",
];

pokemon = await Bun.file(cachePath)
  .json()
  .catch(() => null);
if (!pokemon || !Array.isArray(pokemon)) {
  pokemon = [];
  await getPokemon(path);
  await Bun.write(cachePath, JSON.stringify(pokemon));
}

for (let poke of pokemon) {
  let json = JSON.stringify(poke);
  let spawns = poke?.spawns;
  let spawn0 = spawns?.[0];
  if (!spawns || spawns.length === 0) continue;
  let dex: any = pokemon.indexOf(poke) + 1;
  let id = poke?.id || "";
  dex = id ? dex : "";
  let bucket = spawn0?.bucket || "";
  let level = spawn0?.level || "";
  let weight = spawn0?.weight || "";
  let dimension =
    json.includes("#cobblemon:nether/is") ||
    json.includes("#minecraft:is_nether")
      ? json.includes("#cobblemon:is")
        ? "any"
        : "the_nether"
      : "overworld";
  let types: string[] = [
    ...new Set(
      spawns?.map((spawn: any) => {
        if (!spawn?.spawnablePositionType) return "";
        switch (spawn.spawnablePositionType) {
          case "grounded":
            if (spawn.presets?.includes("treetop")) {
              return "treetop";
            }
            return "ground";
          case "submerged":
            if (spawn.presets?.includes("lava")) {
              return "lava";
            }
            return "dive";
          case "surface":
            if (spawn.presets?.includes("lava")) {
              return "lava";
            }
            return "surf";
          case "fishing":
            return "fishing";
          default:
            return "";
        }
      }),
    ),
  ].filter((item) => item) as string[];
  let timeRange = spawn0?.condition?.timeRange || "any";
  let weather = spawn0?.condition?.isThundering
    ? "isThundering"
    : spawn0?.condition?.isRaining
      ? "isRaining"
      : "any";
  let moonPhase = spawn0?.condition?.moonPhase || "any";
  let minY = parseInt(spawn0?.condition?.minY);
  let maxY = parseInt(spawn0?.condition?.maxY);
  let height = maxY && maxY <= 0 ? "low" : minY && minY >= 1 ? "high" : "any";
  let maxSkyLight = parseInt(spawn0?.condition?.maxSkyLight);
  let minSkyLight = parseInt(spawn0?.condition?.minSkyLight);
  let maxLight = maxSkyLight
    ? maxSkyLight
    : parseInt(spawn0?.condition?.maxLight);
  let minLight = minSkyLight
    ? minSkyLight
    : parseInt(spawn0?.condition?.minLight);
  let canSeeSky =
    maxSkyLight || minSkyLight || spawn0?.condition?.canSeeSky == true
      ? "yes"
      : spawn0?.condition?.canSeeSky == false
        ? "no"
        : "any";
  let illumination =
    minLight && minLight >= 7
      ? "light"
      : maxLight && maxLight <= 7
        ? "dark"
        : "any";
  let neededNearbyBlocks: string[] = [];
  let isGenerated = dex && id && bucket && weight && level ? "yes" : "no";

  csvLines.push(
    `"${dex}","${id}","${bucket}","${weight}","${level}","${dimension}","${types.join(", ")}","${timeRange}","${canSeeSky}","${illumination}","${weather}","${height}","${moonPhase}","${neededNearbyBlocks.join(", ")}",,"${isGenerated}"`,
  );
}

Bun.write(outputPath, csvLines.join("\n"));
console.log(`Spawn data generated and saved to ${outputPath}`);

async function getPokemon(path: string) {
  for (let filePath of new Glob("**/*.json").scanSync(path)) {
    try {
      let match = /([a-z]+)\.json/.exec(filePath);
      if (match) {
        if (!match[1]) continue;
        let id = match[1];
        if (ignoreList.includes(id)) {
          continue;
        }
        let dbId = idMap[id] ? idMap[id] : id;
        let res = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${dbId}`,
        );
        if (res.ok) {
          let data = (await res.json()) as { id: number };
          let dex = data.id;
          const json = await Bun.file(`${path}/${filePath}`).json();
          if (json && json.spawns) {
            pokemon[dex - 1] = {
              id,
              spawns: json.spawns,
            };
          }
        } else {
          console.error(`${id}`);
        }
      }
    } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    }
  }
}
