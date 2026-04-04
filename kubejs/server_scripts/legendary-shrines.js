BlockEvents.rightClicked("pokeblock:articuno_pedestal", (event) => {
  const summonItem = "cobblemon:never_melt_ice";
  const nearbyBlock = "minecraft:ice";
  const { block, level, player } = event;
  const blockCounts = {};

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

  if (blockCounts[nearbyBlock] && blockCounts[nearbyBlock] > 1) {
    player.tell("The shrine is ready.");
  } else {
    player.tell("The shrine is incomplete.");
  }
});
