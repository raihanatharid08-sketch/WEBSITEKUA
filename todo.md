# Website Tanya Jawab Fiqih KUA - TODO

## Database Schema
- [x] Create categories table for fiqih topics
- [x] Create questions table for user submissions
- [x] Create answers table for ustadz responses
- [x] Create bookmarks table for saved questions

## Frontend Pages
- [x] Landing page with hero section and features
- [x] Materi Fiqih page with categories (Thaharah, Shalat, Zakat, Puasa, Haji, Muamalah, Munakahat/Nikah)
- [x] Tanya Jawab page with question list and filters
- [x] Detail Q&A page showing question and answer
- [x] Form pertanyaan for submitting questions
- [x] Lokasi KUA page with Google Maps embed
- [x] Kontak page with WhatsApp and Email buttons

## Backend API
- [x] POST /question endpoint for submitting questions
- [x] GET /questions endpoint for listing questions
- [x] GET /question/:id endpoint for question details
- [x] POST /answer endpoint for admin to answer questions
- [x] GET /categories endpoint for fiqih categories

## Admin Panel
- [x] Admin login using Manus OAuth
- [x] Dashboard showing pending questions
- [x] Answer form for ustadz/admin
- [ ] Category management interface

## Integrations
- [x] WhatsApp button linking to wa.me/6282313746691
- [x] Email button linking to kuapecalungan15@gmail.com
- [x] Google Maps embed with link maps.app.goo.gl/7Nq7FUTg6GG57skKA

## Testing & Deployment
- [x] Write vitest tests for critical procedures
- [x] Test all user flows
- [x] Save checkpoint for deployment

## New Features (Phase 2)
- [x] Search functionality for finding answered questions
- [x] Email notification system when questions are answered
- [x] Detailed fiqih material pages with full content for each category

## Mobile Responsiveness Fixes
- [x] Create mobile-friendly navigation with hamburger menu
- [x] Fix header layout for mobile screens
- [x] Optimize spacing and typography for small screens
- [x] Ensure all pages work without horizontal scrolling
- [x] Test on various mobile screen sizes

## Bug Fixes
- [x] Fix DialogContent accessibility error - add DialogTitle to mobile navigation

## Fitur Tambahan (Phase 3)
- [x] Update halaman Lokasi dengan Header component baru
- [x] Update halaman AdminDashboard dengan Header component baru
- [x] Tambahkan meta tags SEO (title, description, Open Graph) di semua halaman
- [x] Buat sitemap.xml untuk SEO
- [x] Buat robots.txt untuk crawler mesin pencari

## Perbaikan Admin Dashboard
- [x] Verifikasi halaman Admin Dashboard berfungsi dengan baik
- [x] Tambahkan link akses Admin Dashboard di header untuk user dengan role admin
- [x] Test fitur menjawab pertanyaan dari admin dashboard

## Login Admin & Navigasi
- [x] Buat halaman login admin dengan email dan password KUAPECALUNGAN
- [x] Implementasi autentikasi admin dengan password khusus
- [x] Perbaiki header agar logo KUA bisa diklik untuk kembali ke halaman utama
- [x] Test login admin dan navigasi kembali ke home

## Fitur Tambahan (Phase 4)
- [x] Tambahkan logo Kementerian Agama di halaman depan
- [x] Tambahkan tombol back dengan ikon panah (bukan logo KUA)
- [x] Perbaiki masalah di halaman materi fiqih
- [x] Buat log aktivitas admin untuk audit trail
- [x] Buat halaman pengaturan admin untuk ubah password dan kelola kategori

## Fitur yang Belum Selesai
- [x] Implementasi fitur bookmark untuk menyimpan pertanyaan favorit pengguna
- [x] Terapkan BackButton di semua halaman (TanyaJawab, AjukanPertanyaan, DetailPertanyaan, Lokasi)

## Bug Fixes
- [x] Perbaiki route /materi yang mengarah ke 404 (seharusnya ke halaman MateriFiqih)

## Perbaikan UI/UX
- [x] Ganti logo website dengan logo Kemenag baru (images.png)
- [x] Hapus gambar logo besar di halaman pertama
- [x] Perbaiki masalah login admin
- [x] Ganti hamburger menu (garis tiga) dengan tombol yang lebih menarik di mobile

## Redesign Visual
- [x] Tambahkan gradasi warna hijau yang lebih dinamis
- [x] Buat background pattern Islami yang elegan
- [x] Tambahkan efek visual dan shadow untuk depth
- [x] Update color scheme dengan kombinasi warna yang lebih menarik

## Fitur Baru (Phase 5)
- [x] Implementasi animasi smooth scroll
- [x] Tambahkan fade-in effect saat elemen muncul di viewport
- [x] Buat halaman galeri kegiatan KUA dengan foto-foto
- [x] Implementasi sistem rating untuk jawaban ustadz
- [x] Buat sistem testimoni dari jamaah

## Fitur Testimoni Publik
- [x] Tambahkan section testimoni di homepage
- [x] Buat router untuk get approved testimonials
- [x] Buat form testimoni untuk jamaah
- [x] Buat halaman admin untuk approve testimoni

## Perbaikan Layout & Cleanup
- [x] Hapus halaman Galeri yang tidak diperlukan
- [x] Hapus link Galeri dari navigasi header
- [x] Rapihkan spacing dan layout di semua halaman
- [x] Perbaiki tulisan yang menumpuk di mobile dan desktop

## Perbaikan UX & Konten
- [x] Sederhanakan form ajukan pertanyaan (hapus field email, cukup nama dan pertanyaan)
- [x] Tambahkan lebih banyak materi fiqih dasar ke database
- [x] Implementasi pencarian real-time dengan autocomplete di header

## Fitur Hapus Pertanyaan Admin
- [x] Tambahkan fungsi deleteQuestion di db.ts
- [x] Tambahkan router admin.deleteQuestion di routers.ts
- [x] Tambahkan tombol hapus di AdminDashboard untuk pertanyaan yang sudah dijawab
- [x] Tambahkan konfirmasi sebelum menghapus
