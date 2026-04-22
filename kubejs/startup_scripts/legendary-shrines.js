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
  {
    id: "lugia",
    name: "Lugia",
    level: "65",
    data: "min_perfect_ivs=3",
    summonPedestal: "pokeblock:lugia_pedestal",
    newSummonPedestal: true,
    summonItem: "pokeblock:fragile_ocarina",
    newSummonItem: true,
    lootItem: undefined,
    newLootItem: false,
    required: {
      "mega_showdown:pedestal": 3,
      "pokeblock:articuno_orb": 1,
      "pokeblock:zapdos_orb": 1,
      "pokeblock:moltres_orb": 1,
      "minecraft:water": 10,
      "minecraft:prismarine": 10,
      "minecraft:lapis_block": 5,
      "minecraft:quartz_block": 5,
    },
  },
  {
    id: "mew",
    name: "Mew",
    level: "70",
    data: "min_perfect_ivs=3",
    summonPedestal: "pokeblock:mew_pedestal",
    newSummonPedestal: true,
    summonItem: "pokeblock:ancient_fossil",
    newSummonItem: true,
    lootItem: undefined,
    newLootItem: false,
    required: {
      "minecraft:diamond_block": 4,
      "minecraft:amethyst_block": 5,
      "minecraft:mossy_stone_bricks": 10,
      "minecraft:mossy_cobblestone": 10,
      "minecraft:cherry_planks": 10,
    },
  },
];

global.extraItems = [
  { id: "pokeblock:ancient_fossil_piece" },
  { id: "pokeblock:ancient_fossil_dust" },
  { id: "pokeblock:ancient_dna", name: "Ancient DNA" },
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
    if (pokemon.newSummonItem && pokemon.summonItem) {
      event.create(pokemon.summonItem).tag("pokeblock:legendary_summon_items");
    }
    if (pokemon.newLootItem && pokemon.lootItem) {
      event.create(pokemon.lootItem).tag("pokeblock:legendary_summon_items");
    }
  }
  for (let item of global.extraItems) {
    let newItem = event.create(item.id).tag("pokeblock:legendary_summon_items");
    if (item.name) {
      newItem.displayName(item.name);
    }
  }
});

// Creative tab
StartupEvents.modifyCreativeTab("pokeblock:pokeblock", (event) => {
  let lastItem = "pokeblock:meteor_beacon";
  for (let pokemon of global.legendaryPokemon) {
    // Optionally create summon item
    if (pokemon.newSummonItem && pokemon.summonItem) {
      event.addAfter(lastItem, pokemon.summonItem);
      lastItem = pokemon.summonItem;
    }
    if (pokemon.newLootItem && pokemon.lootItem) {
      event.addAfter(lastItem, pokemon.lootItem);
      lastItem = pokemon.lootItem;
    }
  }
  for (let item of global.extraItems) {
    event.addAfter(lastItem, item.id);
    lastItem = item.id;
  }
});
