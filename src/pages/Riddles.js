import React, { useEffect, useState } from 'react'
import { getRiddles, getRiddleById } from '../utils/fetchData'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Card from '../component/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Random from '../component/Random';
import Popup from '../component/Popup';
import ShareContent from '../component/ShareContent';

const Riddles = () => {
    const [riddles, setRiddles] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [shareRiddle, setShareRiddle] = useState({id: 1, title: "",contentFront: "", contentBack: "", isRotated: true});

    /************************* Initialize **************************/
    useEffect(() => {
        const fetchRiddles = async () => {
            const riddlesData = await getRiddles(1, '');
            setRiddles(riddlesData);
        }
        fetchRiddles();
    }, []);

    /************************* Search **************************/
    useEffect(() => {
        const fetchRiddles = async () => {
            if (search.length > 5) {
                const riddlesData = await getRiddles(1, search);
                if (riddlesData.length < 30) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setRiddles(riddlesData);
            }
        }
        fetchRiddles();
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    /************************* Infinite scroll **************************/
    const nextPage = () => {
        setPage(prev => ++prev);
    }

    useEffect(() => {
        const fetchRiddles = async () => {
            const riddlesData = await getRiddles(page, search);
            if (riddlesData.length < 30) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setRiddles((prev) => [...prev, ...riddlesData]);
        }
        fetchRiddles();
    }, [page])

    /************************* Random pick **************************/
    const pickRandomRiddle = async (id) => {
        const riddleData = await getRiddleById(id);
        await setRiddles([riddleData]);
        setHasMore(false);
    }

    /************************* Popup share **************************/
    const openPopup = (id, title, contentFront, contentBack) => {
        setShareRiddle({id: id, title: title, contentFront: contentFront, contentBack: contentBack, isRotated: true});
    }

    useEffect(() => {
        if(shareRiddle.contentFront) {
            setShowPopup(true);
        }
        
    }, [shareRiddle])

    const closePopup = () => {
        setShowPopup(false);
    }

    return (
        <>
            <Random end={8178} onRandomItem={pickRandomRiddle} />
            <Popup showPopup={showPopup} closePopup={closePopup}>
                <ShareContent id={shareRiddle.id} title={shareRiddle.title} contentFront={shareRiddle.contentFront} isRotated={true}/>
            </Popup>

            <h1 className='hidden-heading'>Riddles</h1>
            <div className='search'>
                <label htmlFor='search' className='hidden'>Search</label>
                <input type='text' name='search' placeholder='search' id='search' className='form-control' onChange={handleSearch} />
            </div>

            <InfiniteScroll
                dataLength={riddles.length} //This is important field to render the next data
                next={nextPage}
                hasMore={hasMore}
                loader={<h4 className='loading'>Loading...</h4>}
                endMessage={<h4 className='loading'> {riddles.length !== 0 ? riddles.length === 1 ? "" : "You've got all the fun!" : "No riddles to show!"} </h4>}
            >
                <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 900: 2, 1350: 3 }} >
                    <Masonry gutter='40px'>
                        {riddles && riddles.map((riddle, index) =>
                            <Card id={riddle.id} title={riddle.title === '' ? 'Riddle' : riddle.title} contentFront={riddle.question} contentBack={riddle.answer} isRotated={true} key={index} onShare={openPopup} />
                        )}
                    </Masonry>
                </ResponsiveMasonry>
            </InfiniteScroll>
        </>
    )
}

export default Riddles