const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    
    let report = "--- DIAGNÓSTICO DE ERRO (FASE 2) ---\n\n";

    // 1. Tentar ler stderr.log
    try {
        if (fs.existsSync('stderr.log')) {
            report += "CONTEÚDO DO stderr.log:\n" + fs.readFileSync('stderr.log', 'utf8') + "\n\n";
        } else {
            report += "Arquivo stderr.log não encontrado.\n\n";
        }
    } catch (e) {
        report += "Erro ao ler stderr.log: " + e.message + "\n\n";
    }

    // 2. Testar carregamento do Next.js
    try {
        report += "Testando require('next')...\n";
        const next = require('next');
        report += "Sucesso: Biblioteca 'next' carregada.\n\n";
        
        report += "Testando inicialização do app (sem start)...\n";
        const app = next({ dev: false, dir: __dirname });
        report += "Sucesso: Objeto 'app' criado.\n\n";
    } catch (e) {
        report += "FALHA ao carregar Next.js: " + e.stack + "\n\n";
    }

    // 3. Info do sistema
    report += "INFO DO SISTEMA:\n";
    report += "CWD: " + process.cwd() + "\n";
    report += "NODE_ENV: " + process.env.NODE_ENV + "\n";
    report += "PORT: " + process.env.PORT + "\n";

    res.end(report);
}).listen(process.env.PORT || 3000, '0.0.0.0');
