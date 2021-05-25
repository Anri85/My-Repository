import React from 'react'
import ReactEmoji from 'react-emoji'

// importing css
import './message.css'

const Message = ({ message: { user, text }, name }) => {
    let sendByCurrentUser = false
    // mengecek apakah pengirim pesan adalah dirinya sendiri
    if(user === name) {
        sendByCurrentUser = true
    }

    return (
        sendByCurrentUser 
            ? (
                // apabila pengirim pesan adalah dirinya sendiri
                <div className='messageContainer justifyEnd'>
                    <p className='sentText pr-10'>{user}</p>
                    <div className='messageBox backgroundBlue'>
                        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            ) 
            : (
            // apabila pengirim pesan adalah orang lain
                <div className='messageContainer justifyStart'>
                    <div className='messageBox backgroundLight'>
                        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className='sentText pl-10'>{user}</p>
                </div>
            )
    )
}

export default Message