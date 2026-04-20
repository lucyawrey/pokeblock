// Villager summoning mechanic
BlockEvents.rightClicked("minecraft:bell", (event) => {
  const { player, level } = event;

  const res = villageCheck(player, level, 16);
  const message =
    res === "all"
      ? "The village is ready for guests and new members."
      : res === "villagers"
        ? "The village is ready for new members."
        : res === "traders"
          ? "The village is ready for guests."
          : "No one will come without water and a place to sleep.";
  player.tell(message);

  // if (false) {
  //   if (Math.random() < 0.2) {
  //     let entity = level.createEntity("minecraft:villager");
  //     // TODO random nearby grounded position.
  //     entity.setPosition(block.x, block.y, block.z);
  //     entity.spawn();
  //     player.tell("Someone new has appeared!");
  //   } else {
  //     player.tell("But nobody came.");
  //   }
  // } else {
  //   player.tell("No one will come without water and a place to sleep.");
  // }
});

/**
 * @return {"none" | "traders" | "villagers" | "all"}
 */
function villageCheck(player, level, blockRadius) {
  let water = 0;
  let bells = 0;
  let beds = 0;
  let freeBeds = 0;
  let villagers = 0;
  let traders = 0;

  const minX = player.x - blockRadius;
  const minY = player.y - blockRadius;
  const minZ = player.z - blockRadius;
  const maxX = player.x + blockRadius;
  const maxY = player.y + blockRadius;
  const maxZ = player.z + blockRadius;
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        let blockTest = level.getBlock(x, y, z);
        if (blockTest.hasTag("minecraft:beds")) {
          beds++;
        }
        if (blockTest.id === "minecraft:water") {
          water++;
        }
        if (blockTest.id === "minecraft:bell") {
          bells++;
        }
      }
    }
  }

  if (water > 3 && bells > 0 && beds > 0) {
    const spawnVillagers = beds > villagers;
    const spawnTraders = traders === 0;
    return spawnVillagers && spawnTraders
      ? "all"
      : spawnVillagers
        ? "villagers"
        : spawnTraders
          ? "traders"
          : "none";
  }
  return "none";
}

// 10 minutes
const period = 1 * 60 * 1000;

ServerEvents.loaded((event) => {
  function spawnVillagerTask(callback) {
    event.server.schedule(period, spawnVillagerTask);
    event.server.players.forEach((player) => {
      player.tell("Attempting to spawn a villager!");
    });
  }
  event.server.schedule(period, spawnVillagerTask);
});
