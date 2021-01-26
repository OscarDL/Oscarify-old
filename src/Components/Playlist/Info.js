import React from 'react';
import ColorThief from 'colorthief';
import { Link } from 'react-router-dom';

import noArt from '../../Images/NoArt.png';
import { useDataLayerValue } from '../../Context/DataLayer';

import './Info.css';

const colorThief = new ColorThief();

function Info() {

  const [{ current_playlist }, ] = useDataLayerValue();

  const setBgColor = () => {
    const color = colorThief.getColor(document.getElementById('playlist__info__image'));
    document.querySelector('#setPlaylistBg').style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
  }

  return (
    <div className="playlist__info">
      <img id="playlist__info__image" crossOrigin="" src={current_playlist?.images?.[0]?.url || noArt} alt="artwork" onLoad={() => setBgColor()}/>
      <div className="playlist__info__info">
        <h6>{current_playlist?.type}</h6>
        <h1>{current_playlist?.name}</h1>
        <p><span>{current_playlist?.description}</span></p>
        <p>
          <Link to={`/user/${current_playlist?.owner?.id}`}>{current_playlist?.owner?.display_name}</Link>
          {current_playlist?.owner?.display_name &&
          <span> • {current_playlist?.followers?.total.toLocaleString() || '0'} like{current_playlist?.followers?.total !== 1 && 's'} • {current_playlist?.tracks?.total.toLocaleString() || '0'} song{current_playlist?.tracks?.total !== 1 && 's'}</span>}
        </p>
      </div>
    </div>
  );
}

export default Info;