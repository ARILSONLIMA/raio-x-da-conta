const mysql = require('mysql2/promise');

async function main() {
  const pool = mysql.createPool({
    host: 'srv1074.hstgr.io',
    user: 'u235621162_raioxdbuser',
    password: 'Alfa#972',
    database: 'u235621162_raioxdb',
    port: 3306,
  });

  try {
    console.log('Running migration...');
    await pool.query('ALTER TABLE `User` ADD COLUMN `waterGoal` DECIMAL(10,2) DEFAULT NULL, ADD COLUMN `energyGoal` DECIMAL(10,2) DEFAULT NULL');
    console.log('Migration successful.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('Commands already applied. Columns exist.');
    } else {
        console.error('Error:', err);
    }
  } finally {
    pool.end();
  }
}

main();
