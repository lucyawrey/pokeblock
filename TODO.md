# Pokéblock Todo
## Normal Priority
- [ ] Set up pokemon dropping items from their species drop list passively when in the world in all cases except in battle (wild, released by trainer, pasture).
	- [ ] This may solveable with https://modrinth.com/mod/cobblemon-droploottables/versions but would require forking the mod to allow `preserve_base_drops` on the tick event. Highest priority task.
	- [ ] Another option is to make a custom mod that does this using [this](https://github.com/YoruTheWizard/cobblemon-pasture-loot-neoforge-port) as a referance.
- [ ] Custom Pokemon Spawning Rules
	- [ ] Fix pokemon not spawning on Skyblocks (core spawning config)
	- [ ] Remove most spawning requirements such as height or biome.
	- [ ] Make many Pokemon spawn based on nearby blocks, like Rotom.
	- [ ] Still separate spawns based on dimension.
	- [ ] Refernce https://wiki.cobblemon.com/index.php/Tutorials/Creating_Custom_Spawns
- [ ] Add more drops from tall grass, potentially with the farmers delight tool (can be spawned by bone meal).
- [ ] Replace shulker boxes with apricorn boxes (use sophisticated versions)
- [ ] Craftable suspicious gravel and sand. Made by crushing suspicious cobblestone (new) that occassionally generates from standard cobblestone generators. All possible suspicious gravel and sand loot should be available fro mcrafted instances because no specific structures generate.
- [ ] Install and setup FancyMenu for custom pack menu.
- [ ] Setup default controls and other core settings
- [ ] Setup default minimap config


## Low Priority
- [ ] Remove ancient pokeballs from cobblemon create
- [ ] Update master ball recipe for cobblemon create
- [ ] More detailed cobbleworkers configuration.
- [ ] Replace vanilla chest recepies with sophisticated ones. Remove Replace pokeblock island spawn chest with sophisticated one. Make sure sophisticated chests work with cobbleworkers.
- [ ] Fix Skyblock Builder World Spawn
- [ ] Change Cobblemon+Create brewing to use fluids properly. Currently brewing uses bottles and is based on Farmers Delight-Create-Cobblemon compatability interactions
- [ ] Fix neoforge-common.toml not copying correctly (gets overwritten immediately by forge), and thus not having skyblock as default world type
- [ ] Setup End portal crafting and end island handling. Delete default return portal and ender dragon. Can't be done in default Skyblock Builder.
- [ ] Deepslate ores at low y values
- [ ] Try setting up Cobble Cuisine and Cobble Delight with Sinatra Connector (fabric api adapter for neoforge)
- [ ] Allow users to reenable vanilla mob spawning