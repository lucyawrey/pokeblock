// Villager summoning mechanic
BlockEvents.rightClicked("minecraft:bell", (event) => {
  const { block, level, player } = event;
  let bed = false;
  let water = false;

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
        let test = level.getBlock(x, y, z);
        if (test.hasTag("minecraft:beds")) {
          bed = true;
        } else if (test.id === "minecraft:water") {
          water = true;
        }
      }
    }
  }

  if (bed && water) {
    if (Math.random() < 0.2) {
      let entity = level.createEntity("minecraft:villager");
      // TODO random nearby grounded position.
      entity.setPosition(block.x, block.y, block.z);
      entity.spawn();
      player.tell("Someone new has appeared!");
    } else {
      player.tell("But nobody came.");
    }
  } else {
    player.tell("No one will come without water and a place to sleep.");
  }
  if (Math.random() < 0.02) {
    player.tell("The bell broke!");
    block.set("minecraft:air");
  }
});
