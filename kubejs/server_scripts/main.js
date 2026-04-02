// Visit the wiki for more info - https://kubejs.com/
console.info("Loaded KubeJs server scripts.");

// Cobblemon natural block handling used in spawn detail presets
ServerEvents.tags("item", (event) => {
  event.add("cobblemon:natural", [
    "#c:cobblestones",
    "#minecraft:planks",
    "#minecraft:stone_bricks",
    "minecraft:bedrock",
  ]);

  // Crop spawning with bone meal right click on grass (can spawn any flower)
  event.add("minecraft:flowers", "#farmersdelight:wild_crops", "cobblemon:revival_herb");
});


ServerEvents.recipes((event) => {
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
