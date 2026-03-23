import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'srv1074.hstgr.io',
  user: 'u235621162_raioxdbuser',
  password: 'Alfa#972',
  database: 'u235621162_raioxdb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
