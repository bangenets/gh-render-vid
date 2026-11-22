// Render scene.html jadi frame PNG per detik, pola yang sama dipakai di VPS.
// Jalankan: SECONDS=5 node render.mjs   (server http di 127.0.0.1:8901 harus jalan)
import { chromium } from 'playwright';
import fs from 'fs';

const SECONDS = parseInt(process.env.SECONDS || '5', 10);
const FPS = 30;
const total = SECONDS * FPS;
fs.mkdirSync('frames', { recursive: true });
fs.mkdirSync('out', { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 720, height: 1280 } });
await page.goto('http://127.0.0.1:8901/scene.html', { waitUntil: 'load' });
await page.waitForTimeout(2000); // three.js dari CDN + frame pertama

for (let i = 0; i < total; i++) {
  const t = i / FPS;
  await page.evaluate((tt) => window.renderAt(tt), t);
  await page.waitForTimeout(20); // biarkan frame ke-paint
  await page.screenshot({ path: `frames/frame_${String(i + 1).padStart(4, '0')}.png` });
}
await browser.close();
console.log(`OK ${total} frames (${SECONDS} dtk @ ${FPS} fps)`);
