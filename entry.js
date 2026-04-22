const http = require('http');
const PORT = process.env.PORT || 3000;

// 1. LIGAÇÃO INSTANTÂNEA (Mata o 503 na hora)
const server = http.createServer(async (req, res) => {
    // Rota de teste de Banco de Dados que NÃO DEPENDE do Next.js
    if (req.url === '/api/diag-db') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        try {
            const mysql = require('mysql2/promise');
            const conn = await mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });
            await conn.query('SELECT 1');
            res.end("BANCO DE DADOS: CONECTADO COM SUCESSO!");
            await conn.end();
        } catch (e) {
            res.end("ERRO NO BANCO: " + e.message + "\nVerifique se a senha no painel é Alfa#972");
        }
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end("O site está subindo! Aguarde 10 segundos e atualize a página.");
}).listen(PORT, '0.0.0.0');

console.log("Servidor de emergência rodando na porta " + PORT);
