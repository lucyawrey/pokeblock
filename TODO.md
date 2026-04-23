# Pokéblock Todo

## Normal Priority
- Update spawn table.
  - Manually fill in remaining spawn data for non-legendary and non-fossil Pokémon.
  - Add support for Pokérod fishing weights.
    - Autofill script
    - Spawn generation script
- Update drop table.
  - Modify drop tables to add important drops for progression.
- Descriptions for custom items (sus cobblestone, shrine items, meteor beacon.)
- Tera Shard blocks that allow spawning Paradox Pokémon.
- Legendary Summoning Shrines.
  - Multi Pokémon shrines, will need some changes to how shrines currently work.
  - Add more legendary Pokémon.
- Setup radical trainers mod and trainers resourcepack with no natural spawns (must summon with radical trainer block) and only a single doubles-focused series. Initial series will be focused on kanto with kanto gym leaders and team rocket. Team rocket may have shadow pokemon.
  - https://modrinth.com/resourcepack/rct-trainer-textures-plus
- Shadow Pokémon from Shadowed Hearts.
  - Need to configure to make natural spawns ridiculously rare.
  - Create custom shadow meteor for meteor beacons.
  - Craftable purification shrine.
- Renewable sculk from sculk catalysts without vanilla mobs. Add sculk catalyst meteor.
- Rename Ender Pearl, Eye of Ender, Ender Chest, Phantom Membrane.
- Craftable Elytra.
- Rename Shulker Boxes and Shells to Apricorn Boxes and Apricorn Casing. Replace with new crafting recipe (7 apricorns (pink/blue), 1 psychic eye).
- Setup default controls and other core settings
- Create stat soda mod. Bottle cap (expensive and made of metal and gems) honey + Sugar + EV Berry + water bottle in cobblemon camp cooking pot.
- Create command to instant copy datapacks and kubejs scripts into .minecraft dir.
- Configure CobbleDollars merchant stock, CobbleDollars bank.
- More meteor templates (inclduing meteor with just evo stones, sculk meteor, variants of existing meteors).
- Migrate to github tasks, create completed tasks for important old tasks in order to better track modpack feartures.
- Create list of all modpack features, especially ones totally new to this pack (spawning mechanics, meteors).
- Replace current villagers and default Radical Trainers trainers with unified NPC system. (Large Task)
  - Look into how cobblemon and Radical Trainers handle NPCs.
  - NPCs should spawn automatically but not immediately once you build a proper enviornment for them.
  - NPCs should all be named and unique (will never attemt to spawn a duplicate of an NPC even if a valid enviornment for them exists within the same dimension and a certain large radius) NPCs can respawn if voided.
  - NPCs should be immune to player damage and persistant (will not despawn).
  - NPCs can be Social, Trainers, or Merchants.
  - All NPCs have chat dialogue.
  - No NPCs look like vilagers.
  - Permissions and Credits
  - Create proper credits list for all used mods and include in readme and description.
  - Verify licence of all mods in modpack.
  - Ask for permission to use mods in modpack if they are not explicitly open licensed (example: Mega Showdown).
  - Add disclaimer that all mods, Minecraft, and Pokémon belong to their respective rights holders. (referance Cobblemon and Cobbleverse statements.)
- Update Wild Loot with more accurate loot drops to baskets (and maybe also ground drops, unsure if that is being handled properly) ((respect percentages)).
- Skyblock Builder Fixes
  - Spawn protection not preventing harvesting berries and taking items from display cases.
  - Home island spawn in waterfall for some reason.
- Create Lore!
  - Journal entries in island starting chest, in the nether, and in one of the meteorites.
  - Secret Giritina dungeon underneath world spawn. Will need to make certain blocks like doors and buttons interactable at spawn in Skyblock config.
  - Comment on strange non-pokemon fish.
- More interesting and difficult fossil machine recipes to obtain Type: Null and Genesect.
  - Current methods from ATMxMSD https://docs.google.com/document/d/1nPZxD0zWqaCsulp_RCRTiQS5YxUrdoE6xv8rsMoWSYs/edit?tab=t.rvlm7mgw1drd.

## Lore Books/Tablets
- Starting Chest
- Nether Chest (Under Soul Sand)
- Archaeology loot (probably gravel only)
- Fishing loot (treasure)
- Meteor (specific meteor with hidden chest in center)
- Any Summoning (first time only)
- Lugia Summoning (first time only)
- Wandering trader

## Lore Flavour Text
- Legendary summon items.
- Lore books.

## Important Drops
- Max Mushrooms (Pokemon, Red Mushroom Colonies, Wandering Trader)
- Moss Blocks
- Tera Shards
- Type Gems
- Auspiscious and Malicious Armor Recipes
- Green, Pink, and White apricorn seeds.
- Saplings
- Kelp
- Ice Block: add to more pokemon drops.
- Tree Bark from Create Log Cutting Recipes
- More organic compost recipes
- Evo stones from cobblegen (dripstone moon stone).

## Assets
- Wing Item Sprites (Arctic Wing, Charged Wing, Molten Wing)
- Orb Item Sprites (Articuno Orb, Zapdos Orb, Moltres Orb)
- Fragile Ocarina Sprite (see Pokémon 2000)
- Lugia Pedestal
- Mew Pedestal
- Ancient DNA (test tube)
- Ancient Fossil Dust
- Ancient Fossil (mew)
- Ancient Fossil Piece (1/4 ancient fossil)

## Low Priority
- Evaluate KubeJs script performance and reliability (Villager Spawns, Meteors, Legendary Monuments).
- Install and setup FancyMenu for custom home menu and loading screen.
- Rename pack to Cobbleblock.
- Changed ores generated from bedrock at deepslate levels to actualy be deepslate ores.
- Consider adding a minimap with good default settings (minimap toggle key, minimap not in the way of Battle UI) and the xaeroscobblemon resourcepack.
- Add option for users to enable vanilla mob spawning, currently impossible due to the datapack used to disable mob spawning.
- Rebuild Wild Loot into Cobblehelpers, an alternative to Cobbleworkers.
- Spawn traders and villagers with partner pokemon.
- Add End dimensiopn support.
  - Craftable End Portals
  - Disable generation for default end return portal.
  - Disable ender dragon.
  - Add a generated End island for each Skyblock. Can't be done currently in base Skyblock Builder.
