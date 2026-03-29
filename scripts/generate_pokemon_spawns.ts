import { file } from "bun";
import { parse } from "csv-parse/sync";
import { time } from "node:console";

const outPath = "../datapacks/pokeblock_datapack/data/pokeblock/spawn_pool_world";

// Pull CSV from Google Sheets
const target = `https://docs.google.com/spreadsheets/d/1FWfVOOkkR-UtFYkn13PoNO_Y5szipLEBCEys_gZecF0/gviz/tq?tqx=out:csv&sheet=spawns`;
let rawData = "";
try {
  const res = await fetch(target, {
    method: "get",
    headers: {
      "content-type": "text/csv;charset=UTF-8",
    },
  });

  if (res.status === 200) {
    rawData = await res.text();
  } else {
    console.error(`Error code ${res.status}.`);
    process.exit(-1);
  }
} catch (error) {
  console.error(error);
  process.exit(-1);
}

const data = parse(rawData, {
  columns: true,
  skip_empty_lines: true,
});

data.forEach((row: any) => {
  const pokemon = {
    dex_number: parseInt(row.dex || "0"),
    pokemon: parseString(row.pokemon),
    implemented: row.implemented === "yes",
    spawn: row.spawn === "yes",
    bucket: parseString(row.bucket) as
      | "common"
      | "uncommon"
      | "rare"
      | "ultra-rare"
      | "legendary",
    weight: parseFloat(row.weight || "0.0"),
    level: parseString(row.level),
    dimension: parseStringWithAny(row.dimension)
      ? `minecraft:${parseString(row.dimension)}`
      : undefined,
    types: parseStringSplit(row.types) as (
      | "ground"
      | "surf"
      | "dive"
      | "fishing"
      | "lava"
    )[],
    timeRange: parseStringWithAny(row.timeRange) as
      | "morning"
      | "day"
      | "night"
      | undefined,
    canSeeSky: row.canSeeSky === "any" ? undefined : row.canSeeSky === "yes",
    illumination: parseStringWithAny(row.illumination) as
      | "light"
      | "dark"
      | undefined,
    weather: parseStringWithAny(row.weather) as
      | "isClear"
      | "isRaining"
      | "isThundering"
      | undefined,
    height: parseStringWithAny(row.height) as "high" | "low" | undefined,
    moonPhase: parseStringWithAny(row.moonPhase),
    data: parseString(row.data),
    neededNearbyBlocks: parseStringSplit(row.neededNearbyBlocks),
  };
  // Legendary Pokemon are ultra-rare, but we want to separate them out for organizational purposes.
  if (pokemon.bucket === "legendary") {
    pokemon.bucket = "ultra-rare";
  }
  if (
    pokemon.dex_number > 0 &&
    pokemon.pokemon &&
    pokemon.implemented &&
    pokemon.spawn
  ) {
    const spawn_pool = {
      enabled: true,
      neededInstalledMods: [],
      neededUninstalledMods: [],
      spawns: [] as any[],
    };
    pokemon.types.forEach((type, i) => {
      const spawn: any = {
        id: `${pokemon.pokemon}-${i+1}`,
        pokemon: `${pokemon.pokemon} ${pokemon.data}`,
        presets: [`type_${type}`],
        type: "pokemon",
        bucket: pokemon.bucket,
        weight: pokemon.weight,
        level: pokemon.level,
        condition: {},
      };

      // Handling for non-overworld dimensions, diving, and fishing
      const is_overworld = pokemon.dimension === "minecraft:overworld";
      if (!is_overworld) {
        pokemon.canSeeSky = undefined;
      }
      if (!is_overworld || type === "dive" || type === "fishing") {
        pokemon.illumination = undefined;
      }

      // Optional spawn conditions
      if (pokemon.dimension) {
        spawn.condition.dimensions = [pokemon.dimension];
      }
      if (pokemon.timeRange) {
        spawn.condition.timeRange = pokemon.timeRange;
      }
      // Detailed sky visivility and lighting handling
      if (pokemon.canSeeSky) {
        if (pokemon.illumination == "dark") {
          spawn.condition.minLight = 0;
          spawn.condition.maxLight = 7;
          spawn.condition.canSeeSky = true;
        } else if (pokemon.illumination == "light") {
          spawn.condition.minSkyLight = 8;
          spawn.condition.maxSkyLight = 15;
        } else {
          spawn.condition.canSeeSky = true;
        }
      } else {
        if (pokemon.illumination == "dark") {
          spawn.condition.minLight = 0;
          spawn.condition.maxLight = 7;
        } else if (pokemon.illumination == "light") {
          spawn.condition.minLight = 8;
          spawn.condition.maxLight = 15;
        }
      }
      if (pokemon.canSeeSky == false) {
        spawn.condition.canSeeSky = false;
      }
      if (pokemon.weather && (type === "ground" || type === "fishing" || type === "surf")) {
        if (pokemon.weather === "isClear") {
          spawn.condition.isRaining = false;
          spawn.condition.isThundering = false;
        } else if (pokemon.weather === "isRaining") {
          spawn.condition.isRaining = true;
        } else if (pokemon.weather === "isThundering") {
          spawn.condition.isThundering = true;
        }
      }
      if (pokemon.height && (type === "ground" || type === "dive")) {
        if (pokemon.height === "high") {
          spawn.condition.minY = 10;
        } else if (pokemon.height === "low") {
          spawn.condition.maxY = 9;
        }
      }
      if (pokemon.moonPhase) {
        spawn.condition.moonPhase = pokemon.moonPhase;
      }
      if (pokemon.neededNearbyBlocks && (type === "ground" || type === "dive")) {
        spawn.condition.neededNearbyBlocks = pokemon.neededNearbyBlocks;
      }

      spawn_pool.spawns.push(spawn);
    });
    // Write out spawn pool file to datapack
    const filename = `${outPath}/${pokemon.dex_number.toString().padStart(4, "0")}_${pokemon.pokemon}.json`;
    const json = JSON.stringify(spawn_pool, null, 2);
    Bun.write(filename, json);
    console.log(
      `Generated spawn pool file "${filename}" for Pokemon #${pokemon.dex_number}: ${pokemon.pokemon}.`,
    );
  }
});

function parseString(value: any): string {
  return value?.toString()?.trim() || "";
}

function parseStringSplit(value: any): string[] {
  return parseString(value)
    .split(",")
    .map((block) => block.trim())
    .filter((block) => block);
}

function parseStringWithAny(value: any): string | undefined {
  value = parseString(value);
  return value === "any" ? undefined : value;
}
