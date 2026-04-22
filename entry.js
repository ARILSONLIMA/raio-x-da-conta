const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    let dirFiles = [];
    try {
        dirFiles = fs.readdirSync('.');
    } catch (e) {
        dirFiles = ["Erro ao ler pasta: " + e.message];
    }

    const info = {
        status: "O servidor Node.js está ONLINE!",
        cwd: process.cwd(),
        env_port: process.env.PORT,
        node_version: process.version,
        files_in_root: dirFiles
    };
    
    res.end(JSON.stringify(info, null, 2));
}).listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log("Diagnostic server started on port " + (process.env.PORT || 3000));
});
