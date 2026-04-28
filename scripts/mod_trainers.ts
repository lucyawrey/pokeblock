import { Glob } from "bun";

const glob = new Glob("**/*.json");
const path = "./datapacks/pokeblock_datapack/data/rctmod/trainers";

for (const filePath of glob.scanSync(path)) {
  try {
    const content = await Bun.file(`${path}/${filePath}`)
      .json()
      .catch(() => null);
    content.battleFormat = "GEN_9_DOUBLES";

    const json = JSON.stringify(content, undefined, 2);
    await Bun.write(`${path}/${filePath}`, json);
    console.log(`Modified file: ${filePath}`);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}
