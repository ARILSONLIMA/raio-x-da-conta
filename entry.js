const http = require('http');
const path = require('path');
const fs = require('fs');

// Configurações
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

console.log("--- INICIANDO SERVIDOR DE PRODUÇÃO ---");

// Tentar carregar o modo Standalone (mais eficiente)
const standalonePath = path.join(__dirname, '.next', 'standalone', 'server.js');

if (fs.existsSync(standalonePath)) {
    console.log("Modo Standalone detectado! Delegando para .next/standalone/server.js");
    // O standalone da Next.js espera ser carregado via require se for usado como entrypoint customizado
    // ou simplesmente rodar o arquivo. Na Hostinger, vamos tentar incluir o script.
    try {
        require(standalonePath);
    } catch (e) {
        console.error("Erro ao carregar Standalone:", e);
        startManualNext();
    }
} else {
    console.log("Standalone não encontrado. Iniciando modo Next.js manual...");
    startManualNext();
}

function startManualNext() {
    const next = require('next');
    const app = next({ dev: false, dir: __dirname });
    const handle = app.getRequestHandler();

    console.log("Preparando Next.js (app.prepare)...");
    
    app.prepare().then(() => {
        console.log("Next.js preparado com sucesso!");
        http.createServer((req, res) => {
            handle(req, res);
        }).listen(PORT, HOST, (err) => {
            if (err) {
                console.error("Erro ao abrir porta:", err);
                return;
            }
            console.log(`> Servidor rodando em http://${HOST}:${PORT}`);
        });
    }).catch(err => {
        console.error("ERRO FATAL NA PREPARAÇÃO:", err);
        // Fallback de emergência para não dar 503
        http.createServer((req, res) => {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("Erro ao iniciar Next.js: " + err.message);
        }).listen(PORT, HOST);
    });
}
