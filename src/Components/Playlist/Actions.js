import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { RiMoreLine } from 'react-icons/ri';
import { IoPlaySharp } from 'react-icons/io5';

import { useDataLayerValue } from '../../Context/DataLayer';

import './Actions.css';

const spotify = new SpotifyWebApi();

function Actions() {

  const [liked, setLiked] = useState(false);
  const [{ user, playlists, current_playlist }, dispatch] = useDataLayerValue();

  const follow = (follow) => {
    if (current_playlist !== null) {
      if (follow) {
        spotify.unfollowPlaylist(current_playlist?.id).then(setLiked(false));
        playlists?.items?.map((playlist, i) => (playlist.id === current_playlist?.id) && playlists?.items?.splice(i, 1)); playlists.total -= 1;
      } else {
        spotify.followPlaylist(current_playlist?.id).then(setLiked(true));
        playlists?.items?.unshift(current_playlist); playlists.total += 1;
      }
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
      });
    }
  };

  useEffect(() => {
    if (user !== null && current_playlist !== null && current_playlist.id !== undefined) spotify.areFollowingPlaylist(current_playlist?.id, [user?.id]).then(following => setLiked(following[0]));
  }, [current_playlist, user]);

  return (
    <div className="playlist__actions">
      <div
        className="playlist__actions__play"
        onClick={() => user?.product !== 'premium' ? null : spotify.play({context_uri: current_playlist?.uri})}
        style={{cursor: user?.product !== 'premium' ? 'no-drop' : 'default', opacity: user?.product !== 'premium' ? 0.5 : 1}}
      >
        <IoPlaySharp size={28} fill="white"/>
      </div>
      {(current_playlist?.owner?.id !== user?.id) &&
      <div className="playlist__actions__like">
        {liked
          ?
        <FaHeart size={30} className="playlist__actions__like__unlike" onClick={() => follow(liked)}/>
          :
        <FiHeart size={30} className="playlist__actions__like__like" onClick={() => follow(liked)}/>}
      </div>}
      <div className="playlist__actions__more">
        <RiMoreLine size={32}/>
      </div>
    </div>
  );
}

export default Actions;