import mysql from "mysql2/promise";

// Hardcode database connection
const connection = await mysql.createConnection({
  host: "localhost",
  user: "websitekua_user",
  password: "websitekua_password",
  database: "websitekua",
  port: 3306,
});

console.log("Adding fiqih source columns to fiqih_materials table...");

try {
  // Check if columns already exist
  const [columns] = await connection.query(`
    SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'fiqih_materials' AND TABLE_SCHEMA = 'websitekua'
  `);

  const columnNames = columns.map(col => col.COLUMN_NAME);

  // Add columns if they don't exist
  if (!columnNames.includes('sourceHanafi')) {
    await connection.execute(`
      ALTER TABLE fiqih_materials 
      ADD COLUMN sourceHanafi VARCHAR(500) NULL,
      ADD COLUMN sourceMaliki VARCHAR(500) NULL,
      ADD COLUMN sourceShafii VARCHAR(500) NULL,
      ADD COLUMN sourceHanbali VARCHAR(500) NULL
    `);
    console.log("✓ Columns added successfully!");
  } else {
    console.log("✓ Columns already exist!");
  }

} catch (error) {
  console.error("Error adding columns:", error);
} finally {
  await connection.end();
}
