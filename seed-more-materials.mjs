import { drizzle } from "drizzle-orm/mysql2";
import { fiqihMaterials } from "./drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

const additionalMaterials = [
  // Thaharah (id: 1)
  {
    categoryId: 1,
    title: "Adab Buang Air",
    content: `## Pengertian
Adab buang air adalah tata cara yang diajarkan Islam saat hendak dan setelah buang air kecil atau besar.

## Dalil
"Dari Salman Al-Farisi ra berkata: Rasulullah SAW melarang kami menghadap kiblat saat buang air kecil atau besar..." (HR. Muslim)

## Adab-adab Buang Air
1. Masuk dengan kaki kiri dan keluar dengan kaki kanan
2. Membaca doa masuk dan keluar toilet
3. Tidak menghadap atau membelakangi kiblat
4. Tidak membawa sesuatu yang ada nama Allah
5. Tidak berbicara kecuali darurat
6. Tidak buang air di tempat yang sering dilalui orang
7. Istinja' (membersihkan) dengan air atau batu minimal 3 kali
8. Menggunakan tangan kiri saat membersihkan

## Doa Masuk Toilet
اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ
"Allahumma inni a'udzu bika minal khubutsi wal khaba'its"
(Ya Allah, aku berlindung kepada-Mu dari godaan syaitan laki-laki dan perempuan)

## Doa Keluar Toilet
غُفْرَانَكَ
"Ghufranaka"
(Aku mohon ampunan-Mu)`,
  },
  {
    categoryId: 1,
    title: "Tayammum",
    content: `## Pengertian
Tayammum adalah bersuci dengan debu yang suci untuk menghilangkan hadats kecil atau besar sebagai pengganti wudhu atau mandi.

## Dalil
"...Maka bertayamumlah dengan tanah yang baik (suci); usaplah mukamu dan tanganmu dengan tanah itu..." (QS. Al-Maidah: 6)

## Syarat Tayammum
1. Tidak ada air atau tidak mampu menggunakan air
2. Sudah masuk waktu shalat
3. Menggunakan debu yang suci
4. Niat

## Rukun Tayammum
1. Niat
2. Mengusap muka
3. Mengusap kedua tangan sampai siku
4. Tertib (berurutan)

## Cara Tayammum
1. Niat tayammum
2. Membaca bismillah
3. Memukul tanah/debu dengan kedua telapak tangan sekali
4. Mengusap seluruh muka
5. Memukul tanah lagi
6. Mengusap tangan kanan dengan tangan kiri sampai siku
7. Mengusap tangan kiri dengan tangan kanan sampai siku

## Hal yang Membatalkan Tayammum
1. Hal-hal yang membatalkan wudhu
2. Menemukan air (bagi yang tayammum karena tidak ada air)
3. Mampu menggunakan air (bagi yang tayammum karena sakit)`,
  },
  // Shalat (id: 2)
  {
    categoryId: 2,
    title: "Shalat Sunnah Rawatib",
    content: `## Pengertian
Shalat sunnah rawatib adalah shalat sunnah yang dilakukan sebelum atau sesudah shalat fardhu.

## Dalil
"Barangsiapa yang mengerjakan 12 rakaat shalat sunnah dalam sehari semalam, maka Allah akan membangunkan baginya rumah di surga." (HR. Muslim)

## Macam-macam Sunnah Rawatib
### Sunnah Muakkad (sangat dianjurkan)
1. 2 rakaat sebelum Subuh
2. 2 rakaat sebelum Dzuhur
3. 2 rakaat sesudah Dzuhur
4. 2 rakaat sesudah Maghrib
5. 2 rakaat sesudah Isya

Total: 12 rakaat

### Sunnah Ghairu Muakkad
1. 2 atau 4 rakaat sebelum Ashar
2. 2 rakaat sebelum Maghrib
3. 2 rakaat sebelum Isya

## Keutamaan
1. Menyempurnakan shalat fardhu yang kurang
2. Mendapat rumah di surga
3. Menambah pahala dan derajat
4. Mendekatkan diri kepada Allah

## Waktu Pelaksanaan
- Qabliyah (sebelum): dilakukan setelah adzan sebelum iqamah
- Ba'diyah (sesudah): dilakukan setelah shalat fardhu dan dzikir`,
  },
  {
    categoryId: 2,
    title: "Sujud Sahwi",
    content: `## Pengertian
Sujud sahwi adalah sujud yang dilakukan karena lupa atau ragu dalam shalat.

## Dalil
"Apabila salah seorang di antara kamu shalat, lalu ia ragu, tidak tahu berapa rakaat yang telah ia kerjakan, tiga atau empat rakaat, maka hendaklah ia membuang keraguannya dan hendaklah ia meyakini yang paling sedikit..." (HR. Muslim)

## Penyebab Sujud Sahwi
1. Lupa meninggalkan rukun sunnah
2. Ragu dalam jumlah rakaat
3. Lupa membaca tasyahud awal
4. Lupa duduk tasyahud awal
5. Berbicara karena lupa
6. Salam sebelum sempurna shalatnya

## Cara Melakukan Sujud Sahwi
### Sebelum Salam
1. Setelah tasyahud akhir
2. Sujud 2 kali seperti sujud biasa
3. Duduk sebentar
4. Membaca tasyahud lagi (menurut sebagian ulama)
5. Salam

### Sesudah Salam
1. Salam seperti biasa
2. Sujud 2 kali
3. Salam lagi

## Catatan Penting
- Jika lupa rukun fardhu, harus diulangi
- Jika ragu jumlah rakaat, ambil yang paling sedikit
- Sujud sahwi tidak wajib untuk shalat sunnah`,
  },
  // Zakat (id: 3)
  {
    categoryId: 3,
    title: "Zakat Profesi",
    content: `## Pengertian
Zakat profesi adalah zakat yang dikeluarkan dari penghasilan profesi (gaji, honorarium, upah) jika telah mencapai nisab.

## Dasar Hukum
"Hai orang-orang yang beriman, nafkahkanlah sebagian dari hasil usahamu yang baik-baik..." (QS. Al-Baqarah: 267)

## Nisab dan Kadar
- Nisab: setara dengan 85 gram emas per tahun atau 520 kg beras
- Kadar: 2,5% dari penghasilan
- Haul: bisa dihitung per bulan atau per tahun

## Cara Menghitung
### Per Bulan
Jika gaji ≥ nisab bulanan (85 gram emas ÷ 12)
Zakat = Gaji × 2,5%

Contoh:
- Gaji: Rp 10.000.000
- Zakat: Rp 10.000.000 × 2,5% = Rp 250.000

### Per Tahun
Total penghasilan setahun × 2,5%

## Penerima Zakat Profesi
Sama dengan penerima zakat pada umumnya (8 asnaf)

## Perbedaan Pendapat Ulama
- Sebagian ulama: wajib seperti zakat mal
- Sebagian ulama: termasuk infak/sedekah
- Mayoritas ulama kontemporer: wajib jika mencapai nisab`,
  },
  {
    categoryId: 3,
    title: "Zakat Emas dan Perak",
    content: `## Pengertian
Zakat emas dan perak adalah zakat yang dikeluarkan dari harta berupa emas, perak, atau uang yang telah mencapai nisab dan haul.

## Dalil
"Dan orang-orang yang menyimpan emas dan perak dan tidak menafkahkannya pada jalan Allah, maka beritahukanlah kepada mereka, (bahwa mereka akan mendapat) siksa yang pedih." (QS. At-Taubah: 34)

## Nisab
- Emas: 85 gram (menurut jumhur ulama)
- Perak: 595 gram
- Uang: setara dengan nilai 85 gram emas

## Haul
Sudah dimiliki selama 1 tahun Hijriyah (354 hari)

## Kadar Zakat
2,5% dari total emas/perak/uang yang dimiliki

## Cara Menghitung
Zakat = Jumlah emas/perak/uang × 2,5%

Contoh:
- Emas: 100 gram
- Zakat: 100 × 2,5% = 2,5 gram emas
- Atau senilai 2,5 gram emas dalam bentuk uang

## Emas yang Wajib Dizakati
1. Emas simpanan/investasi
2. Emas perhiasan yang melebihi batas kewajaran
3. Emas yang tidak dipakai

## Emas yang Tidak Wajib Dizakati
Emas perhiasan yang dipakai sewajarnya (menurut sebagian ulama)`,
  },
  // Puasa (id: 4)
  {
    categoryId: 4,
    title: "Puasa Sunnah",
    content: `## Pengertian
Puasa sunnah adalah puasa yang dianjurkan oleh Rasulullah SAW di luar puasa Ramadhan.

## Macam-macam Puasa Sunnah

### 1. Puasa Senin dan Kamis
"Amal-amal diangkat pada hari Senin dan Kamis, maka aku ingin amalku diangkat sedang aku berpuasa." (HR. Tirmidzi)

### 2. Puasa Ayyamul Bidh (13, 14, 15 Hijriyah)
"Rasulullah SAW memerintahkan kami untuk berpuasa tiga hari setiap bulan, yaitu tanggal 13, 14, dan 15." (HR. Nasa'i)

### 3. Puasa Daud (Sehari Puasa Sehari Tidak)
"Puasa yang paling utama adalah puasa Daud, dia berpuasa sehari dan berbuka sehari." (HR. Bukhari-Muslim)

### 4. Puasa Enam Hari di Bulan Syawal
"Barangsiapa berpuasa Ramadhan kemudian diikuti dengan puasa enam hari di bulan Syawal, maka seolah-olah dia berpuasa sepanjang tahun." (HR. Muslim)

### 5. Puasa Hari Arafah (9 Dzulhijjah)
"Puasa hari Arafah menghapus dosa dua tahun, tahun yang lalu dan tahun yang akan datang." (HR. Muslim)

### 6. Puasa Asyura (10 Muharram)
"Puasa hari Asyura menghapus dosa satu tahun yang lalu." (HR. Muslim)

### 7. Puasa Bulan Sya'ban
"Rasulullah SAW tidak pernah berpuasa penuh dalam satu bulan kecuali Ramadhan, dan tidak ada bulan yang lebih banyak beliau berpuasa selain Sya'ban." (HR. Bukhari-Muslim)

## Hari yang Dilarang Berpuasa
1. Hari Raya Idul Fitri
2. Hari Raya Idul Adha
3. Hari Tasyriq (11, 12, 13 Dzulhijjah)`,
  },
  {
    categoryId: 4,
    title: "Fidyah dan Kaffarah Puasa",
    content: `## Fidyah Puasa

### Pengertian
Fidyah adalah denda yang harus dibayar oleh orang yang tidak mampu berpuasa karena alasan tertentu.

### Yang Wajib Membayar Fidyah
1. Orang tua renta yang tidak mampu puasa
2. Orang sakit yang tidak ada harapan sembuh
3. Wanita hamil dan menyusui yang khawatir terhadap diri atau anaknya

### Kadar Fidyah
Memberi makan satu orang miskin setiap hari yang ditinggalkan
= 3,5 liter beras atau makanan pokok per hari

## Kaffarah Puasa

### Pengertian
Kaffarah adalah denda yang harus dibayar karena membatalkan puasa dengan sengaja.

### Penyebab Kaffarah
1. Makan atau minum dengan sengaja
2. Berhubungan suami istri di siang hari Ramadhan

### Urutan Kaffarah
1. Memerdekakan budak (tidak berlaku di zaman sekarang)
2. Puasa 2 bulan berturut-turut
3. Memberi makan 60 orang miskin

### Kadar Memberi Makan
60 orang × 3,5 liter beras = 210 liter beras
Atau senilai harga beras tersebut

## Perbedaan Fidyah dan Kaffarah
- Fidyah: untuk yang tidak mampu puasa
- Kaffarah: untuk yang membatalkan puasa dengan sengaja
- Fidyah: per hari
- Kaffarah: lebih berat (60 hari atau 60 orang)`,
  },
  // Haji (id: 5)
  {
    categoryId: 5,
    title: "Persiapan Haji dan Umrah",
    content: `## Persiapan Fisik
1. Menjaga kesehatan
2. Olahraga teratur
3. Vaksinasi (meningitis, influenza)
4. Cek kesehatan menyeluruh
5. Latihan berjalan jauh

## Persiapan Mental dan Spiritual
1. Belajar manasik haji/umrah
2. Niat yang ikhlas
3. Mohon maaf kepada keluarga
4. Melunasi hutang
5. Membuat wasiat
6. Memperbanyak ibadah

## Persiapan Administrasi
1. Paspor (minimal 6 bulan berlaku)
2. Visa haji/umrah
3. Buku kesehatan
4. Kartu identitas
5. Foto 4x6 dan 3x4
6. Rekam biometrik

## Persiapan Finansial
1. Biaya haji/umrah
2. Uang saku
3. Dana darurat
4. Biaya badal haji (jika meninggal)

## Perlengkapan yang Dibawa
### Pakaian
1. Kain ihram (2-3 set)
2. Pakaian dalam
3. Pakaian ganti
4. Sandal
5. Sabuk ihram

### Perlengkapan Ibadah
1. Al-Quran
2. Buku doa
3. Tasbih
4. Sajadah
5. Mukena (untuk wanita)

### Perlengkapan Pribadi
1. Obat-obatan pribadi
2. Toiletries (tanpa pewangi saat ihram)
3. Tas kecil
4. Payung
5. Masker
6. Botol minum

## Larangan Saat Ihram
1. Memakai pakaian berjahit (pria)
2. Menutup kepala (pria)
3. Memakai wewangian
4. Memotong rambut dan kuku
5. Berhubungan suami istri
6. Berburu
7. Menikah atau menikahkan`,
  },
  // Muamalah (id: 6)
  {
    categoryId: 6,
    title: "Jual Beli Online",
    content: `## Hukum Jual Beli Online
Jual beli online diperbolehkan dalam Islam selama memenuhi rukun dan syarat jual beli.

## Dalil
"Allah menghalalkan jual beli dan mengharamkan riba." (QS. Al-Baqarah: 275)

## Rukun Jual Beli Online
1. Penjual dan pembeli (akad melalui chat/website)
2. Barang yang diperjualbelikan (foto/deskripsi)
3. Harga (tercantum jelas)
4. Ijab qabul (klik beli = ijab, konfirmasi = qabul)

## Syarat Sah Jual Beli Online
1. Barang harus jelas (foto, spesifikasi, kondisi)
2. Harga harus jelas
3. Barang halal dan bermanfaat
4. Penjual adalah pemilik atau kuasa pemilik
5. Tidak ada unsur penipuan
6. Pembeli dan penjual cakap hukum

## Hak Khiyar (Hak Memilih)
1. Khiyar ru'yah: pembeli berhak mengembalikan jika barang tidak sesuai deskripsi
2. Khiyar 'aib: berhak mengembalikan jika ada cacat tersembunyi
3. Khiyar syarat: sesuai kesepakatan (misal: 7 hari retur)

## Dropshipping dalam Islam
Diperbolehkan dengan syarat:
1. Penjual tahu spesifikasi barang
2. Tidak menipu pembeli
3. Harga jelas
4. Ada kesepakatan dengan supplier

## COD (Cash on Delivery)
Diperbolehkan karena:
1. Pembeli bisa melihat barang langsung
2. Mengurangi risiko penipuan
3. Sesuai prinsip jual beli

## Hal yang Harus Dihindari
1. Menjual barang haram
2. Penipuan (foto tidak sesuai)
3. Gharar (ketidakjelasan berlebihan)
4. Riba (bunga/cicilan berbunga)
5. Menjual barang yang belum dimiliki tanpa izin`,
  },
  {
    categoryId: 6,
    title: "Riba dan Jenisnya",
    content: `## Pengertian Riba
Riba adalah pengambilan tambahan dari harta pokok atau modal secara batil.

## Dalil Keharaman Riba
"Orang-orang yang memakan riba tidak dapat berdiri melainkan seperti berdirinya orang yang kemasukan setan karena gila. Yang demikian itu karena mereka berkata bahwa jual beli sama dengan riba. Padahal Allah telah menghalalkan jual beli dan mengharamkan riba." (QS. Al-Baqarah: 275)

## Jenis-jenis Riba

### 1. Riba Nasiah (Riba Hutang)
Tambahan yang disyaratkan dalam hutang piutang
Contoh:
- Pinjam Rp 1 juta, bayar Rp 1,2 juta
- Kredit dengan bunga
- Kartu kredit dengan bunga

### 2. Riba Fadhl (Riba Jual Beli)
Penambahan dalam pertukaran barang sejenis dengan kadar berbeda
Contoh:
- Tukar 1 kg emas dengan 1,1 kg emas
- Tukar Rp 100.000 pecahan kecil dengan Rp 95.000 pecahan besar

### 3. Riba Yad (Riba Penangguhan)
Penangguhan penyerahan dalam pertukaran barang ribawi
Contoh:
- Jual emas dengan emas tapi penyerahan ditunda

### 4. Riba Jahiliyah
Penundaan pembayaran hutang dengan tambahan
Contoh:
- "Lunasi atau tambah" (bayar atau bunga bertambah)

## Barang-barang Ribawi
1. Emas
2. Perak
3. Gandum
4. Kurma
5. Garam
6. Sya'ir (sejenis gandum)

Menurut jumhur ulama, uang termasuk barang ribawi karena fungsinya sebagai alat tukar seperti emas dan perak.

## Alternatif Pengganti Riba
1. Qardh (pinjaman tanpa bunga)
2. Mudharabah (bagi hasil)
3. Musyarakah (kerjasama modal)
4. Murabahah (jual beli dengan margin)
5. Ijarah (sewa)
6. Takaful (asuransi syariah)`,
  },
  // Munakahat (id: 7)
  {
    categoryId: 7,
    title: "Khitbah (Peminangan)",
    content: `## Pengertian Khitbah
Khitbah adalah permintaan seorang laki-laki kepada seorang perempuan untuk menjadi istrinya, baik langsung maupun melalui perantara.

## Hukum Khitbah
Sunnah, sebagai langkah awal menuju pernikahan yang sah.

## Dalil
"Dan tidak ada dosa bagi kamu meminang wanita-wanita itu dengan sindiran atau kamu menyembunyikan (keinginan mengawini mereka) dalam hatimu." (QS. Al-Baqarah: 235)

## Syarat-syarat Khitbah
1. Perempuan tidak dalam pinangan orang lain
2. Perempuan tidak dalam masa iddah
3. Perempuan tidak sedang ihram haji/umrah
4. Tidak ada larangan menikah (mahram)

## Adab Khitbah
1. Meminang dengan cara yang baik
2. Meminta izin wali
3. Tidak meminang pinangan orang lain
4. Boleh melihat calon istri (wajah dan telapak tangan)
5. Tidak berlebihan dalam pemberian

## Hak Perempuan yang Dipinang
1. Menerima atau menolak
2. Meminta waktu untuk berpikir
3. Meminta pendapat wali
4. Istikharah

## Khitbah Bukan Ikatan
- Khitbah bukan akad nikah
- Belum halal berduaan
- Belum halal berhubungan
- Masih boleh dibatalkan

## Pembatalan Khitbah
Jika khitbah dibatalkan:
1. Mahar/hadiah: dikembalikan atau tidak (tergantung kesepakatan)
2. Tidak ada dosa jika ada alasan syar'i
3. Sebaiknya dengan cara yang baik

## Ta'aruf Sebelum Khitbah
Dianjurkan untuk:
1. Mengenal karakter
2. Mengetahui latar belakang keluarga
3. Mengetahui agama dan akhlak
4. Dengan cara yang sesuai syariat`,
  },
  {
    categoryId: 7,
    title: "Hak dan Kewajiban Suami Istri",
    content: `## Hak dan Kewajiban Suami

### Kewajiban Suami
1. Memberi nafkah (makan, pakaian, tempat tinggal)
2. Memberi mahar
3. Berlaku adil (jika poligami)
4. Membimbing istri dalam agama
5. Bergaul dengan baik (ma'ruf)
6. Melindungi istri

### Hak Suami
1. Ditaati dalam hal yang ma'ruf
2. Dilayani dengan baik
3. Dijaga kehormatan dan hartanya
4. Dipenuhi kebutuhan biologisnya

## Hak dan Kewajiban Istri

### Kewajiban Istri
1. Taat kepada suami dalam hal ma'ruf
2. Menjaga diri dan harta suami
3. Mengurus rumah tangga
4. Mendidik anak
5. Melayani suami dengan baik

### Hak Istri
1. Mendapat nafkah lahir batin
2. Mendapat mahar
3. Diperlakukan dengan baik
4. Mendapat perlindungan
5. Mendapat giliran (jika dimadu)
6. Mendapat pendidikan agama

## Dalil
"Dan para wanita mempunyai hak yang seimbang dengan kewajibannya menurut cara yang ma'ruf. Akan tetapi para suami, mempunyai satu tingkatan kelebihan daripada istrinya." (QS. Al-Baqarah: 228)

"Sebaik-baik kalian adalah yang paling baik terhadap istrinya, dan aku adalah yang paling baik terhadap istriku." (HR. Tirmidzi)

## Nafkah Wajib
1. Makanan yang layak
2. Pakaian yang pantas
3. Tempat tinggal yang layak
4. Pengobatan jika sakit
5. Pembantu (jika istri dari keluarga berada)

## Nafkah Gugur Jika
1. Istri nusyuz (durhaka tanpa alasan syar'i)
2. Istri pergi tanpa izin suami
3. Istri menolak pindah tanpa alasan syar'i

## Istri Bekerja
- Istri boleh bekerja dengan izin suami
- Gaji istri adalah hak istri
- Suami tetap wajib memberi nafkah
- Istri boleh membantu suami secara sukarela`,
  },
];

async function seedMoreMaterials() {
  try {
    console.log("🌱 Menambahkan materi fiqih tambahan...");
    
    for (const material of additionalMaterials) {
      await db.insert(fiqihMaterials).values(material);
      console.log(`✅ Ditambahkan: ${material.title}`);
    }
    
    console.log("✨ Selesai menambahkan materi fiqih!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedMoreMaterials();
