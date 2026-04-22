const http = require('http');
const path = require('path');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

// Garantir que o Next.js olhe para a pasta atual como raiz
const app = next({ dev, dir: __dirname, hostname, port });
const handle = app.getRequestHandler();

console.log("--- INICIANDO SERVIDOR OFICIAL NEXT.JS ---");
console.log("CWD:", __dirname);

app.prepare().then(() => {
  http.createServer(async (req, res) => {
    try {
      const parsedUrl = new URL(req.url, `http://${hostname}:${port}`);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Erro no processamento da página:', err);
      res.statusCode = 500;
      res.end('Erro interno do servidor');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Servidor pronto em http://${hostname}:${port}`);
  });
}).catch(err => {
    console.error("FALHA NA INICIALIZAÇÃO:", err);
    process.exit(1);
});
