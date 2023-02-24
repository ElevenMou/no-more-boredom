import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../component/Card';
import Popup from '../component/Popup';
import ShareContent from '../component/ShareContent';
import { getJokeById } from '../utils/fetchData';

const Joke = () => {
    const { jokeID } = useParams();
    const [joke, setJoke] = useState({ id: '', joke: '' });
    const [showPopup, setShowPopup] = useState(false);

    const [isAllowed, setIsAllowed] = useState(sessionStorage.getItem('IsAllowed'));
    const { isAdmin } = useParams();
    const password = 'password';

    useEffect(() => {
        const fetchJoke = async () => {
            let jokeData = await getJokeById(jokeID);
            setJoke(jokeData);
        }

        fetchJoke();
    }, [jokeID])

    /************************* Popup share **************************/
    const togglePopup = () => {
        setShowPopup(prev => !prev);
    }

    const adminLogin = (e) => {
        e.preventDefault();
        if(e.target.password.value === password) {
            setIsAllowed(true);
            sessionStorage.setItem('IsAllowed', true);
        }
    }

    return (
        <>
            <h1 className='hidden-heading'>Joke</h1>
            <Popup showPopup={showPopup} closePopup={togglePopup}>
                <ShareContent id={joke.id} title={'joke'} contentFront={joke.joke} isDownloaded={isAllowed && isAdmin === 'admin'} />
            </Popup>
            {isAdmin === 'admin' ?
                isAllowed ?
                    <div className='card-display'>
                        <Card id={joke.id} title='Joke' contentFront={joke.joke} isRotated={false} onShare={togglePopup} />
                    </div>
                    :
                    <form onSubmit={adminLogin}>
                        <div className='form-group'>
                            <label htmlFor='password'>password</label>
                            <input type='text' name='password' placeholder='password' id='password' className='form-control'/>
                        </div>
                        <button type='submit' className='btn' >Login</button>
                    </form>
                :
                <div className='card-display'>
                    <Card id={joke.id} title='Joke' contentFront={joke.joke} isRotated={false} onShare={togglePopup} />
                </div>
            }


        </>
    )
}

export default Joke