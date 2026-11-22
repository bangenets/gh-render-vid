# Tes render video 3D di GitHub Actions (gratis)

## Yang dibuktikan tes ini
Apakah video animasi 3D dari kode (three.js + Playwright + ffmpeg) bisa
di-render di komputer GitHub Actions — gratis, tanpa kredit Flow, tanpa VPS.

## Fakta tarif (dok resmi GitHub, dicek 22 Nov 2026)
- Repo **publik** + runner standar: **gratis, tanpa batas menit**.
- Repo privat + akun Free: 2.000 menit Linux/bulan (jatah $12).
- Penyimpanan artifact akun Free: 500 MB (satu video 5 detik cuma beberapa MB).
- **Tidak ada** aturan "94 klip/hari" di GitHub mana pun — angka itu jangan dipegang.

## Yang BUKAN dibuktikan tes ini
Ini bukan video AI (Veo/Flow). Ini render animasi dari kode — sama seperti
video hidram 3D yang selama ini di-render di VPS. Bedanya cuma tempat
rendernya: komputer GitHub, gratis, dan bisa jalan paralel.

## Cara jalanin tes
1. User bikin repo **publik** kosong di GitHub, nama bebas (mis. `gh-render-test`).
2. Muse push 4 file ini ke repo itu (scene.html, render.mjs, package.json,
   .github/workflows/render.yml).
3. Buka repo > tab **Actions** > workflow **render-test** > **Run workflow**.
4. Tunggu ±3–5 menit. Kalau hijau, unduh artifact **test-video** — itu video
   5 detik 720x1280 hasil render di GitHub.
5. Kalau video jadi dan gerakannya benar → jalur ini TERBUKTI, baru pindahin
   scene beneran (hidram dll.) ke sini. Kalau gagal, baca log Actions-nya
   dan perbaiki dari situ — jangan tebak-tebak.

## Isi paket
- `scene.html` — diorama mini 5 detik, niche acak: **gunung berapi meletus**
  (langit senja, kawah menyala berdenyut, lava mengalir turun, asap naik,
  desa kecil di kaki gunung, villager lari menjauh). Scene sebagai fungsi
  murni waktu `renderAt(t)`, pola yang sama dengan render hidram di VPS.
- `render.mjs` — Playwright: buka scene, screenshot 30 frame/detik.
- `.github/workflows/render.yml` — install Playwright + Chromium, render,
  encode ffmpeg ke mp4, upload artifact.
