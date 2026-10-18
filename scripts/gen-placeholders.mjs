// gen-placeholders.mjs
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
mkdirSync(outDir, { recursive: true });

// Minimal valid 1x1 white WebP (base64 encoded) — 90 bytes
const minWebP = Buffer.from('UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoBAAEAAkA4JZQCdAEO/gCOAAD++P/////////8AAA=', 'base64');

// Replace only placeholder-2.webp to fix the size violation
writeFileSync(join(outDir, 'placeholder-2.webp'), minWebP);
console.log('Replaced placeholder-2.webp with minimal 1x1 WebP (90 bytes)');
console.log('✓ placeholder-2.webp now under 200 KB limit');
