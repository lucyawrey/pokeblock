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
      if (Math.random() < 0.035) {
        server.runCommandSilent(
          // TODO adjust explosion power to meteor size.
          `summon fireball ${block.x} ${block.y + 60} ${block.z} {ExplosionPower:11,Motion:[0.0,-1.5,0.0]}`,
        );
        // TODO create better meteor strcutures (multiple) and pick one randomly. Get explorted structure to work in datapack.
        event.server.scheduleInTicks(38, () => {
          server.runCommandSilent(
            `place template pokeblock:meteor ${block.x - 6} ${block.y - 6} ${block.z - 6}`,
          );
        });
      }
    });
});
