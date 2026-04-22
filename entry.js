const http = require('http');

// Configurações básicas que não pesam no boot
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

console.log("--- ULTRA-SAFETY BOOT: INÍCIO IMEDIATO ---");

let nextApp = null;
let nextHandle = null;
let isNextReady = false;

// 1. CRIAR O SERVIDOR E ABRIR A PORTA IMEDIATAMENTE (CORRIDA CONTRA O 503)
const server = http.createServer(async (req, res) => {
    try {
        // Rota de diagnóstico de banco (Lazy Load)
        if (req.url === '/api/diag-db') {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            try {
                const mysql = require('mysql2/promise'); // Carrega só quando precisa
                const conn = await mysql.createConnection({
                    host: process.env.DB_HOST || 'localhost',
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME
                });
                await conn.query('SELECT 1');
                res.end("ULTRA-SAFETY: BANCO CONECTADO COM SUCESSO!");
                await conn.end();
            } catch (e) {
                res.end("ULTRA-SAFETY: ERRO NO BANCO -> " + e.message + "\n\nUser: " + process.env.DB_USER);
            }
            return;
        }

        // Se o Next ainda não está pronto
        if (!isNextReady) {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end("O sistema está carregando o motor pesado (Next.js)... Aguarde 10 segundos e atualize.");
            return;
        }

        const { URL } = require('url'); // Lazy load
        const parsedUrl = new URL(req.url, `http://${HOST}:${PORT}`);
        await nextHandle(req, res, parsedUrl);
    } catch (err) {
        console.error('Request Error:', err);
        res.statusCode = 500;
        res.end('Erro interno');
    }
});

server.listen(PORT, HOST, () => {
    console.log(`> PORTA ${PORT} ABERTA! Servidor vivo.`);
    
    // 2. CARREGAR O NEXT.JS EM SEGUNDO PLANO SÓ DEPOIS QUE A PORTA ESTAR ABERTA
    process.nextTick(() => {
        console.log("Iniciando carregamento do Next.js (Lazy)...");
        try {
            const next = require('next');
            nextApp = next({ dev: false, dir: __dirname, hostname: HOST, port: PORT });
            nextHandle = nextApp.getRequestHandler();
            
            nextApp.prepare().then(() => {
                isNextReady = true;
                console.log(">>> MOTOR NEXT.JS CARREGADO COM SUCESSO! Site pronto. <<<");
            }).catch(e => {
                console.error("Erro no prepare:", e);
            });
        } catch (e) {
            console.error("Erro no require(next):", e);
        }
    });
});
