import React from 'react'
import FbIcon from "../assets/facebook.svg"
import InstaIcon from "../assets/instagram.svg"

const SocialLinks = () => {
    return (
        <div className='social-links'>
            <a href='https://www.instagram.com/its.nomoreboredom' target='_blank'>
                <img src={InstaIcon} alt='instagram' />
            </a>
            <a href='https://www.facebook.com/its.nomoreboredom' target='_blank'>
                <img src={FbIcon} alt='facebook' />
            </a>
        </div>
    )
}

export default SocialLinks