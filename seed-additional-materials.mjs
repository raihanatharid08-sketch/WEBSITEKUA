import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { fiqihMaterials } from "./drizzle/schema.js";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const additionalMaterials = [
  // Thaharah (categoryId: 1) - Materi Tambahan
  {
    categoryId: 1,
    title: "Hukum Air dalam Bersuci",
    content: `**Macam-Macam Air dalam Fiqih:**

1. **Air Mutlak (Air Suci dan Mensucikan)**
   - Air hujan, air laut, air sungai, air sumur
   - Dapat digunakan untuk bersuci (wudhu dan mandi)
   - Dalil: "Dan Kami turunkan dari langit air yang suci" (QS. Al-Furqan: 48)

2. **Air Musta'mal (Air Bekas Bersuci)**
   - Air yang sudah digunakan untuk wudhu atau mandi
   - Menurut jumhur ulama: tetap suci tapi tidak mensucikan
   - Sebaiknya tidak digunakan lagi untuk bersuci

3. **Air Mutanajjis (Air Terkena Najis)**
   - Air yang berubah warna, rasa, atau baunya karena najis
   - Tidak boleh digunakan untuk bersuci
   - Harus dihindari

**Ketentuan Air Sedikit dan Banyak:**
- Air sedikit (kurang dari 2 qullah/±270 liter): mudah menjadi najis jika terkena najis
- Air banyak (lebih dari 2 qullah): tidak menjadi najis kecuali berubah salah satu sifatnya`,
    displayOrder: 10,
  },
  {
    categoryId: 1,
    title: "Macam-Macam Najis dan Cara Membersihkannya",
    content: `**Pembagian Najis:**

1. **Najis Mughallazhah (Najis Berat)**
   - Najis anjing dan babi
   - Cara membersihkan: dicuci 7 kali, salah satunya dengan tanah/debu
   - Dalil: Hadits Rasulullah tentang menjilat anjing pada bejana

2. **Najis Mutawassithah (Najis Sedang)**
   - Darah, nanah, bangkai (kecuali ikan dan belalang)
   - Kencing dan kotoran manusia
   - Cara membersihkan: dicuci dengan air hingga hilang warna, bau, dan rasanya

3. **Najis Mukhaffafah (Najis Ringan)**
   - Kencing bayi laki-laki yang belum makan makanan selain ASI
   - Cara membersihkan: cukup diperciki air hingga basah

**Cara Membersihkan Najis pada Pakaian:**
- Cuci bagian yang terkena najis dengan air mengalir
- Pastikan najis hilang (warna, bau, rasa)
- Peras dan bilas hingga bersih
- Tidak perlu dihitung jumlah cucian (kecuali najis anjing/babi)`,
    displayOrder: 11,
  },
  {
    categoryId: 1,
    title: "Tayammum: Bersuci dengan Debu",
    content: `**Pengertian Tayammum:**
Tayammum adalah bersuci dengan menggunakan debu yang suci sebagai pengganti air ketika tidak ada air atau tidak mampu menggunakan air.

**Syarat Boleh Tayammum:**
1. Tidak ada air atau air sangat sedikit untuk diminum
2. Sakit yang akan bertambah parah jika kena air
3. Cuaca sangat dingin dan tidak ada pemanas air
4. Air ada tapi jauh dan dikhawatirkan kehabisan waktu shalat
5. Takut bahaya jika mencari air (binatang buas, musuh, dll)

**Rukun Tayammum:**
1. Niat
2. Mengusap muka
3. Mengusap kedua tangan sampai siku
4. Tertib (berurutan)

**Tata Cara Tayammum:**
1. Niat dalam hati
2. Membaca basmalah
3. Menepuk kedua telapak tangan ke tanah/debu suci sekali
4. Mengusap seluruh muka
5. Menepuk lagi ke tanah
6. Mengusap tangan kanan dengan tangan kiri sampai siku
7. Mengusap tangan kiri dengan tangan kanan sampai siku

**Yang Membatalkan Tayammum:**
- Semua yang membatalkan wudhu
- Menemukan air (jika tayammum karena tidak ada air)
- Mampu menggunakan air (jika tayammum karena sakit)`,
    displayOrder: 12,
  },

  // Shalat (categoryId: 2) - Materi Tambahan
  {
    categoryId: 2,
    title: "Syarat Wajib dan Syarat Sah Shalat",
    content: `**Syarat Wajib Shalat:**
Syarat yang harus dipenuhi agar seseorang wajib melaksanakan shalat:

1. **Islam** - Orang kafir tidak wajib shalat
2. **Baligh** - Sudah dewasa (mimpi basah atau haid bagi wanita)
3. **Berakal** - Orang gila tidak wajib shalat
4. **Suci dari haid dan nifas** - Wanita yang sedang haid/nifas tidak wajib shalat

**Syarat Sah Shalat:**
Syarat yang harus dipenuhi agar shalat diterima:

1. **Suci dari hadats** - Sudah berwudhu atau mandi wajib
2. **Suci badan, pakaian, dan tempat dari najis**
3. **Menutup aurat**
   - Aurat laki-laki: antara pusar dan lutut
   - Aurat wanita: seluruh tubuh kecuali muka dan telapak tangan
4. **Masuk waktu shalat** - Tidak boleh shalat sebelum waktunya
5. **Menghadap kiblat** - Menghadap ke Ka'bah di Makkah
6. **Mengetahui mana rukun dan mana sunnah**

**Dalil:**
"Shalat tidak diterima tanpa bersuci" (HR. Muslim)`,
    displayOrder: 20,
  },
  {
    categoryId: 2,
    title: "Shalat Sunnah Rawatib",
    content: `**Pengertian Shalat Rawatib:**
Shalat sunnah yang dikerjakan sebelum atau sesudah shalat fardhu, mengikuti (merawatibi) shalat lima waktu.

**Macam-Macam Shalat Rawatib:**

**1. Rawatib Muakkad (Sangat Dianjurkan):**
- **Sebelum Subuh**: 2 rakaat
- **Sebelum Dzuhur**: 4 rakaat (2+2) atau 2 rakaat
- **Sesudah Dzuhur**: 2 rakaat
- **Sesudah Maghrib**: 2 rakaat
- **Sesudah Isya**: 2 rakaat

Total: 12 rakaat (atau 10 rakaat jika sebelum Dzuhur hanya 2 rakaat)

**Keutamaan:**
"Barangsiapa yang mengerjakan 12 rakaat shalat sunnah dalam sehari semalam, maka Allah akan membangunkan baginya rumah di surga" (HR. Muslim)

**2. Rawatib Ghairu Muakkad (Dianjurkan):**
- Sebelum Ashar: 4 rakaat
- Sebelum Maghrib: 2 rakaat
- Sebelum Isya: 2 rakaat

**Tata Cara:**
- Dikerjakan di rumah lebih utama daripada di masjid
- Dibaca dengan suara pelan (sirr)
- Setiap 2 rakaat salam
- Boleh ditinggalkan jika ada halangan`,
    displayOrder: 21,
  },
  {
    categoryId: 2,
    title: "Shalat Jama' dan Qashar",
    content: `**Shalat Jama' (Mengumpulkan Dua Shalat):**

**Jama' Taqdim:** Mengerjakan shalat kedua di waktu shalat pertama
- Dzuhur dan Ashar dikerjakan di waktu Dzuhur
- Maghrib dan Isya dikerjakan di waktu Maghrib

**Jama' Ta'khir:** Mengerjakan shalat pertama di waktu shalat kedua
- Dzuhur dan Ashar dikerjakan di waktu Ashar
- Maghrib dan Isya dikerjakan di waktu Isya

**Syarat Boleh Jama':**
1. Dalam perjalanan (musafir) minimal 81 km
2. Hujan lebat yang menyulitkan
3. Sakit yang berat
4. Takut terhadap keselamatan diri

**Shalat Qashar (Meringkas Shalat):**

Meringkas shalat 4 rakaat menjadi 2 rakaat untuk shalat Dzuhur, Ashar, dan Isya.

**Syarat Qashar:**
1. Musafir (bepergian minimal 81 km)
2. Perjalanan bukan untuk maksiat
3. Belum berniat mukim (menetap) di tempat tujuan

**Ketentuan:**
- Shalat Subuh dan Maghrib tidak di-qashar
- Jika makmum mengikuti imam mukim, harus tetap 4 rakaat
- Boleh qashar selama masih dalam perjalanan
- Jika bermukim lebih dari 4 hari, tidak boleh qashar

**Dalil:**
"Dan apabila kamu bepergian di muka bumi, maka tidaklah mengapa kamu men-qashar shalat" (QS. An-Nisa: 101)`,
    displayOrder: 22,
  },

  // Zakat (categoryId: 3) - Materi Tambahan
  {
    categoryId: 3,
    title: "Zakat Profesi dan Penghasilan",
    content: `**Pengertian Zakat Profesi:**
Zakat yang dikeluarkan dari penghasilan profesi atau pekerjaan seperti gaji, honor, upah, dan penghasilan lainnya.

**Dasar Hukum:**
Menurut sebagian ulama kontemporer, zakat profesi termasuk dalam kategori zakat maal (harta) yang wajib dikeluarkan berdasarkan QS. Al-Baqarah: 267.

**Syarat Wajib Zakat Profesi:**
1. **Muslim** dan **Merdeka**
2. **Penghasilan mencapai nisab** (setara 85 gram emas)
3. **Telah melewati haul** (1 tahun) atau langsung dikeluarkan saat menerima

**Cara Menghitung:**
Ada dua pendapat:
1. **Disamakan dengan zakat pertanian (10% atau 5%)**
   - Jika penghasilan bersih (tanpa modal): 10%
   - Jika ada modal/biaya: 5%

2. **Disamakan dengan zakat emas/perak (2,5%)**
   - Zakat = 2,5% × Penghasilan bersih per bulan/tahun

**Contoh Perhitungan:**
Gaji per bulan: Rp 10.000.000
Nisab (85 gram × Rp 1.000.000): Rp 85.000.000 per tahun atau Rp 7.083.333 per bulan

Karena gaji Rp 10 juta > nisab Rp 7 juta, maka wajib zakat:
- Zakat = 2,5% × Rp 10.000.000 = Rp 250.000 per bulan

**Penerima Zakat Profesi:**
Sama dengan penerima zakat lainnya (8 asnaf)`,
    displayOrder: 30,
  },
  {
    categoryId: 3,
    title: "Zakat Emas, Perak, dan Uang",
    content: `**Zakat Emas dan Perak:**

**Nisab:**
- Emas: 85 gram
- Perak: 595 gram
- Uang: setara dengan harga 85 gram emas

**Kadar Zakat:** 2,5%

**Syarat:**
1. Mencapai nisab
2. Telah dimiliki selama 1 tahun (haul)
3. Milik penuh (bukan pinjaman)
4. Melebihi kebutuhan pokok

**Cara Menghitung Zakat Emas:**
Contoh: Memiliki emas 100 gram
- Nisab: 85 gram (sudah wajib zakat)
- Zakat = 2,5% × 100 gram = 2,5 gram emas
- Atau dibayar dengan uang senilai 2,5 gram emas

**Zakat Uang Simpanan:**

**Nisab:** Setara harga 85 gram emas
Contoh: Harga emas Rp 1.000.000/gram
Nisab = 85 × Rp 1.000.000 = Rp 85.000.000

**Cara Menghitung:**
Tabungan: Rp 100.000.000
Zakat = 2,5% × Rp 100.000.000 = Rp 2.500.000

**Catatan Penting:**
- Emas perhiasan yang dipakai sehari-hari: menurut jumhur ulama tidak wajib dizakati
- Emas yang disimpan/investasi: wajib dizakati
- Uang yang terus berputar untuk usaha: dihitung saat haul sebagai modal + keuntungan`,
    displayOrder: 31,
  },
  {
    categoryId: 3,
    title: "8 Golongan Penerima Zakat (Asnaf)",
    content: `**Delapan Golongan Penerima Zakat:**

Berdasarkan QS. At-Taubah ayat 60:

**1. Fakir**
- Orang yang tidak memiliki harta dan tidak mampu berusaha
- Tidak memiliki penghasilan untuk memenuhi kebutuhan pokok

**2. Miskin**
- Orang yang memiliki harta/penghasilan tapi tidak cukup untuk kebutuhan
- Penghasilan kurang dari separuh kebutuhan pokok

**3. Amil (Pengurus Zakat)**
- Orang yang ditugaskan mengumpulkan dan mendistribusikan zakat
- Berhak mendapat upah dari zakat yang dikumpulkan

**4. Muallaf (Orang yang Baru Masuk Islam)**
- Orang yang baru masuk Islam dan perlu dikuatkan imannya
- Orang yang diharapkan masuk Islam atau menahan kejahatannya

**5. Riqab (Memerdekakan Budak)**
- Untuk membebaskan budak muslim
- Membantu orang yang terlilit hutang karena menebus dirinya

**6. Gharim (Orang yang Berhutang)**
- Orang yang berhutang untuk kepentingan yang halal dan tidak mampu membayar
- Berhutang untuk mendamaikan perselisihan antar manusia

**7. Fi Sabilillah (Di Jalan Allah)**
- Untuk kepentingan jihad dan dakwah Islam
- Termasuk pendidikan Islam, pembangunan masjid, dll (menurut sebagian ulama)

**8. Ibnu Sabil (Musafir yang Kehabisan Bekal)**
- Orang yang sedang dalam perjalanan dan kehabisan bekal
- Meskipun kaya di kampung halamannya

**Catatan:**
- Zakat tidak boleh diberikan kepada keluarga yang wajib dinafkahi (orang tua, anak, istri/suami)
- Zakat tidak boleh diberikan kepada orang kaya
- Boleh diberikan kepada saudara yang termasuk 8 golongan`,
    displayOrder: 32,
  },

  // Puasa (categoryId: 4) - Materi Tambahan
  {
    categoryId: 4,
    title: "Hal-hal yang Membatalkan Puasa",
    content: `**Hal-hal yang Membatalkan Puasa:**

**1. Makan dan Minum dengan Sengaja**
- Memasukkan sesuatu ke dalam rongga tubuh melalui mulut atau hidung
- Jika lupa tidak membatalkan puasa
- Konsekuensi: Qadha dan kaffarah (jika di bulan Ramadhan)

**2. Muntah dengan Sengaja**
- Jika memaksa diri muntah, puasa batal
- Jika muntah tanpa sengaja, puasa tidak batal
- Dalil: "Barangsiapa yang muntah tanpa sengaja maka tidak wajib qadha, dan barangsiapa yang sengaja muntah maka wajib qadha" (HR. Tirmidzi)

**3. Haid dan Nifas**
- Wanita yang haid atau nifas tidak boleh puasa
- Wajib mengqadha di hari lain

**4. Jima' (Hubungan Suami Istri)**
- Membatalkan puasa dan wajib kaffarah
- Kaffarah: memerdekakan budak, atau puasa 2 bulan berturut-turut, atau memberi makan 60 orang miskin

**5. Keluar Mani karena Perbuatan Sengaja**
- Seperti onani atau bersentuhan dengan lawan jenis
- Jika keluar mani karena mimpi, tidak membatalkan

**6. Murtad (Keluar dari Islam)**
- Semua ibadah menjadi batal

**Hal yang TIDAK Membatalkan Puasa:**
- Makan/minum karena lupa
- Mimpi basah
- Berbekam/donor darah (menurut jumhur ulama)
- Suntik yang tidak mengandung nutrisi
- Mencicipi makanan tanpa ditelan
- Berkumur dan beristinsyaq (menghirup air ke hidung)
- Mandi atau berenang
- Mencium pasangan tanpa syahwat`,
    displayOrder: 40,
  },
  {
    categoryId: 4,
    title: "Fidyah dan Qadha Puasa",
    content: `**Qadha Puasa (Mengganti Puasa):**

**Wajib Qadha:**
1. Orang sakit yang sembuh setelah Ramadhan
2. Musafir yang berbuka dalam perjalanan
3. Wanita haid/nifas
4. Wanita hamil/menyusui yang khawatir pada diri atau anaknya

**Ketentuan Qadha:**
- Boleh dilakukan kapan saja sebelum Ramadhan berikutnya
- Boleh berturut-turut atau terpisah-pisah
- Jika belum diqadha sampai Ramadhan berikutnya, wajib qadha + fidyah

**Fidyah (Denda Puasa):**

**Pengertian:**
Membayar denda dengan memberi makan orang miskin karena tidak mampu puasa.

**Yang Wajib Membayar Fidyah:**
1. **Orang tua renta** yang tidak mampu puasa
2. **Orang sakit kronis** yang tidak ada harapan sembuh
3. **Wanita hamil/menyusui** yang sangat khawatir (menurut sebagian ulama)

**Kadar Fidyah:**
Memberi makan 1 orang miskin untuk setiap hari yang ditinggalkan
- Ukuran: 1 mud (±0,6 kg) makanan pokok (beras)
- Atau senilai dengan harga makanan tersebut

**Contoh:**
Tidak puasa 30 hari = memberi makan 30 orang miskin
atau 30 × 0,6 kg beras = 18 kg beras

**Kaffarah (Denda Berat):**
Untuk yang membatalkan puasa dengan jima' di siang hari Ramadhan:
1. Memerdekakan budak, atau
2. Puasa 2 bulan berturut-turut (60 hari), atau
3. Memberi makan 60 orang miskin

**Dalil:**
"Dan wajib bagi orang-orang yang berat menjalankannya (jika mereka tidak berpuasa) membayar fidyah, yaitu memberi makan seorang miskin" (QS. Al-Baqarah: 184)`,
    displayOrder: 41,
  },
  {
    categoryId: 4,
    title: "Puasa Sunnah",
    content: `**Macam-Macam Puasa Sunnah:**

**1. Puasa Senin dan Kamis**
- Sangat dianjurkan Rasulullah SAW
- Dalil: "Amal perbuatan diangkat pada hari Senin dan Kamis, maka aku suka amalku diangkat sedang aku berpuasa" (HR. Tirmidzi)

**2. Puasa Ayyamul Bidh (Hari Putih)**
- Tanggal 13, 14, 15 setiap bulan Hijriyah
- Dinamakan hari putih karena bulan bersinar penuh
- Dalil: Rasulullah memerintahkan puasa 3 hari setiap bulan (HR. Nasa'i)

**3. Puasa Syawal (6 Hari)**
- Dikerjakan setelah Idul Fitri
- Boleh berturut-turut atau terpisah
- Keutamaan: "Barangsiapa berpuasa Ramadhan kemudian diikuti 6 hari di bulan Syawal, maka seperti puasa setahun" (HR. Muslim)

**4. Puasa Bulan Muharram**
- Terutama tanggal 9 dan 10 (Tasua dan Asyura)
- Puasa Asyura menghapus dosa 1 tahun yang lalu
- Sunnah puasa Tasua (tanggal 9) untuk membedakan dengan Yahudi

**5. Puasa Bulan Sya'ban**
- Rasulullah paling banyak puasa sunnah di bulan Sya'ban
- Kecuali 2-3 hari menjelang Ramadhan (tidak boleh)

**6. Puasa Arafah (9 Dzulhijjah)**
- Untuk yang tidak sedang haji
- Menghapus dosa 2 tahun (1 tahun lalu dan 1 tahun yang akan datang)

**7. Puasa Daud**
- Puasa sehari, berbuka sehari
- Puasa yang paling utama menurut Rasulullah

**Hari-hari yang Diharamkan Puasa:**
- Idul Fitri (1 Syawal)
- Idul Adha (10 Dzulhijjah)
- Hari Tasyriq (11, 12, 13 Dzulhijjah)
- Khusus wanita: saat haid dan nifas`,
    displayOrder: 42,
  },

  // Haji (categoryId: 5) - Materi Tambahan
  {
    categoryId: 5,
    title: "Syarat Wajib Haji dan Umrah",
    content: `**Syarat Wajib Haji:**

**1. Islam**
- Haji tidak wajib bagi orang kafir

**2. Baligh (Dewasa)**
- Anak kecil boleh haji tapi tidak menggugurkan kewajiban haji saat dewasa

**3. Berakal Sehat**
- Orang gila tidak wajib haji

**4. Merdeka**
- Budak tidak wajib haji

**5. Mampu (Istitha'ah)**
Meliputi:
- **Mampu secara fisik**: sehat dan kuat untuk melakukan perjalanan
- **Mampu secara finansial**: memiliki biaya untuk berangkat, pulang, dan keluarga yang ditinggalkan
- **Keamanan perjalanan**: jalan aman dari bahaya
- **Mahram bagi wanita**: wanita harus ditemani mahram (menurut jumhur ulama)

**Dalil:**
"Mengerjakan haji adalah kewajiban manusia terhadap Allah, yaitu (bagi) orang yang sanggup mengadakan perjalanan ke Baitullah" (QS. Ali Imran: 97)

**Syarat Sah Haji:**
1. Ihram (niat dan memakai pakaian ihram)
2. Dilakukan pada waktu yang ditentukan (bulan haji: Syawal, Dzulqa'dah, Dzulhijjah)
3. Dilakukan di tempat-tempat yang ditentukan (Makkah dan sekitarnya)

**Perbedaan Haji dan Umrah:**

| Aspek | Haji | Umrah |
|-------|------|-------|
| Hukum | Wajib sekali seumur hidup | Sunnah muakkad |
| Waktu | Bulan Dzulhijjah | Kapan saja |
| Rukun | 6 rukun | 3 rukun |
| Wuquf | Ada (di Arafah) | Tidak ada |
| Mabit | Ada (di Muzdalifah & Mina) | Tidak ada |`,
    displayOrder: 50,
  },
  {
    categoryId: 5,
    title: "Rukun Haji dan Wajib Haji",
    content: `**Rukun Haji (6 Rukun):**

Jika ada yang tertinggal, haji tidak sah dan harus diulang.

**1. Ihram**
- Niat melakukan haji dan memakai pakaian ihram
- Dimulai dari miqat (tempat yang ditentukan)

**2. Wuquf di Arafah**
- Berada di Arafah pada tanggal 9 Dzulhijjah
- Waktu: mulai tergelincir matahari (dzuhur) sampai terbit fajar tanggal 10
- Rukun paling penting dalam haji

**3. Thawaf Ifadhah**
- Thawaf yang dilakukan setelah wuquf Arafah
- Waktu: setelah subuh tanggal 10 Dzulhijjah
- Boleh ditunda sampai akhir bulan Dzulhijjah

**4. Sa'i antara Shafa dan Marwah**
- Berlari-lari kecil 7 kali antara bukit Shafa dan Marwah
- Dimulai dari Shafa dan diakhiri di Marwah

**5. Tahalul (Mencukur/Memendekkan Rambut)**
- Laki-laki: mencukur atau memendekkan rambut
- Wanita: memotong rambut sepanjang ujung jari

**6. Tertib**
- Melakukan rukun-rukun haji sesuai urutan

**Wajib Haji (7 Wajib):**

Jika ada yang tertinggal, haji tetap sah tapi wajib membayar dam (denda).

**1. Ihram dari Miqat**
- Berihram dari tempat yang ditentukan

**2. Wuquf sampai Malam**
- Tetap di Arafah sampai matahari terbenam

**3. Mabit (Bermalam) di Muzdalifah**
- Bermalam di Muzdalifah malam tanggal 10

**4. Mabit di Mina**
- Bermalam di Mina pada malam tanggal 11, 12, (dan 13 jika tidak ta'jil)

**5. Melempar Jumrah**
- Melempar jumrah Aqabah pada tanggal 10
- Melempar 3 jumrah pada tanggal 11, 12, (13)

**6. Thawaf Wada'**
- Thawaf perpisahan sebelum pulang dari Makkah

**7. Tertib**
- Melakukan wajib-wajib haji sesuai urutan

**Dam (Denda):**
Menyembelih seekor kambing/domba yang dibagikan kepada fakir miskin di Makkah.`,
    displayOrder: 51,
  },

  // Muamalah (categoryId: 6) - Materi Tambahan
  {
    categoryId: 6,
    title: "Jual Beli dalam Islam",
    content: `**Pengertian Jual Beli:**
Pertukaran harta dengan harta atas dasar saling rela untuk memiliki.

**Rukun Jual Beli:**
1. **Penjual dan Pembeli** (yang berakad)
2. **Barang dan Harga** (objek akad)
3. **Ijab Qabul** (serah terima/kesepakatan)

**Syarat Sah Jual Beli:**

**1. Syarat Penjual dan Pembeli:**
- Berakal sehat
- Dengan kehendak sendiri (tidak dipaksa)
- Baligh (dewasa) - menurut jumhur ulama
- Tidak sedang ihram haji (untuk barang tertentu)

**2. Syarat Barang:**
- Suci dan bermanfaat
- Dapat diserahkan
- Milik sendiri atau diberi kuasa
- Diketahui dengan jelas (bentuk, ukuran, kualitas)
- Tidak digantungkan pada syarat tertentu

**3. Syarat Harga:**
- Disepakati oleh kedua belah pihak
- Sesuai dengan nilai barang
- Jelas dan pasti

**Jual Beli yang Dilarang:**

**1. Gharar (Penipuan/Ketidakjelasan)**
- Menjual barang yang tidak jelas
- Contoh: menjual ikan dalam kolam, buah yang belum matang

**2. Riba**
- Tambahan yang tidak adil dalam transaksi
- Contoh: jual beli emas dengan emas tidak sama timbangan

**3. Najasy (Penawaran Palsu)**
- Menaikkan harga dengan penawaran palsu untuk menipu

**4. Talaqqi Rukban**
- Mencegat pedagang sebelum sampai pasar

**5. Ihtikar (Menimbun Barang)**
- Menimbun barang untuk menaikkan harga

**Jual Beli yang Dibolehkan:**
- Jual beli tunai
- Jual beli kredit (dengan kesepakatan jelas)
- Jual beli salam (pesan barang yang belum ada)
- Jual beli istishna (pesan barang yang akan dibuat)

**Dalil:**
"Allah menghalalkan jual beli dan mengharamkan riba" (QS. Al-Baqarah: 275)`,
    displayOrder: 60,
  },
  {
    categoryId: 6,
    title: "Riba dan Jenisnya",
    content: `**Pengertian Riba:**
Tambahan yang diambil dalam transaksi jual beli atau pinjam meminjam yang tidak ada imbalannya atau tidak sesuai dengan prinsip syariah.

**Dalil Keharaman Riba:**
"Orang-orang yang memakan riba tidak dapat berdiri melainkan seperti berdirinya orang yang kemasukan setan karena gila" (QS. Al-Baqarah: 275)

**Jenis-Jenis Riba:**

**1. Riba Fadhl (Riba Jual Beli)**
- Kelebihan dalam pertukaran barang sejenis
- Contoh: 
  - Tukar 1 kg emas dengan 1,1 kg emas
  - Tukar 1 kg beras bagus dengan 1,5 kg beras biasa
  - Tukar Rp 100.000 dengan $10 + Rp 10.000

**Syarat Jual Beli Barang Ribawi:**
- Sejenis: harus sama timbangan dan tunai
- Tidak sejenis: boleh tidak sama tapi harus tunai

**2. Riba Nasi'ah (Riba Hutang)**
- Tambahan karena penangguhan waktu pembayaran
- Contoh:
  - Pinjam Rp 1 juta, bayar Rp 1,2 juta
  - Beli barang Rp 1 juta kredit, bayar Rp 1,5 juta (jika tambahan karena tempo)

**3. Riba Qardh (Riba Pinjaman)**
- Pinjaman yang mensyaratkan tambahan
- Contoh: "Pinjam uang Rp 1 juta, kembalikan Rp 1,1 juta"

**4. Riba Jahiliyah**
- Penambahan hutang karena penundaan pembayaran
- Contoh: "Bayar atau tambah (hutang)"

**Barang-Barang Ribawi:**

Menurut Hadits Rasulullah, ada 6 barang ribawi:
1. **Emas**
2. **Perak**
3. **Gandum**
4. **Kurma**
5. **Garam**
6. **Sya'ir (sejenis gandum)**

Para ulama memperluas ke:
- Semua logam mulia (emas, perak, platinum)
- Semua makanan pokok (beras, jagung, dll)
- Semua mata uang

**Alternatif Halal:**

**1. Jual Beli Kredit (Murabahah)**
- Harga jual boleh lebih tinggi dari harga tunai
- Syarat: harga harus jelas dan tetap sampai lunas

**2. Qardh Hasan (Pinjaman Kebajikan)**
- Pinjaman tanpa tambahan
- Boleh memberi lebih sebagai hadiah (tanpa dipersyaratkan)

**3. Mudharabah (Bagi Hasil)**
- Kerja sama modal dan tenaga
- Keuntungan dibagi sesuai kesepakatan

**4. Musyarakah (Kemitraan)**
- Kerja sama modal bersama
- Keuntungan dan kerugian dibagi sesuai modal`,
    displayOrder: 61,
  },
  {
    categoryId: 6,
    title: "Hutang Piutang dalam Islam",
    content: `**Hukum Hutang Piutang:**
- **Bagi pemberi pinjaman**: sunnah (anjuran)
- **Bagi peminjam**: mubah (boleh) jika ada kebutuhan

**Dalil:**
"Jika kamu memberikan pinjaman kepada Allah sebagai pinjaman yang baik, niscaya Allah melipatgandakan balasannya" (QS. Al-Hadid: 11)

**Adab Berhutang:**

**Bagi Peminjam:**
1. Niat untuk membayar
2. Hutang hanya untuk kebutuhan, bukan kemewahan
3. Segera membayar jika sudah mampu
4. Membayar dengan cara yang baik
5. Boleh membayar lebih sebagai tanda terima kasih (tanpa dipersyaratkan)

**Bagi Pemberi Pinjaman:**
1. Ikhlas karena Allah
2. Tidak menyakiti atau mempermalukan peminjam
3. Memberi tempo yang layak
4. Tidak meminta tambahan (riba)
5. Jika peminjam kesulitan, sebaiknya diberi keringanan atau dibebaskan

**Dalil:**
"Dan jika (orang berhutang itu) dalam kesulitan, berilah tangguh sampai dia berkelapangan. Dan menyedekahkan (sebagian atau semua hutang) itu lebih baik bagimu" (QS. Al-Baqarah: 280)

**Hukum Menunda Pembayaran Hutang:**
"Menunda pembayaran hutang bagi orang yang mampu adalah kezaliman" (HR. Bukhari-Muslim)

**Menulis Hutang Piutang:**

Sangat dianjurkan untuk menulis hutang piutang sebagai bukti dan menghindari perselisihan.

**Ketentuan:**
1. Ditulis dengan jelas (jumlah, tempo, dll)
2. Ada saksi (2 laki-laki atau 1 laki-laki + 2 wanita)
3. Boleh ada jaminan (rahn/gadai)
4. Pemberi hutang tidak boleh meminta manfaat dari jaminan

**Dalil:**
"Hai orang-orang yang beriman, apabila kamu bermuamalah tidak secara tunai untuk waktu yang ditentukan, hendaklah kamu menuliskannya..." (QS. Al-Baqarah: 282)

**Hutang yang Tidak Boleh:**
1. Hutang dengan tambahan (riba)
2. Hutang untuk maksiat
3. Hutang yang memberatkan diri sendiri
4. Hutang tanpa niat membayar

**Keutamaan Memberi Pinjaman:**
"Barangsiapa yang memberikan kemudahan kepada orang yang kesulitan, Allah akan memberikan kemudahan kepadanya di dunia dan akhirat" (HR. Muslim)`,
    displayOrder: 62,
  },

  // Munakahat (categoryId: 7) - Materi Tambahan
  {
    categoryId: 7,
    title: "Syarat dan Rukun Nikah",
    content: `**Rukun Nikah (5 Rukun):**

Jika salah satu rukun tidak terpenuhi, pernikahan tidak sah.

**1. Calon Suami**
- Muslim, baligh, berakal
- Tidak ada halangan syar'i (bukan mahram, tidak sedang ihram, dll)

**2. Calon Istri**
- Muslimah (atau Ahli Kitab menurut jumhur)
- Baligh, berakal
- Tidak ada halangan syar'i
- Tidak dalam masa iddah

**3. Wali**
- Wali nasab (ayah, kakek, saudara, paman, dll)
- Jika tidak ada wali nasab, maka wali hakim
- Syarat wali: Muslim, baligh, berakal, adil, laki-laki

**Urutan Wali:**
1. Ayah
2. Kakek (ayah dari ayah)
3. Saudara laki-laki sekandung
4. Saudara laki-laki seayah
5. Anak laki-laki saudara sekandung
6. Anak laki-laki saudara seayah
7. Paman sekandung
8. Paman seayah
9. Anak laki-laki paman sekandung
10. Anak laki-laki paman seayah
11. Wali hakim

**4. Dua Orang Saksi**
- Muslim, baligh, berakal, adil
- Laki-laki
- Mendengar dan memahami ijab qabul
- Minimal 2 orang

**5. Ijab Qabul (Akad Nikah)**
- Pernyataan dari wali: "Saya nikahkan..."
- Penerimaan dari calon suami: "Saya terima..."
- Harus dalam satu majelis
- Harus jelas dan terang
- Tidak boleh ada jeda yang lama

**Syarat Sah Nikah:**

**1. Tidak Ada Halangan Syar'i:**
- Bukan mahram
- Tidak sedang ihram haji/umrah
- Tidak melebihi batas (4 istri bagi laki-laki)
- Wanita tidak sedang dalam masa iddah

**2. Mahar (Maskawin)**
- Wajib ada, tidak ada batas minimal
- Boleh berupa uang, barang, atau jasa
- Menjadi hak penuh istri

**3. Diketahui Umum**
- Diumumkan kepada masyarakat
- Boleh dengan walimah (pesta pernikahan)

**Dalil:**
"Tidak sah nikah kecuali dengan wali" (HR. Ahmad, Abu Daud, Tirmidzi)

"Umumkanlah pernikahan ini" (HR. Ahmad dan Ibnu Majah)`,
    displayOrder: 70,
  },
  {
    categoryId: 7,
    title: "Hak dan Kewajiban Suami Istri",
    content: `**Hak dan Kewajiban Bersama:**

**1. Saling Menghormati dan Menyayangi**
"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang" (QS. Ar-Rum: 21)

**2. Saling Setia**
- Menjaga kehormatan dan kesetiaan
- Tidak berkhianat

**3. Saling Membantu dalam Kebaikan**
- Mengingatkan dalam ketaatan kepada Allah
- Membantu dalam urusan rumah tangga

**4. Bergaul dengan Baik (Ma'ruf)**
"Dan bergaullah dengan mereka secara patut" (QS. An-Nisa: 19)

**Kewajiban Suami terhadap Istri:**

**1. Memberi Nafkah**
- Nafkah lahir: makanan, pakaian, tempat tinggal
- Nafkah batin: memenuhi kebutuhan biologis
- Sesuai dengan kemampuan suami

**2. Memperlakukan dengan Baik**
- Tidak menyakiti fisik maupun mental
- Berbicara dengan lemah lembut
- Menghargai dan menghormati

**3. Mendidik dan Membimbing**
- Mengajarkan agama
- Membimbing ke jalan yang benar

**4. Berlaku Adil (jika poligami)**
- Adil dalam pembagian waktu, nafkah, dan perlakuan

**Hak Suami terhadap Istri:**

**1. Ditaati dalam Hal yang Ma'ruf**
"Maka wanita yang saleh ialah yang taat kepada Allah lagi memelihara diri ketika suaminya tidak ada" (QS. An-Nisa: 34)

**2. Menjaga Kehormatan dan Harta Suami**
- Menjaga diri dan kehormatan keluarga
- Menjaga harta suami dengan baik

**3. Melayani Kebutuhan Suami**
- Melayani dengan baik dan ikhlas
- Memenuhi kebutuhan biologis

**4. Tidak Keluar Rumah Tanpa Izin**
- Untuk menjaga kehormatan dan keamanan

**Kewajiban Istri terhadap Suami:**

**1. Taat kepada Suami (dalam Kebaikan)**
"Sebaik-baik wanita adalah yang apabila engkau melihatnya, ia menyenangkanmu, apabila engkau perintahkan ia mentaatimu, dan apabila engkau tidak ada ia menjaga dirinya dan hartamu" (HR. Nasa'i)

**2. Menjaga Kehormatan Diri dan Keluarga**
- Tidak membuka aib suami
- Menjaga kehormatan diri

**3. Mengurus Rumah Tangga**
- Mengatur rumah dengan baik
- Mendidik anak-anak

**4. Bersyukur dan Tidak Kufur Nikmat**
- Bersyukur atas pemberian suami
- Tidak mengeluh berlebihan

**Hak Istri terhadap Suami:**

**1. Mendapat Nafkah yang Layak**
"Hendaklah orang yang mampu memberi nafkah menurut kemampuannya" (QS. At-Talaq: 7)

**2. Diperlakukan dengan Baik**
- Tidak disakiti
- Dihormati dan dihargai

**3. Mendapat Pendidikan Agama**
- Dibimbing dalam beragama
- Diajak dalam kebaikan

**4. Mendapat Perlakuan Adil (jika poligami)**

**Catatan Penting:**
- Semua hak dan kewajiban harus dilakukan dengan niat ibadah kepada Allah
- Saling mengingatkan dalam kebaikan
- Menyelesaikan masalah dengan musyawarah dan sabar`,
    displayOrder: 71,
  },
  {
    categoryId: 7,
    title: "Talak, Khulu', dan Iddah",
    content: `**TALAK (Perceraian dari Pihak Suami)**

**Pengertian:**
Melepaskan ikatan pernikahan dengan lafadz tertentu.

**Hukum Talak:**
- **Mubah**: jika ada alasan yang jelas dan tidak ada jalan lain
- **Makruh**: tanpa alasan yang kuat
- **Haram**: talak bid'i (di waktu haid atau di waktu suci yang sudah dicampuri)
- **Wajib**: jika diminta hakim karena suami tidak memberi nafkah atau menyakiti
- **Sunnah**: jika istri tidak menjaga agama dan akhlak

**Macam-Macam Talak:**

**1. Talak Raj'i**
- Talak yang masih bisa dirujuk tanpa akad baru
- Talak 1 atau 2 (belum talak 3)
- Suami boleh rujuk selama istri masih dalam masa iddah

**2. Talak Ba'in Shughra**
- Talak yang tidak bisa dirujuk kecuali dengan akad baru
- Contoh: talak sebelum berhubungan, talak dengan tebusan (khulu')

**3. Talak Ba'in Kubra**
- Talak 3 kali (talak yang ketiga)
- Tidak boleh rujuk kecuali istri menikah dengan laki-laki lain, bercerai, dan habis iddah

**Talak Sunnah dan Bid'i:**

**Talak Sunnah:**
- Mentalak saat istri suci dan belum dicampuri di masa suci tersebut
- Atau mentalak saat hamil

**Talak Bid'i (Dilarang):**
- Mentalak saat istri haid
- Mentalak saat istri suci tapi sudah dicampuri di masa suci tersebut

**KHULU' (Perceraian dari Pihak Istri)**

**Pengertian:**
Perceraian dengan tebusan dari istri kepada suami.

**Ketentuan:**
- Istri membayar tebusan (biasanya mengembalikan mahar)
- Langsung jatuh talak ba'in (tidak bisa rujuk)
- Boleh jika ada alasan yang kuat (tidak cocok, dll)

**Contoh Lafadz:**
Istri: "Saya minta cerai dengan tebusan (sekian)"
Suami: "Saya terima khulu' dan menceraikan kamu"

**IDDAH (Masa Tunggu)**

**Pengertian:**
Masa tunggu bagi wanita setelah bercerai atau ditinggal mati suami sebelum boleh menikah lagi.

**Macam-Macam Iddah:**

**1. Iddah Talak (Cerai Hidup):**

**a. Wanita yang Masih Haid:**
- 3 kali suci (quru')
- Dalil: "Wanita-wanita yang ditalak hendaklah menahan diri (menunggu) tiga kali quru'" (QS. Al-Baqarah: 228)

**b. Wanita Hamil:**
- Sampai melahirkan
- Dalil: "Dan perempuan-perempuan yang hamil, waktu iddah mereka itu ialah sampai mereka melahirkan kandungannya" (QS. At-Talaq: 4)

**c. Wanita Menopause atau Belum Haid:**
- 3 bulan

**d. Belum Berhubungan:**
- Tidak ada iddah

**2. Iddah Wafat (Ditinggal Mati):**
- 4 bulan 10 hari
- Kecuali jika hamil, sampai melahirkan

**Ketentuan Masa Iddah:**
- Tidak boleh menikah dengan laki-laki lain
- Tidak boleh berhias dan keluar rumah tanpa keperluan
- Tetap tinggal di rumah (kecuali ada alasan darurat)
- Suami masih wajib memberi nafkah (untuk iddah talak raj'i)

**Rujuk (Kembali Nikah):**
- Boleh rujuk selama istri masih dalam iddah talak raj'i
- Tidak perlu akad baru, cukup dengan pernyataan rujuk
- Harus ada saksi`,
    displayOrder: 72,
  },
];

async function seed() {
  console.log("Seeding additional fiqih materials...");
  
  for (const material of additionalMaterials) {
    try {
      await db.insert(fiqihMaterials).values(material);
      console.log(`✓ Added: ${material.title}`);
    } catch (error) {
      console.log(`✗ Skipped (already exists): ${material.title}`);
    }
  }
  
  console.log("\nAdditional materials seeded successfully!");
  console.log(`Total materials added: ${additionalMaterials.length}`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
