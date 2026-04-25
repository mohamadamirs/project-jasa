# Design Spec: Revamp Caption Styling (Badge & Icon Duo)

> **Status:** PROPOSAL  
> **Versi:** 1.0.0 | **Tanggal:** 2026-04-25  
> **Issue:** #56

## 1. Tujuan
Meningkatkan estetika teks *caption* (teks kecil penjelas) di seluruh aplikasi menjadi format **Badge & Icon Duo** menggunakan gaya **Glassmorphism Accent** (Opsi A) agar terlihat lebih premium dan profesional.

## 2. Arsitektur Komponen
Akan dibuat komponen Astro baru yang dapat digunakan kembali di seluruh proyek.

### A. File Baru: `src/components/Badge.astro`
- **Props:**
    - `text`: Label teks yang akan ditampilkan.
    - `icon?`: Nama ikon Lucide (opsional).
    - `variant?`: 'blue' (default), 'emerald', 'slate'.
    - `class?`: Class CSS tambahan.
- **Markup:**
    ```html
    <div class:list={[
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-caption border backdrop-blur-sm transition-all",
      variant === 'blue' && "bg-blue-600/10 text-blue-700 border-blue-600/10",
      variant === 'emerald' && "bg-emerald-600/10 text-emerald-700 border-emerald-600/10",
      className
    ]}>
      {icon && <span data-lucide={icon} class="w-3.5 h-3.5" />}
      <slot>{text}</slot>
    </div>
    ```

## 3. Lokasi Implementasi (Refactor)
Teks-teks berikut akan diubah menggunakan komponen `Badge.astro`:

1.  **Hero Section (`index.astro` & `[area].astro`):** Label "Kutabaru Web Agency" atau "Wilayah Terdaftar".
2.  **Social Proof:** Label "Telah Dipercaya Oleh Bisnis Lokal".
3.  **Section Portfolio:** Label kategori proyek.
4.  **Halaman Wilayah:** Label-label statistik atau fitur lokal.

## 4. Validasi Desain (Tech Design Compliance)
- **Typography:** Menggunakan `text-caption` yang sudah memiliki skala `clamp()`.
- **Styling:** Menggunakan `backdrop-blur` dan transparansi sesuai standar *Glassmorphism* proyek.
- **Interaktivitas:** Penambahan `transition-all` untuk feedback halus jika diletakkan di elemen interaktif.

---
**Rekomendasi Implementasi:**
1. Buat `src/components/Badge.astro`.
2. Ganti elemen `text-caption` statis di `index.astro` dan `[area].astro` terlebih dahulu sebagai pilot.
3. Lakukan refactor global secara bertahap.

Apakah desain ini sudah sesuai? Jika ya, saya akan membuat rencana implementasinya.
