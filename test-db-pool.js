const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'srv1074.hstgr.io',
  user: 'u235621162_raiox',
  password: 'Alfa#972',
  database: 'u235621162_raiox',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

async function runQuery(id) {
  const start = Date.now()
  try {
    const [rows] = await pool.query('SELECT SLEEP(1) as sleep, ? as id', [id])
    const duration = Date.now() - start
    console.log(`Query ${id} completed in ${duration}ms.`)
    return rows
  } catch (err) {
    console.error(`Query ${id} failed:`, err.message)
    throw err
  }
}

async function stressTest() {
  console.log('Starting stress test with 20 concurrent connections on a pool of 10...')
  const promises = []
  for (let i = 1; i <= 20; i++) {
    // stagger by 200ms to avoid Hostinger TCP connection limit block
    await new Promise(resolve => setTimeout(resolve, 200))
    promises.push(runQuery(i))
  }
  
  try {
    await Promise.all(promises)
    console.log('All 20 queries completed successfully. Pool queueing works!')
  } catch (err) {
    console.error('Stress test failed!', err.message)
    process.exit(1)
  } finally {
    pool.end()
  }
}

stressTest()
