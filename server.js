// Might have to deploy this as a separate project on now-node

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

let port = 3001

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextAppHandler = nextApp.getRequestHandler

io.on('connect', (socket) => {
    socket.emit('now', {
        message: 'zeit'
    })
})

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextAppHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Ready on localhost:${port}`)
    })
})