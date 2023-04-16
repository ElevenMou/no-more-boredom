import React from 'react'
import Dice from "../assets/dice.svg"
import ReactGA from "react-ga4"

const Random = ({end, onRandomItem}) => {
    const randomNumber = () => {
        ReactGA.event({category: end > 2000 ? 'riddles' : 'jokes' , action: 'pick random', label: 'pick random'});
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