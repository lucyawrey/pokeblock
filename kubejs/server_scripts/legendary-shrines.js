// Cooldown
const cooldownTime = 1000;
let lastClickTime = Date.now();

for (let pokemon of global.legendaryPokemon) {
  BlockEvents.rightClicked(pokemon.summonPedestal, (event) => {
    // Cooldown
    if (Date.now() < lastClickTime + cooldownTime) {
      return;
    }
    lastClickTime = Date.now();

    let { block, level, player, server } = event;
    let countedBlocks = {};

    // Loop through bounding box to count nearby blocks
    let minX = block.x - 8;
    let minY = block.y - 8;
    let minZ = block.z - 8;
    let maxX = block.x + 8;
    let maxY = block.y + 8;
    let maxZ = block.z + 8;
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
    let missingBlocks = [];
    for (let [key, value] of Object.entries(pokemon.requiredBlocks)) {
      if (!countedBlocks[key] || countedBlocks[key] < value) {
        meetsBlockRequirements = false;
        let itemName = Item.of(key).hoverName.string;
        let missingNo = value - (countedBlocks[key] || 0);
        missingBlocks.push(`${missingNo}× ${itemName}`);
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
          let data = pokemon.data ? `${pokemon.data} ` : "";
          let shiny = Math.random() < 1 / 4096 ? "shiny " : "";
          server.runCommandSilent(
            `spawnpokemonat ${block.x + 1 + Math.random() * 4} ${block.y} ${block.z + 1 + Math.random() * 4} ${pokemon.id} ${shiny}${data}level=${pokemon.level}`,
          );
        });
      } else if (player.mainHandItem.id === "minecraft:air") {
        player.tell(`The shrine to ${pokemon.name} is ready.`);
      } else {
        let itemName = Item.of(pokemon.summonItem).hoverName.string;
        player.tell(
          `That offering... it is not the right one. Bring the ${itemName} to the shrine.`,
        );
      }
    } else {
      player.tell(
        `The shrine to ${pokemon.name} is incomplete. Missing ${missingBlocks.join(", ")}.`,
      );
    }
  });
}
