const mysql = require('mysql2/promise');

async function testConnection() {
  const config = {
    host: 'srv1074.hstgr.io',
    user: 'u235621162_raiox',
    password: 'Alfa#972',
    database: 'u235621162_raiox',
    port: 3306,
  };

  console.log('Testing connection with:', { ...config, password: '***' });

  try {
    const connection = await mysql.createConnection(config);
    console.log('Successfully connected to the database!');
    const [rows] = await connection.execute('SELECT 1 as result');
    console.log('Query result:', rows);
    await connection.end();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}

testConnection();
