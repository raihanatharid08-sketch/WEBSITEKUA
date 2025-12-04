#!/usr/bin/env node
/**
 * Script untuk seeding semua data ke database
 * Jalankan dengan: npx tsx seed-all.mjs
 */

import { execSync } from 'child_process';

console.log('🌱 Starting database seeding...\n');

const seedScripts = [
  { name: 'Categories', script: 'seed-categories.mjs' },
  { name: 'Materials', script: 'seed-materials.mjs' },
  { name: 'Additional Materials', script: 'seed-additional-materials.mjs' },
];

let successCount = 0;
let failCount = 0;

for (const { name, script } of seedScripts) {
  try {
    console.log(`📦 Seeding ${name}...`);
    execSync(`npx tsx ${script}`, { stdio: 'inherit' });
    console.log(`✅ ${name} seeded successfully!\n`);
    successCount++;
  } catch (error) {
    console.error(`❌ Failed to seed ${name}`);
    console.error(error.message);
    failCount++;
  }
}

console.log('\n' + '='.repeat(50));
console.log(`✅ Success: ${successCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log('='.repeat(50));

if (failCount === 0) {
  console.log('\n🎉 All data seeded successfully!');
  process.exit(0);
} else {
  console.log('\n⚠️  Some seeding failed. Please check the errors above.');
  process.exit(1);
}
