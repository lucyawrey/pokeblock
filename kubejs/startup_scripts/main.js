// Visit the wiki for more info - https://kubejs.com/
console.info("Loaded KubeJs startup scripts.");

// Add custom Suspicious Cobblestone item
StartupEvents.registry("block", (event) => {
  event
    .create("pokeblock:suspicious_cobblestone")
    .displayName("Suspicious Cobblestone")
    .soundType("stone")
    .hardness(2.0)
    .resistance(10.0)
    .requiresTool(true)
    .tagBlock("minecraft:cobblestone") // Makes it behave like cobblestone
    .tagBlock("minecraft:mineable/pickaxe"); // Requires a pickaxe
});

// Meteor Beacon
StartupEvents.registry("block", (event) => {
  event
    .create("pokeblock:meteor_beacon")
    .displayName("Meteor Beacon")
    .renderType("cutout")
    .fullBlock(false)
    .box(3, 0, 3, 6, 10, 6, true)
    .soundType("stone")
    .hardness(3.0)
    .resistance(1200.0)
    .requiresTool(true)
    .tagBlock("minecraft:mineable/pickaxe"); // Requires a pickaxe
});
