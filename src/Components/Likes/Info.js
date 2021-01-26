import React from 'react';
import ColorThief from 'colorthief';
import { Link } from 'react-router-dom';

import { useDataLayerValue } from '../../Context/DataLayer';

import './Info.css';

const colorThief = new ColorThief();

function Info() {

  const [{ user, current_playlist }, ] = useDataLayerValue();

  const setBgColor = () => {
    const color = colorThief.getColor(document.getElementById('likes__info__image'));
    document.querySelector('#setLikesBg').style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
  }

  return (
    current_playlist !== null &&
    <div className="likes__info">
      <img id="likes__info__image" crossOrigin="" src='https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png' alt="artwork" onLoad={() => setBgColor()}/>
      <div className="likes__info__info">
        <h6>PLAYLIST</h6>
        <h1>Liked Songs</h1>
        <p>
          <Link to={`/user/${user?.id}`}>{user?.display_name}</Link>
          <span> • {current_playlist?.total?.toLocaleString() || '0'} song{current_playlist?.total !== 1 && 's'}</span>
        </p>
      </div>
    </div>
  );
}

export default Info;