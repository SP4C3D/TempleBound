# 🛕 TempleBound

**TempleBound** adalah game simulasi berbasis web di mana pemain mengendalikan karakter  untuk menjelajahi berbagai lokasi seperti rumah, gerbang, aula, sungai, dan kuil. Game ini dibuat sebagai proyek ReactJS dan menyajikan elemen gameplay yang menggabungkan eksplorasi, manajemen status, dan interaksi dengan lingkungan.

---

## 🎮 Fitur Utama

- 🧍‍♂️ **Karakter Interaktif**  
  Pemain dapat memilih karakter dan menggerakkannya menggunakan tombol arah (`WASD` / panah).

- 🗺️ **Peta Multi-Lokasi**  
  Terdapat berbagai lokasi yang bisa dijelajahi seperti:
  - Home
  - Temple
  - Hall
  - River Post
  - Gate

- 💡 **Aktivitas Berdasarkan Lokasi**  
  Tiap lokasi menyediakan aktivitas unik seperti:
  - Tidur (menambah energi)
  - Makan (menambah food)
  - Mandi (menambah hygiene)
  - Main musik, dll.

- 🧠 **Manajemen Status Karakter**  
  Terdapat empat status utama yang harus dijaga:
  - Food 🍗
  - Energy ⚡
  - Hygiene 🚿
  - Mood 🎵

  Jika salah satu mencapai 0, maka **Game Over** akan terjadi.

- ⏱️ **Timer & Skor**  
  Total waktu bermain dan uang yang dikumpulkan akan dihitung sebagai **Skor Akhir** saat Game Over.

- 🎒 **Inventaris**  
  Pemain dapat mengumpulkan item seperti:
  - Apple 🍎
  - Music 🎵
  - Drink 🥤
  - Fish 🎣

- 🌀 **Animasi Transisi**  
  Perpindahan antar lokasi diiringi dengan animasi transisi berupa GIF.

---

## 🛠️ Teknologi yang Digunakan

- **ReactJS** untuk komponen UI dan manajemen state.
- **Bootstrap 5** untuk desain responsif.
- **JavaScript + CSS** untuk animasi karakter & transisi.
- **Modular Components** seperti:
  - `GameArena`, `StatusBar`, `GameOverScreen`, `ControlActivity`, dll.