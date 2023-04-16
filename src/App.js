import './App.css';

import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jokes from "./pages/Jokes";
import Riddles from "./pages/Riddles";
import Joke from './pages/Joke';
import Riddle from './pages/Riddle';
import SocialLinks from './component/SocialLinks';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';


function App() {
  const TRACKING_ID = "G-H6GCSCEMMF";

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, [])
  

  return (
    <div className="app">
      <Header />
      <main className='app-main'>
        <SocialLinks />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jokes' element={<Jokes />} />
          <Route path='/jokes/:jokeID' element={<Joke />} />
          <Route path='/jokes/:jokeID/:isAdmin' element={<Joke />} />
          <Route path='/riddles' element={<Riddles />} />
          <Route path='/riddles/:riddleID' element={<Riddle />} />
          <Route path='/riddles/:riddleID/:isAdmin' element={<Riddle />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
