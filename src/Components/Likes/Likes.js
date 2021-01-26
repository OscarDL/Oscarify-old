import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import Info from './Info';
import Songs from './Songs';
import Actions from './Actions';
import Header from '../Header.js';
import { useDataLayerValue } from '../../Context/DataLayer';

const spotify = new SpotifyWebApi();

function Likes() {
  const [, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMySavedTracks({limit: 50}).then(tracks => {
      dispatch({
        type: 'SET_CURRENT_PLAYLIST',
        current_playlist: tracks
      });
    });
  }, [dispatch]);
  
  return (
    <>
      <div id="setLikesBg"></div>
      <Header/>
      <Info/>
      <Actions/>
      <Songs/>
    </>
  );
}

export default Likes;