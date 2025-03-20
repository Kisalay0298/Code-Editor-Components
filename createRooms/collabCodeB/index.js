const { Socket } = require("dgram");
const express = require("express");
const app = express();
const http = require("http")
const { Server } = require('socket.io')
const server= http.createServer(app)
const io = new Server(server);


io.on('connection', (socket)=> {
    console.log('a new socket connected', socket.id)
})

app.get('/', (req, res)=> {
    res.json({ message: "Data received!" });
})

const port = process.env.PORT || 6948;
server.listen(port, () => console.log('Server started on: ', port))