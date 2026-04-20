# Pokéblock - Cobblemon Skyblock
An in-development Skyblock modpack focused primarily on Cobblemon, and to a lesser extent Create. Built with love by LucyAzalea.

## Modpack Features
- Start on a classic Skyblock island with only a block of ice, a lava bucket, and a single apricorn tree
- ...plus the tools of a trainer: a starter Pokémon, a Pokédex, a Pokénav, and a Trainer Card.
- All 1025 Pokémon! Many Legendary Pokémon are not mot yet obtainable however obtainable without cheats at the moment.
- Multiplayer support! Each player can either create their own Skyblock island, or share one with a team of players.
- Completely redone spawning rules for all Pokémon. Build regular Pokémon a habitat using certain blocks to attract them to your island.
- Most Legendary Pokémon fully implimented. You will need to build them custom multiblock shrines and offer up special items in order to summon them to your island and catch them!
- Unique Skyblock progression featuring the Create mod, new types of cobblestone generators, rebalanced recepes, and rethought Pokémon drops.
- Pokémon passively drop loot to help you build up your island whetehr they are in the wild, let out of their Pokéball for a while, or roaming free in a pasture. You can automatically collect these drops by crafting a Pokébasket.
- No hunger interupting your Pokémon adventure. All food items now restore health over time instead.
- Renewable archeology blocks with intact loot waiting to be unearthed. Your cobblestone generators have a chance to produce suspicious cobblestone that can be crushed with a hammer or millstone into suspicious gravel or sand,
- Craft a special meteor beacon and pull down a meteor from space to harvest rare materials from. This will be the key to mega evolving Pokémon and perhaps finding a way to summon a certain mysterious Pokémon.
- Lore to uncover about why exactly you find yourself floating in a sea of nothingness.
- Summon villagers to your island with a bell, an empty bed, and a water source. Trade with them using a new currency: Cobbledollars.
- Building high up makes it start to snow, building low shows that something is wrong...
- Rebalanced fishing loot. Junk and treasure are more common, new items and jungle exclusive items in the pool reguardless of biome.

## Credits
- Cobblemon
- Create
- Planeta Cobblemon Pokémon Pack (Virizion, Celesteela, Iron Hands, Iron Jugulis, Ting-Lu, Iron Boulder)
- TDmon (Tympole Line)
- MysticMons (Pheromosa)
- more credits coming soon...

# Development
## Generate Data and Serve Development Server
```sh
bun run --cwd scripts generate && packwiz refresh && packwiz serve
```

## MultiMC Pre-launch Command
```
$INST_JAVA -jar $INST_DIR/packwiz-installer-bootstrap.jar http://localhost:8080/pack.toml
```
