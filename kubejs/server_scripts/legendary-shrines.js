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
    const blockCounts = {};
    const tagCounts = {};

    // Loop through bounding box
    const minX = block.x - 8;
    const minY = block.y - 8;
    const minZ = block.z - 8;
    const maxX = block.x + 8;
    const maxY = block.y + 8;
    const maxZ = block.z + 8;
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          let blockId = level.getBlock(x, y, z).id;
          if (!blockCounts[blockId]) {
            blockCounts[blockId] = 1;
          } else {
            blockCounts[blockId] = blockCounts[blockId] + 1;
          }
        }
      }
    }

    if (
      blockCounts[pokemon.nearbyBlock] &&
      blockCounts[pokemon.nearbyBlock] > 1
    ) {
      if (player.mainHandItem.id === pokemon.summonItem) {
        player.tell(`§b§l${pokemon.name} is coming.`);
        server.runCommandSilent(`playsound minecraft:block.end_portal.spawn block @p ${block.x} ${block.y} ${block.z}`);
        player.mainHandItem.shrink(1);
        server.scheduleInTicks(100, () => {
          server.runCommandSilent(`spawnpokemonat ${block.x + 1 + (Math.random() * 5)} ${block.y} ${block.z + 1 + (Math.random() * 5)} ${pokemon.id} level=${pokemon.level}`);
        });
      } else if (player.mainHandItem.id === "minecraft:air") {
        player.tell(`The shrine to ${pokemon.name} is ready.`);
      } else {
        player.tell(`That item... it is not the right one.`)
      }
    } else {
      player.tell(`The shrine ${pokemon.name} is incomplete.`);
    }
  });
}
