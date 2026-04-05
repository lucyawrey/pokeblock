// Cooldown
const cooldownTime = 1000;
let lastClickTime = Date.now();

for (let pokemon of global.legendaryPokemon) {
  BlockEvents.rightClicked(`pokeblock:${pokemon.id}_pedestal`, (event) => {
    // Cooldown
    if (Date.now() < lastClickTime + cooldownTime) {
      return;
    }
    lastClickTime = Date.now();

    const { block, level, player, server } = event;
    const countedBlocks = {};

    // Loop through bounding box to count nearby blocks
    const minX = block.x - 8;
    const minY = block.y - 8;
    const minZ = block.z - 8;
    const maxX = block.x + 8;
    const maxY = block.y + 8;
    const maxZ = block.z + 8;
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          let id = level.getBlock(x, y, z).id;
          if (!countedBlocks[id]) {
            countedBlocks[id] = 1;
          } else {
            countedBlocks[id] = countedBlocks[id] + 1;
          }
        }
      }
    }
    // Check if counted blocks match the block requirements for a the current legendary Pokémon.
    let meetsBlockRequirements = true;
    for (const [key, value] of Object.entries(pokemon.requiredBlocks)) {
      if (!countedBlocks[key] || countedBlocks[key] < value) {
        meetsBlockRequirements = false;
      }
    }

    if (meetsBlockRequirements) {
      if (player.mainHandItem.id === pokemon.summonItem) {
        player.tell(`§b§l${pokemon.name} is coming.`);
        server.runCommandSilent(
          `playsound minecraft:block.end_portal.spawn block @p ${block.x} ${block.y} ${block.z}`,
        );
        player.mainHandItem.shrink(1);
        server.scheduleInTicks(100, () => {
          const data = pokemon.data ? `${pokemon.data} ` : "";
          const shiny = Math.random() < 1 / 4096 ? "shiny " : "";
          server.runCommandSilent(
            `spawnpokemonat ${block.x + 1 + Math.random() * 5} ${block.y} ${block.z + 1 + Math.random() * 5} ${pokemon.id} ${shiny}${data}level=${pokemon.level}`,
          );
        });
      } else if (player.mainHandItem.id === "minecraft:air") {
        player.tell(`The shrine to ${pokemon.name} is ready.`);
      } else {
        const itemName = pokemon.summonItem
          .replace(/^.*\:/, "")
          .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
          .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase());
        player.tell(
          `That offering... it is not the right one. Bring the ${itemName} to the shrine.`,
        );
      }
    } else {
      player.tell(`The shrine to ${pokemon.name} is incomplete. Missing `);
    }
  });
}
