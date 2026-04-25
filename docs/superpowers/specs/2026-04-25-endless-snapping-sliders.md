# Spec: Endless Snapping Sliders (Workflow & Area)

> **Status:** PROPOSAL  
> **Versi:** 1.0.0 | **Tanggal:** 2026-04-25  
> **Issue:** #64

## 1. Masalah
Slider pada seksi **Workflow** (Alur Kerja) dan **Area** (Wilayah) saat ini kurang interaktif di mobile. Workflow hanya berupa grid/flex statis dengan snap-x sederhana, sementara Area sudah marquee tapi kurang memiliki kontrol manual yang baik dan efek fokusnya terlalu agresif (blur/opacity rendah) yang melanggar keinginan user untuk menghindari efek "menggelap".

## 2. Solusi
Implementasi sistem **Endless Snapping Slider** menggunakan React Island yang mendukung:
1.  **Infinite Loop**: Konten berulang tanpa ujung.
2.  **Auto-play**: Gerakan lambat otomatis.
3.  **Manual Interrupt**: User bisa swipe/drag kapan saja.
4.  **Elevation Focus**: Kartu aktif terangkat (`translate-y`) dan shadow, kartu tidak aktif tetap bersih (tanpa blur berlebih/gelap).

## 3. Komponen Baru/Update

### A. `WorkflowSlider.tsx` (Baru)
- **Lokasi**: `src/components/react/WorkflowSlider.tsx`
- **Tampilan**:
    - Konten: 4 langkah kerja.
    - Style: Kartu dengan nomor langkah yang menonjol.
    - Fokus: `shadow-xl`, `border-blue-200`, `-translate-y-2`.
    - Loop: Duplikasi data steps 3x untuk kelancaran loop.

### B. `AreaMarquee.tsx` (Update)
- **Lokasi**: `src/components/react/AreaMarquee.tsx`
- **Perubahan**:
    - Hapus `opacity-30` dan `blur-[0.5px]` pada kartu tidak aktif.
    - Gunakan `opacity-100` atau `opacity-80` maksimal.
    - Fokus menggunakan `translate-y` dan shadow premium.
    - Tambahkan kontrol drag menggunakan `framer-motion` atau logic `onMouseDown/Move`.

## 4. Rencana Implementasi

### Opsi A: Framer Motion (Rekomendasi)
- Menggunakan `framer-motion` untuk handle infinite loop dan drag dengan performa tinggi.
- Kelebihan: Animasi sangat halus, snapping akurat, API `drag` yang matang.
- Kekurangan: Tambah satu dependency (ringan).

### Opsi B: Vanilla React + IntersectionObserver
- Menggunakan logic manual seperti `ServiceSlider` namun ditambahkan loop.
- Kelebihan: Tanpa dependency tambahan.
- Kekurangan: Implementasi infinite loop manual lebih kompleks dan rawan "jump" saat reset scroll.

### Opsi C: Marquee CSS + Pause on Drag
- Menggunakan animasi CSS `scroll-left` namun dengan interaksi drag yang menunda animasi.
- Kelebihan: Sangat ringan.
- Kekurangan: Kontrol snapping kurang presisi dibanding Opsi A/B.

---
**Rekomendasi:** **Opsi A** untuk hasil "premium" yang diinginkan user.

Apakah rencana ini disetujui? Jika ya, saya akan lanjut ke pembuatan Plan Implementasi.
