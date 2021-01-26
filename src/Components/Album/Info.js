import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ColorThief from 'colorthief';

import './Info.css';

const colorThief = new ColorThief();

function Info({info}) {

  const [length, setLength] = useState(0);

  const setBgColor = () => {
    const color = colorThief.getColor(document.getElementById('album__info__image'));
    document.querySelector('#setAlbumBg').style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
  }

  useEffect(() => {
    let total = [];
    if (info.id !== undefined) {
      info?.tracks?.items?.map(track => total.push(track.duration_ms));
      setLength(total.reduce((a, b) => a + b));
    }
  }, [info]);

  return (
    <div className="album__info">
      <img id="album__info__image" crossOrigin="" src={info?.images?.[0]?.url} alt="artwork" onLoad={() => setBgColor()}/>
      <div className="album__info__info">
        <h6>{info?.type}</h6>
        <h1>{info?.name}</h1>
        <p>
          <span>{info?.artists?.map((artist, j) => <span key={j}>{j !== 0 && ', '}{artist?.id ? <Link to={`/artist/${artist.id}`}>{artist.name}</Link> : artist?.name}</span>)}</span>
          <span className="album__info__details"> • {info?.release_date?.substring(0,4)} • {info?.tracks?.total.toLocaleString()} song{info?.tracks?.total > 1 && 's'}, {length/1000 < 60 ? (length/1000 < 10 ? '0:0' + ~~(length/1000) : '0:' + ~~(length/1000)) : ((length/1000)/60 < 60 ? (parseInt((length/1000)/60) + ' min ' + ((length/1000)%60 < 10 ? '0' + ~~(length/1000)%60 : ~~(length/1000)%60) + ' sec') : (parseInt((length/1000)/3600)) + ' h ' + parseInt((length/1000)/60 - parseInt((length/1000)/3600)*60) + ' min')}</span>
          {/*length/1000 < 60 ? (length/1000 < 10 ? '0:0' + ~~(length/1000) : '0:' + ~~(length/1000)) : parseInt((length/1000)/60) + ' min ' + ((length/1000)%60 < 10 ? '0' + ~~(length/1000)%60 : ~~(length/1000)%60) + ' sec'*/}
        </p>
      </div>
    </div>
  );
}

export default Info;