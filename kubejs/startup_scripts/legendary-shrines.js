global.legendaryPokemon = [
  {
    id: "articuno",
    name: "Articuno",
    level: "60",
    data: "min_perfect_ivs=3",
    summonPedestal: "pokeblock:articuno_pedestal",
    newSummonPedestal: true,
    summonItem: "pokeblock:arctic_wing",
    newSummonItem: true,
    lootItem: "pokeblock:articuno_orb",
    newLootItem: true,
    required: {
      "minecraft:polished_diorite": 20,
      "minecraft:ice": 20,
      "minecraft:packed_ice": 10,
      "minecraft:blue_ice": 10,
      "minecraft:diamond_block": 1,
    },
  },
  {
    id: "zapdos",
    name: "Zapdos",
    level: "60",
    data: "min_perfect_ivs=3",
    summonPedestal: "pokeblock:zapdos_pedestal",
    newSummonPedestal: true,
    summonItem: "pokeblock:charged_wing",
    newSummonItem: true,
    lootItem: "pokeblock:zapdos_orb",
    newLootItem: true,
    required: {
      "minecraft:yellow_concrete": 30,
      "minecraft:redstone_block": 10,
      "minecraft:redstone_torch": 6,
      "minecraft:lightning_rod": 2,
      "minecraft:gold_block": 2,
    },
  },
  {
    id: "moltres",
    name: "Moltres",
    level: "60",
    data: "min_perfect_ivs=3",
    summonPedestal: "pokeblock:moltres_pedestal",
    newSummonPedestal: true,
    summonItem: "pokeblock:molten_wing",
    newSummonItem: true,
    lootItem: "pokeblock:moltres_orb",
    newLootItem: true,
    required: {
      "minecraft:polished_blackstone": 30,
      "minecraft:fire": 10,
      "minecraft:netherrack": 10,
      "minecraft:nether_bricks": 10,
      "minecraft:iron_block": 3,
    },
  },
];

StartupEvents.registry("block", (event) => {
  for (let pokemon of global.legendaryPokemon) {
    // Pedestal blocks
    if (pokemon.newSummonPedestal) {
      event
        .create(`pokeblock:${pokemon.id}_pedestal`)
        .fullBlock(false)
        .box(2, 0, 2, 14, 13, 14, true)
        .soundType("stone")
        .hardness(10.0)
        .resistance(100)
        .requiresTool(true)
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("pokeblock:legendary_pedestals");
    }
  }
});

StartupEvents.registry("item", (event) => {
  for (let pokemon of global.legendaryPokemon) {
    // Optionally create summon item
    if (pokemon.newSummonItem) {
      event.create(pokemon.summonItem).tag("pokeblock:legendary_summon_items");
    }
    if (pokemon.newLootItem) {
      event.create(pokemon.lootItem).tag("pokeblock:legendary_summon_items");
    }
  }
});
