# Chess Game

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Offline](https://img.shields.io/badge/Offline-Ready-2EA44F)](#fitur-utama)

Chess Game adalah aplikasi catur berbasis web yang berjalan sepenuhnya di browser. Project ini dibangun dengan React dan Vite, menggunakan `chess.js` untuk validasi aturan catur, `react-chessboard` untuk papan permainan, serta Web Audio API untuk efek suara tanpa file audio eksternal.

Repository: [AdventusSimanjuntak/chess-game](https://github.com/AdventusSimanjuntak/chess-game)

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Mode Permainan](#mode-permainan)
- [Level Bot](#level-bot)
- [Tech Stack](#tech-stack)
- [Persyaratan](#persyaratan)
- [Instalasi](#instalasi)
- [Script NPM](#script-npm)
- [Struktur Project](#struktur-project)
- [Cara Bermain](#cara-bermain)
- [Sound dan Penyimpanan Lokal](#sound-dan-penyimpanan-lokal)
- [Arsitektur Singkat](#arsitektur-singkat)
- [Testing Manual](#testing-manual)
- [Batasan Saat Ini](#batasan-saat-ini)
- [Roadmap](#roadmap)

## Fitur Utama

- Bermain catur secara offline tanpa backend, database, atau API eksternal.
- Player vs Player untuk dua pemain pada perangkat yang sama.
- Player vs Bot dengan empat level kesulitan.
- Validasi legal move menggunakan `chess.js`.
- Dukungan aturan dasar dan lanjutan catur, termasuk check, checkmate, stalemate, draw, castling, en passant, dan promotion.
- Drag and drop piece melalui `react-chessboard`.
- Auto-promotion pawn menjadi queen.
- Move history dengan notasi SAN.
- Status permainan real-time.
- Restart game dan kembali ke menu utama.
- Preferensi permainan tersimpan di `localStorage`.
- Efek suara dihasilkan langsung dengan Web Audio API.
- Layout responsif untuk desktop, tablet, dan mobile.
- Tema gelap terinspirasi dari antarmuka chess.com.

## Mode Permainan

| Mode | Deskripsi |
| --- | --- |
| Player vs Player | Dua pemain bermain bergantian pada satu perangkat. |
| Player vs Bot | Pemain melawan bot lokal dengan pilihan warna putih atau hitam. |

Pada mode Player vs Bot, bot akan bergerak otomatis setelah giliran pemain selesai. Jika pemain memilih warna hitam, bot akan memainkan langkah putih pertama.

## Level Bot

| Level | Strategi | File |
| --- | --- | --- |
| Beginner | Memilih langkah legal secara acak. | `src/engine/beginnerBot.js` |
| Medium | Memprioritaskan capture dengan nilai material tertinggi, lalu fallback ke random move. | `src/engine/mediumBot.js` |
| Hard | Minimax depth 3 dengan alpha-beta pruning, evaluasi material, piece-square table, dan mobility. | `src/engine/hardBot.js` |
| Grandmaster | Menggunakan algoritma Hard dengan depth 5. | `src/engine/grandmasterBot.js` |

Bot berjalan sepenuhnya di sisi client. Tidak ada engine eksternal seperti Stockfish, sehingga level bot ditujukan untuk pengalaman bermain ringan di browser.

## Tech Stack

| Teknologi | Fungsi |
| --- | --- |
| React 18 | Membangun UI berbasis komponen. |
| Vite 5 | Development server dan production build. |
| chess.js | Rules engine, validasi langkah, status game, dan notasi. |
| react-chessboard | Komponen papan catur interaktif. |
| Web Audio API | Membuat efek suara secara programatik. |
| localStorage | Menyimpan preferensi mode, level bot, warna pemain, dan status sound. |
| CSS | Styling custom untuk tema dan responsive layout. |

## Persyaratan

- Node.js `^18.0.0` atau `>=20.0.0`
- npm

Persyaratan Node mengikuti engine requirement dari Vite 5.

## Instalasi

Clone repository:

```bash
git clone https://github.com/AdventusSimanjuntak/chess-game.git
cd chess-game
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka aplikasi di browser:

```text
http://localhost:5173
```

## Script NPM

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan Vite development server. |
| `npm run build` | Membuat production build ke folder `dist`. |
| `npm run preview` | Menjalankan preview untuk hasil production build. |

## Struktur Project

```text
chess/
├── public/
│   └── sounds/
│       └── README.md
├── src/
│   ├── components/
│   │   ├── GameControls.jsx
│   │   ├── GameScreen.jsx
│   │   ├── GameStatus.jsx
│   │   ├── Menu.jsx
│   │   └── MoveHistory.jsx
│   ├── engine/
│   │   ├── beginnerBot.js
│   │   ├── botEngine.js
│   │   ├── grandmasterBot.js
│   │   ├── hardBot.js
│   │   └── mediumBot.js
│   ├── hooks/
│   │   └── useChessGame.js
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── soundManager.js
│   │   └── storage.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Cara Bermain

### Player vs Player

1. Pilih mode `Player vs Player`.
2. Klik `Start Game`.
3. Putih bergerak lebih dulu.
4. Drag piece dari square asal ke square tujuan.
5. Permainan selesai saat checkmate, stalemate, atau draw.

### Player vs Bot

1. Pilih mode `Player vs Bot`.
2. Pilih level bot.
3. Pilih warna pemain.
4. Klik `Start Game`.
5. Lakukan langkah saat giliran pemain.
6. Bot akan bergerak otomatis setelah jeda singkat.

## Sound dan Penyimpanan Lokal

Sound dibuat melalui `src/utils/soundManager.js` dengan Web Audio API. Aplikasi tidak membutuhkan file MP3 untuk efek suara utama.

Jenis suara yang tersedia:

| Event | Respons Audio |
| --- | --- |
| Normal move | Tone pendek bernada tinggi. |
| Capture | Dua tone menurun. |
| Check | Tone alert. |
| Game over | Chord progression. |
| Illegal move | Tone rendah seperti error. |

Data yang tersimpan di browser:

```json
{
  "chess_preferences": {
    "gameMode": "pvp",
    "botLevel": "beginner",
    "playerColor": "white"
  },
  "chess_sound_enabled": true
}
```

## Arsitektur Singkat

- `App.jsx` mengatur transisi antara menu dan layar permainan.
- `Menu.jsx` mengatur pilihan mode, level bot, warna pemain, dan menyimpan preferensi.
- `GameScreen.jsx` menghubungkan papan catur, status permainan, move history, kontrol, sound, dan bot.
- `useChessGame.js` menyimpan state game berbasis `Chess`, menjalankan move, memperbarui FEN, status, dan move history.
- `engine/` berisi dispatcher bot serta strategi untuk setiap level.
- `utils/` berisi helper untuk storage, sound, nilai piece, dan piece-square table.
- `styles/App.css` mengatur tema visual dan responsive layout.

## Testing Manual

Checklist pengujian dasar:

- Jalankan `npm run build` dan pastikan build berhasil.
- Jalankan `npm run dev`, lalu buka `http://localhost:5173`.
- Pastikan menu dapat memilih mode PvP dan PvBot.
- Pastikan semua level bot dapat dipilih.
- Uji drag and drop piece legal dan illegal.
- Uji turn handling pada mode Player vs Bot.
- Uji restart game dan kembali ke menu.
- Uji sound toggle dan tombol test sound.
- Uji tampilan pada desktop dan mobile.

## Batasan Saat Ini

- Belum ada fitur undo atau redo.
- Belum ada chess clock.
- Promotion selalu menjadi queen.
- Game aktif belum dapat disimpan dan dilanjutkan.
- Bot adalah heuristic/minimax lokal, bukan engine kompetitif seperti Stockfish.
- Tema masih satu varian.
- Belum ada automated test suite.