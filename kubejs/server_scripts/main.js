// Visit the wiki for more info - https://kubejs.com/
console.info("Loaded KubeJs server scripts.");

// Cobblemon natural block handling used in spawn detail presets
ServerEvents.tags("item", (event) => {
  event.add("cobblemon:natural", [
    "#c:cobblestones",
    "#minecraft:planks",
    "#minecraft:stone_bricks",
    "minecraft:bedrock",
    "mega_showdown:mega_meteorid_block",
  ]);

  // Habitat tags for cobblemon
  event.add("c:grasses", [
    "minecraft:short_grass",
    "minecraft:tall_grass",
    "minecraft:fern",
  ]);

  // Rope tag for bell crafting
  event.add("c:ropes", "minecraft:lead");

  // Crop spawning with bone meal right click on grass (can spawn any flower)
  event.add(
    "minecraft:flowers",
    "#farmersdelight:wild_crops",
    "cobblemon:revival_herb",
  );
});

ServerEvents.recipes((event) => {
  // Remove recepes for rare materials
  event.remove({ id: "mega_showdown:deoxys_meteorite" });

  // Hammer on cutting board handling
  event.remove({ id: "onlyhammers:emerald_hammer" });
  event.remove({ id: "onlyhammers:lapis_hammer" });
  event.remove({ id: "onlyhammers:redstone_hammer" });
  event.remove({ id: "onlyhammers:obsidian_hammer" });

  event.forEachRecipe({ type: "create:milling" }, (recipe) => {
    // TODO figure out why ingredient.item is undefined instead of a block ID
    let ingredients = JSON.parse(
      recipe.getOriginalRecipeIngredients()[0].toJson(),
    ).item;
    if (!ingredients) {
      return;
    }
    let result = [
      {
        count: recipe.originalRecipeResult.count,
        id: recipe.originalRecipeResult.id,
      },
    ];
    event.recipes.farmersdelight.cutting(
      ingredients,
      [
        "#onlyhammers:wooden_hammers",
        "#onlyhammers:stone_hammers",
        "#onlyhammers:iron_hammers",
        "#onlyhammers:gold_hammers",
        "#onlyhammers:diamond_hammers",
        "#onlyhammers:netherite_hammers",
      ],
      result,
    );
  });

  // Shovel on cutting board handling
  event.remove({
    type: "farmersdelight:cutting",
    input: "minecraft:gravel",
    output: "minecraft:gravel",
  });
  event.recipes.farmersdelight.cutting(
    "minecraft:gravel",
    "#minecraft:shovels",
    [
      ChanceResult.of("minecraft:flint", 0.25),
      ChanceResult.of("create:copper_nugget", 0.12),
      ChanceResult.of("minecraft:iron_nugget", 0.12),
      ChanceResult.of("cobblemon:tumblestone", 0.12),
    ],
  );

  // Create handling
  event.remove({
    type: "create:splashing",
    input: "minecraft:gravel",
    output: "minecraft:flint",
  });
  event.recipes.create.splashing(
    [
      CreateItem.of("minecraft:flint", 0.25),
      CreateItem.of("create:copper_nugget", 0.12),
      CreateItem.of("minecraft:iron_nugget", 0.12),
      CreateItem.of("cobblemon:tumblestone", 0.12),
    ],
    "minecraft:gravel",
  );
  event.remove({
    type: "create:crushing",
    input: "minecraft:blackstone",
    output: "minecraft:blackstone",
  });
  event.recipes.create.crushing(
    [
      CreateItem.of("minecraft:blackstone", 0.25),
      CreateItem.of("minecraft:ancient_debris", 0.005),
    ],
    "minecraft:blackstone",
  );
});

RecipeViewerEvents.removeEntries("item", (event) => {
  // Hammer removal handling
  event.remove("onlyhammers:emerald_hammer");
  event.remove("onlyhammers:lapis_hammer");
  event.remove("onlyhammers:redstone_hammer");
  event.remove("onlyhammers:obsidian_hammer");
});

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
          if (!test.properties.occupied) {
            bed = true;
          }
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
