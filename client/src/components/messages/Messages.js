import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

// importing css
import './messages.css'
// importing message component
import Message from './message/Message'

const Messages = ({ messages, name }) => {
    return (
        <ScrollToBottom className='messages'>
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
        </ScrollToBottom>
    )
}

export default Messages