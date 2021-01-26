import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import { RiMoreLine } from 'react-icons/ri';

import { useDataLayerValue } from '../../Context/DataLayer';

import './Actions.css';

const spotify = new SpotifyWebApi();

function Actions({info}) {

  const [liked, setLiked] = useState(false);
  const [{ user }, ] = useDataLayerValue();

  const like = () => {
    (liked === true && info !== undefined)
      ?
    spotify.unfollowUsers([info.id]).then(setLiked(false))
      :
    spotify.followUsers([info.id]).then(setLiked(true));
  };

  useEffect(() => {
    if (info.id !== undefined && info?.id !== user?.id) spotify.isFollowingUsers([info.id]).then(following => setLiked(following[0]));
  }, [info, user]);

  return (
    <div className="user__actions">
      {(info?.id !== user?.id) &&
      <div className="user__actions__like">
        {liked
          ?
        <button className="user__actions__like__unlike" onClick={() => like(liked)}>FOLLOWING</button>
          :
        <button className="user__actions__like__like" onClick={() => like(liked)}>FOLLOW</button>}
      </div>}
      <div className="user__actions__more">
        <RiMoreLine size={32}/>
      </div>
    </div>
  );
}

export default Actions;