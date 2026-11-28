// Every generated table the pages can ask for by name: <DataTable name="crops" />. The rows come from src/data, which the game's
// catalogs write; nothing here types a game number. Columns are [heading, row => text]. `icon` gives a row's picture from the game
// (shown in a first column) and `cellIcons` a small picture for the cell under a heading.
import { money, duration, count, list, size, materials, weight } from './format.js';

const files = import.meta.glob('../data/*.json', { eager: true, import: 'default' });
export const data = Object.fromEntries(
  Object.entries(files).map(([path, value]) => [path.replace(/^.*\/(.*)\.json$/, '$1'), value]),
);

const level = (value) => (value == null ? '' : `${value}`);
const yes = (value) => (value ? 'Yes' : '');
const golemSizes = ['small', 'medium', 'large'];
const golems = (r) => list(golemSizes.filter((size) => r[`${size}Golems`]).map((size) => `${r[`${size}Golems`]} ${size}`));
const golemHits = (r) => list(golemSizes.filter((size) => r[`${size}GolemHits`] != null).map((size) => `${count(r[`${size}GolemHits`])} ${size}`));

export const tables = {
  crops: {
    rows: () => data.crops,
    icon: (r) => r.icon,
    columns: [
      ['Crop', (r) => r.name],
      ['Unlock level', (r) => level(r.unlockLevel)],
      ['Seed cost (per tile)', (r) => money(r.seedPrice)],
      ['Sells for', (r) => money(r.sellValue)],
      ['Grows in', (r) => duration(r.growSeconds)],
      ['XP', (r) => count(r.xp)],
    ],
  },
  'fruit-trees': {
    rows: () => data['fruit-trees'],
    icon: (r) => r.icon,
    cellIcons: { 'Basket sells for': (r) => r.basketIcon },
    columns: [
      ['Tree', (r) => r.name],
      ['Unlock level', (r) => level(r.unlockLevel)],
      ['Cost (once)', (r) => money(r.cost)],
      ['Basket sells for', (r) => money(r.basketValue)],
      ['Ripens in', (r) => duration(r.ripenSeconds)],
      ['XP', (r) => count(r.xp)],
      ['Most of a kind', (r) => count(r.limit)],
    ],
  },
  buildings: {
    rows: () => data.buildings,
    icon: (r) => r.icon,
    columns: [
      ['Building', (r) => r.name],
      ['Unlock level', (r) => level(r.unlockLevel)],
      ['Cost', (r) => money(r.cost)],
      ['Materials', (r) => materials(r.materials)],
      ['Size (tiles)', (r) => size(r.width, r.height)],
      ['Most you can build', (r) => count(r.limit)],
      ['What it does', (r) => r.purpose],
    ],
  },
  'home-upgrades': {
    rows: () => data['home-upgrades'].homes,
    icon: (r) => r.icon,
    columns: [
      ['Building', (r) => r.buildingName],
      ['Upgrade', (r) => `Level ${r.level}`],
      ['Unlock level', (r) => level(r.unlockLevel)],
      ['Cost', (r) => money(r.cost)],
      ['Materials', (r) => materials(r.materials)],
      ['Animals it holds', (r) => `${r.holdsBefore} → ${r.holdsAfter}`],
    ],
  },
  livestock: {
    rows: () => data.animals.livestock,
    icon: (r) => r.icon,
    cellIcons: { Baby: (r) => r.babyIcon, Gives: (r) => r.givesIcon },
    columns: [
      ['Animal', (r) => r.name],
      ['Baby', (r) => r.babyName],
      ['Lives in', (r) => r.home],
      ['Grows up in', (r) => duration(r.growSeconds)],
      ['Gives', (r) => r.gives ?? 'Nothing'],
      ['Every', (r) => duration(r.giveSeconds)],
      ['Sells for', (r) => money(r.givesValue ?? r.salePrice, { zero: '' })],
      ['Collect with', (r) => r.tool ?? ''],
    ],
  },
  'animal-colors': {
    rows: () => data.animals.livestock,
    icon: (r) => r.icon,
    columns: [
      ['Animal', (r) => r.name],
      ['Colors', (r) => list(r.colors)],
    ],
  },
  fish: {
    rows: () => data.fish.fish,
    icon: (r) => r.icon,
    columns: [
      ['Fish', (r) => r.name],
      ['Rarity', (r) => r.rarity],
      ['Weight', (r) => weight(r.minWeight, r.maxWeight)],
      ['Sells for', (r) => `${money(r.minPrice)} to ${money(r.maxPrice)}`],
    ],
  },
  rarities: {
    rows: () => data.fish.rarities,
    columns: [
      ['Rarity', (r) => r.name],
      ['Bites from level', (r) => level(r.fishFromLevel)],
      ['Kinds of fish', (r) => count(r.species)],
      ['Middling weight sells for', (r) => money(r.fishValue)],
    ],
  },
  ores: {
    rows: () => data.mining.ores,
    icon: (r) => r.icon,
    cellIcons: { 'Made into': (r) => r.productIcon },
    columns: [
      ['Ore', (r) => r.name],
      ['Vein', (r) => r.vein],
      ['Pieces per vein', (r) => count(r.piecesPerVein)],
      ['Each sells for', (r) => money(r.value)],
      ['Made into', (r) => r.product],
      ['Where', (r) => r.madeAt],
      ['Recipe', (r) => `${r.piecesPerProduct} → 1 in ${r.minutes} min`],
      ['Sells for', (r) => money(r.productValue)],
    ],
  },
  rocks: {
    rows: () => data.mining.rocks,
    icon: (r) => r.icon,
    columns: [
      ['Rock or vein', (r) => r.name],
      ['Gives', (r) => `${count(r.gives)} ${r.what === 'Stone' ? 'Stones' : r.what}`],
    ],
  },
  recipes: {
    rows: () => data.recipes,
    icon: (r) => r.icon,
    cellIcons: { From: (r) => r.inputIcon },
    columns: [
      ['Makes', (r) => (r.outputCount > 1 ? `${r.outputCount} ${r.output}` : r.output)],
      ['Workshop', (r) => r.building],
      ['From', (r) => `${r.inputCount} ${r.input}`],
      ['Takes', (r) => duration(r.seconds)],
      ['Each sells for', (r) => money(r.outputValue)],
      ['XP', (r) => count(r.xp)],
      ['Unlock level', (r) => level(r.unlockLevel)],
    ],
  },
  decorations: {
    rows: () => data.decorations,
    icon: (r) => r.icon,
    columns: [
      ['Decoration', (r) => r.name],
      ['Cost', (r) => money(r.cost)],
      ['Materials', (r) => materials(r.materials)],
      ['Size (tiles)', (r) => size(r.width, r.height)],
      ['Looks', (r) => count(r.looks)],
      ['Does', (r) => r.effect ?? ''],
    ],
  },
  'market-supplies': {
    rows: () => data.market.shop,
    icon: (r) => r.icon,
    columns: [
      ['Item', (r) => r.name],
      ['Unlock level', (r) => level(r.unlockLevel)],
      ['Price', (r) => money(r.price)],
      ['Most per day', (r) => count(r.dailyLimit)],
      ['Sells for', (r) => money(r.sellsFor)],
    ],
  },
  'skin-prices': {
    rows: () => data.market.skinPrices,
    icon: (r) => r.icon,
    columns: [
      ['Building', (r) => r.buildingName],
      ['Common', (r) => money(r.basic)],
      ['Rare', (r) => money(r.rare)],
      ['Epic', (r) => money(r.epic)],
      ['Legendary', (r) => money(r.legendary)],
    ],
  },
  paths: {
    rows: () => data.terrain.paths,
    columns: [
      ['Path', (r) => r.name],
      ['Cost per tile', (r) => money(r.cost)],
      ['Looks', (r) => list(r.looks)],
    ],
  },
  trees: {
    rows: () => data.terrain.trees,
    icon: (r) => r.icon,
    columns: [
      ['Tree', (r) => r.name],
      ['Cost to plant', (r) => money(r.cost)],
      ['Colors', (r) => list(r.colors)],
      ['Grows wild', (r) => yes(r.wild)],
      ['Logs from a wild one', (r) => (r.wild ? count(r.logsWhenWild) : '')],
    ],
  },
  'tool-upgrades': {
    rows: () => data.tools.flatMap((tool) => tool.upgrades.map((u) => ({ ...u, tool: tool.name }))),
    icon: (r) => r.icon,
    columns: [
      ['Tool', (r) => r.tool],
      ['Upgrade', (r) => `Level ${r.level}`],
      ['Unlock level', (r) => level(r.unlockLevel)],
      ['Cost', (r) => money(r.cost)],
      ['What it does', (r) => list(r.effects, '; ')],
    ],
  },
  tools: {
    rows: () => data.tools,
    icon: (r) => r.icon,
    columns: [
      ['Tool', (r) => r.name],
      ['Gathers', (r) => r.gathers],
    ],
  },
  caveLevels: {
    rows: () => data.cave.levelRows.filter((r) => r.level === 1 || r.level % 10 === 9),
    columns: [
      ['Level', (r) => level(r.level)],
      ['Waves', (r) => count(r.waves)],
      ['Small enemies', (r) => count(r.smallEnemies)],
      ['Golems', (r) => golems(r) || 'None'],
      ['Hits to beat a golem', (r) => golemHits(r)],
      ['First-clear reward', (r) => r.reward],
    ],
  },
  caveBossLevels: {
    rows: () => data.cave.levelRows.filter((r) => r.boss),
    columns: [
      ['Level', (r) => level(r.level)],
      ['Boss', (r) => r.bossName],
      ['Wall', (r) => yes(r.wall)],
      ['Small enemies', (r) => count(r.smallEnemies)],
      ['Hits to beat the boss', (r) => count(r.bossHits)],
      ['First-clear reward', (r) => r.reward],
    ],
  },
  caveBossRewards: {
    rows: () => data.cave.rewards.bossRewards,
    columns: [
      ['Level', (r) => level(r.level)],
      ['Crew unlock', (r) => r.crewUnlock ?? ''],
      ['Skin reward', (r) => r.skinReward],
      ['Extra reward', (r) => r.extraReward ?? ''],
    ],
  },
  caveGates: {
    rows: () => data.cave.gates,
    columns: [
      ['After boss level', (r) => level(r.afterLevel)],
      ['Opens level', (r) => level(r.unlocksLevel)],
      ['Wait', (r) => duration(r.cooldownSeconds)],
      ['Full skip price', (r) => money(r.fullSkipPrice)],
    ],
  },
  caveZones: {
    rows: () => data.cave.zones,
    columns: [
      ['Levels', (r) => `${r.first} to ${r.last}`],
      ['Zone', (r) => r.name],
      ['Room', (r) => `${r.roomSize}×${r.roomSize} tiles`],
      ['Doors', (r) => count(r.doors)],
      ['Liquid', (r) => (r.liquid ? `${r.liquid}: ${r.layout.charAt(0).toLowerCase()}${r.layout.slice(1)}` : 'None')],
      ['Leans to', (r) => list(r.lean)],
      ['Boss', (r) => r.boss],
    ],
  },
  caveEnemies: {
    rows: () => data.cave.enemies,
    columns: [
      ['Enemy', (r) => r.name],
      ['First comes on', (r) => (r.firstLevel ? level(r.firstLevel) : 'From a Slime')],
      ['Speed', (r) => `${r.speed}`],
      ['Moves', (r) => r.moves],
      ['What to know', (r) => r.note],
    ],
  },
  caveGolems: {
    rows: () => data.cave.golems,
    columns: [
      ['Golem', (r) => r.size],
      ['Seconds to the chest', (r) => `${r.secondsToChest} s`],
      ['Chews a Shield', (r) => `${r.shieldChew} a second`],
      ['Sword push', (r) => r.shove],
    ],
  },
  caveBosses: {
    rows: () => data.cave.bosses,
    columns: [
      ['Boss', (r) => r.name],
      ['Levels', (r) => list(r.levels.map(String))],
      ['Health', (r) => `${r.hitShare} of the level's boss hits`],
      ['Seconds to the chest', (r) => `${r.secondsToChest} s`],
      ['Its trick', (r) => r.trick],
    ],
  },
  caveCrew: {
    rows: () => data.cave.crew,
    columns: [
      ['Crew', (r) => r.name],
      ['Unlocks', (r) => (r.unlockOrder ? `Level ${r.unlockOrder * data.cave.room.zoneLevels} boss` : 'From the start')],
      ['What it does', (r) => r.purpose],
      ['Numbers', (r) => list(r.stats, '; ')],
    ],
  },
  caveCrewSlots: {
    rows: () => data.cave.crewSlots,
    columns: [
      ['From level', (r) => level(r.from)],
      ['Crew', (r) => count(r.crew)],
    ],
  },
  caveCrewPace: {
    rows: () => data.cave.crewPace,
    columns: [
      ['Level', (r) => level(r.level)],
      ['Sword', (r) => `${r.swordSeconds} s`],
      ['Bow', (r) => `${r.bowSeconds} s`],
    ],
  },
  caveUpgrades: {
    rows: () => data.cave.upgrades,
    columns: [
      ['Crew', (r) => r.crew],
      ['Card', (r) => r.card],
      ['Each rank', (r) => r.detail],
    ],
  },
  pets: {
    rows: () => data.animals.pets.gallery,
    icon: (r) => r.icon,
    columns: [
      ['Pet', (r) => r.name],
      ['Kind', (r) => r.kind],
    ],
  },
  'animal-produce-xp': {
    rows: () => data.animals.produceXP,
    icon: (r) => r.icon,
    columns: [
      ['Item', (r) => r.item],
      ['From', (r) => r.from],
      ['Collect with', (r) => r.tool],
      ['XP', (r) => count(r.xp)],
    ],
  },
  'pet-crop-rush': {
    rows: () => data.animals.pets.cropRushTable,
    columns: [
      ['Time the pet has spent on crop tiles in a row', (r) => r.dwell],
      ['Chance each second that the crop under it ripens', (r) => r.chance],
    ],
  },
  'fish-rarity-details': {
    rows: () => data.fish.rarities,
    columns: [
      ['Rarity', (r) => r.name],
      ['Color', (r) => r.colorName],
      ['XP multiplier', (r) => count(r.xpMultiplier)],
      ['Time on the fish to catch it', (r) => `${r.fillSeconds} s`],
    ],
  },
  'fish-spawn-odds': {
    rows: () => data.fish.spawnOdds,
    columns: [
      ['Your level', (r) => r.levels],
      ['Common', (r) => r.common],
      ['Uncommon', (r) => r.uncommon],
      ['Rare', (r) => r.rare],
      ['Epic', (r) => r.epic],
      ['Legendary', (r) => r.legendary],
    ],
  },
  'fish-difficulty': {
    rows: () => data.fish.rarities,
    columns: [
      ['Rarity', (r) => r.name],
      ['Time on the fish to fill the bar', (r) => `${r.fillSeconds} s`],
      ['Speed against a Common fish', (r) => `${r.speedVsCommon} times`],
    ],
  },
  'fish-weight-bands': {
    rows: () => data.fish.weight.bands,
    columns: [
      ['Heavier than', (r) => r.heavierThan],
      ['Color', (r) => r.color],
    ],
  },
  'fish-xp-multipliers': {
    rows: () => data.fish.rarities,
    columns: [
      ['Rarity', (r) => r.name],
      ['Multiplier', (r) => count(r.xpMultiplier)],
    ],
  },
  'ore-shares': {
    rows: () => data.mining.oreShares,
    columns: [
      ['Your level', (r) => r.levels],
      ['Copper', (r) => r.copper],
      ['Iron', (r) => r.iron],
      ['Gold', (r) => r.gold],
      ['Ruby', (r) => r.ruby],
      ['Sapphire', (r) => r.sapphire],
    ],
  },
  'firefly-colors': {
    rows: () => data.world.fireflies.colors,
    columns: [
      ['Glow of a colored firefly', (r) => r.glow],
      ['Chance', (r) => r.chance],
      ['Chance a night has at least one', (r) => r.nightlyChance],
    ],
  },
  'butterfly-xp': {
    rows: () => data.world.butterflies.xpMultipliers,
    columns: [
      ['Wings or glow', (r) => r.glow],
      ['Multiplier', (r) => count(r.multiplier)],
    ],
  },
  'quest-targets': {
    rows: () => data.quests.targets,
    columns: [
      ['Kind', (r) => r.kind],
      ['Market Stand', (r) => r.standard],
      ['Upgraded stand', (r) => r.upgraded],
    ],
  },
  'quest-effort': {
    rows: () => data.quests.effort,
    columns: [
      ['Part', (r) => r.part],
      ['Effort', (r) => r.effort],
    ],
  },
  'darkness-timeline': {
    rows: () => data.world.dayNight.timeline,
    columns: [
      ['Farm time', (r) => r.time],
      ['How dark', (r) => r.state],
    ],
  },
  'rain-timeline': {
    rows: () => data.world.weather.rainTimeline,
    columns: [
      ['Farm time', (r) => r.time],
      ['Rain', (r) => r.state],
    ],
  },
  levels: {
    rows: () => data.levels,
    columns: [
      ['Level', (r) => level(r.level)],
      ['Total XP', (r) => count(r.xpToReach)],
      ['XP to next', (r) => (r.xpToNext == null ? 'Top level' : count(r.xpToNext))],
      ['Farmland', (r) => count(r.farmland)],
      ['Unlocks', (r) => list([
        ...r.crops, ...r.fruitTrees, ...r.buildings,
        ...r.recipes.map((name) => `${name} recipe`),
        ...r.toolUpgrades.map((name) => `${name} upgrade`),
        ...r.homeUpgrades.map((name) => `${name} upgrade`),
        ...r.fishRarities.map((name) => `${name} fish`),
        r.rarerFish ? 'Rarer fish more often' : '',
        r.stockQuests ? 'Stock Market quests' : '',
      ])],
    ],
  },
};

/** Rows of a table, optionally only those whose `field` equals `value`. */
export function rowsOf(name, field, value) {
  const table = tables[name];
  if (!table) throw new Error(`No table named ${name}`);
  const rows = table.rows();
  return field ? rows.filter((row) => `${row[field]}` === `${value}`) : rows;
}

/** One value from a data file by a dotted path, such as "world.daysPerSeason" or "buildings.chickenCoop.cost". */
export function fact(path) {
  const [file, ...keys] = path.split('.');
  let value = data[file];
  for (const key of keys) {
    if (Array.isArray(value)) value = value.find((row) => row.id === key || row.name === key);
    else value = value?.[key];
    if (value === undefined) throw new Error(`No fact at ${path}`);
  }
  return value;
}

export const formats = { money, duration, count, list, size, materials, weight };
