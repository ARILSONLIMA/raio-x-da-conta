const path = require('path');

// Configurações de ambiente para o Next.js Standalone
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 3000;
process.env.HOSTNAME = '0.0.0.0';

console.log("--- BOOT STANDALONE NEXT.JS ---");
console.log("Porta:", process.env.PORT);
console.log("Diretório:", __dirname);

// O servidor standalone gerado pelo Next.js fica em .next/standalone/server.js
// Ele é auto-contido e muito mais leve que o servidor normal.
const standaloneServerPath = path.join(__dirname, '.next', 'standalone', 'server.js');

try {
    if (require('fs').existsSync(standaloneServerPath)) {
        console.log("Iniciando motor standalone...");
        require(standaloneServerPath);
    } else {
        throw new Error("Arquivo standalone não encontrado após o build.");
    }
} catch (err) {
    console.error("FALHA AO INICIAR STANDALONE:", err.message);
    
    // Fallback de emergência caso o standalone falhe por algum motivo de path
    const http = require('http');
    http.createServer((req, res) => {
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end("Erro Crítico: O motor standalone não pôde ser iniciado.\n" + err.stack);
    }).listen(process.env.PORT, '0.0.0.0');
}
