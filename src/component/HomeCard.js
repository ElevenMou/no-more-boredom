import React from 'react'

const HomeCard = ({ image, title }) => {
    return (
        <div className='home-card' id={'home-card-' + title}>
            <div className='home-card__image'>
                <img src={image} alt='category' />
            </div>
            <div className='home-card__title'>
                {title}
            </div>
        </div>
    )
}

export default HomeCard