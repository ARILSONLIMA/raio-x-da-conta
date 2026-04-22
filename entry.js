const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    let exists = fs.existsSync('.next/standalone/server.js');
    let content = "";
    if (exists) {
        content = "Standalone server.js ENCONTRADO!";
    } else {
        content = "Standalone NÃO encontrado em .next/standalone/server.js\n";
        if (fs.existsSync('.next')) {
            content += "Conteúdo de .next: " + fs.readdirSync('.next').join(', ');
        }
    }
    res.end(content);
}).listen(process.env.PORT || 3000, '0.0.0.0');
