import React from 'react'

const Card = ({id, title, contentFront, contentBack, isRotated, onShare}) => {
    return (
        <div className={isRotated ? 'card rotated' : 'card'}>
            <div className='card__title'>
                { title }
            </div>
            <div className='card__content'>
                <p className='card__content-front'>{ contentFront }</p>
                {isRotated && <p className='card__content-back'>{ contentBack }</p>}
                <div className='card__content-share' onClick={() => onShare(id, title, contentFront, contentBack, isRotated)}>share</div>
            </div>
        </div>
    )
}

export default Card