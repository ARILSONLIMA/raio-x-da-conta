const http = require('http');

let errorServerStarted = false;

function startErrorServer(errMessage) {
    if (errorServerStarted) return;
    errorServerStarted = true;
    try {
        http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Hostinger Diagnostic Crash Report:\n\n" + errMessage);
        }).listen(process.env.PORT || 3000, '0.0.0.0');
        console.log("Error server listening on port " + (process.env.PORT || 3000));
    } catch(e) {
        console.error("Failed to start error server:", e);
    }
}

process.on('uncaughtException', (err) => {
    startErrorServer(err.stack || err.message || String(err));
});

process.on('unhandledRejection', (err) => {
    startErrorServer(err ? (err.stack || err.message) : 'Unknown promise rejection');
});

try {
    const next = require('next');
    const dev = process.env.NODE_ENV !== 'production';
    const app = next({ dev, dir: __dirname });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
        http.createServer((req, res) => {
            handle(req, res);
        }).listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
            if (err) throw err;
            console.log(`> Ready on http://0.0.0.0:${process.env.PORT || 3000}`);
        });
    }).catch(err => {
        startErrorServer(err.stack || err.message);
    });
} catch(err) {
    startErrorServer(err.stack || err.message);
}
