const path = "../reference_data/species_drop_data.json";
const outputPath = "../drop_data.csv";

const dropData = await Bun.file(path)
  .json()
  .catch(() => null);
const csvLines = [
  `dex,pokemon,override,drop1,chance1,drop2,chance2,drop3,chance3,drop4,chance4,drop5,chance5,drop6,chance6,drop7,chance7,drop8,chance8,drop9,chance9,drop10,chance10,drop11,chance11,drop12,chance12,drop13,chance13,drop14,chance14,drop15,chance15,drop16,chance16,drop17,chance17,drop18,chance18,drop19,chance19,drop20,drop20`,
];

for (let drop of dropData) {
  let dex = drop?.dex;
  let id = drop?.id;
  let entries = drop?.drops?.entries;
  if (dex && id && entries) {
    let line = `${dex},${id},yes`;
    for (let entry of entries) {
      line += `,${entry?.item?.namespace}:${entry?.item?.path}`;
      let percentage = entry?.percentage;
      let quantityRange = entry?.quantityRange;
      if (percentage && quantityRange) {
        if (percentage >= 100) {
          line += `,${quantityRange.first}-${quantityRange.last}`;
        } else {
          line += `,${Math.floor(quantityRange.first * (percentage / 100))}-${Math.ceil(quantityRange.last * (percentage / 100))}`;
        }
      } else if (percentage) {
        line += `,${percentage}%`;
      } else if (quantityRange) {
        line += `,${quantityRange.first}-${quantityRange.last}`;
      } else {
        line += ",100%";
      }
    }
    csvLines[dex] = line;
  }
}

Bun.write(outputPath, csvLines.join("\n"));
console.log(`Drop data generated and saved to ${outputPath}`);
