import React from 'react'
import Dice from "../assets/dice.svg"

const Random = ({end, onRandomItem}) => {
    const randomNumber = () => {
        let n = Math.ceil(Math.random() * (end - 1) + 1);
        onRandomItem(n);
    }

    return (
        <button className='random' onClick={() => randomNumber()} title="pick random">
            <img src={Dice} alt="random pick" />
        </button>
    )
}

export default Random