import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';

import { IoPlayCircleOutline, IoPauseCircleOutline, IoPlaySkipForwardSharp, IoPlaySkipBackSharp, IoVolumeMediumOutline } from "react-icons/io5";
import { BsShuffle, BsVolumeMute } from 'react-icons/bs';
import { FiRepeat, FiHeart } from 'react-icons/fi';
//import { RiPlayList2Fill } from 'react-icons/ri';
import { MdDevicesOther } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';

import { useDataLayerValue } from '../Context/DataLayer';
import logo from '../Images/LocalFiles.png';
import Devices from './Devices';

import '../Styles/Footer.css';

let previousVolume = null;
const spotify = new SpotifyWebApi();

const getNewSong = (playing, dispatch, setTime, setLiked, setIsPlaying) => {

  let interval = setInterval(() => {
    spotify.getMyCurrentPlayingTrack().then(newPlaying => {
      
      if(newPlaying !== null && newPlaying !== undefined && newPlaying.item !== null && newPlaying.item !== undefined) {
        
        setIsPlaying(newPlaying.is_playing);

        if(newPlaying.item.name === (playing.item !== undefined ? playing.item.name : playing.items[0].track.name)) {
          if (newPlaying.progress_ms < playing.item.duration_ms) {
            clearInterval(interval);
            setTime(newPlaying.progress_ms);
          }
        } else {
          dispatch({
            type: 'SET_PLAYING',
            playing: newPlaying
          });
          dispatch({
            type: 'SET_PROGRESS_MS',
            progress_ms: newPlaying.progress_ms
          });
          clearInterval(interval);
          setTime(newPlaying.progress_ms);
          newPlaying.is_playing === false && setIsPlaying(false); // if user plays multiple songs with no autoplay
          !newPlaying.item.is_local && spotify.containsMySavedTracks([newPlaying.item.id]).then(liked => setLiked(liked[0]));
          spotify.getMyRecentlyPlayedTracks({limit: 50}).then(recents => { dispatch({ type: 'SET_RECENTS', recents: recents }) });
          playing.is_playing && (document.title = newPlaying.item.name + ' ·' + newPlaying.item.artists.map(artist => ' ' + artist.name));
        }

      }
    });
  }, 500);

}

function Clock({user, count, playing, setTime, setLiked, dispatch, is_playing, setIsPlaying, total}) {

  useEffect(() => {
    if (is_playing && count < total) {
      const timer = setInterval(() => setTime((count) => count + 1000), 1000);
      return () => clearInterval(timer);
    }
  }, [is_playing, setTime, count, total]);

  useEffect(() => {

    if (count >= total - 500) {
      setTime(0);
      getNewSong(playing, dispatch, setTime, setLiked, setIsPlaying);
    }

  }, [count, total, playing, dispatch, setTime, setLiked, setIsPlaying])

  return (
    <>
      <span className="footer__seekbar__text">
        {count/1000 < 60 ? (count/1000 < 10 ? '0:0' + ~~(count/1000) : '0:' + ~~(count/1000)) : parseInt((count/1000)/60) + ':' + ((count/1000)%60 < 10 ? '0' + ~~(count/1000)%60 : ~~(count/1000)%60)}
      </span>
      <span style={{display: 'none'}} id="current">{count}</span>
      {user?.product === 'premium'
        ?
      <input className="footer__seekbar__bar" type="range" min="0" max={total} value={count}
        onChange={(e) => setTime(Number(e.target.value))} onMouseUp={() => spotify.seek(count)}/>
        :
      <input className="footer__seekbar__bar" type="range" min="0" max={total} value={count} readOnly/>}
    </>
  );

}

function Footer() {

  const [time, setTime] = useState(0);
  const [device, setDevice] = useState(0);
  const [liked, setLiked] = useState(false);
  const [repeat, setRepeat] = useState('off');
  const [shuffle, setShuffle] = useState(false);
  const [volumeInfo, setVolumeInfo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [{playing, devices, recents, user/*, refresh_token*/}, dispatch] = useDataLayerValue();

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then(playback => {

      let generalDevices = [];
      devices.map(device => (device.type === 'Computer' || device.type === 'Smartphone' || device.type === 'Tablet') && generalDevices.push(device));
      
      if(Object.keys(playback).length > 0) {

        setTime(playback.progress_ms);
        setDevice(playback.device.id);
        setRepeat(playback.repeat_state);
        setIsPlaying(playback.is_playing);
        setShuffle(playback.shuffle_state);
        setVolumeInfo(playback.device.volume_percent);
        playback.item.is_local === false && spotify.containsMySavedTracks([playback.item.id]).then(liked => setLiked(liked[0]));

      } else if (devices.length === 1) { // REDO DIFFERENTLY LATER

        setTime(0);
        setRepeat('off');
        setShuffle(false);
        setIsPlaying(false);
        setDevice(devices[0].id);
        setVolumeInfo(devices[0].volume_percent);

      } else {

        if(generalDevices.length > 0) {
          setDevice(generalDevices[0].id);
          setVolumeInfo(generalDevices[0].volume_percent);
        } else {
          setVolumeInfo(100);
        }

        setTime(0);
        setRepeat('off');
        setShuffle(false);
        setIsPlaying(false);
      }

    });
  }, [devices]);

  function seek(position) {
    setTime(position*1000);
    spotify.seek(position);
  }

  function handleRepeat(state) {
    const stateToSet = (state === 'off' && 'context') || (state === 'context' && 'track') || (state === 'track' && 'off');
    document.getElementById('repeat').style.color = (state === 'off' && '#1ed760') || (state === 'context' && '#1e7dce') || (state === 'track' && 'white');
    spotify.setRepeat(stateToSet).then(setRepeat(stateToSet));
  }

  function handleShuffle() {
    document.getElementById('shuffle').style.color = shuffle ? 'white' : '#1ed760';
    spotify.setShuffle({state: !shuffle}).then(setShuffle(!shuffle));
  }
  
  function handlePlayback() {
    isPlaying
      ?
    spotify.pause({device_id: device}).catch(err => console.log(JSON.parse(err.response).error.message))
      :
    spotify.play({device_id: device}).catch(err => console.log(JSON.parse(err.response).error.message));

    if (user.product === 'premium') {
      document.getElementById(isPlaying ? 'play' : 'pause').style.display = 'flex';
      document.getElementById(isPlaying ? 'pause' : 'play').style.display = 'none';

      setIsPlaying((isPlaying) => !isPlaying);
      dispatch({
        type: 'SET_IS_PLAYING',
        is_playing: !isPlaying
      });

      dispatch({
        type: "SET_PROGRESS_MS",
        progress_ms: time
      });
    }
  }

  function mute() {
    if (volumeInfo !== 0) {
      document.getElementById('unmute').style.display = 'none';
      document.getElementById('mute').style.display = 'flex';
      previousVolume = volumeInfo;
      spotify.setVolume(0);
      setVolumeInfo(0);
    } else {
      document.getElementById('unmute').style.display = 'flex';
      document.getElementById('mute').style.display = 'none';
      spotify.setVolume(previousVolume);
      setVolumeInfo(previousVolume);
    }
  }

  function changeSong(type) {
    
    if (type === 'skip') {
      spotify.skipToNext();
    } else {
      if (time > 5000) {
        return(seek(0));
      } else {
        spotify.skipToPrevious();
      }
    }

    getNewSong(playing, dispatch, setTime, setLiked, setIsPlaying);

  }

  function refreshDevices() {
    spotify.getMyDevices().then(devices => {
      dispatch({
        type: 'SET_DEVICES',
        devices: devices.devices
      });
    });

    document.getElementById('devices').style.display = 'flex';

    window.onclick = e => {
      let target = e.target;
      if (target.id !== 'devices' && target.class !== 'device' && target.id !== 'devices__btn' && target !== document.querySelector('#devices__btn > path')) {
        document.getElementById('devices').style.display = 'none';
      }
    }
  }

  return (
    <div className="footer">
      <div className="footer__info">
        <div className="footer__artwork">
          {playing
          ?
            (!playing?.item?.is_local
              ?
            <Link to={playing?.context?.type ? `/${playing?.context?.type}/${playing?.context?.uri?.slice(playing?.context?.uri?.lastIndexOf(':') + 1)}` : `/album/${playing?.item?.album?.id}`}><img src={playing?.item?.album?.images?.[1]?.url || logo} alt="current-artwork"/></Link>
              :
            <span><img src={logo} alt="current-artwork"/></span>)
          :
            (!recents?.items?.[0]?.is_local
              ?
            <Link to={recents?.items?.[0]?.context?.type ? `/${recents?.items?.[0]?.context?.type}/${recents?.items?.[0]?.context?.uri?.slice(recents?.items?.[0]?.context?.uri?.lastIndexOf(':') + 1)}` : `/album/${recents?.items?.[0]?.album?.id}`}><img src={recents?.items?.[0]?.track?.album?.images?.[1]?.url || logo} alt="current-artwork"/></Link>
              :
            <span><img src={logo} alt="current-artwork"/></span>)
          }
        </div>
        <div className="footer__current">
          {playing ?
            <>
              {!playing?.item?.is_local
                ?
              <Link to={`/album/${playing?.item?.album?.id}`} className="footer__current__song">
                {playing?.item?.name}
              </Link>
                :
              <span className="footer__current__song">{playing.item.name}</span>}
              <div className="footer__current__artists">
                {playing?.item?.artists?.map((artist, i) => <span key={i} className="footer__current__artist">{i !== 0 && ', '}{artist?.id !== null ? <Link to={artist?.id !== null && `/artist/${artist?.id}`}>{artist.name}</Link> : <span>{artist?.name}</span>}</span>)}
              </div>
            </>
          :
            <>
              {!recents?.items?.[0]?.is_local
                ?
              <Link to={`/album/${recents?.items?.[0]?.track?.album?.id}`} className="footer__current__song">
                {recents?.items?.[0]?.track.name}
              </Link>
                :
              <span className="footer__current__song">{recents?.items?.[0]?.track?.name}</span>}
              <div className="footer__current__artists">
                {recents?.items?.[0]?.track?.artists?.map((artist, i) => <span key={i} className="footer__current__artist">{i !== 0 && ', '}{artist?.id !== null ? <Link to={artist?.id !== null && `/artist/${artist?.id}`}>{artist.name}</Link> : <span>{artist?.name}</span>}</span>)}
              </div>
            </>
          }
        </div>
        {(playing ? playing?.item?.is_local === false : recents?.items?.[0]?.track?.is_local === false) &&
        <div className="footer__like">
          {liked === true
            ?
          <FaHeart id="footer__like__full" size={15} onClick={() => {spotify.removeFromMySavedTracks([playing?.item?.id || recents?.items?.[0]?.track?.id]); return(setLiked(false))}}/>
            :
          <FiHeart id="footer__like__empty" onClick={() => {spotify.addToMySavedTracks([playing?.item?.id || recents?.items?.[0]?.track?.id]); return(setLiked(true))}}/>}
        </div>}
      </div>

      <div className="footer__controls__seekbar">
        {user?.product === 'premium'
          ?
        <div className="footer__controls">
          <BsShuffle size={15} id='shuffle' style={{color: shuffle ? '#1ed760' : 'white'}} onClick={() => handleShuffle()}/>
          <IoPlaySkipBackSharp size={15} onClick={() => changeSong('previous')}/>
          <IoPauseCircleOutline size={40} id='pause' onClick={() => handlePlayback()} style={{display: isPlaying ? 'flex' : 'none'}}/>
          <IoPlayCircleOutline size={40} id='play' onClick={() => handlePlayback()} style={{display: isPlaying ? 'none' : 'flex'}}/>
          <IoPlaySkipForwardSharp size={15} onClick={() => changeSong('skip')}/>
          <FiRepeat size={15} id='repeat' style={{color: (repeat === 'off' && 'white') || (repeat === 'context' && '#1ed760') || (repeat === 'track' && '#4cc4ff')}} onClick={() => handleRepeat(repeat)}/>
        </div>
          :
        <div className="footer__controls restricted">
          <BsShuffle size={15} id='shuffle' style={{color: shuffle ? '#1ed760' : 'white'}}/>
          <IoPlaySkipBackSharp size={15}/>
          <IoPauseCircleOutline size={40} id='pause' style={{display: isPlaying ? 'flex' : 'none'}}/>
          <div className="premium__required">Unfortunately, only Spotify Premium subscribers can use remote media controls.</div>
          <IoPlayCircleOutline size={40} id='play' style={{display: isPlaying ? 'none' : 'flex'}}/>
          <IoPlaySkipForwardSharp size={15}/>
          <FiRepeat size={15} id='repeat' style={{color: (repeat === 'off' && 'white') || (repeat === 'context' && '#1ed760') || (repeat === 'track' && '#4cc4ff')}}/>
        </div>}
        <div className="footer__seekbar">
          {playing?.progress_ms
            ? <>
          <Clock
            user={user}
            count={time}
            playing={playing}
            setTime={setTime}
            setLiked={setLiked}
            dispatch={dispatch}
            is_playing={isPlaying}
            setIsPlaying={setIsPlaying}
            total={playing?.item?.duration_ms}
          />
          <span className="footer__seekbar__text">
            {playing?.item?.duration_ms && (playing?.item?.duration_ms/1000 < 60 ? (playing?.item?.duration_ms/1000 < 10 ? '0:0' + ~~(playing?.item?.duration_ms/1000) : '0:' + ~~(playing?.item?.duration_ms/1000)) : parseInt((playing?.item?.duration_ms/1000)/60) + ':' + ((playing?.item?.duration_ms/1000)%60 < 10 ? '0' + ~~(playing?.item?.duration_ms/1000)%60 : ~~(playing?.item?.duration_ms/1000)%60))}
          </span> </>
            : <>
          <Clock
            user={user}
            count={time}
            playing={recents}
            setTime={setTime}
            setLiked={setLiked}
            dispatch={dispatch}
            is_playing={isPlaying}
            setIsPlaying={setIsPlaying}
            total={recents?.items?.[0]?.track?.duration_ms}
          />
          <span className="footer__seekbar__text">
            {recents?.items?.[0]?.track?.duration_ms && (recents?.items?.[0]?.track?.duration_ms/1000 < 60 ? (recents?.items?.[0]?.track?.duration_ms/1000 < 10 ? '0:0' + ~~(recents?.items?.[0]?.track?.duration_ms/1000) : '0:' + ~~(recents?.items?.[0]?.track?.duration_ms/1000)) : parseInt((recents?.items?.[0]?.track?.duration_ms/1000)/60) + ':' + ((recents?.items?.[0]?.track?.duration_ms/1000)%60 < 10 ? '0' + ~~(recents?.items?.[0]?.track?.duration_ms/1000)%60 : ~~(recents?.items?.[0]?.track?.duration_ms/1000)%60))}
          </span> </>}
        </div>
      </div>

      <div className="footer__queue__volume">
        <div className="footer__queue">
          {/*<RiPlayList2Fill size={18}/>*/}
          <MdDevicesOther size={18} id="devices__btn" onClick={() => refreshDevices()}/>
          <Devices devices={devices !== null && devices} deviceID={device} is_local={playing?.item?.is_local} product={user?.product}/>
        </div>
        {user?.product === 'premium'
          ?
        <div className="footer__volume">
          <IoVolumeMediumOutline id="unmute" size={20} style={{display: volumeInfo !== 0 ? 'flex' : 'none'}} onClick={() => mute()}/>
          <BsVolumeMute id="mute" size={22} style={{display: volumeInfo === 0 ? 'flex' : 'none', margin: '0 5px 0 7px'}} onClick={() => mute()}/>
          <input className="footer__volume__slider" type="range" min="0" max="100" step="1" value={volumeInfo}
            onChange={(e) => setVolumeInfo(e.target.value)} onMouseUp={() => spotify.setVolume(volumeInfo)}/>
        </div>
          :
        <div className="footer__volume restricted">
          <IoVolumeMediumOutline id="unmute" size={20} style={{display: volumeInfo !== 0 ? 'flex' : 'none'}}/>
          <BsVolumeMute id="mute" size={22} style={{display: volumeInfo === 0 ? 'flex' : 'none', margin: '0 5px 0 7px'}}/>
          <input className="footer__volume__slider" type="range" min="0" max="100" step="1" value={volumeInfo} readOnly/>
          <div className="premium__required">Unfortunately, only Spotify Premium subscribers can remotely change volume.</div>
      </div>}
    </div>
  </div>)
}

export default Footer