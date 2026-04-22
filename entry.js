const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 3000;

console.log("--- BOOT FINAL: REFINAMENTO TOTAL ---");

let nextApp = null;
let nextHandle = null;
let isNextReady = false;

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === '/api/diag-db') {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            try {
                const mysql = require('mysql2/promise');
                const conn = await mysql.createConnection({
                    host: process.env.DB_HOST || 'srv1074.hstgr.io',
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME
                });
                await conn.query('SELECT 1');
                res.end("BANCO OK - SITE OPERACIONAL");
                await conn.end();
            } catch (e) {
                res.end("ERRO NO BANCO: " + e.message);
            }
            return;
        }

        if (!isNextReady) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <div style="font-family: sans-serif; text-align: center; padding-top: 100px;">
                    <h1>🚀 Restaurando o Dashboard...</h1>
                    <p>O motor Next.js está sendo ativado.</p>
                    <p>Aguarde 10 segundos e atualize.</p>
                    <div style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <script>setTimeout(() => window.location.reload(), 5000);</script>
                    <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
                </div>
            `);
            return;
        }

        // Handoff direto e sem host fixo (Evita o problema do 0.0.0.0)
        await nextHandle(req, res);

    } catch (err) {
        console.error('Request Error:', err);
        res.statusCode = 500;
        res.end('Erro interno');
    }
});

// ESCUTANDO SEM HOSTNAME ESPECÍFICO
server.listen(PORT, () => {
    console.log(`> Servidor na porta ${PORT}.`);
    
    process.nextTick(() => {
        try {
            const next = require('next');
            // Inicializa sem hostname fixo
            nextApp = next({ dev: false, dir: __dirname });
            nextHandle = nextApp.getRequestHandler();
            
            nextApp.prepare().then(() => {
                isReady = true;
                isNextReady = true;
                console.log(">>> SISTEMA PRONTO! <<<");
            }).catch(e => {
                console.error("Falha no prepare:", e);
            });
        } catch (e) {
            console.error("Falha no require(next):", e);
        }
    });
});
