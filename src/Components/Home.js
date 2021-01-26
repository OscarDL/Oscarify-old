import React from 'react';

import HomeRow from './HomeRow';

import '../Styles/Home.css';

function Home() {

  return (
    <div className="home">
      <HomeRow rowType="Recently played" type="recents"/>
      <HomeRow rowType="Your playlists" type="playlists"/>
      <HomeRow rowType="Album picks" type="album-picks"/>
      <HomeRow rowType="Your favorite artists" type="top-artists"/>
      <HomeRow rowType="Your favorite albums and songs" type="top-tracks"/>
    </div>
  )
}

export default Home