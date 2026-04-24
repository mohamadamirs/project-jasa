# Changelog

Semua perubahan penting pada proyek ini dicatat di sini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/),
dan proyek mengikuti [Semantic Versioning](https://semver.org/).

## [Unreleased]
### Added
- [Jumat, 24 April 2026] **Pricing Comparison Matrix**: Komponen `PricingTable.astro` untuk perbandingan fitur paket harga secara mendetail guna membantu ROI bisnis klien.
- [Jumat, 24 April 2026] **Contextual Portfolio CTA**: Pesan WhatsApp otomatis yang menyebutkan judul proyek pada halaman detail portofolio.
- [Jumat, 24 April 2026] **Performance Proof Badge**: Komponen `PerformanceBadge.astro` untuk memamerkan skor audit Google 100/100 sebagai Trust Booster.
- [Jumat, 24 April 2026] **Automated Interlinking**: Komponen `InternalLinker.astro` untuk distribusi otoritas SEO otomatis antar halaman wilayah.
- [Jumat, 24 April 2026] **CLI Content Helper**: Script `scripts/add-area.mjs` untuk mempermudah penambahan data wilayah pSEO via terminal dengan validasi otomatis.
- [Jumat, 24 April 2026] **New Content Sections**: Penambahan komponen `Workflow.astro` (alur kerja) dan `LocalInsight.astro` (analisa peluang lokal) untuk memperkaya kedalaman informasi di seluruh halaman.
- [Jumat, 24 April 2026] **Mobile Responsivity Audit**: Implementasi Fluid Typography menggunakan `clamp()` untuk elemen `h1`, `h2`, dan `h3` serta aturan global `overflow-x-hidden` untuk mencegah horizontal scroll.
### Added
- [Sabtu, 25 April 2026] **Compact UI Optimization**: Scaled down UI elements and adjusted grid layouts for ultra-small devices (320px) to ensure a balanced and readable interface.

### Fixed
- [Sabtu, 25 April 2026] **Global Icon Reliability**: Standardized Lucide icons initialization to be fully compatible with Astro View Transitions by utilizing `astro:page-load` and `data-astro-rerun`.

### Added
- [Jumat, 24 April 2026 - 21:30] **Portfolio Layout Polish**: Fixed information hierarchy by moving `ImageSlider` below context (title & tags) in `[id].astro`. Upgraded slider UI with Lucide icons (`chevron-left/right`), hover scale animations, and ARIA labels for accessibility.

### Changed
- [Jumat, 24 April 2026] **Pricing Strategy Revamp**: Restrukturisasi paket harga menjadi model ekonomis: Starter (250rb) dan Business (1.8jt) dengan transparansi domain (.my.id vs .com) dan Email Bisnis.
- [Jumat, 24 April 2026] **Portfolio Content Rendering**: Implementasi Tailwind `prose` untuk rendering konten Markdown yang profesional dan pembersihan format judul (non-italic).
- [Jumat, 24 April 2026] **FAQ Enrichment**: Pembaruan FAQ untuk edukasi mengenai biaya perpanjangan domain dan manfaat teknis arsitektur statis (Zero Hosting Fees).
- [Jumat, 24 April 2026] **Adaptive Image Slider**: Refaktorisasi `ImageSlider.astro` untuk mendukung berbagai rasio gambar (portrait/square) tanpa cropping menggunakan `object-contain` dan efek `blurred backdrop`.
- [Jumat, 24 April 2026] **Dynamic Nearby Areas**: Migrasi dari daftar wilayah manual ke sistem interlinking dinamis pada seluruh halaman wilayah.
- [Jumat, 24 April 2026] **Hero Section Revamp**: Revamp total Hero Section di `index.astro` dan `[area].astro` dengan gaya Glassmorphism, animasi reveal, dan desain premium.
- [Jumat, 24 April 2026] **Technical Design Enrichment**: Pembaruan besar pada `docs/technical-design.md` (v1.1.0) dengan dokumentasi mendalam Design System, Interaction Guidelines, standar a11y, dan QA Checklist.
- [Jumat, 24 April 2026] **Interactive UX & CLS Optimization**: Optimasi feedback sentuh (`:active`) pada navigasi dan stabilitas layout (CLS) melalui penggunaan `aspect-ratio` dan dimensi tetap pada komponen UI utama.
- [Jumat, 24 April 2026] **Astro Assets Migration**: Migrasi `<img>` ke `<Image />` dari `astro:assets` pada `src/components/ImageSlider.astro` untuk optimasi format WebP otomatis dan peningkatan LCP. Update skema `portfolios` untuk menggunakan helper `image()`.
- [Jumat, 24 April 2026] **Data Schema Sync**: Sinkronisasi tipe data koordinat (`lat` dan `lng`) dari String ke Number pada skema Zod (`src/content.config.ts`) dan seluruh file JSON area untuk validitas data SEO yang lebih baik.
- [Jumat, 24 April 2026] **Component Refactoring**: Refaktorisasi `src/components/SectionHeader.astro` untuk mendukung tipografi fluid dan penyesuaian padding horizontal untuk layar ultra-kecil (320px).
- [Jumat, 24 April 2026] **Hero & CTA Optimization**: Optimasi responsivitas Hero Section dan Final CTA di `src/pages/index.astro`.
- [Jumat, 24 April 2026 - 21:15] **Documentation Accuracy**: Massively updated `docs/TECHNICAL_DESIGN.md` to correctly reflect the use of **Lucide Icons** (previously misdocumented as Phosphor), detailed strict mobile typography limits (`clamp()`), and defined explicit anti-patterns (hardcoded HEX, static padding) to enforce QA standards.
- [Jumat, 24 April 2026 - 21:15] **Responsive Anti-Patterns**: Fixed potential layout overflows by replacing static absolute widths with fluid `clamp()` functions for background decorations. Standardized CTA padding to `p-6 md:p-12` across all pages.
- [Jumat, 24 April 2026 - 21:15] **Flexbox Resilience**: Added missing `flex-wrap` to technology tags in `portofolio/[id].astro` to ensure stability on narrow mobile screens.

### Fixed
- [Jumat, 24 April 2026] **Global Lucide Icon Fix**: Perbaikan total inisialisasi ikon menggunakan pola `astro:page-load` dan `data-astro-rerun` untuk menjamin ikon muncul di setiap navigasi View Transitions.
- [Jumat, 24 April 2026] **Area Pages Accessibility**: Standarisasi trailing slash pada seluruh tautan wilayah dan sinkronisasi tipe data koordinat untuk menjamin stabilitas routing dan rendering.
- [Jumat, 24 April 2026] **View Transitions Icon Fix**: Masalah ikon Lucide tidak muncul setelah navigasi View Transitions dengan bermigrasi ke event `astro:page-load` dan menambahkan atribut `data-astro-rerun` pada script inisialisasi di `src/layouts/MainLayout.astro`.
- [Jumat, 24 April 2026 - 19:45] **Critical Variable Fix**: Resolved `SITE_DESCRIPTION is not defined` error in `MainLayout.astro` by exporting the variable from `src/consts.ts` and updating imports.
- [Jumat, 24 April 2026 - 19:45] **Icon Library Migration**: Completed migration from Phosphor to **Lucide Icons** via JSDelivr CDN. Standardized all icon syntax to `data-lucide` for robust runtime initialization.
- [Jumat, 24 April 2026 - 18:45] **Dynamic Geo SEO**: Resolved static coordinates issue in `SEO.astro`. All 10 area JSON files now include real, unique latitude and longitude data.

## [1.0.0] - 2026-04-24
### Added
- **MVP Launch**: Sistem pSEO stabil dengan 10 wilayah awal.
- Tiered Pricing System.
- Dynamic Portfolio with Image Optimization.
- Zero-JS UI with Tailwind 4.
