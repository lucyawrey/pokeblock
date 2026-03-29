# Pokéblock Todo
## Normal Priority
- [ ] Current Pokemon Spawn: #13
- [ ] Investigate clearing all pre-existing cobblemon spawns, and generating new spawn data from a google spreadsheet with a script.
- [ ] Custom Pokemon Spawning Rules
	- [ ] Remove most spawning requirements such as height or biome.
	- [ ] Make many Pokemon spawn based on nearby blocks, like Rotom.
	- [ ] Still separate spawns based on dimension.
	- [ ] Refernce https://wiki.cobblemon.com/index.php/Tutorials/Creating_Custom_Spawns
- [ ] Add more drops from tall grass, potentially with the farmers delight tool (can be spawned by bone meal).
- [ ] Re adjust cobblemon pokemon spawning to be slightly less common.
- [ ] Remove spawn block requirements but not spawn fluid requirements. Enable pokenav's hideNaturalBlockConditions after.
- [ ] Replace shulker boxes with apricorn boxes (use sophisticated versions)
- [ ] Craftable suspicious gravel and sand. Made by crushing suspicious cobblestone (new) that occassionally generates from standard cobblestone generators. All possible suspicious gravel and sand loot should be available fro mcrafted instances because no specific structures generate.
- [ ] Set up pokemon dropping items from their species drop list passively when in the world and not in battle, such as when wild or out of pokeball.
	- [ ] Currently using [this](https://github.com/YoruTheWizard/cobblemon-pasture-loot-neoforge-port) to get drops from at least pastures. Will want to get rid of it later.
	- [ ] This may solveable with https://modrinth.com/mod/cobblemon-droploottables/versions but would require forking the mod to allow `preserve_base_drops` on the tick event. Highest priority task.
	- [ ] Another option is to make a custom mod that does this using the  as a referance.
- [ ] Install and setup FancyMenu for custom pack menu.
- [ ] Setup default controls and other core settings
- [ ] Setup default minimap config

## Low Priority
- [ ] Create IV soda mod. Bottle cap (expensive and made of metal and gems) + Sugar + EV Berry + water bottle in cobblemon camp cooking pot.
- [ ] Consider renaming pack to Cobbleblock.
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