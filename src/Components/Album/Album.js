import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';

import Info from './Info';
import Songs from './Songs';
import Actions from './Actions';
import Header from '../Header.js';

const spotify = new SpotifyWebApi();

function Album() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    spotify.getAlbum(id).then(album => setInfo(album));
  }, [id]);
  
  return (
    info &&
    <>
      <div id="setAlbumBg"></div>
      <Header/>
      <Info info={info}/>
      <Actions info={info}/>
      <Songs info={info}/>
    </>
  );
}

export default Album;