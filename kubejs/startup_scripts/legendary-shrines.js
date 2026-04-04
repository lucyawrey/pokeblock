global.legendaryPokemon = [{
  id: "articuno",
  name: "Articuno",
  level: "60",
  summonItem: "cobblemon:never_melt_ice",
  nearbyBlock: "minecraft:ice",
}];

StartupEvents.registry("block", (event) => {
  for (let pokemon of global.legendaryPokemon) {
    event
      .create(`pokeblock:${pokemon.id}_pedestal`)
      .displayName(`${pokemon.name} Pedestal`)
      .renderType("cutout")
      .fullBlock(false)
      .box(2, 0, 2, 14, 13, 14, true)
      .soundType("stone")
      .hardness(10.0)
      .resistance(100)
      .requiresTool(true)
      .tagBlock("minecraft:mineable/pickaxe")
      .tagBlock("pokeblock:legendary_pedestals");
  }
});
