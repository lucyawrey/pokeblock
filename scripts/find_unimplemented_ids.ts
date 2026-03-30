const missingNo = [
  233, 265, 266, 267, 268, 269, 535, 536, 537, 640, 773, 790, 791, 792, 795,
  797, 804, 809, 841, 842, 880, 881, 882, 883, 892, 983, 992, 993, 1000, 1003,
  1011, 1018, 1019, 1022, 1024,
];
const outputPath = "./pokemon_ids.csv";

const csvLines = ["dex,pokemon"];

for (const dex of missingNo) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${dex}`);
  if (res.ok) {
    let json = (await res.json()) as { name: string };
    let name = json.name.replace("-", "");
    csvLines.push(`${dex},${name}`);
  } else {
    console.error(`Error fetching data for dex # ${dex}.`);
  }
};

Bun.write(outputPath, csvLines.join("\n"));
