global.legendaryPokemon = [
  {
    id: "articuno",
    name: "Articuno",
    level: "60",
    data: "min_perfect_ivs=3",
    summonItem: "pokeblock:arctic_feather",
    newSummonItem: true,
    requiredBlocks: {
      "minecraft:polished_diorite": 20,
      "minecraft:ice": 20,
      "minecraft:packed_ice": 10,
      "minecraft:blue_ice": 10,
      "minecraft:diamond_block": 1,
    },
  },
];

StartupEvents.registry("block", (event) => {
  for (let pokemon of global.legendaryPokemon) {
    // Pedestal blocks
    event
      .create(`pokeblock:${pokemon.id}_pedestal`)
      .displayName(`${pokemon.name} Pedestal`)
      .renderType("cutout")
      .fullBlock(false)
      .box(2, 0, 2, 14, 13, 14, true)
      .soundType("stone")
      .hardness(10.0)
      .resistance(100)
      .lightLevel(1.0)
      .requiresTool(true)
      .tagBlock("minecraft:mineable/pickaxe")
      .tagBlock("pokeblock:legendary_pedestals");
  }
});

StartupEvents.registry("item", (event) => {
  for (let pokemon of global.legendaryPokemon) {
    // Optionally create summon item
    if (pokemon.newSummonItem) {
      event
        .create(pokemon.summonItem)
        .tag("pokeblock:legendary_summon_items");
    }
  }
});
