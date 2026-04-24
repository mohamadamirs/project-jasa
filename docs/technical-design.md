# Technical Design Document

> **Kutabaru SEO Engine** – Cetak biru sistem Programmatic SEO (pSEO).  
> Versi: 1.1.0 | Tanggal: 2026-04-25

## 1. Konteks & Tujuan
Membangun platform agensi digital yang mengutamakan performa (Zero-JS) dan dominasi SEO Lokal melalui otomatisasi konten (pSEO). Target utama adalah UMKM dengan solusi yang terjangkau namun memiliki kualitas teknologi kelas enterprise.

## 2. Arsitektur Level Tinggi
- **Pola Arsitektur:** Static Site Generation (SSG) dengan Astro 6.
- **Rendering Strategy:** Zero-JS by default. JavaScript hanya digunakan untuk interaksi kritis (Mobile Menu, Slider, Ikon) menggunakan pola *Partial Hydration*. Untuk interaktivitas yang kompleks dan reaktif, wajib menggunakan **React Astro Islands** (`client:load`, `client:visible`, dll) guna menjaga performa utama Astro tetap statis.
- **Data Source:** Git-as-a-CMS menggunakan JSON (Wilayah) dan Markdown (Portofolio).

## 3. Design System & UI Standards (Strict)

### A. Tipografi Responsif (Fluid Typography)
Menggunakan **Plus Jakarta Sans** dengan implementasi `clamp()` untuk menghindari layout break di mobile:
- **H1 (Hero):** `text-[clamp(1.75rem,8vw,4.5rem)]` - Bold, tracking-tight.
- **H2 (Section):** `text-[clamp(1.5rem,6vw,3rem)]` - Bold.
- **Body:** `text-base` (16px) minimal untuk keterbacaan.

### B. Skema Warna (Brand Identity)
- **Primary:** `blue-600` (#2563eb) - Otoritas & Teknologi.
- **Secondary:** `sky-50` (#f0f9ff) - Kebersihan & Ruang Baca.
- **Accent:** `emerald-500` (hanya untuk status sukses/badge harga).
- **Selection:** `bg-blue-100 text-blue-900`.

### C. Spacing & Grid
- **Global Padding:** `px-4` (Mobile) s/d `px-8` (Desktop).
- **Ultra-Small Fix (320px):** Gunakan `px-3` pada kontainer untuk memaksimalkan ruang teks.
- **Grid Layout:** 
    - Desktop: 3-5 kolom.
    - Mobile: 1-2 kolom.
    - **Horizontal Scroll Snap:** Wajib digunakan untuk daftar layanan/fitur pada mobile (`flex overflow-x-auto snap-x`) guna menghemat ruang vertikal tanpa mengorbankan keterbacaan card.
    - **AreaGrid Policy:** Pertahankan `grid-cols-2` dengan reduksi padding (`p-3`), gap kecil (`gap-2`), dan wajib menggunakan `text-balance`.

### D. Accessibility & Touch Targets
- **Minimum Target Size:** Seluruh elemen interaktif wajib memiliki area sentuh minimal `44x44px` atau `min-h-[44px]`.
- **Readability:** Wajib menggunakan `leading-relaxed` (1.625) pada seluruh tag `<p>`.
- **Secondary Card Text:** Untuk deskripsi di dalam card `grid-cols-2` pada layar < 360px, font diperbolehkan turun ke `text-[13px]` atau `text-[14px]` guna menghindari *widows/orphans*.

## 4. Interaction Guidelines (Premium UX)
- **Hover States:** Gunakan `hover-lift` (translate-y-[-4px]) dan `shine-effect` pada kartu.
- **Active Feedback:** Seluruh tombol wajib memiliki `active:scale-95` untuk feedback sentuh.
- **Transitions:** Gunakan `cubic-bezier(0.4, 0, 0.2, 1)` untuk animasi menu dan modal agar terasa organik.
- **View Transitions:** Wajib menggunakan `astro:page-load` untuk inisialisasi script agar ikon/interaksi tidak hilang saat navigasi internal.

## 5. Bisnis & Paket Harga (Realistic Strategy)
- **Starter (250rb):** Domain `.my.id`, 1 Halaman, Zero Hosting.
- **Business (1.8jt):** Domain `.com/.id`, 5+ Halaman, Email Bisnis, SEO Lokal Prioritas.
- **Custom (Negotiable):** Solusi IoT, Web Kustom, Enterprise.

## 6. Arsitektur Logika pSEO
1. **Validation:** Skema Zod mewajibkan `lat` dan `lng` sebagai `number`.
2. **Dynamic Routing:** `[area].astro` menarik data dari `areas` collection.
3. **SEO Schema (JSON-LD):** Injeksi otomatis `LocalBusiness` dengan koordinat dinamis per wilayah.
4. **Internal Linker:** Automasi distribusi link antar wilayah untuk memperkuat struktur SEO.

## 7. Performance & Optimization
- **Images:** Wajib menggunakan `<Image />` dari `astro:assets`.
- **Icons:** Lucide Icons dimuat via CDN dengan script inisialisasi yang mendukung `data-astro-rerun`.
- **Hosting:** Optimized for Vercel (Edge Network).

---
*Dokumen ini adalah SSOT (Single Source of Truth). Setiap perubahan kode wajib merujuk ke sini.*
