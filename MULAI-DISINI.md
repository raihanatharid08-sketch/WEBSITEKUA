# 🚀 MULAI DI SINI - Panduan Cepat Deploy Website KUA

## ✅ Yang Sudah Selesai

- ✅ Kode website sudah siap
- ✅ Sistem autentikasi sudah diperbaiki (user bisa akses tanpa login)
- ✅ Database schema sudah siap
- ✅ Script seeding data materi fiqih sudah siap
- ✅ Konfigurasi deployment Railway sudah siap
- ✅ Semua sudah di-push ke GitHub

## 🎯 Yang Perlu Anda Lakukan (5 Langkah Mudah!)

### 1️⃣ Buat Akun Railway (2 menit)

1. Buka: https://railway.app
2. Klik **"Login with GitHub"**
3. Authorize Railway untuk akses GitHub Anda
4. Selesai! ✅

### 2️⃣ Deploy Website (3 menit)

1. Di Railway dashboard, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository: **`WEBSITEKUA`**
4. Railway akan otomatis build dan deploy
5. Tunggu sampai status jadi **"Success"** (hijau)

### 3️⃣ Tambah Database MySQL (1 menit)

1. Di project yang sama, klik **"New"**
2. Pilih **"Database"** → **"Add MySQL"**
3. Railway akan otomatis:
   - Buat database
   - Connect ke aplikasi
   - Set environment variable `DATABASE_URL`

### 4️⃣ Set Environment Variables (2 menit)

1. Klik service aplikasi Anda (bukan database)
2. Klik tab **"Variables"**
3. Tambahkan variable ini:

```
JWT_SECRET=websitekua-super-secret-key-2024-change-this-in-production
VITE_APP_ID=websitekua
OAUTH_SERVER_URL=https://oauth.manus.app
OWNER_OPEN_ID=dev-owner-id
NODE_ENV=production
```

4. Klik **"Save"** - Railway akan otomatis redeploy

### 5️⃣ Isi Database dengan Data Materi (3 menit)

**Pilih salah satu cara:**

#### Cara A: Via Railway Dashboard (MUDAH!)

1. Di service aplikasi, klik tab **"Settings"**
2. Scroll ke bawah cari **"Deploy Triggers"** atau buka **"Deployments"**
3. Klik deployment yang aktif
4. Klik **"View Logs"**
5. Di bagian atas, ada tombol **"Run Command"** atau **"Shell"**
6. Jalankan command ini satu per satu:

```bash
npx tsx seed-categories.mjs
npx tsx seed-materials.mjs
npx tsx seed-additional-materials.mjs
```

ATAU jalankan sekaligus:

```bash
npx tsx seed-all.mjs
```

#### Cara B: Via Railway CLI (Untuk yang suka terminal)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link ke project
railway link

# Jalankan seeding
railway run npx tsx seed-all.mjs
```

### 6️⃣ Hubungkan Domain Anda (5 menit)

1. Di Railway project, klik service aplikasi
2. Klik tab **"Settings"**
3. Scroll ke **"Domains"**
4. Klik **"Generate Domain"** - Anda akan dapat domain gratis seperti `websitekua.up.railway.app`
5. Untuk custom domain `websitekuapecalungan.online`:
   - Klik **"Custom Domain"**
   - Masukkan: `websitekuapecalungan.online`
   - Railway akan kasih CNAME record
   - Buka dashboard domain Anda (tempat beli domain)
   - Tambahkan CNAME record:
     - **Type**: CNAME
     - **Name**: `@` atau `www`
     - **Value**: (domain Railway Anda, contoh: `websitekua.up.railway.app`)
   - Tunggu 5-30 menit

### 7️⃣ TEST WEBSITE! 🎉

Buka domain Railway Anda (atau domain custom setelah DNS propagate)

**Harus bisa:**
- ✅ Halaman Home muncul tanpa login
- ✅ Materi Fiqih ada isinya (Thaharah, Shalat, Zakat, dll)
- ✅ Tanya Jawab bisa diakses
- ✅ Bisa register dan login
- ✅ Bisa ajukan pertanyaan setelah login

## 🆘 Troubleshooting

### Website error 500?
- Cek logs di Railway
- Pastikan environment variables sudah lengkap
- Pastikan database sudah connected

### Materi fiqih kosong?
- Jalankan seeding database (langkah 5)
- Cek logs untuk error

### Domain tidak connect?
- Tunggu 30 menit untuk DNS propagation
- Cek CNAME record di dashboard domain
- Pastikan pointing ke domain Railway yang benar

## 📚 Dokumentasi Lengkap

- **DEPLOY-RAILWAY.md** - Panduan detail deployment
- **CHANGELOG-AUTH-FIX.md** - Perubahan yang sudah dilakukan
- **PANDUAN-PENGGUNA.md** - Panduan untuk user website

## 💰 Biaya

**Railway Free Tier:**
- $5 credit per bulan (GRATIS)
- Cukup untuk website kecil-menengah
- Otomatis sleep jika tidak ada traffic
- Wake up otomatis saat ada visitor

**Domain:**
- Anda sudah punya domain `websitekuapecalungan.online`
- Tinggal hubungkan dengan CNAME record

## ✅ Checklist

- [ ] Akun Railway dibuat
- [ ] Website deployed dari GitHub
- [ ] MySQL database ditambahkan
- [ ] Environment variables diset
- [ ] Database di-seed dengan data materi
- [ ] Domain dihubungkan
- [ ] Website bisa diakses dan materi muncul

---

**Selamat! Tinggal 5 langkah lagi website Anda online! 🚀**

Jika ada masalah, cek file **DEPLOY-RAILWAY.md** untuk panduan lengkap.
