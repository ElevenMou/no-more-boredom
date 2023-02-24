import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../component/Card';
import Popup from '../component/Popup';
import ShareContent from '../component/ShareContent';
import { getJokeById } from '../utils/fetchData';

const Joke = () => {
    const { jokeID } = useParams();
    const [joke, setJoke] = useState({ id: '', joke: '' });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

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
        if (e.target.password.value === password) {
            setIsAllowed(true);
            sessionStorage.setItem('IsAllowed', true);
        }
    }

    const nextJoke = () => {
        navigate('/jokes/' + ++joke.id + '/admin');
    }

    const prevJoke = () => {
        if(joke.id > 1)
        navigate('/jokes/' + --joke.id + '/admin');
    }

    return (
        <>
            <h1 className='hidden-heading'>Joke</h1>

            {isAdmin === 'admin' ?
                isAllowed ?
                    <ShareContent id={joke.id} title={'joke'} contentFront={joke.joke} isDownloaded={isAllowed && isAdmin === 'admin'} onNext={nextJoke} onBack={prevJoke} />
                    :
                    <form onSubmit={adminLogin}>
                        <div className='form-group'>
                            <label htmlFor='password'>password</label>
                            <input type='text' name='password' placeholder='password' id='password' className='form-control' />
                        </div>
                        <button type='submit' className='btn' >Login</button>
                    </form>
                :
                <>
                    <Popup showPopup={showPopup} closePopup={togglePopup}>
                        <ShareContent id={joke.id} title={'joke'} contentFront={joke.joke} isDownloaded={isAllowed && isAdmin === 'admin'} />
                    </Popup>
                    <div className='card-display'>
                        <Card id={joke.id} title='Joke' contentFront={joke.joke} isRotated={false} onShare={togglePopup} />
                    </div>
                </>
            }


        </>
    )
}

export default Joke