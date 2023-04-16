import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../component/Card';
import Popup from '../component/Popup';
import ShareContent from '../component/ShareContent';
import { getRiddleById } from '../utils/fetchData';
import ReactGA from "react-ga4";

const Riddle = () => {
    const { riddleID } = useParams();
    const [riddle, setRiddle] = useState({ id: '', title: '', question: '', answer: '' });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const [isAllowed, setIsAllowed] = useState(sessionStorage.getItem('Crypted_NBM_IsAllowed_Admin_uJzdeEZFZFezfe8748vztT6'));
    const { isAdmin } = useParams();
    const password = 'uJ!K54GUitT6';

    useEffect(() => {
        document.title = "Riddle";
        ReactGA.send({ hitType: "pageview", page: '/jokes/' + riddleID });
        const fetchRiddle = async () => {
            let riddleData = await getRiddleById(riddleID);
            setRiddle(riddleData);
        }
        fetchRiddle();
    }, [riddleID])

    /************************* Popup share **************************/
    const togglePopup = () => {
        ReactGA.event({category: 'riddles', action: 'share', label: 'share riddle ' + riddleID});
        setShowPopup(prev => !prev);
    }

    const adminLogin = (e) => {
        e.preventDefault();
        if (e.target.password.value === password) {
            setIsAllowed(true);
            sessionStorage.setItem('Crypted_NBM_IsAllowed_Admin_uJzdeEZFZFezfe8748vztT6', true);
        }
    }

    const nextRiddle = () => {
        navigate('/riddles/' + ++riddle.id + '/admin');
    }

    const prevRiddle = () => {
        if(riddle.id > 1)
        navigate('/riddles/' + --riddle.id + '/admin');
    }

    return (
        <>
            <h1 className='hidden-heading'>Riddle</h1>

            {isAdmin === 'admin' ?
                isAllowed ?
                    <ShareContent id={riddle.id} title={riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} isDownloaded={isAllowed && isAdmin === 'admin'} onNext={nextRiddle} onBack={prevRiddle} />
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
                        <ShareContent id={riddle.id} title={riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} isDownloaded={isAllowed && isAdmin === 'admin'} />
                    </Popup>
                    <div className='card-display'>
                        <Card title={riddle.title === '' ? 'Riddle' : riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} onShare={togglePopup} />
                    </div>
                </>
            }
        </>
    )
}

export default Riddle