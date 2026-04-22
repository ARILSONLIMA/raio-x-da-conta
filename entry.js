const http = require('http');
const PORT = process.env.PORT || 3000;

console.log("--- TESTE FINAL DE CONEXÃO EXTERNA ---");

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/diag-db') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        try {
            const mysql = require('mysql2/promise');
            // Usando o HOST real da Hostinger e não localhost
            const conn = await mysql.createConnection({
                host: process.env.DB_HOST || 'srv1074.hstgr.io',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
            await conn.query('SELECT 1');
            res.end("SUCESSO: Conectado ao servidor " + (process.env.DB_HOST || 'srv1074.hstgr.io'));
            await conn.end();
        } catch (e) {
            res.end("ERRO NO BANCO: " + e.message + "\n\nHost tentado: " + (process.env.DB_HOST || 'srv1074.hstgr.io') + "\n\nDica: Se o erro for 'Connection Refused', verifique no seu hPanel se o Host MySQL é realmente srv1074.hstgr.io.");
        }
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end("Testando conexão externa com o banco...\nAcesse: /api/diag-db");
}).listen(PORT);
