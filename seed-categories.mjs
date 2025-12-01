import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { categories } from "./drizzle/schema.js";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(connection);

const initialCategories = [
  {
    name: "Thaharah (Bersuci)",
    slug: "thaharah",
    description: "Hukum bersuci, wudhu, mandi wajib, tayammum, dan najis",
    displayOrder: 1,
  },
  {
    name: "Shalat",
    slug: "shalat",
    description: "Hukum shalat lima waktu, shalat sunnah, dan tata cara shalat",
    displayOrder: 2,
  },
  {
    name: "Zakat",
    slug: "zakat",
    description: "Hukum zakat fitrah, zakat mal, dan penyaluran zakat",
    displayOrder: 3,
  },
  {
    name: "Puasa",
    slug: "puasa",
    description: "Hukum puasa Ramadhan, puasa sunnah, dan hal-hal yang membatalkan puasa",
    displayOrder: 4,
  },
  {
    name: "Haji",
    slug: "haji",
    description: "Hukum haji, umrah, dan manasik haji",
    displayOrder: 5,
  },
  {
    name: "Muamalah",
    slug: "muamalah",
    description: "Hukum jual beli, hutang piutang, dan transaksi ekonomi Islam",
    displayOrder: 6,
  },
  {
    name: "Munakahat (Nikah)",
    slug: "munakahat",
    description: "Hukum pernikahan, talak, rujuk, dan hak-hak suami istri",
    displayOrder: 7,
  },
];

async function seed() {
  console.log("Seeding categories...");
  
  for (const category of initialCategories) {
    await db.insert(categories).values(category).onDuplicateKeyUpdate({
      set: {
        name: category.name,
        description: category.description,
        displayOrder: category.displayOrder,
      },
    });
  }
  
  console.log("Categories seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
