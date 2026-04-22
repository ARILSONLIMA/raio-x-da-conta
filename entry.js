const http = require('http');
const PORT = process.env.PORT || 3000;

console.log("--- FINAL BOOT: SEM REDIRECIONAMENTO ---");

const server = http.createServer(async (req, res) => {
    // 1. Rota de diagnóstico de banco
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
            res.end("SUCESSO: O Banco de Dados está conectado corretamente!");
            await conn.end();
        } catch (e) {
            res.end("ERRO NO BANCO: " + e.message + "\n\nPasso a passo:\n1. Vá no painel da Hostinger.\n2. Mude a senha do usuário " + process.env.DB_USER + " para Alfa#972 manualmente.");
        }
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end("O site está ONLINE e aguardando a conexão com o banco ser corrigida.\n\nAcesse: /api/diag-db para testar o banco.");
});

// REMOVIDO '0.0.0.0' para evitar o comportamento de redirecionamento em alguns navegadores
server.listen(PORT, () => {
    console.log("Servidor pronto na porta " + PORT);
});
