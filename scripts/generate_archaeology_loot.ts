import { parse } from "csv-parse/sync";

const gravelOutPath =
  "./datapacks/pokeblock_datapack/data/pokeblock/loot_table/archaeology/suspicious_gravel.json";
const sandOutPath =
  "./datapacks/pokeblock_datapack/data/pokeblock/loot_table/archaeology/suspicious_sand.json";
const targetGravel = `https://docs.google.com/spreadsheets/d/1FWfVOOkkR-UtFYkn13PoNO_Y5szipLEBCEys_gZecF0/gviz/tq?tqx=out:csv&sheet=sus_gravel`;
const targetSand = `https://docs.google.com/spreadsheets/d/1FWfVOOkkR-UtFYkn13PoNO_Y5szipLEBCEys_gZecF0/gviz/tq?tqx=out:csv&sheet=sus_sand`;
const gravelSequence = "pokeblock:archaeology/suspicious_gravel";
const sandSequence = "pokeblock:archaeology/suspicious_sand";

generateArcheologyLoot(gravelOutPath, targetGravel, gravelSequence);
generateArcheologyLoot(sandOutPath, targetSand, sandSequence);

async function generateArcheologyLoot(outPath: string, target: string, sequence: string) {
  const data: any[] = parse(await pullCsv(target), {
    columns: true,
    skip_empty_lines: true,
  });

  const lootTable: any = {
    type: "minecraft:archaeology",
    pools: [
      {
        bonus_rolls: 0.0,
        entries: [],
        rolls: 1.0,
      },
    ],
    random_sequence: sequence,
  };

  for (const row of data) {
    const drop = {
      type: "minecraft:item",
      name: parseString(row.item),
      weight: parseFloat(row.weight),
    };

    if (drop.name && drop.weight && drop.weight > 0) {
      lootTable.pools[0].entries.push(drop);
    }
  }

  const json = JSON.stringify(lootTable, null, 2);
  Bun.write(outPath, json);
  console.log(`Generated archeology drop table ${outPath}.`);
}

function parseString(value: any): string {
  return value?.toString()?.trim() || "";
}

async function pullCsv(url: string): Promise<string> {
  try {
    const res = await fetch(url, {
      method: "get",
      headers: {
        "content-type": "text/csv;charset=UTF-8",
      },
    });
    if (res.status === 200) {
      return await res.text();
    } else {
      console.error(`Error code ${res.status}.`);
      process.exit(-1);
    }
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
}
