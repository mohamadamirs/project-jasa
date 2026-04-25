---
name: design-proposer
description: Selalu memberikan opsi desain (minimal 3) sebelum melakukan implementasi UI/UX besar. Digunakan untuk memastikan keselarasan visi desain dengan user.
---

# Design Proposer

Skill ini memastikan setiap perubahan UI/UX yang signifikan tidak langsung diimplementasikan, melainkan diawali dengan proposal opsi.

## Workflow
1. **Analisis**: Baca `docs/technical-design.md` dan `GEMINI.md`.
2. **Propose**: Berikan 3 opsi desain dengan format:
   - **Opsi A (Judul)**: Deskripsi singkat + Kelebihan.
   - **Opsi B (Judul)**: Deskripsi singkat + Kelebihan.
   - **Opsi C (Judul)**: Deskripsi singkat + Kelebihan.
3. **Rekomendasi**: Nyatakan opsi mana yang paling sesuai dengan standar teknis proyek.
4. **Wait**: Tunggu pilihan user sebelum menulis kode.

## Prinsip Desain (Project-Specific)
- Patuhi tipografi `clamp()`.
- Patuhi skema warna brand (Blue-600 sebagai aksen utama).
- Pastikan interaktivitas menggunakan React Islands.
- Fokus pada performa (LCP/CLS).
