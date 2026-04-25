# Project Jasa: Gemini CLI Memory

## Context Management
- **Tech Design Compliance**: Semua perubahan HARUS mematuhi `docs/technical-design.md`.
- **Interactivity**: Komponen interaktif (slider, menu, carousel) WAJIB menggunakan React Island di `src/components/react/`.
- **Astro Components**: Gunakan `.astro` hanya untuk konten statis. DILARANG menggunakan tag `<script>` inline.
- **Styling**: Gunakan Tailwind v4 utility classes. DILARANG menggunakan `@apply`.
- **Typography**: Gunakan `clamp()` sesuai skala di Tech Design.
- **Spacing**: Gunakan fluid spacing (`px-[clamp(...)]`, `py-[clamp(...)]`) sesuai Tech Design.

## Guidelines
- **Surgical Updates**: Lakukan perubahan minimal tapi lengkap sesuai standar.
- **Validation**: Selalu pastikan build aman dan performa terjaga (LCP, TBT, CLS).
- **React Islands**: Letakkan komponen React di `src/components/react/`.
- **Hydration**: Gunakan `client:visible` untuk komponen di bawah lipatan, `client:load` untuk navigasi.

## Project Structure
- `src/components/react/`: Komponen interaktif (React).
- `src/components/`: Komponen statis (Astro).
- `src/pages/`: Routing.
- `src/content/`: Data JSON/Markdown.
