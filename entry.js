const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 3000;

console.log("--- FINAL BOOT: COM RESTAURAÇÃO DE DADOS ---");

let nextApp = null;
let nextHandle = null;
let isNextReady = false;

const server = http.createServer(async (req, res) => {
    try {
        // ROTA DE RESTAURAÇÃO DE EMERGÊNCIA
        if (req.url === '/api/restore-db') {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            try {
                const mysql = require('mysql2/promise');
                const conn = await mysql.createConnection({
                    host: process.env.DB_HOST || 'srv1074.hstgr.io',
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    multipleStatements: true
                });

                console.log("Iniciando limpeza e restauração...");

                // 1. Limpar e Criar Tabelas Base
                await conn.query(`
                    DROP TABLE IF EXISTS \`Invoice\`;
                    DROP TABLE IF EXISTS \`User\`;
                    
                    CREATE TABLE \`User\` (
                      \`id\` VARCHAR(191) NOT NULL,
                      \`name\` VARCHAR(191) NOT NULL,
                      \`email\` VARCHAR(191) NOT NULL,
                      \`password_hash\` VARCHAR(191) NOT NULL,
                      \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                      PRIMARY KEY (\`id\`),
                      UNIQUE KEY \`User_email_key\` (\`email\`)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

                    CREATE TABLE \`Invoice\` (
                      \`id\` VARCHAR(191) NOT NULL,
                      \`userId\` VARCHAR(191) NOT NULL,
                      \`type\` ENUM('WATER', 'ENERGY') NOT NULL,
                      \`month\` INT NOT NULL,
                      \`year\` INT NOT NULL,
                      \`consumption\` DECIMAL(65,30) NOT NULL,
                      \`cost\` DECIMAL(65,30) NOT NULL,
                      \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                      PRIMARY KEY (\`id\`),
                      KEY \`Invoice_userId_fkey\` (\`userId\`),
                      CONSTRAINT \`Invoice_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\` (\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
                `);

                // 2. Aplicar Colunas da Migração
                await conn.query('ALTER TABLE `User` ADD COLUMN `waterGoal` DECIMAL(10,2) DEFAULT NULL, ADD COLUMN `energyGoal` DECIMAL(10,2) DEFAULT NULL');

                // 3. Criar Usuário Admin Padrão
                const adminId = require('crypto').randomUUID();
                const adminHash = "$2b$10$2RvThe7w.ugYdLhCSdzhaOw2NH.vuyW2t5RMNlu7VGhzWnSz79clq"; // Alfa@972
                await conn.query('INSERT INTO User (id, name, email, password_hash, createdAt) VALUES (?, ?, ?, ?, NOW())', 
                    [adminId, 'Admin', 'admin@raioxdaconta.online', adminHash]
                );

                res.end("RESTAURAÇÃO COMPLETA!\n\nUsuário: admin@raioxdaconta.online\nSenha: Alfa@972\n\nAgora você já pode logar no dashboard.");
                await conn.end();
            } catch (e) {
                res.end("ERRO NA RESTAURAÇÃO: " + e.message);
            }
            return;
        }

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
                    <p>Aguarde 15 segundos e atualize.</p>
                    <div style="margin: 20px auto; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                    <script>setTimeout(() => window.location.reload(), 5000);</script>
                    <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
                </div>
            `);
            return;
        }

        const { parse } = require('url');
        const parsedUrl = parse(req.url, true);
        await nextHandle(req, res, parsedUrl);

    } catch (err) {
        console.error('Request Error:', err);
        res.statusCode = 500;
        res.end('Erro interno');
    }
});

server.listen(PORT, () => {
    console.log(`> Servidor na porta ${PORT}.`);
    
    process.nextTick(() => {
        try {
            const next = require('next');
            nextApp = next({ dev: false, dir: __dirname });
            nextHandle = nextApp.getRequestHandler();
            
            nextApp.prepare().then(() => {
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
