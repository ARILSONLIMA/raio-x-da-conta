const http = require('http');
const path = require('path');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

console.log("--- INICIANDO BOOT INSTANTÂNEO ---");

let isReady = false;
let app;
let handle;

// 1. ABRIR A PORTA IMEDIATAMENTE (Satisfaz a Hostinger e evita 503)
const server = http.createServer(async (req, res) => {
    try {
        // Rota de diagnóstico de banco (Disponível na hora!)
        if (req.url === '/api/diag-db') {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            try {
                const mysql = require('mysql2/promise');
                const conn = await mysql.createConnection({
                    host: process.env.DB_HOST || 'localhost',
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME
                });
                await conn.query('SELECT 1');
                res.end("SISTEMA ONLINE - CONEXÃO COM O BANCO: SUCESSO!");
                await conn.end();
            } catch (e) {
                res.end("SISTEMA ONLINE - ERRO DE BANCO: " + e.message + "\n\nUser: " + process.env.DB_USER + "\nHost: " + process.env.DB_HOST);
            }
            return;
        }

        // Se o Next.js ainda está carregando...
        if (!isReady) {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end("O sistema está iniciando... Por favor, aguarde 15 segundos e atualize a página.");
            return;
        }

        // Deixa o Next.js resolver o restante
        const parsedUrl = new URL(req.url, `http://${hostname}:${port}`);
        await handle(req, res, parsedUrl);
    } catch (err) {
        console.error('Erro na requisição:', err);
        res.statusCode = 500;
        res.end('Erro interno');
    }
});

server.listen(port, hostname, () => {
    console.log(`> Servidor ouvindo porta ${port}. Hostinger satisfeita.`);
    
    // 2. INICIAR NEXT.JS EM SEGUNDO PLANO
    console.log("Iniciando preparação do Next.js...");
    app = next({ dev, dir: __dirname, hostname, port });
    handle = app.getRequestHandler();
    
    app.prepare().then(() => {
        isReady = true;
        console.log(">>> NEXT.JS PRONTO E RODANDO! <<<");
    }).catch(err => {
        console.error("FALHA AO CARREGAR NEXT.JS:", err);
    });
});
