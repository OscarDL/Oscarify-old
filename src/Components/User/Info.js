import React, { useEffect, useState } from 'react';
import ColorThief from 'colorthief';
import SpotifyWebApi from 'spotify-web-api-js';

import './Info.css';

const spotify = new SpotifyWebApi();
const colorThief = new ColorThief();

function Info({info}) {

  const [playlists, setPlaylists] = useState([]);

  const setUserBg = () => {
    const color = colorThief.getColor(document.getElementById('user__info__image'));
    document.querySelector('#setUserBg').style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
  }

  useEffect(() => {
    if (info.id !== undefined){
      spotify.getUserPlaylists(info.id, {limit: 50}).then(playlists => setPlaylists(playlists));
    }
  }, [info])

  return (
    <div className="user__info">
      <img id="user__info__image" crossOrigin="" src={info?.images?.[0]?.url} alt="artwork" onLoad={() => setUserBg()}/>
      <div className="user__info__info">
        <h6>PROFILE</h6>
        <h1>{info?.display_name}</h1>
        {playlists.total !== undefined && <p><span>{playlists.total.toLocaleString() + ' public playlists'} • {info?.followers?.total?.toLocaleString() +' followers'}</span></p>}
      </div>
    </div>
  );
}

export default Info;