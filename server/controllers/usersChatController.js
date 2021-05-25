const users = []

const addUser = ({ id, name, room }) => {
    // mengecek apakah username yang digunakan oleh dua client sama
    const userExist = users.find((user) => user.room === room && user.name === name)
    if(userExist) {
        return { error: 'Username Is Taken!' }
    }

    // menambahkan user apabila username yang digunakan oleh dua client tidak sama
    const user = { id, name, room }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    // mencari user berdasarkan id dan menghapusnya
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUserInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser, removeUser, getUser, getUserInRoom
}