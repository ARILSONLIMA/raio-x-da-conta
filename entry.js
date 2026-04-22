const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

console.log("--- MASTER BOOT: RESTAURANDO O SISTEMA ---");

let nextApp = null;
let nextHandle = null;
let isNextReady = false;

// 1. INÍCIO INSTANTÂNEO (Adeus 503)
const server = http.createServer(async (req, res) => {
    try {
        // Rota de diagnóstico (Sempre ativa para segurança)
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
                res.end("CONEXÃO COM BANCO: OK!\nNext.js Ready: " + isNextReady);
                await conn.end();
            } catch (e) {
                res.end("ERRO DE BANCO: " + e.message);
            }
            return;
        }

        // Se o motor Next.js ainda está aquecendo...
        if (!isNextReady) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <div style="font-family: sans-serif; text-align: center; padding-top: 100px;">
                    <h1>🚀 Quase lá!</h1>
                    <p>O sistema está carregando o layout e o motor de dashboard.</p>
                    <p>Isso leva cerca de 15 segundos no primeiro acesso.</p>
                    <div style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animate: spin 1s linear infinite;"></div>
                    <script>setTimeout(() => window.location.reload(), 5000);</script>
                    <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
                </div>
            `);
            return;
        }

        // Handoff para o Next.js (Restaura Layout, API e Dashboard)
        const { URL } = require('url');
        const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
        await nextHandle(req, res, parsedUrl);

    } catch (err) {
        console.error('Request Error:', err);
        res.statusCode = 500;
        res.end('Erro interno');
    }
});

server.listen(PORT, HOST, () => {
    console.log(`> Servidor ouvindo na porta ${PORT}. Aguardando Next.js...`);
    
    // 2. CARREGAMENTO DO ENGINE EM SEGUNDO PLANO
    process.nextTick(() => {
        try {
            const next = require('next');
            nextApp = next({ dev: false, dir: __dirname, hostname: HOST, port: PORT });
            nextHandle = nextApp.getRequestHandler();
            
            nextApp.prepare().then(() => {
                isNextReady = true;
                console.log(">>> SITE TOTALMENTE OPERACIONAL! <<<");
            }).catch(e => {
                console.error("Falha no prepare:", e);
            });
        } catch (e) {
            console.error("Falha no require(next):", e);
        }
    });
});
