import React from 'react';
import { FaPodcast } from 'react-icons/fa';

import Header from '../Header';
import HomeCard from '../HomeCard';
import { useDataLayerValue } from '../../Context/DataLayer';

function Podcasts() {

  const [{ podcasts }, ] = useDataLayerValue();

  return (
    podcasts?.items?.length === 0
      ?
    <>
      <Header/>
      <div className="library__emptyCategory">
        <FaPodcast size={72}/>
        <h1>Follow your first podcast</h1>
        <p>Follow podcasts you like by tapping the follow button.</p>
        <button>FIND PODCASTS</button>
      </div>
    </>
      :
    <>
      <Header/>
      <div className="detailed__title">
        <h2>Podcasts</h2>
      </div>
      <div className="detailed__rows">
        {podcasts?.items?.map((podcast, i) =>
          <HomeCard key={i} title={podcast?.show?.name} desc={podcast?.show?.publisher} image={podcast?.show?.images?.[0]?.url} id={podcast?.show?.id} type='show'/>
        )}
      </div>
    </>
  );
}

export default Podcasts;