import React from 'react';
import { Link } from 'react-router-dom';
import { IoTimeOutline } from 'react-icons/io5';

import './Songs.css';

function Songs({info}) {
  return (
    <div className="songs">
      <div className="songs__header">
        <span>#</span>
        <span>Title</span>
        <span><IoTimeOutline size={20}/></span>
      </div>
      <hr/>
      <div className="songs__tracks">

        {info && info?.tracks?.items?.map((track, i) => (
          <div key={i} className="songs__track">
            <span className="songs__track__count">{i+1}</span>

            <span className="songs__track__title">
              <span>
                {track.name}
                <span>{track.artists.map((artist, j) => <span key={j}>{j !== 0 && ', '}{artist?.id ? <Link to={`/artist/${artist.id}`}>{artist.name}</Link> : artist?.name}</span>)}</span>
              </span>
            </span>
            
            <span className="songs__track__duration">{track.duration_ms/1000 < 60 ? (track.duration_ms/1000 < 10 ? '0:0' + ~~(track.duration_ms/1000) : '0:' + ~~(track.duration_ms/1000)) : parseInt((track.duration_ms/1000)/60) + ':' + ((track.duration_ms/1000)%60 < 10 ? '0' + ~~(track.duration_ms/1000)%60 : ~~(track.duration_ms/1000)%60)}</span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Songs;