// Formatting shared by every generated table, so numbers read the same on every page (see README, style guide).

/** Money as the game writes it in words, 100 silver to 1 gold: 12 gold 40 silver, 436 gold, 10 silver. Zero is "Free". */
export function money(amount, { zero = 'Free' } = {}) {
  if (amount == null) return '';
  const cents = Math.round(amount * 100);
  if (cents === 0) return zero;
  const gold = Math.trunc(cents / 100);
  const silver = Math.abs(cents % 100);
  const parts = [];
  if (gold !== 0 || silver === 0) parts.push(`${gold.toLocaleString('en-US')} gold`);
  if (silver !== 0) parts.push(`${silver} silver`);
  return parts.join(' ');
}

/** A time in whole seconds, at most two units: 10 s, 1 min 20 s, 2 h 5 min, 1 d 3 h. */
export function duration(seconds) {
  if (seconds == null) return '';
  const total = Math.max(0, Math.ceil(seconds));
  const units = [
    [Math.floor(total / 86400), 'd'],
    [Math.floor((total % 86400) / 3600), 'h'],
    [Math.floor((total % 3600) / 60), 'min'],
    [total % 60, 's'],
  ];
  const first = units.findIndex(([value]) => value > 0);
  if (first < 0) return '0 s';
  return units.slice(first, first + 2).filter(([value]) => value > 0).map(([value, unit]) => `${value} ${unit}`).join(' ');
}

/** Whole numbers with thousands separators: 1,158. */
export function count(value) {
  return value == null ? '' : Number(value).toLocaleString('en-US');
}

/** A list of things, or a dash-free blank when there are none. */
export function list(items, separator = ', ') {
  return (items ?? []).filter(Boolean).join(separator);
}

/** "2×2 tiles". */
export function size(width, height) {
  return `${width}×${height}`;
}

/** Materials as "30 Logs, 3 Stones". */
export function materials(items) {
  return list((items ?? []).map((m) => `${m.count} ${m.name}`));
}

/** A weight range in pounds: "0.3 to 2 lb". */
export function weight(min, max) {
  return `${min} to ${max} lb`;
}
