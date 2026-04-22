const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
    if (err) throw err
    console.log(`> Ready on http://0.0.0.0:${process.env.PORT || 3000}`)
  })
})
