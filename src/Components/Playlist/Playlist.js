import React, { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useParams } from 'react-router-dom';

import Info from './Info';
import Songs from './Songs';
import Actions from './Actions';
import Header from '../Header.js';
import { useDataLayerValue } from '../../Context/DataLayer';

const spotify = new SpotifyWebApi();

function Playlist() {
  const { id } = useParams();
  const [, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getPlaylist(id).then(playlist => {
      dispatch({
        type: 'SET_CURRENT_PLAYLIST',
        current_playlist: playlist
      });
    });
  }, [id, dispatch]);
  
  return (
    <>
      <div id="setPlaylistBg"></div>
      <Header/>
      <Info/>
      <Actions/>
      <Songs/>
    </>
  );
}

export default Playlist;