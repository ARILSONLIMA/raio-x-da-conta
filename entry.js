const http = require('http');
const path = require('path');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

// Inicializando o Next.js apontando para a raiz do projeto
const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

console.log("--- BOOT FINAL: REESTRUTURAÇÃO DE ASSETS ---");

app.prepare().then(() => {
  http.createServer(async (req, res) => {
    try {
      // Rota de diagnóstico de banco de dados
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
              res.end("CONEXÃO COM O BANCO: SUCESSO!");
              await conn.end();
          } catch (e) {
              res.end("ERRO DE BANCO: " + e.message + "\n\nUser: " + process.env.DB_USER + "\nHost: " + process.env.DB_HOST);
          }
          return;
      }

      // Deixa o Next.js resolver tudo (incluindo _next/static e public)
      const parsedUrl = new URL(req.url, `http://${hostname}:${port}`);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Erro na requisição:', err);
      res.statusCode = 500;
      res.end('Erro interno');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Pronto em http://${hostname}:${port}`);
  });
}).catch(err => {
    console.error("ERRO AO PREPARAR APP:", err);
    process.exit(1);
});
