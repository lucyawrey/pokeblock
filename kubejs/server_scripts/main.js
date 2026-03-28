// Visit the wiki for more info - https://kubejs.com/
console.info("Loaded KubeJs server scripts.");

ServerEvents.recipes((event) => {
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
});

RecipeViewerEvents.removeEntries("item", (event) => {
  event.remove("onlyhammers:emerald_hammer");
  event.remove("onlyhammers:lapis_hammer");
  event.remove("onlyhammers:redstone_hammer");
  event.remove("onlyhammers:obsidian_hammer");
});
