import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

// importing css
import './chat.css'
// importing infobar component
import InfoBar from '../infoBar/InfoBar'
// importing input component
import Input from '../input/Input'
// importing messages component
import Messages from '../messages/Messages'

let socket

const Chat = ({ location }) => {
    // setting state
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    // endpoint untuk koneksi socket.io
    const ENDPOINT = 'http://localhost:5000'

    // join effect
    useEffect(() => {
        // getting data from url
        const { name, room } = queryString.parse(location.search)

        // connecting socket.io-client and socket.io in backend
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] })

        setName(name)
        setRoom(room)

        // emit event name 'join', sending data (name, room) to backend and getting response from backend()
        socket.emit('join', { name, room }, () => {

        })

        // untuk component willUnMount
        return () => {
            // diconnect socket.io
            socket.emit('disconnect', () => {

            })
            // turning off socket.io
            socket.off()
        }
    }, [location, ENDPOINT])

    // messaging effect
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    // function for sending messages
    const sendMessage = (event) => {
        event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message, () => {
                setMessage('')
            })
        }
    }

    console.log(message, messages)


    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                {/* <input type="text" value={message} onChange={(event) => setMessage(event.target.value)} onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} /> */}
            </div>
        </div>

    )
}

export default Chat