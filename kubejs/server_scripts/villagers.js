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

  let minX = player.x - blockRadius;
  let minY = player.y - blockRadius;
  let minZ = player.z - blockRadius;
  let maxX = player.x + blockRadius;
  let maxY = player.y + blockRadius;
  let maxZ = player.z + blockRadius;
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

  // let entities = player.level.getEntitiesWithin(
  //   player.boundingBox.inflate(blockRadius),
  // );
  // entities.forEach((entity) => {
  //   if (entity.type === "minecraft:villager") {
  //     villagers++;
  //   }
  //   if (entity.type === "minecraft:wandering_trader") {
  //     traders++;
  //   }
  // });

  if (water > 3 && bells > 0 && beds > 0) {
    let spawnVillagers = beds > villagers;
    let spawnTraders = traders === 0;
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

// 12 minutes
const period = 0.2 * 60 * 1000;

ServerEvents.loaded((event) => {
  function spawnVillagerTask(callback) {
    event.server.schedule(period, spawnVillagerTask);
    event.server.players.forEach((player) => {
      player.tell("Running task.");
      let level = player.level;
      /** @type {"none" | "traders" | "villagers" | "all"} */
      let check = "none";

      let entityId = undefined;
      if (Math.random() < 0.5) {
        check = villageCheck(player, level, 16);
        player.tell("check: " + check);
        if (check === "all" || check === "villagers") {
          entityId = "minecraft:villager";
        }
      }

      if (!entityId && Math.random() < 0.3) {
        check = check || villageCheck(player, level, 16);
        player.tell("check: " + check);
        if (check === "all" || check == "traders") {
          entityId = "minecraft:wandering_trader";
        }
      }

      player.tell("id: " + entityId);
      if (entityId) {
        let entity = level.createEntity(entityId);
        entity.setPosition(
          player.x + randomInt(-5, 5),
          player.y,
          player.z + randomInt(-5, 5),
        );
        entity.spawn();
      }
    });
  }
  event.server.schedule(period, spawnVillagerTask);
});

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
