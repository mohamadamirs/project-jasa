---
name: web-crawler
description: Web crawling dan searching untuk website lokal maupun publik. Gunakan untuk mengekstrak informasi dari URL, melakukan riset kompetitor, atau memeriksa output website yang sedang berjalan di localhost.
---

# Web Crawler & Searcher

Skill ini membantu Gemini CLI melakukan navigasi web, ekstraksi data, dan pencarian informasi secara sistematis.

## Fitur Utama

### 1. Web Searching
Gunakan `google_web_search` untuk mencari informasi terbaru di internet.
- Fokus pada kata kunci spesifik.
- Gunakan untuk mencari dokumentasi, error fixes, atau riset pasar.

### 2. Web Fetching (Single/Batch)
Gunakan `web_fetch` untuk mengambil konten dari satu atau lebih URL (maks 20 URL).
- Bisa digunakan untuk URL publik (https://...) maupun lokal (http://localhost:...).

### 3. Local Project Crawling
Untuk website yang sedang dikembangkan secara lokal (misalnya Astro, Vite, Next.js):
1. **Pastikan server berjalan**: Jalankan `npm run dev` atau perintah sejenis di background.
2. **Cek URL lokal**: Biasanya `http://localhost:4321` (Astro) atau `http://localhost:3000`.
3. **Fetch & Analyze**: Gunakan `web_fetch` untuk mengambil HTML/konten dan melakukan audit SEO, cek link rusak, atau validasi UI.

## Workflow Crawling Sistematis
Jika perlu melakukan "crawling" (menelusuri banyak halaman):
- **Step 1**: Fetch halaman utama (homepage).
- **Step 2**: Identifikasi link penting dari output HTML.
- **Step 3**: Fetch link tersebut secara batch (maks 20).
- **Step 4**: Sintesis informasi atau ulangi proses jika diperlukan.

## Tips Ekstraksi Data
- **SEO Audit**: Periksa `<title>`, `<meta name="description">`, dan struktur `<h1>`-`<h6>`.
- **Competitor Research**: Bandingkan fitur, harga, atau struktur konten dari website kompetitor.
- **Local Validation**: Pastikan perubahan kode tercermin dengan benar di browser tanpa harus membukanya secara manual.

## Keamanan
- Jangan fetch URL yang mengandung data sensitif atau kredensial di query string.
- Patuhi `robots.txt` jika melakukan crawling dalam skala besar.
