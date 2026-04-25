---
name: github-cli
description: Operasi GitHub CLI (gh) lengkap untuk branch, commit, PR, issue, dan merge. Gunakan saat perlu berinteraksi dengan GitHub repo, mengelola siklus hidup kode, atau otomatisasi workflow GitHub dari terminal.
---

# GitHub CLI (gh)

Gunakan `gh` untuk mengelola repository GitHub secara efisien. Skill ini menyediakan workflow standar untuk kolaborasi kode.

## Persyaratan
- GitHub CLI (`gh`) harus terinstal.
- Sudah login via `gh auth login`.

## Workflow Utama

### 1. Branching & Pengembangan
- **Buat branch baru**: `gh repo view --web` (untuk cek repo) atau langsung `git checkout -b <name>`.
- **List branches**: `gh pr list` (melihat PR aktif) atau `git branch`.

### 2. Committing
Ikuti standar *Conventional Commits*:
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Dokumentasi
- `style`: Formatting, missing semi colons, etc
- `refactor`: Refactoring code
- `test`: Menambah test
- `chore`: Maintenance

Contoh: `git commit -m "feat(auth): add google oauth provider"`

### 3. Pull Requests (PR)
- **Buat PR**: `gh pr create --fill` (menggunakan commit info) atau `gh pr create --title "..." --body "..."`.
- **Cek Status PR**: `gh pr status`.
- **Review PR**: `gh pr checkout <number>` lalu `gh pr review --approve`.
- **Daftar PR**: `gh pr list`.

### 4. Issues
- **List Issues**: `gh issue list`.
- **Buat Issue**: `gh issue create --title "..." --body "..."`.
- **View Issue**: `gh issue view <number>`.

### 5. Merging & Cleanup
- **Merge PR**: `gh pr merge --merge` (atau `--squash` / `--rebase`).
- **Update Lokal**: `gh repo sync`.

## Tips Penulisan Kode & Kolaborasi
- **Surgical Changes**: Lakukan perubahan kecil dan fokus.
- **PR Description**: Sertakan konteks "Why", bukan hanya "What".
- **Delete Branch**: Selalu hapus branch setelah merge: `gh pr merge --delete-branch`.

## Perintah Penting Lainnya
- `gh run list`: Cek status GitHub Actions.
- `gh secret set`: Kelola repository secrets.
- `gh browse`: Buka repository di browser.
- `gh repo clone <owner/repo>`: Clone repository.
