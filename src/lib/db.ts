import mysql from 'mysql2/promise'

const poolConfig = {
  host: 'srv1074.hstgr.io',
  user: 'u235621162_raioxdbuser',
  password: 'Alfa#972',
  database: 'u235621162_raioxdb',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const globalForDb = globalThis as unknown as { pool: mysql.Pool | undefined }

const pool = globalForDb.pool ?? mysql.createPool(poolConfig)
if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool

export default pool
