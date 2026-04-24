# Runbook / Operations Manual

## 1. Deployment
1. Jalankan `npm run build` di branch `main`.
2. Pastikan folder `dist/` ter-generate tanpa error.
3. Upload isi folder `dist/` ke platform hosting (Cloudflare/Vercel).
4. Verifikasi sitemap dan robot.txt.

## 2. Rollback
1. Jika build gagal atau website pecah, kembali ke commit stabil terakhir di branch `main`.
2. Jalankan build ulang.
3. Deploy manual atau biarkan CI/CD melakukan auto-deploy.

## 3. Monitoring & Alerts
- Gunakan Google Search Console untuk memonitor indexing halaman pSEO.
- Gunakan PageSpeed Insights untuk audit performa berkala.

## 4. Backup & Restore
- Data disimpan di repositori Git. Backup dilakukan melalui mirroring repositori (e.g., GitHub + GitLab).
- Restore cukup dengan melakukan `git clone` dari mirror tersebut.

## 5. Kontak Darurat
- Tech Lead: [Nama/Kontak]
- SEO Architect: [Nama/Kontak]
