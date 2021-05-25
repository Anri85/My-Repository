import React from 'react'

// importing css
import './infoBar.css'
// import icon
import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'

const InfoBar = ({ room }) => {
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img src={onlineIcon} className='onlineIcon' alt="online" />
                <h4>{room}</h4>
            </div>
            <div className='rightInnerContainer'>
                <a href="/login"><img src={closeIcon} alt="close" /></a>
            </div>
        </div>
    )
}

export default InfoBar