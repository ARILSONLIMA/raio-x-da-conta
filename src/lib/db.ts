import mysql from 'mysql2/promise'

const poolConfig = {
  host: process.env.DB_HOST || 'srv1074.hstgr.io',
  user: process.env.DB_USER || 'u235621162_raiox',
  password: process.env.DB_PASSWORD || 'Alfa#972',
  database: process.env.DB_NAME || 'u235621162_raiox',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

const globalForDb = globalThis as unknown as { pool: mysql.Pool | undefined }

const pool = globalForDb.pool ?? mysql.createPool(poolConfig)
if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool

export default pool
