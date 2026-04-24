#!/bin/bash

# Audit Script: Kutabaru Compliance Checker

echo "🔍 Menjalankan Audit Kepatuhan..."

# 1. Cek Warna Utama (blue-600)
# Mencari HEX selain yang diizinkan atau mencari warna Tailwind lain di file .astro
grep -r "text-\|bg-\|border-" src/ --exclude-dir=node_modules | grep -v "blue-600\|white\|sky-50\|transparent\|slate\|gray"
if [ $? -eq 0 ]; then
    echo "⚠️  [WARNING] Ditemukan penggunaan warna di luar standar Design System!"
fi

# 2. Cek Hardcoded HEX
grep -r "#" src/ --exclude-dir=node_modules | grep -v "#2563eb"
if [ $? -eq 0 ]; then
    echo "⚠️  [WARNING] Ditemukan Hardcoded HEX Code. Gunakan Tailwind Class!"
fi

# 3. Cek log-fragment.md di PR
for d in docs/pr/*/ ; do
    if [ ! -f "$d/log-fragment.md" ]; then
        echo "❌ [ERROR] Folder PR $d tidak memiliki log-fragment.md!"
    fi
done

echo "✅ Audit selesai."
