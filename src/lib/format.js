// Formatting shared by every generated table, so numbers read the same on every page (see README, style guide).

/** Money as the game writes it: whole gold with the cents dropped: 10g, 1g, 100,000g. Zero is "Free". */
export function money(amount, { zero = 'Free' } = {}) {
  if (amount == null) return '';
  if (amount === 0) return zero;
  return Math.trunc(Math.round(amount * 100) / 100).toLocaleString('en-US') + 'g';
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
