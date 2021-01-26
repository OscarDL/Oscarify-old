import React from 'react';
import { IoMdMicrophone } from 'react-icons/io';

import Header from '../Header';
import HomeCard from '../HomeCard';
import { useDataLayerValue } from '../../Context/DataLayer';

function Artists() {

  const [{ artists }, ] = useDataLayerValue();

  return (
    artists?.artists?.items?.length === 0
      ?
    <>
      <Header/>
      <div className="library__emptyCategory">
        <IoMdMicrophone size={72}/>
        <h1>Follow your first artist</h1>
        <p>Follow artists you like by tapping the follow button.</p>
        <button>FIND ARTISTS</button>
      </div>
    </>
      :
    <>
      <Header/>
      <div className="detailed__title">
        <h2>Artists</h2>
      </div>
      <div className="detailed__rows">
        {artists?.artists?.items?.map((artist, i) =>
          <HomeCard key={i} title={artist?.name} desc='Artist' image={artist?.images?.[0]?.url} id={artist?.id} type='artist'/>
        )}
      </div>
    </>
  );
}

export default Artists;