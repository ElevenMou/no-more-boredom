import React, { useEffect, useState } from 'react'
import { getJokes, getJokeById } from '../utils/fetchData'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Card from '../component/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Random from '../component/Random';
import Popup from '../component/Popup';
import ShareContent from '../component/ShareContent';

const Jokes = () => {
    const [jokes, setJokes] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [shareJoke, setShareJoke] = useState({id: 0, title: "",contentFront: "", contentBack: "", isRotated: false});

    

    /************************* Initialize **************************/
    useEffect(() => {
        const fetchJokes = async () => {
            const jokesData = await getJokes(1, '');
            setJokes(jokesData);
        }
        fetchJokes();
    }, []);

    /************************* Search **************************/
    useEffect(() => {
        const fetchJokes = async () => {
            if (search.length > 5) {
                const jokesData = await getJokes(1, search);
                if (jokesData.length < 30) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
                setJokes(jokesData);
            }
        }
        fetchJokes();
    }, [search])

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    /************************* Infinite scroll **************************/
    const nextPage = () => {
        setPage(prev => prev + 1);
    }

    useEffect(() => {
        const fetchJokes = async () => {
            const jokesData = await getJokes(page, search);
            if (jokesData.length < 30) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
            setJokes((prev) => [...prev, ...jokesData]);
        }
        fetchJokes();
    }, [page])

    /************************* Random pick **************************/
    const pickRandomJoke = async (id) => {
        const jokeData = await getJokeById(id);
        await setJokes([jokeData]);
        setHasMore(false);
    }

    /************************* Popup share **************************/
    const togglePopup = (id, title, contentFront) => {
        setShareJoke({id: id, title: title, contentFront: contentFront, contentBack: "", isRotated: false});
        setShowPopup(prev => !prev);
    }


    return (
        <>
            <Random end={1536} onRandomItem={pickRandomJoke} />
            <Popup showPopup={showPopup} closePopup={togglePopup}>
                <ShareContent id={shareJoke.id} title={shareJoke.title} contentFront={shareJoke.contentFront} />
            </Popup>

            <h1 className='hidden-heading'>Jokes</h1>
            <div className='search'>
                <label htmlFor='search' className='hidden'>Search</label>
                <input type='text' name='search' placeholder='search' id='search' className='form-control' onChange={handleSearch} />
            </div>
            <InfiniteScroll
                dataLength={jokes.length} //This is important field to render the next data
                next={nextPage}
                hasMore={hasMore}
                loader={<h4 className='loading'>Loading...</h4>}
                endMessage={<h4 className='loading'> {jokes.length !== 0 ? jokes.length === 1 ? "" : "You've got all the fun!" : "No jokes to show!"} </h4>}
            >
                <ResponsiveMasonry columnsCountBreakPoints={{ 400: 1, 900: 2, 1350: 3 }} >
                    <Masonry gutter='40px'>
                        {jokes && jokes.map((joke, index) =>
                            <Card id={joke.id} title='Joke' contentFront={joke.joke} key={index} isRotated={false} onShare={togglePopup} />
                        )}
                    </Masonry>
                </ResponsiveMasonry>
            </InfiniteScroll>
        </>

    )
}

export default Jokes