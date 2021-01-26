import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useParams } from 'react-router-dom';

import Info from './Info';
import Songs from './Songs';
import Actions from './Actions';
import Header from '../Header.js';

const spotify = new SpotifyWebApi();

function User() {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    spotify.getUser(id).then(user => setInfo(user));
  }, [id]);
  
  return (
    info &&
    <>
      <div id="setUserBg"></div>
      <Header/>
      <Info info={info}/>
      <Actions info={info}/>
      <Songs info={info}/>
    </>
  );
}

export default User;