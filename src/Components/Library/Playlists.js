import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';

import Header from '../Header';
import HomeCard from '../HomeCard';
import { useDataLayerValue } from '../../Context/DataLayer';

import './Library.css';

const spotify = new SpotifyWebApi();

function Playlists() {

  const [likedSongs, setLikedSongs] = useState({});
  const [{ playlists }, ] = useDataLayerValue();

  useEffect(() => {
    spotify.getMySavedTracks({limit: 10}).then(tracks => setLikedSongs(tracks));
  }, []);

  return (
    <>
      <Header/>
      <div className="detailed__title">
        <h2>Playlists</h2>
      </div>
      <div className="detailed__rows">
        <Link to='/collection/tracks' className="liked__songs">
          <div>
            <div className="liked__songs__tracks">
              <span>
                {Object.keys(likedSongs).length > 0 &&
                likedSongs?.items?.map((song, i) => song.track !== null && <span><span>{song.track.artists[0].name}</span> <span>{song.track.name}</span>{likedSongs.items[i+1] !== undefined &&' • '}</span>)}
                <br/>
              </span>
            </div>
            <div className="liked__songs__info">
              <div className="liked__songs__title">Liked Songs</div>
              <div className="liked__songs__total">{likedSongs?.total?.toLocaleString() || '0'} liked song{likedSongs?.total !== 1 && 's'}</div>
            </div>
          </div>
        </Link>
        {playlists?.items?.map((playlist, i) =>
          <HomeCard key={i} keyy={i} title={playlist?.name} desc={playlist?.description !== '' ? playlist?.description : <span>By <Link to={`/user/${playlist?.owner?.id}`}>{playlist?.owner?.display_name}</Link></span>} image={playlist?.images?.[0]?.url} id={playlist?.id} type='playlist'/>
        )}
      </div>
    </>
  );
}

export default Playlists;