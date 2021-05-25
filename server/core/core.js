// main script for running the server
const express = require('express')
const app = express()
const socketio = require('socket.io')
const http = require('http')

// importing helper for manage user
const { addUser, getUser, removeUser, getUserInRoom } = require('../controllers/usersChatController')

// konfigurasi socket.io dan socket.io-client dari frontend untuk membuat socket.io bisa terkoneksi (melakukan interaksi 2 arah)
const server = http.createServer(app)
const io = socketio(server)

// connectiong with socket route
app.use(require('../route/socketRouter'))

// connecting socket.io
io.on('connection', (socket) => {
    console.log('Get New Connection!')

    // fungsi untuk user join kedalam chat (menerima data dari frontend)
    socket.on('join', ({ name, room }, callback) => {
        // menambahkan user
        const { user, error } = addUser({ id: socket.id, name, room })
        if(error) {
            return callback(error)
        }

        // membuat pesan yang akan dikirimkan oleh admin (backend) kepada frontend
        socket.emit('message', {user: 'Admin', text: `${user.name}, Welcome To The Room ${user.room}!`})
        // membuat pesan untuk memberitahu siapapun di dalam room bahwa siapa user yang baru saja memasuki room
        socket.broadcast.to(user.room).emit('message', { user: 'Admin', text: `${user.name} Has Join The Chat!` })

        // menghubungkan dua user dengan room yang sama
        socket.join(user.room)

        // fungsi untuk melihat berapa banyak user didalam room
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room) })

        callback()
    })
    
    // fungsi untuk user mengirimkan pesan (menunggu data dari frontend)
    socket.on('sendMessage', (message, callback) => {
        // mencari tahu username user yang mengirimkan chat
        const user = getUser(socket.id)

        // menampilkan pesan
        io.to(user.room).emit('message', { user: user.name, text: message})
        io.to(user.room).emit('roomData', { room: user.room, users: getUserInRoom(user.room)})

        callback()
    })

    // disconnect socket.io
    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} Leave The Chat!` })
        }
    })
})

module.exports = {
    app, server
}