import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

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
    spotify.unfollowArtists([info.id]).then(setLiked(false))
      :
    spotify.followArtists([info.id]).then(setLiked(true));
  };

  useEffect(() => {
    if (info.id !== undefined) spotify.isFollowingArtists([info.id]).then(following => setLiked(following[0]));
  }, [info]);

  return (
    <div className="artist__actions">
      <div
        className="artist__actions__play"
        onClick={() => user?.product !== 'premium' ? null : spotify.play({context_uri: info?.uri})}
        style={{cursor: user?.product !== 'premium' ? 'no-drop' : 'default', opacity: user?.product !== 'premium' ? 0.5 : 1}}
      >
        <IoPlaySharp size={32} fill="white"/>
      </div>
      {(info?.owner?.id !== user?.id) &&
      <div className="artist__actions__like">
        {liked
          ?
        <button className="artist__actions__like__unlike" onClick={() => like(liked)}>FOLLOWING</button>
          :
        <button className="artist__actions__like__like" onClick={() => like(liked)}>FOLLOW</button>}
      </div>}
      <div className="artist__actions__more">
        <RiMoreLine size={32}/>
      </div>
    </div>
  );
}

export default Actions;