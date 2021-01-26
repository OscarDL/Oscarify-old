import React from 'react';
import { Link } from 'react-router-dom';
import { RiAlbumLine } from 'react-icons/ri';

import Header from '../Header';
import HomeCard from '../HomeCard';
import { useDataLayerValue } from '../../Context/DataLayer';

function Albums() {

  const [{ albums }, ] = useDataLayerValue();

  return (
    albums?.items?.length === 0
      ?
    <>
      <Header/>
      <div className="library__emptyCategory">
        <RiAlbumLine size={72}/>
        <h1>Follow your first album</h1>
        <p>Save albums by tapping the heart icon.</p>
        <button>FIND ALBUMS</button>
      </div>
    </>
      :
    <>
      <Header/>
      <div className="detailed__title">
        <h2>Albums</h2>
      </div>
      <div className="detailed__rows">
        {albums?.items?.map((album, i) =>
          <HomeCard key={i} title={album?.album?.name} desc={album?.album?.artists?.map((artist, i) => <span key={i}>{i !== 0 && ', '}<Link key={i} to={`/artist/${artist?.id}`}>{artist?.name}</Link></span>)} image={album?.album?.images?.[0]?.url} id={album?.album?.id} type='album'/>
        )}
      </div>
    </>
  );
}

export default Albums;