import React from 'react';
import { Link } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js';

import { IoTimeOutline } from 'react-icons/io5';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

import logo from '../../Images/LocalFiles.png';
import { useDataLayerValue } from '../../Context/DataLayer';

import './Songs.css';

const spotify = new SpotifyWebApi();

function Songs() {

  const now = Date.now();
  const [{ current_playlist, user }, dispatch] = useDataLayerValue();
  
  function isoToDate(date) {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return (now - Date.parse(date) < 2592000000)
      ?
    (now - Date.parse(date))/86400000 > 1 ? parseInt((now - Date.parse(date))/86400000) + (parseInt((now - Date.parse(date))/86400000) > 1 ? ' days ago' : ' day ago') : (parseInt((now - Date.parse(date))/3600000) > 1 ? parseInt((now - Date.parse(date))/3600000) + (parseInt((now - Date.parse(date))/3600000) > 1 ? ' hours ago' : ' hour ago') : (parseInt((now - Date.parse(date))/60000) > 1 ? parseInt((now - Date.parse(date))/60000) + (parseInt((now - Date.parse(date))/60000) > 1 ? ' minutes ago' : ' minute ago') : parseInt((now - Date.parse(date))/1000) + (parseInt((now - Date.parse(date))/1000) > 1 ? ' seconds ago' : ' second ago')))
      :
    date.replace(
      /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z/,
      ($0,$1,$2,$3,$4,$5,$6) => months[$2-1]+" "+$3+", "+$1
    );
  } // x ... ago NOT WORKING ???

  function remove(track, index) {
    spotify.removeTracksFromPlaylist(current_playlist.id, [{"uri": track.uri, "positions": [index]}]).then(_ => {
      current_playlist?.tracks?.items?.splice(index, 1); current_playlist.tracks.total -= 1;
      dispatch({
        type: 'SET_CURRENT_PLAYLIST',
        current_playlist: current_playlist
      });
    });
  }

  return (
    //liked_songs === info &&
    <div className="playlist__songs">
      <div className="playlist__songs__header">
        <span>#</span>
        <span>Title</span>
        <span>Album</span>
        <span>Date added</span>
        <span><IoTimeOutline size={20}/></span>
      </div>
      <hr/>
      <div className="playlist__songs__tracks">

        {current_playlist?.tracks?.items?.map((track, i) => (
          track.track !== null &&
          <div key={i} className="playlist__songs__track">
            <span className="playlist__songs__track__count">{i+1}</span>

            <span className="playlist__songs__track__title">
              <img src={track.track.album.images[1] !== undefined ? track.track.album.images[1].url : logo} alt="artwork"/>
              <span>
                <span>{track.track.name}</span>
                <span>{track.track.artists.map((artist, j) => <span key={j}>{j !== 0 && ', '}{artist?.id ? <Link to={`/artist/${artist.id}`}>{artist.name}</Link> : artist?.name}</span>)}</span>
              </span>
            </span>

            <span className="playlist__songs__track__album">{track.track.album?.id ? <Link to={`/album/${track.track.album.id}`}>{track.track.album.name}</Link> : track.track.album?.name}</span>

            <span className="playlist__songs__track__added">{Date.parse(track.added_at) > 0 && isoToDate(track.added_at)}</span>
            
            <span className="playlist__songs__track__duration">
              {current_playlist?.owner?.id === user?.id && <IoIosRemoveCircleOutline size={17} onClick={() => remove(track.track, i)} title='Remove'/>}
              <span>{track.track.duration_ms/1000 < 60 ? (track.track.duration_ms/1000 < 10 ? '0:0' + ~~(track.track.duration_ms/1000) : '0:' + ~~(track.track.duration_ms/1000)) : parseInt((track.track.duration_ms/1000)/60) + ':' + ((track.track.duration_ms/1000)%60 < 10 ? '0' + ~~(track.track.duration_ms/1000)%60 : ~~(track.track.duration_ms/1000)%60)}</span>
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Songs;