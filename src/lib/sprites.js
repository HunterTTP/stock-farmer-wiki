// The game's own pictures (public/sprites, written by the game's data export at the art's own pixel size). A picture is shown at a
// whole-number multiple of its pixels (or a half, a third or a quarter for big ones) so pixel art stays sharp.

const SCALES = [8, 6, 5, 4, 3, 2, 1, 1 / 2, 1 / 3, 1 / 4];

/** The size to show a picture at so its longer side fits in `box` CSS pixels. */
export function spriteSize(icon, box = 48) {
  const longest = Math.max(icon.width, icon.height);
  const scale = SCALES.find((s) => longest * s <= box) ?? SCALES[SCALES.length - 1];
  const round = (value) => Math.round(value * 100) / 100;
  return { width: round(icon.width * scale), height: round(icon.height * scale) };
}

/** The picture's address on the site. */
export function spriteSrc(icon, base = '/') {
  return `${base.replace(/\/$/, '')}/${icon.src}`;
}
