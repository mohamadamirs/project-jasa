# Panduan Kontribusi

## 1. Developer Setup
- Pastikan Node.js terinstal.
- Jalankan `npm install`.
- Jalankan `npm run dev` untuk server lokal di `localhost:4321`.
- Gunakan `npm run build` untuk memverifikasi validitas data dan skema Zod.

## 2. Staging Strategy (Folder-based)
Proyek ini tidak menggunakan GitHub PR. Gunakan sistem folder status untuk pelacakan:
- Pilih tugas dari `docs/tasks/01-backlog/`.
- Pindahkan file tugas ke `docs/tasks/02-active/` saat mulai dikerjakan.
- Usulan perubahan dibuat di dalam folder: `docs/pr/<YYYYMMDD>-<nama-tugas>/`.

## 3. Atomic Log Convention
- Setiap folder `docs/pr/` WAJIB menyertakan `log-fragment.md`.
- File ini berisi detail perubahan yang siap di-copy ke `docs/changelog.md`.

## 4. Proposal & Merge (Local PR)
1. Buat folder `docs/pr/` dengan struktur file yang terdampak.
2. Sertakan `README.md` (Merge Checklist) dan `log-fragment.md`.
3. Setelah User setuju:
   - File dari folder `docs/pr/` di-copy ke folder utama (`src/`, `docs/`, dll).
   - Pindahkan file tugas ke `docs/tasks/03-done/`.
   - Copy isi `log-fragment.md` ke `docs/changelog.md`.
   - Hapus folder `docs/pr/` terkait.

## 5. Definition of Done
- [ ] File berada di folder `docs/pr/` dengan struktur yang benar.
- [ ] Deskripsi perubahan tertulis di `README.md` folder `docs/pr/`.
- [ ] Berfungsi tanpa error pada layar mobile 320px.
- [ ] `docs/changelog.md` diperbarui.

## 6. Coding Standards
- **Zero-JS:** Jangan tambahkan JavaScript jika bisa diselesaikan dengan CSS/Astro.
- **Tailwind Only:** Dilarang menggunakan inline styles.
- **Modular Components:** Pecah section besar menjadi komponen di `src/components/`.

## 7. Testing
- Validasi skema Zod di `src/content.config.ts`.
- Uji responsivitas menggunakan Chrome DevTools (Responsive Mode).
