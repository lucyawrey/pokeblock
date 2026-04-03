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
    .box(6, 0, 6, 9, 14, 9, true)
    .soundType("stone")
    .hardness(3.0)
    .resistance(10)
    .requiresTool(true)
    .tagBlock("minecraft:mineable/pickaxe")
    .randomTick((event) => {
      // 3.5% chance to activate every random tick (random tick happens on average every 68 seconds).
      const block = event.block;
      const server = event.server;
      if (Math.random() < 0.5) {
        server.runCommandSilent(`summon fireball ${block.x} ${block.y+20} ${block.z} {ExplosionPower:15,Motion:[0.0,-5.0,0.0]}`)
        // TODO possible delay before next action `event.server.scheduleInTicks(()=>{})`
        // TODO custom structure, make placing structure commadn actualy work
        server.runCommandSilent(`place structure mega_showdown:megaroid ${block.x} ${block.y} ${block.z}`)
      }
    });
});
