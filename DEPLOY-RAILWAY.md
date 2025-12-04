# 🚀 Panduan Deploy Website KUA ke Railway

## ✅ Langkah-langkah Deployment (MUDAH!)

### 1️⃣ Buat Akun Railway (GRATIS)

1. Buka https://railway.app
2. Klik **"Start a New Project"** atau **"Login with GitHub"**
3. Login menggunakan akun GitHub Anda
4. Railway akan otomatis detect repository Anda

### 2️⃣ Deploy dari GitHub

1. Di dashboard Railway, klik **"New Project"**
2. Pilih **"Deploy from GitHub repo"**
3. Pilih repository: **`raihanatharid08-sketch/WEBSITEKUA`**
4. Railway akan otomatis:
   - Detect bahwa ini adalah Node.js project
   - Install dependencies
   - Build aplikasi
   - Deploy!

### 3️⃣ Tambahkan Database MySQL

1. Di project Railway Anda, klik **"New"** → **"Database"** → **"Add MySQL"**
2. Railway akan otomatis:
   - Buat MySQL database
   - Generate environment variables
   - Connect ke aplikasi Anda

### 4️⃣ Setup Environment Variables

Di Railway dashboard, masuk ke **Variables** tab dan tambahkan:

```env
DATABASE_URL=${{MySQL.DATABASE_URL}}
JWT_SECRET=ganti-dengan-random-string-yang-panjang-dan-aman
VITE_APP_ID=websitekua
OAUTH_SERVER_URL=https://oauth.manus.app
OWNER_OPEN_ID=dev-owner-id
NODE_ENV=production
```

**Catatan:** 
- `${{MySQL.DATABASE_URL}}` akan otomatis terisi oleh Railway
- Ganti `JWT_SECRET` dengan string random yang aman (minimal 32 karakter)

### 5️⃣ Jalankan Database Migration

Di Railway dashboard:

1. Klik tab **"Deployments"**
2. Klik deployment yang sedang running
3. Klik **"View Logs"**
4. Tunggu sampai aplikasi selesai deploy
5. Buka **"Settings"** → **"Deploy"**
6. Scroll ke bawah, cari **"Custom Start Command"**
7. Tambahkan command untuk migration (sudah otomatis jalan saat deploy)

### 6️⃣ Seed Database dengan Data Materi Fiqih

**PENTING:** Setelah deployment berhasil, Anda perlu mengisi database dengan data materi fiqih.

#### Cara 1: Via Railway CLI (Recommended)

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login ke Railway:
   ```bash
   railway login
   ```

3. Link ke project Anda:
   ```bash
   railway link
   ```

4. Jalankan seeding:
   ```bash
   railway run npx tsx seed-categories.mjs
   railway run npx tsx seed-materials.mjs
   railway run npx tsx seed-additional-materials.mjs
   ```

#### Cara 2: Via Railway Dashboard (Lebih Mudah)

1. Di Railway dashboard, buka tab **"Settings"**
2. Scroll ke **"One-off Commands"**
3. Jalankan command satu per satu:
   ```
   npx tsx seed-categories.mjs
   npx tsx seed-materials.mjs
   npx tsx seed-additional-materials.mjs
   ```

### 7️⃣ Hubungkan Domain Anda

1. Di Railway project, klik **"Settings"**
2. Scroll ke **"Domains"**
3. Klik **"Generate Domain"** untuk mendapat domain Railway gratis (contoh: `websitekua.up.railway.app`)
4. Untuk custom domain (`websitekuapecalungan.online`):
   - Klik **"Custom Domain"**
   - Masukkan: `websitekuapecalungan.online`
   - Railway akan memberikan CNAME record
   - Buka dashboard domain Anda (tempat beli domain)
   - Tambahkan CNAME record:
     - **Name/Host**: `@` atau `www`
     - **Value**: `websitekua.up.railway.app` (domain Railway Anda)
     - **TTL**: 3600 (atau default)
   - Tunggu 5-30 menit untuk DNS propagation

### 8️⃣ Verifikasi Website

1. Buka domain Railway Anda (contoh: `websitekua.up.railway.app`)
2. Website harus muncul tanpa error!
3. Cek halaman:
   - ✅ Home - Harus bisa diakses tanpa login
   - ✅ Materi Fiqih - Harus ada 29+ materi
   - ✅ Tanya Jawab - Harus bisa diakses
   - ✅ Login - Harus bisa register dan login

## 🎯 Checklist Deployment

- [ ] Akun Railway sudah dibuat
- [ ] Repository GitHub sudah connected
- [ ] MySQL database sudah ditambahkan
- [ ] Environment variables sudah diset
- [ ] Aplikasi sudah deploy dan running
- [ ] Database migration sudah jalan
- [ ] Seeding data materi fiqih sudah dilakukan
- [ ] Domain custom sudah dihubungkan
- [ ] Website bisa diakses dan materi muncul

## 🔧 Troubleshooting

### Website masih redirect ke login?
- Pastikan perubahan terbaru sudah di-pull dari GitHub
- Redeploy aplikasi di Railway

### Materi fiqih tidak muncul?
- Pastikan seeding sudah dijalankan
- Cek logs di Railway untuk error
- Jalankan ulang seeding command

### Domain tidak connect?
- Tunggu 30 menit untuk DNS propagation
- Cek CNAME record di dashboard domain
- Pastikan pointing ke domain Railway yang benar

### Error saat deployment?
- Cek logs di Railway dashboard
- Pastikan environment variables sudah lengkap
- Pastikan `DATABASE_URL` sudah terisi otomatis

## 💡 Tips

1. **Railway Free Tier**: 
   - $5 credit per bulan (cukup untuk website kecil)
   - 500 jam runtime
   - Otomatis sleep jika tidak ada traffic (akan wake up otomatis saat diakses)

2. **Auto Deploy**:
   - Setiap push ke GitHub main branch akan otomatis deploy
   - Tidak perlu deploy manual lagi

3. **Monitoring**:
   - Cek logs di Railway dashboard jika ada masalah
   - Railway akan email Anda jika ada error

## 📞 Butuh Bantuan?

Jika ada masalah:
1. Cek logs di Railway dashboard
2. Baca error message dengan teliti
3. Google error message untuk solusi
4. Hubungi support Railway: https://railway.app/help

---

**Selamat! Website Anda siap online! 🎉**
