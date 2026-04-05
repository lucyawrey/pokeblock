# Pokéblock - Cobblemon Skyblock
An in-development Skyblock modpack focused primarily on Cobblemon, and to a lesser extent Create. Built with love by LucyAzalea.

## Modpack Features
- Start on a classic Skyblock island with only a block of ice, a lava bucket, and a single apricorn tree
- ...plus the tools of a trainer: a starter Pokémon, a Pokédex, a Pokénav, and a Trainer Card.
- Over 900 Pokémon to discover and catch.
- Multiplayer support! Each player can either create their own Skyblock island, or share one with a team of players.
- Completely redone spawning rules for all Pokémon. Build normal Pokémon a habitat using certain blocks to attract them to your island. To find legendaries, you will need to build them, special shrines.
- Unique Skyblock progression featuring the Create mod, new types of cobblestone generators, rebalanced recepes, and rethought Pokémon drops.
- Pokémon passively drop loot to help you build up your island whetehr they are in the wild, let out of their Pokéball for a while, or roaming free in a pasture.
- No hunger interupting your Pokémon adventure. All food items now restore health over time instead.
- Pokémon will work when put in the pasture.
    - Physic type Pokémon and Pokémon that can have the pickup ability will pick up items and put them in nearby chests.
    - Bug type Pokémon will harbest apricorns for you.
    - And more!
- Renewable archeology blocks with intact loot waiting to be unearthed. Your cobblestone generators have a chance to produce suspicious cobblestone that can be crushed with a hammer or millstone into suspicious gravel or sand,
- Craft a special meteor beacon and pull down a meteor from space to harvest rare materials from. This will be the key to mega evolving Pokémon and perhaps finding a way to summon a certain mysterious Pokémon.
- Lore to uncover about why exactly you find yourself floating in a sea of nothingness.
- Summon villagers to your island with a bell, an empty bed, and a water source. Trade with them using a new currency: Cobbledollars.

## Credits
- Cobblemon
- Create
- [Legendary Monuments](https://modrinth.com/mod/legendary-monuments) for certain textures and models.
- more credits coming soon...

# Development
## Generate Data and Serve Development Server
```
bun run scripts/generate_pokemon_spawns.ts && bun run scripts/generate_pokemon_drops && bun run scripts/generate_archaeology_loot.ts && packwiz refresh && packwiz serve
```

## MultiMC Pre-launch Command
```
$INST_JAVA -jar $INST_DIR/packwiz-installer-bootstrap.jar http://localhost:8080/pack.toml
```
