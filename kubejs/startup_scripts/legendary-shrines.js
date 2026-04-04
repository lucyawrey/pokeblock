StartupEvents.registry("block", (event) => {
  event
    .create("pokeblock:articuno_pedestal")
    .displayName("Articuno Pedestal")
    .renderType("cutout")
    .fullBlock(false)
    .box(1, 0, 1, 15, 12, 15, true)
    .soundType("stone")
    .hardness(10.0)
    .resistance(100)
    .requiresTool(true)
    .tagBlock("minecraft:mineable/pickaxe")
});