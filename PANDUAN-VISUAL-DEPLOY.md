# 🚀 Panduan Visual Deploy Website KUA ke Railway

## 📋 Persiapan

Sebelum mulai, pastikan:
- ✅ Anda punya akun GitHub
- ✅ Repository WEBSITEKUA sudah ada di GitHub Anda
- ✅ Koneksi internet stabil

**Estimasi Waktu: 15-20 menit**

---

## 🎯 Langkah 1: Buat Akun Railway (2 menit)

### 1.1 Buka Railway.app

1. Buka browser Anda
2. Ketik: **https://railway.app**
3. Anda akan melihat halaman seperti ini:

![Railway Homepage](01-railway-homepage.webp)

### 1.2 Login dengan GitHub

1. Klik tombol **"Sign in"** di pojok kanan atas
2. Pilih **"Login with GitHub"**
3. Anda akan diarahkan ke halaman GitHub
4. Klik **"Authorize Railway"**
5. Selesai! Anda akan masuk ke dashboard Railway

**💡 Tip:** Railway gratis untuk pemula dengan $5 credit per bulan

---

## 🎯 Langkah 2: Deploy dari GitHub (3 menit)

### 2.1 Buat Project Baru

1. Di dashboard Railway, klik tombol **"Deploy a new project"** (tombol ungu besar)
2. Anda akan melihat beberapa pilihan

### 2.2 Pilih Deploy from GitHub

1. Klik **"Deploy from GitHub repo"**
2. Railway akan minta akses ke repository GitHub Anda
3. Klik **"Configure GitHub App"** jika diminta
4. Pilih **"All repositories"** atau pilih **"Only select repositories"** → centang **WEBSITEKUA**
5. Klik **"Install & Authorize"**

### 2.3 Pilih Repository WEBSITEKUA

1. Kembali ke Railway
2. Cari dan klik repository **"raihanatharid08-sketch/WEBSITEKUA"**
3. Railway akan otomatis:
   - Detect bahwa ini adalah Node.js project
   - Mulai build aplikasi
   - Install dependencies

### 2.4 Tunggu Build Selesai

1. Anda akan melihat log build berjalan
2. Tunggu sampai muncul **"Build Successful"** (warna hijau)
3. Proses ini memakan waktu 3-5 menit

**⚠️ Catatan:** Jika build gagal, jangan khawatir! Lanjut ke langkah berikutnya dulu.

---

## 🎯 Langkah 3: Tambah Database MySQL (1 menit)

### 3.1 Tambah Database

1. Di project yang sama (jangan buat project baru!)
2. Klik tombol **"New"** atau **"+"** di dashboard
3. Pilih **"Database"**
4. Pilih **"Add MySQL"**

### 3.2 Tunggu Database Dibuat

1. Railway akan otomatis:
   - Buat MySQL database
   - Generate password
   - Connect ke aplikasi Anda
   - Set environment variable `DATABASE_URL`
2. Proses ini hanya 30 detik

**✅ Sekarang Anda punya 2 service:**
- Service aplikasi (WEBSITEKUA)
- Service database (MySQL)

---

## 🎯 Langkah 4: Set Environment Variables (2 menit)

### 4.1 Buka Settings Aplikasi

1. Klik service **aplikasi** Anda (bukan database!)
2. Klik tab **"Variables"** di bagian atas

### 4.2 Tambah Variables

Klik **"New Variable"** dan tambahkan satu per satu:

**Variable 1:**
- Name: `JWT_SECRET`
- Value: `websitekua-super-secret-key-production-2024-change-this`

**Variable 2:**
- Name: `VITE_APP_ID`
- Value: `websitekua`

**Variable 3:**
- Name: `OAUTH_SERVER_URL`
- Value: `https://oauth.manus.app`

**Variable 4:**
- Name: `OWNER_OPEN_ID`
- Value: `dev-owner-id`

**Variable 5:**
- Name: `NODE_ENV`
- Value: `production`

### 4.3 Save dan Redeploy

1. Klik **"Save"** atau **"Add"** setelah setiap variable
2. Railway akan otomatis **redeploy** aplikasi Anda
3. Tunggu sampai deployment selesai (2-3 menit)

**💡 Tip:** Variable `DATABASE_URL` sudah otomatis terisi oleh Railway, tidak perlu ditambah manual!

---

## 🎯 Langkah 5: Isi Database dengan Data Materi (3 menit)

**INI LANGKAH PALING PENTING!** Database masih kosong, kita perlu isi dengan data materi fiqih.

### 5.1 Buka Shell/Terminal Railway

1. Di service aplikasi Anda
2. Klik tab **"Deployments"**
3. Klik deployment yang sedang **"Active"** (hijau)
4. Di bagian atas, cari dan klik **"Shell"** atau **"View Logs"**
5. Jika ada tombol **"Open Shell"**, klik itu

### 5.2 Jalankan Seeding (Cara Mudah)

Di shell/terminal Railway, ketik command ini **satu per satu**:

```bash
npx tsx seed-categories.mjs
```
Tekan Enter, tunggu sampai muncul "Categories seeded successfully!"

```bash
npx tsx seed-materials.mjs
```
Tekan Enter, tunggu sampai muncul "Materials seeded successfully!"

```bash
npx tsx seed-additional-materials.mjs
```
Tekan Enter, tunggu sampai muncul "Additional materials seeded successfully!"

### 5.3 Atau Jalankan Sekaligus (Cara Cepat)

Jika ingin seeding sekaligus, ketik:

```bash
npx tsx seed-all.mjs
```

Tunggu sampai muncul:
```
✅ Success: 3
🎉 All data seeded successfully!
```

**⚠️ Jika tidak ada tombol Shell:**

Gunakan Railway CLI (alternatif):

1. Buka terminal/command prompt di komputer Anda
2. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```
3. Login:
   ```bash
   railway login
   ```
4. Link ke project:
   ```bash
   railway link
   ```
5. Jalankan seeding:
   ```bash
   railway run npx tsx seed-all.mjs
   ```

---

## 🎯 Langkah 6: Dapatkan URL Website (1 menit)

### 6.1 Generate Domain Railway

1. Klik service **aplikasi** Anda
2. Klik tab **"Settings"**
3. Scroll ke bagian **"Domains"**
4. Klik **"Generate Domain"**
5. Railway akan memberikan URL gratis seperti:
   ```
   websitekua.up.railway.app
   ```

### 6.2 Test Website

1. Klik URL tersebut atau copy-paste ke browser
2. Website Anda harus muncul!
3. Test halaman:
   - ✅ Home - Harus muncul tanpa error
   - ✅ Materi Fiqih - Harus ada isinya (Thaharah, Shalat, Zakat, dll)
   - ✅ Tanya Jawab - Harus bisa diakses
   - ✅ Login - Harus bisa register

**🎉 Jika semua halaman berfungsi, SELAMAT! Website Anda sudah online!**

---

## 🎯 Langkah 7: Hubungkan Domain Custom (5 menit)

Sekarang kita hubungkan domain Anda: **websitekuapecalungan.online**

### 7.1 Tambah Custom Domain di Railway

1. Masih di tab **"Settings"** → **"Domains"**
2. Klik **"Custom Domain"**
3. Ketik: `websitekuapecalungan.online`
4. Klik **"Add"**

Railway akan memberikan informasi CNAME record seperti:
```
CNAME: websitekua.up.railway.app
```

### 7.2 Update DNS di Provider Domain

Sekarang buka dashboard tempat Anda beli domain (contoh: Niagahoster, Rumahweb, GoDaddy, Cloudflare, dll)

**Langkah umum (setiap provider beda sedikit):**

1. Login ke dashboard domain provider
2. Cari menu **"DNS Management"** atau **"DNS Settings"**
3. Tambah record baru:
   - **Type**: CNAME
   - **Name/Host**: `@` (untuk root domain) atau `www` (untuk subdomain)
   - **Value/Target**: `websitekua.up.railway.app` (domain Railway Anda)
   - **TTL**: 3600 (atau biarkan default)
4. Klik **"Save"** atau **"Add Record"**

**💡 Contoh untuk beberapa provider:**

**Niagahoster/Rumahweb:**
- Masuk ke Member Area
- Pilih domain → DNS Management
- Tambah record CNAME

**Cloudflare:**
- Pilih domain
- Klik DNS
- Add record → CNAME

**GoDaddy:**
- My Products → Domains
- DNS → Add → CNAME

### 7.3 Tunggu DNS Propagation

1. Setelah save, tunggu **5-30 menit** untuk DNS propagation
2. Cek status dengan buka: `https://websitekuapecalungan.online`
3. Jika belum muncul, tunggu lebih lama (maksimal 24 jam, tapi biasanya 15 menit)

**✅ Setelah DNS propagation selesai, domain Anda akan mengarah ke website Railway!**

---

## 🎉 SELESAI! Website Anda Online!

Sekarang website Anda sudah online di:
- ✅ **Railway Domain**: `websitekua.up.railway.app`
- ✅ **Custom Domain**: `websitekuapecalungan.online`

### ✅ Checklist Final

- [x] Akun Railway dibuat
- [x] Website deployed dari GitHub
- [x] MySQL database ditambahkan
- [x] Environment variables diset
- [x] Database di-seed dengan 29 materi fiqih
- [x] Domain Railway didapat
- [x] Custom domain dihubungkan
- [x] Website bisa diakses!

---

## 🔧 Troubleshooting

### ❌ Build Gagal?

**Solusi:**
1. Cek logs di Railway
2. Pastikan repository sudah ter-update (commit terbaru)
3. Coba redeploy: Settings → Redeploy

### ❌ Website Error 500?

**Solusi:**
1. Pastikan environment variables sudah lengkap
2. Pastikan database sudah connected
3. Cek logs untuk error message

### ❌ Materi Fiqih Kosong?

**Solusi:**
1. Jalankan ulang seeding: `npx tsx seed-all.mjs`
2. Cek logs untuk error
3. Pastikan `DATABASE_URL` sudah terisi

### ❌ Domain Tidak Connect?

**Solusi:**
1. Tunggu 30 menit untuk DNS propagation
2. Cek CNAME record di dashboard domain
3. Pastikan pointing ke domain Railway yang benar
4. Clear browser cache atau coba browser lain

### ❌ Tidak Bisa Buka Shell di Railway?

**Solusi:**
1. Gunakan Railway CLI (lihat Langkah 5.3)
2. Atau tunggu deployment selesai dulu
3. Atau coba dari tab "Logs" → ada opsi "Run Command"

---

## 💰 Biaya

**Railway Free Tier:**
- $5 credit per bulan (GRATIS)
- 500 jam runtime per bulan
- Cukup untuk website kecil-menengah
- Auto-sleep jika tidak ada traffic (wake up otomatis saat ada visitor)

**Jika credit habis:**
- Tambahkan kartu kredit untuk upgrade
- Atau tunggu bulan berikutnya (credit reset)

---

## 🔄 Auto Deploy

**Keuntungan menggunakan Railway:**

Setiap kali Anda push code baru ke GitHub (branch `main`), Railway akan **otomatis deploy** tanpa perlu manual!

Jadi untuk update website:
1. Edit code di Manus atau local
2. Push ke GitHub
3. Railway otomatis deploy
4. Website terupdate!

---

## 📞 Butuh Bantuan?

**Jika masih ada masalah:**

1. **Cek dokumentasi Railway**: https://docs.railway.app
2. **Railway Discord**: https://discord.gg/railway
3. **Railway Forum**: https://help.railway.app
4. **Email support**: team@railway.app

**Untuk masalah website:**
- Cek file `DEPLOY-RAILWAY.md` untuk troubleshooting lengkap
- Cek logs di Railway dashboard

---

## 🎊 Selamat!

Website KUA Anda sudah online dan bisa diakses oleh jamaah!

**Fitur yang tersedia:**
- ✅ 29 Materi Fiqih lengkap
- ✅ 7 Kategori (Thaharah, Shalat, Zakat, Puasa, Haji, Muamalah, Munakahat)
- ✅ Tanya Jawab dengan ustadz
- ✅ Sistem bookmark
- ✅ Testimoni jamaah
- ✅ Lokasi KUA
- ✅ Kontak WhatsApp & Email

**Semua bisa diakses tanpa login!** (kecuali untuk ajukan pertanyaan, bookmark, dan testimoni)

---

**بارك الله فيكم (Barakallahu fiikum)**

Semoga website ini bermanfaat untuk jamaah! 🤲
