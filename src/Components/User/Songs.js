import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import HomeCard from '../HomeCard';

import './Songs.css';

const spotify = new SpotifyWebApi();

function Songs({info}) {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (info.id !== undefined) spotify.getUserPlaylists(info.id, {limit: 50}).then(playlists => setPlaylists(playlists));
  }, [info]);

  return (
    <>
      <div className="user__playlists">
        <h2>Public Playlists</h2>
      </div>
      <div className="homerow">
        {playlists.items !== undefined && playlists?.items?.map((playlist, i) =>
          playlist?.public &&
          <HomeCard key={i} title={playlist?.name} desc={playlist?.description !== '' ? playlist?.description : playlist?.tracks?.total.toLocaleString() + ' tracks'} image={playlist?.images?.[0]?.url} id={playlist?.id} type='playlist'/>
        )}
      </div>
    </>
  );
}

export default Songs;