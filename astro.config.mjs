import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { SITE, BASE } from './site.config.mjs';

const group = (label, directory) => ({ label, items: [{ autogenerate: { directory } }] });

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Stock Farmer Wiki',
      description: 'How Stock Farmer works: crops, animals, buildings, fishing, mining, the Stock Market and more.',
      favicon: '/favicon.svg',
      logo: { src: './src/assets/logo-carrot.png', alt: '' },
      lastUpdated: false,
      tableOfContents: false,
      pagination: true,
      credits: false,
      customCss: ['./src/styles/wiki.css'],
      components: {
        Footer: './src/components/Footer.astro',
      },
      sidebar: [
        { label: 'Home', link: '/' },
        { label: 'Farm Screen', link: '/farm-screen/' },
        group('Farming', 'farming'),
        group('Animals', 'animals'),
        group('Fishing and gathering', 'gathering'),
        group('Buildings', 'buildings'),
        { label: 'Crafting', link: '/crafting/' },
        { label: 'Storage and selling', link: '/storage-and-selling/' },
        { label: 'Stock Market', link: '/stock-market/' },
        { label: 'Quests and the Market Stand', link: '/quests/' },
        { label: 'Levels and unlocks', link: '/levels/' },
        group('World', 'world'),
        group('Decorations and terrain', 'decorations'),
        { label: 'Tools and upgrades', link: '/tools/' },
        { label: 'Progress', link: '/progress/' },
        group('Settings and saves', 'settings'),
        { label: 'Platforms', link: '/platforms/' },
        { label: 'Changelog', link: '/changelog/' },
      ],
    }),
  ],
});
