import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import HomeCard from '../component/HomeCard'
import JokesImg from "../assets/Jokes.svg"
import RiddlesImg from "../assets/Riddles.svg"
import ReactGA from 'react-ga4'

const Home = () => {

    useEffect(() => {
        document.title = "NoMoreBoredom";
        ReactGA.send({ hitType: "pageview", page: "/" });
    }, [])
    return (
        <div className='home' id='home'>
            <h1 className='home__title'>What are you looking for?</h1>
            <div className='home__cards'>
                <Link to='/jokes'>
                    <HomeCard title='Jokes' image={JokesImg} />
                </Link>
                <Link to='/riddles'>
                    <HomeCard title='Riddles' image={RiddlesImg} />
                </Link>
            </div>
        </div>
    )
}

export default Home