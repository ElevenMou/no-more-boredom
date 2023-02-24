import React from 'react'

const Popup = ({children, closePopup, showPopup}) => {
    return (
        <div className='popup' is-opened={showPopup.toString()}>
            <div className='popup__overlay' onClick={() => closePopup()}></div>
            <div className='popop__content'>
                {children}
            </div>
        </div>
    )
}

export default Popup