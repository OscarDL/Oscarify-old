import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Body from './Body';
import Footer from './Footer';
import Sidebar from './Sidebar';

import '../Styles/Player.css';

function Player() {
  const history = useHistory();

  useEffect(() => {
    history.push(localStorage.getItem('redirect_url'));
  }, [history]);

  return (
    <div className="player">
      <div className="player__body">
        <Sidebar/>
        <Body/>
      </div>
      <Footer/>
    </div>
  );
}

export default Player;