import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { RiMoreLine } from 'react-icons/ri';
import { IoPlaySharp } from 'react-icons/io5';

import { useDataLayerValue } from '../../Context/DataLayer';

import './Actions.css';

const spotify = new SpotifyWebApi();

function Actions({info}) {

  const [liked, setLiked] = useState(false);
  const [{ user }, ] = useDataLayerValue();

  const like = () => {
    (liked === true && info !== undefined)
      ?
    spotify.removeFromMySavedAlbums([info.id]).then(setLiked(false))
      :
    spotify.addToMySavedAlbums([info?.id]).then(setLiked(true));
  };

  useEffect(() => {
    if (info.id !== undefined) spotify.containsMySavedAlbums([info.id]).then(saved => setLiked(saved[0]));
  }, [info]);

  return (
    <div className="album__actions">
      <div
        className="album__actions__play"
        onClick={() => user?.product !== 'premium' ? null : spotify.play({context_uri: info?.uri})}
        style={{cursor: user?.product !== 'premium' ? 'no-drop' : 'default', opacity: user?.product !== 'premium' ? 0.5 : 1}}
      >
        <IoPlaySharp size={28} fill="white"/>
      </div>
      {(info?.owner?.id !== user?.id) &&
      <div className="album__actions__like">
        {liked
          ?
        <FaHeart size={30} className="album__actions__like__unlike" onClick={() => like(liked)}/>
          :
        <FiHeart size={30} className="album__actions__like__like" onClick={() => like(liked)}/>}
      </div>}
      <div className="album__actions__more">
        <RiMoreLine size={32}/>
      </div>
    </div>
  );
}

export default Actions;