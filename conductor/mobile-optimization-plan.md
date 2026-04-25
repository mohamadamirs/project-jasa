# Rencana Eksekusi Optimasi Mobile-First & Desain Sistem v1.3.0

Dokumen ini merinci urutan pengerjaan issue-issue yang telah dibuat (#27 - #40) untuk memastikan tidak ada konflik kode (tabrakan) dan pembangunan struktur dilakukan secara bertahap dari fondasi hingga UX tingkat lanjut.

## Fase 1: Fondasi Visual & Struktural (Batch 1)
Fase ini fokus pada perbaikan variabel dasar CSS dan standarisasi elemen agar perbaikan selanjutnya tidak perlu mengubah nilai dasar lagi.

1. **Issue #29: Clean Up Color Palette**
   - Membersihkan residu `blue-100` s/d `blue-500` di seluruh proyek.
   - Mengganti dengan `blue-600/opacity` sesuai standar.
2. **Issue #30 & #34: Fluid Typography & iPhone SE UX**
   - Mengimplementasikan `clamp()` pada semua heading (H1-H3).
   - Menyesuaikan ukuran H1 secara spesifik agar tidak *line-break* aneh di layar 375px (iPhone SE).
3. **Issue #31: Fluid Section Spacing**
   - Mengganti utilitas statis seperti `py-20` dengan `py-[clamp(4rem,10vh,8rem)]` di semua section utama.
4. **Issue #32 & #37: Card Rounding & Full-Bleed Layouts**
   - Menerapkan kelas `.card-standard` di semua kartu.
   - Memastikan elemen visual (gambar/slider) menggunakan *full-bleed layout* (menyentuh pinggir layar) pada ukuran < 480px, yang mana akan membutuhkan penyesuaian *rounding* secara kondisional (`rounded-none` di mobile).

## Fase 2: Performa, Aksesibilitas, dan Komponen (Batch 2)
Fase ini mengoptimalkan aset, memastikan elemen dapat diakses dengan baik (termasuk di luar ruangan), dan merapikan komponen tumpang tindih.

5. **Issue #27: Optimasi Gambar Portofolio**
   - Refaktor `src/assets/portfolio/*.jpg` menggunakan komponen `<Image />` dari Astro.
   - Set atribut *lazy loading* dan *async decoding*.
6. **Issue #33 & #39: Kontras (Outdoor Usage) & Keyboard Nav**
   - Mengganti teks `slate-400` menjadi `slate-500` atau `slate-600` untuk keterbacaan di bawah sinar matahari.
   - Menambahkan *focus ring* yang jelas pada elemen interaktif.
7. **Issue #28: Standardisasi Z-Index & Touch Targets**
   - Merapikan hierarki Z-Index (Navbar: 50, Menu: 60, dst) agar tidak ada loncatan ekstrem.
   - Memastikan semua *touch target* (terutama di footer) minimal `44px`.
8. **Issue #38: Render Optimization (content-visibility)**
   - Menambahkan utilitas `content-visibility: auto` pada section yang berada di bawah lipatan layar (*below the fold*) untuk meringankan beban render di mobile.

## Fase 3: UX Lanjut & Konten Adaptif (Batch 3)
Fase ini menyempurnakan interaksi mikro dan adaptasi konten khusus mobile.

9. **Issue #35: Progressive Disclosure**
   - Mengimplementasikan akordeon atau tombol "Read More" pada teks deskripsi yang panjang untuk mengurangi *scroll fatigue*.
10. **Issue #36: Touch Micro-interactions**
    - Standarisasi `active:scale-95` dan memastikan feedback klik instan (< 50ms) menggunakan warna *tap-highlight* transparan.
11. **Issue #40: Mobile-Optimized Spintax**
    - Menyempurnakan fungsi `utils/spintax.ts` untuk mendukung variasi ringkas yang ramah mobile (mencegah teks kepanjangan di layar sempit).

---
**Catatan Persetujuan:** 
Urutan ini dirancang agar setiap perubahan membangun di atas perubahan sebelumnya. Setuju dengan urutan ini untuk dieksekusi?