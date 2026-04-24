# Technical Design Document: Kutabaru SEO Engine

> **Status:** MANDATORY SPECIFICATION  
> **Versi:** 1.3.0 | **Tanggal:** 2026-04-25  
> **Framework:** Astro 6 + React 19 + Tailwind v4

---

## I. Arsitektur Island & Ketentuan Interaktivitas

**Ketentuan Utama:** Mengalihkan beban interaksi kompleks dari skrip Vanilla JS global ke sistem **Astro Islands menggunakan React**.

### 1. Klasifikasi Komponen (Tentukan)
Setiap komponen baru wajib dikategorikan ke dalam salah satu dari dua tipe berikut:
- **Astro Static Component (`.astro`):** 
    - Digunakan untuk: Struktur HTML, SEO Metadata, navigasi desktop, footer, dan konten tekstual.
    - Aturan: **DILARANG** menyertakan tag `<script>` inline kecuali untuk integrasi analytics pihak ketiga yang sangat ringan.
- **React Island Component (`.tsx`):**
    - Digunakan untuk: Slider, Carousel, Pricing Table, Mobile Menu, dan Marquee.
    - Aturan: Wajib diletakkan di dalam direktori `src/components/react/`.

### 2. Strategi Hidrasi (Tentukan)
Implementasi hidrasi di dalam file `.astro` wajib mengikuti protokol berikut:
- **`client:load`**: Ditetapkan khusus untuk komponen navigasi mobile dan elemen di atas lipatan (*above-the-fold*) yang membutuhkan interaksi instan.
- **`client:visible`**: Ditetapkan untuk seluruh komponen di bawah lipatan (*below-the-fold*). Wajib menyertakan `loading="lazy"` pada aset di dalamnya jika memungkinkan.
- **`client:only="react"`**: Ditetapkan jika komponen sangat bergantung pada API browser yang tidak tersedia saat build SSG.

---

## II. Standar Pengembangan UI & Desain

### 1. Ketentuan Tailwind CSS v4 (Tentukan)
Guna menghindari kegagalan build dan menjaga konsistensi:
- **Larangan @apply:** Dilarang keras menggunakan direktif `@apply` di dalam blok `<style>` file `.astro`. Gunakan utility classes langsung pada atribut `class`.
- **Referensi CSS:** Jika terpaksa menggunakan blok `<style>`, wajib menyertakan `@reference "../../styles/global.css";` di baris pertama agar compiler Tailwind v4 mengenali variabel tema.
- **Dynamic Styling:** Styling dinamis dalam React wajib menggunakan template literals dengan full class names (contoh: `` className={`p-4 ${isActive ? 'bg-blue-600' : 'bg-white'}`} ``).

### 2. Tipografi Fluid & Spacing (Tentukan)
Menerapkan sistem responsivitas kaku tanpa Media Query manual untuk ukuran teks guna menjamin harmoni visual di seluruh perangkat:

#### A. Skala Tipografi (Strict Measurements)
Seluruh elemen teks **WAJIB** menggunakan fungsi `clamp()` dengan parameter berikut:
- **Heading 1 (Hero Title):** `text-[clamp(2rem,8vw,3.5rem)]`.
    - Aturan: `font-black`, `leading-[1.1]`, `tracking-[-0.02em]`.
- **Heading 2 (Section Title):** `text-[clamp(1.75rem,6vw,3rem)]`.
    - Aturan: `font-extrabold`, `leading-[1.2]`, `tracking-tight`.
- **Heading 3 (Card/Sub-section):** `text-[clamp(1.35rem,4vw,2rem)]`.
    - Aturan: `font-bold`, `leading-snug`.
- **Heading 4 (Minor Title):** `text-[clamp(1.1rem,2vw,1.35rem)]`.
    - Aturan: `font-semibold`.
- **Body Text (Main Content):** `text-[clamp(0.9375rem,1vw+0.25rem,1.0625rem)]`.
    - Aturan: `leading-relaxed` (1.625), `text-slate-600`.
- **Small Text (Label/Caption):** `text-[clamp(0.75rem,0.8vw,0.875rem)]`.
    - Aturan: `font-bold`, `uppercase`, `tracking-[0.15em]`.

#### B. Responsivitas Kontainer & Padding (Tentukan)
Batasan kaku untuk menjaga integritas layout pada layar ultra-kecil s/d ultra-lebar:
- **Breakpoint Dasar:** Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px).
- **Gutter Horizontal (Fluid):**
    - Seluruh section wajib menggunakan padding horizontal fluid: `px-[clamp(1rem,5vw,2.5rem)]`.
- **Safe Zone (Touch Targets):**
    - Seluruh elemen interaktif (Button, Link, Input) **WAJIB** memiliki tinggi minimal `44px` tanpa toleransi.
    - Gap antar elemen klik minimal `8px` untuk mencegah salah tekan.

#### C. Grid & Layout Constraints (Tentukan)
- **Max Width:** Kontainer utama tidak boleh melebihi `1280px` (`max-w-7xl`).
- **Section Vertical Spacing:** Jarak antar seksi vertikal **WAJIB** menggunakan `py-[clamp(4rem,10vh,8rem)]`.
- **Section Header Bottom Margin:** `mb-[clamp(2.5rem,8vh,4.5rem)]`.
- **Card Rounding:** Standar rounding untuk komponen card adalah `rounded-[2rem]` (32px).
- **Button Rounding:** Standar rounding untuk tombol adalah `rounded-xl` (12px).
- **Gap Scale:**
    - Small: `gap-4` (16px).
    - Medium: `gap-8` (32px).
    - Large: `gap-12 md:gap-20`.
- **No-Scroll Policy:** Dilarang keras adanya scroll horizontal pada level body. Gunakan `overflow-x-hidden` pada elemen pembungkus tertinggi.
- **Text Balance:** Tag Heading (H1, H2) **WAJIB** menggunakan class `text-balance` untuk distribusi baris teks yang estetis di mobile.

### 3. Feedback Interaksi (Tentukan)
Menciptakan sensasi "App-like" melalui feedback visual:
- **Scale Feedback:** Seluruh elemen yang dapat diklik wajib memiliki `transition-transform active:scale-95 duration-200`.
- **Glassmorphism:** Ketentuan efek kaca: `bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl shadow-blue-100/50`.

---

## III. Logika Programmatic SEO (pSEO) & Data

### 1. Struktur Konten (Tentukan)
- **Koleksi `areas`:** Wajib menggunakan format JSON. Field wajib: `id`, `cityName`, `lat`, `lng`.
- **Koleksi `portfolios`:** Wajib menggunakan format Markdown dengan frontmatter YAML untuk metadata proyek.

### 2. Ketentuan SEO & Spintax (Tentukan)
- **Seeded Spintax:** Setiap judul halaman wilayah wajib melewati fungsi `seededSpin(text, seed)` di mana `seed` diambil dari `area.id` untuk memastikan keunikan konten antar wilayah.
- **JSON-LD:** Setiap halaman wilayah wajib menyertakan skema `LocalBusiness` dengan data koordinat (`geo`) yang akurat dari koleksi JSON.

---

## IV. Metrik Performa & Optimasi (Tentukan)

Setiap perubahan kode wajib divalidasi terhadap target metrik berikut:
- **LCP (Largest Contentful Paint):** < 1.0 detik (Desktop) / < 1.5 detik (Mobile).
- **TBT (Total Blocking Time):** < 50ms.
- **CLS (Cumulative Layout Shift):** 0.0.
- **Image Policy:** Wajib menggunakan komponen `<Image />` dari `astro:assets` dengan format default `webp` dan `quality="mid"`.

---

## V. Struktur Folder (Tentukan)

```text
src/
├── components/
│   ├── react/          # Seluruh komponen React (Islands)
│   └── *.astro         # Komponen statis Astro
├── content/
│   ├── areas/          # Data wilayah (JSON)
│   └── portfolios/     # Data portofolio (Markdown)
├── layouts/            # Template halaman utama
├── pages/              # Routing & Entry points
└── utils/              # Fungsi helper (Spintax, Helpers)
```

---
*Instruksi: Dokumen ini bersifat mengikat. Deviasi dari ketentuan di atas wajib melalui proses review teknis.*
