# WebsiteKUA - Deployment Guide

## Opsi 1: Deploy dengan Docker Compose (Recommended)

### Prasyarat:
- Docker dan Docker Compose terinstal
- Port 3000 tersedia

### Langkah:
```bash
# Clone repository
git clone https://github.com/raihanatharid08-sketch/WEBSITEKUA.git
cd WEBSITEKUA

# Start aplikasi
docker-compose up -d

# Aplikasi akan berjalan di http://localhost:3000
```

---

## Opsi 2: Deploy dengan Docker saja

```bash
docker build -t websitekua .
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="mysql://websitekua_user:websitekua_password@localhost:3306/websitekua" \
  -e JWT_SECRET="kua-pecalungan-secret-key-2024" \
  websitekua
```

---

## Status

- ✅ GitHub: https://github.com/raihanatharid08-sketch/WEBSITEKUA
- ✅ Docker Ready
- ✅ Vercel Integration Active

Silakan pilih opsi deployment yang sesuai!
