import mysql from 'mysql2/promise'

const poolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}

const globalForDb = globalThis as unknown as { pool: mysql.Pool | undefined }

const pool = globalForDb.pool ?? mysql.createPool(poolConfig)

// Log de erro aprimorado para o console da Hostinger
pool.on('error', (err) => {
  console.error('ERRO NO POOL DE CONEXÃO DO BANCO:', err.message);
});

export default pool
