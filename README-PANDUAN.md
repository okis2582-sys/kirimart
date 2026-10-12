# Kirimart Modern — Panduan singkat

## Struktur folder

- `index.html` — susunan halaman dan semua bagian fitur.
- `style.css` — semua desain, warna, animasi, dan tampilan responsif.
- `script.js` — interaksi menu, modal, animasi, pencarian, dan notifikasi.
- `assets/` — ilustrasi dan foto.

## Mengganti ilustrasi dengan foto sendiri

Website sudah disiapkan untuk mencari dua foto berikut terlebih dahulu:

1. `assets/foto-kurir-saya.jpg` — foto untuk kartu Kurir Kirimart dan bagian karir kurir.
2. `assets/foto-toko-saya.jpg` — foto untuk kartu UMKM dan bagian promosi UMKM.

Salin foto milik Anda ke folder `assets/` dengan nama persis seperti di atas. Jika file foto belum ada, website otomatis memakai ilustrasi bawaan `courier.svg` dan `seller.svg`, sehingga gambar tidak rusak.

Gunakan foto JPG atau PNG. Jika memakai PNG, ubah ekstensi pada atribut `src` di `index.html` dari `.jpg` menjadi `.png` untuk kedua nama foto tersebut.

## Bagian kode mudah dicari

`index.html`, `style.css`, dan `script.js` telah diberi komentar pembatas bernomor/nama fitur. Gunakan pencarian teks editor untuk mencari kata seperti `FITUR 05: UMKM`, `MODAL`, `NAVIGASI`, atau `RESPONSIF`.

## Menjalankan

Untuk website statis ini, buka `index.html` di browser atau jalankan server lokal sesuai setup proyek Anda. File ini tidak menggantikan backend/database Kirimart yang terpisah.

**Catatan:** Arsip yang dikirim tidak berisi foto pribadi. Slot foto sudah disiapkan, tetapi foto asli baru tampil setelah Anda memasukkan foto Anda sendiri ke folder `assets/`.
