import mysql from "mysql2/promise";

// Hardcode database connection
const connection = await mysql.createConnection({
  host: "localhost",
  user: "websitekua_user",
  password: "websitekua_password",
  database: "websitekua",
  port: 3306,
});

// Update sumber kitab fiqih untuk semua mazhab
const fiqihSources = [
  // Thaharah (categoryId: 1)
  {
    id: 1,
    title: "Pengertian Thaharah",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Badai' As-Sanai' - Al-Kasani",
    sourceMaliki: "Al-Mudawwanah Al-Kubra - Sahnun, Muwatta' - Malik",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Minhaj At-Talibin - An-Nawawi",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Al-Iqna' - Al-Hajjawi",
  },
  {
    id: 2,
    title: "Tata Cara Wudhu",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Fath Al-Qadir - Ibn Al-Humam",
    sourceMaliki: "Al-Mudawwanah - Sahnun, Hashiyah Ad-Dusuki - Ad-Dusuki",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Nihayah Al-Muhtaj - Ar-Ramli",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Syarh Al-Muntaha - Mansur Al-Buhuti",
  },
  
  // Shalat (categoryId: 2)
  {
    id: 3,
    title: "Keutamaan Shalat",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Badai' As-Sanai' - Al-Kasani",
    sourceMaliki: "Al-Mudawwanah - Sahnun, Muwatta' - Malik",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Minhaj At-Talibin - An-Nawawi",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Al-Iqna' - Al-Hajjawi",
  },
  {
    id: 4,
    title: "Rukun dan Syarat Shalat",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Fath Al-Qadir - Ibn Al-Humam",
    sourceMaliki: "Al-Mudawwanah - Sahnun, Hashiyah Ad-Dusuki - Ad-Dusuki",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Nihayah Al-Muhtaj - Ar-Ramli",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Syarh Al-Muntaha - Mansur Al-Buhuti",
  },
  
  // Zakat (categoryId: 3)
  {
    id: 5,
    title: "Pengertian dan Hukum Zakat",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Badai' As-Sanai' - Al-Kasani",
    sourceMaliki: "Al-Mudawwanah - Sahnun, Muwatta' - Malik",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Minhaj At-Talibin - An-Nawawi",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Al-Iqna' - Al-Hajjawi",
  },
  
  // Puasa (categoryId: 4)
  {
    id: 6,
    title: "Keutamaan Puasa Ramadhan",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Badai' As-Sanai' - Al-Kasani",
    sourceMaliki: "Al-Mudawwanah - Sahnun, Muwatta' - Malik",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Minhaj At-Talibin - An-Nawawi",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Al-Iqna' - Al-Hajjawi",
  },
  
  // Haji (categoryId: 5)
  {
    id: 7,
    title: "Pengertian dan Hukum Haji",
    sourceHanafi: "Al-Hidayah - Al-Marghinani, Badai' As-Sanai' - Al-Kasani",
    sourceMaliki: "Al-Mudawwanah - Sahnun, Muwatta' - Malik",
    sourceShafii: "Al-Umm - Ash-Shafi'i, Minhaj At-Talibin - An-Nawawi",
    sourceHanbali: "Al-Mughni - Ibn Qudamah, Al-Iqna' - Al-Hajjawi",
  },
];

console.log("Updating fiqih sources for all mazhabs...");

try {
  for (const source of fiqihSources) {
    await connection.execute(
      `UPDATE fiqih_materials SET 
        sourceHanafi = ?, 
        sourceMaliki = ?, 
        sourceShafii = ?, 
        sourceHanbali = ? 
       WHERE id = ?`,
      [
        source.sourceHanafi,
        source.sourceMaliki,
        source.sourceShafii,
        source.sourceHanbali,
        source.id,
      ]
    );
    console.log(`✓ Updated: ${source.title}`);
  }
  console.log("✓ All fiqih sources updated successfully!");
} catch (error) {
  console.error("Error updating fiqih sources:", error);
} finally {
  await connection.end();
}
