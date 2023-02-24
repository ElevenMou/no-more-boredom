import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../component/Card';
import Popup from '../component/Popup';
import ShareContent from '../component/ShareContent';
import { getRiddleById } from '../utils/fetchData';

const Riddle = () => {
    const { riddleID } = useParams();
    const [riddle, setRiddle] = useState({ id: '', title: '', question: '', answer: '' });
    const [showPopup, setShowPopup] = useState(false);

    const [isAllowed, setIsAllowed] = useState(sessionStorage.getItem('NBM_IsAllowed_Admi'));
    const { isAdmin } = useParams();
    const password = 'Admin';

    useEffect(() => {
        const fetchRiddle = async () => {
            let riddleData = await getRiddleById(riddleID);
            setRiddle(riddleData);
        }
        /* document.documentElement.style.setProperty('--color-background', 'linear-gradient(180deg, var(--color-secondary) 0%, var(--color-secondary2) 100%)'); */
        fetchRiddle();
    }, [riddleID])

    /************************* Popup share **************************/
    const togglePopup = (id, title, contentFront, contentBack) => {
        setShowPopup(prev => !prev);
    }

    const adminLogin = (e) => {
        e.preventDefault();
        if (e.target.password.value === password) {
            setIsAllowed(true);
            sessionStorage.setItem('NBM_IsAllowed_Admi', true);
        }
    }

    return (
        <>
            <h1 className='hidden-heading'>Riddle</h1>
            <Popup showPopup={showPopup} closePopup={togglePopup}>
                <ShareContent id={riddle.id} title={riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} isDownloaded={isAllowed && isAdmin === 'admin'} />
            </Popup>
            {isAdmin === 'admin' ?
                isAllowed ?
                    <div className='card-display'>
                        <Card title={riddle.title === '' ? 'Riddle' : riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} onShare={togglePopup} />
                    </div>
                    :
                    <form onSubmit={adminLogin}>
                        <div className='form-group'>
                            <label htmlFor='password'>password</label>
                            <input type='text' name='password' placeholder='password' id='password' className='form-control' />
                        </div>
                        <button type='submit' className='btn' >Login</button>
                    </form>
                :
                <div className='card-display'>
                    <Card title={riddle.title === '' ? 'Riddle' : riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} onShare={togglePopup} />
                </div>
            }
        </>
    )
}

export default Riddle