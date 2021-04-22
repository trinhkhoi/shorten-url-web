const express = require('express')
const next = require('next')
const port = parseInt(process.env.PORT, 10) || 3002
const dev = process.env.NODE_ENV !== 'production'
console.log(dev)
const app = next({ dev })
const handle = app.getRequestHandler()
// ignore ssl self-signed
// to be removed later on
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
app.prepare().then(() => {
  const server = express()
  // server.get('/a', (req, res) => {
  //   return app.render(req, res, '/a', req.query)
  // })
  server.all('*', (req, res) => handle(req, res))
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on server port: ${port}`)
  })
})