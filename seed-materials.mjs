import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { fiqihMaterials } from "./drizzle/schema.js";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const materialsData = [
  // Thaharah (categoryId: 1)
  {
    categoryId: 1,
    title: "Pengertian Thaharah",
    content: `Thaharah secara bahasa berarti bersuci atau membersihkan. Dalam istilah syariat, thaharah adalah menghilangkan najis atau hadats dengan cara yang telah ditentukan syariat.

**Macam-macam Thaharah:**
1. **Thaharah dari Hadats Kecil** - dengan wudhu atau tayammum
2. **Thaharah dari Hadats Besar** - dengan mandi wajib atau tayammum
3. **Thaharah dari Najis** - dengan mencuci najis menggunakan air

**Dalil:**
"Sesungguhnya Allah menyukai orang-orang yang bertaubat dan menyukai orang-orang yang bersuci." (QS. Al-Baqarah: 222)`,
    displayOrder: 1,
  },
  {
    categoryId: 1,
    title: "Tata Cara Wudhu",
    content: `**Rukun Wudhu:**
1. Niat
2. Membasuh muka
3. Membasuh kedua tangan sampai siku
4. Mengusap sebagian kepala
5. Membasuh kedua kaki sampai mata kaki
6. Tertib (berurutan)

**Sunnah Wudhu:**
- Membaca basmalah
- Membasuh kedua telapak tangan
- Berkumur-kumur
- Menghirup air ke hidung
- Mengusap seluruh kepala
- Mengusap kedua telinga

**Hal yang Membatalkan Wudhu:**
- Keluar sesuatu dari qubul atau dubur
- Hilang akal (tidur, pingsan, gila)
- Bersentuhan kulit laki-laki dan perempuan yang bukan mahram
- Menyentuh kemaluan`,
    displayOrder: 2,
  },

  // Shalat (categoryId: 2)
  {
    categoryId: 2,
    title: "Keutamaan Shalat",
    content: `Shalat adalah tiang agama dan merupakan ibadah yang paling utama setelah syahadat. Shalat adalah penghubung antara hamba dengan Rabbnya.

**Dalil Keutamaan Shalat:**
"Dirikanlah shalat, sesungguhnya shalat itu mencegah dari perbuatan keji dan mungkar." (QS. Al-Ankabut: 45)

**Waktu Shalat Lima Waktu:**
1. **Subuh** - dari terbit fajar sampai terbit matahari
2. **Dhuhur** - dari tergelincir matahari sampai bayangan sama panjang
3. **Ashar** - dari bayangan lebih panjang sampai matahari menguning
4. **Maghrib** - dari terbenam matahari sampai hilang mega merah
5. **Isya** - dari hilang mega merah sampai tengah malam`,
    displayOrder: 1,
  },
  {
    categoryId: 2,
    title: "Rukun dan Syarat Shalat",
    content: `**Syarat Sah Shalat:**
1. Suci dari hadats dan najis
2. Menutup aurat
3. Menghadap kiblat
4. Masuk waktu shalat
5. Mengetahui mana rukun dan mana sunnah

**Rukun Shalat:**
1. Niat
2. Takbiratul ihram
3. Berdiri bagi yang mampu
4. Membaca Al-Fatihah
5. Ruku' dengan tuma'ninah
6. I'tidal dengan tuma'ninah
7. Sujud dua kali dengan tuma'ninah
8. Duduk di antara dua sujud
9. Duduk tasyahud akhir
10. Membaca tasyahud akhir
11. Membaca shalawat kepada Nabi
12. Salam pertama
13. Tertib`,
    displayOrder: 2,
  },

  // Zakat (categoryId: 3)
  {
    categoryId: 3,
    title: "Pengertian dan Hukum Zakat",
    content: `Zakat secara bahasa berarti tumbuh, berkembang, dan bersih. Secara istilah, zakat adalah harta tertentu yang wajib dikeluarkan oleh orang yang beragama Islam dan diberikan kepada golongan yang berhak menerimanya.

**Hukum Zakat:**
Zakat adalah rukun Islam yang ketiga dan wajib bagi setiap muslim yang telah memenuhi syarat.

**Dalil:**
"Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka." (QS. At-Taubah: 103)

**Macam-macam Zakat:**
1. **Zakat Fitrah** - wajib dikeluarkan pada bulan Ramadhan
2. **Zakat Mal** - zakat harta yang mencakup:
   - Zakat emas dan perak
   - Zakat perdagangan
   - Zakat pertanian
   - Zakat ternak`,
    displayOrder: 1,
  },

  // Puasa (categoryId: 4)
  {
    categoryId: 4,
    title: "Keutamaan Puasa Ramadhan",
    content: `Puasa Ramadhan adalah rukun Islam yang keempat. Allah SWT menjadikan puasa sebagai perisai dari api neraka dan sebab pengampunan dosa.

**Dalil:**
"Wahai orang-orang yang beriman, diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertakwa." (QS. Al-Baqarah: 183)

**Syarat Wajib Puasa:**
1. Islam
2. Baligh
3. Berakal
4. Mampu melaksanakannya
5. Tidak sedang haid atau nifas (bagi wanita)

**Rukun Puasa:**
1. Niat
2. Menahan diri dari makan, minum, dan jima' dari terbit fajar hingga terbenam matahari`,
    displayOrder: 1,
  },

  // Haji (categoryId: 5)
  {
    categoryId: 5,
    title: "Pengertian dan Hukum Haji",
    content: `Haji adalah rukun Islam yang kelima. Haji wajib dilaksanakan sekali seumur hidup bagi yang mampu.

**Dalil:**
"Mengerjakan haji adalah kewajiban manusia terhadap Allah, yaitu bagi orang yang sanggup mengadakan perjalanan ke Baitullah." (QS. Ali Imran: 97)

**Syarat Wajib Haji:**
1. Islam
2. Baligh
3. Berakal
4. Merdeka
5. Mampu (istitha'ah)

**Rukun Haji:**
1. Ihram
2. Wukuf di Arafah
3. Thawaf ifadhah
4. Sa'i antara Shafa dan Marwah
5. Tahallul (mencukur rambut)
6. Tertib`,
    displayOrder: 1,
  },

  // Muamalah (categoryId: 6)
  {
    categoryId: 6,
    title: "Prinsip Jual Beli dalam Islam",
    content: `Jual beli adalah pertukaran harta dengan harta atas dasar saling rela dan dengan cara yang ditentukan syariat.

**Rukun Jual Beli:**
1. Penjual
2. Pembeli
3. Barang yang diperjualbelikan
4. Harga
5. Ijab qabul (akad)

**Syarat Sah Jual Beli:**
1. Penjual dan pembeli berakal dan baligh
2. Barang yang diperjualbelikan halal dan bermanfaat
3. Barang milik sendiri atau diberi kuasa
4. Barang dapat diserahkan
5. Harga jelas dan disepakati

**Jual Beli yang Dilarang:**
- Jual beli riba
- Jual beli gharar (tidak jelas)
- Jual beli barang haram
- Jual beli dengan penipuan`,
    displayOrder: 1,
  },

  // Munakahat (categoryId: 7)
  {
    categoryId: 7,
    title: "Hukum dan Tujuan Pernikahan",
    content: `Nikah adalah akad yang sangat kuat untuk mentaati perintah Allah dan melaksanakannya merupakan ibadah.

**Hukum Nikah:**
Hukum nikah bisa menjadi wajib, sunnah, mubah, makruh, atau haram tergantung kondisi seseorang.

**Tujuan Pernikahan:**
1. Memenuhi kebutuhan biologis secara halal
2. Meneruskan keturunan
3. Membentuk keluarga sakinah mawaddah warahmah
4. Menjalin hubungan kekeluargaan

**Rukun Nikah:**
1. Calon suami
2. Calon istri
3. Wali
4. Dua orang saksi
5. Ijab qabul

**Syarat Sah Nikah:**
1. Tidak ada halangan syar'i
2. Mahar (maskawin)
3. Wali yang sah
4. Saksi yang adil`,
    displayOrder: 1,
  },
];

async function seed() {
  console.log("Seeding fiqih materials...");
  
  for (const material of materialsData) {
    await db.insert(fiqihMaterials).values(material);
  }
  
  console.log("Fiqih materials seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
