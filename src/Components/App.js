import React, { useEffect, useCallback } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import Login from './Login';
import Player from './Player';
import { getTokenFromUrl } from '../spotify';
import { useDataLayerValue } from '../Context/DataLayer';

import '../Styles/App.css';

const spotify = new SpotifyWebApi();

function App() {
  
  const [{access_token, devices}, dispatch] = useDataLayerValue();

  const dispatchMainInfo = useCallback(() => {
    spotify.getMe().then(user => {
      dispatch({
        type: 'SET_USER',
        user: user
      });
    });
    
    spotify.getUserPlaylists({limit: 50}).then(playlists => {
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
      });
    });

    spotify.getMyTopArtists({limit: 50}).then(artists => {
      dispatch({
        type: 'SET_TOP_ARTISTS',
        top_artists: artists
      });
    });

    spotify.getMyTopTracks({limit: 50}).then(tracks => {
      dispatch({
        type: 'SET_TOP_TRACKS',
        top_tracks: tracks
      });
    });

    spotify.getMySavedShows({limit: 50}).then(shows => {
      dispatch({
        type: 'SET_PODCASTS',
        podcasts: shows
      });
    });

    spotify.getFollowedArtists({limit: 50}).then(artists => {
      dispatch({
        type: 'SET_ARTISTS',
        artists: artists
      });
    });

    spotify.getMySavedAlbums({limit: 50}).then(albums => {
      dispatch({
        type: 'SET_ALBUMS',
        albums: albums
      });
      albums.total > 15 && spotify.getMySavedAlbums({limit: 50, offset: parseInt(Math.random()*(albums.total - 15))}).then(albumPicks => {
        dispatch({
          type: 'SET_ALBUM_PICKS',
          album_picks: albumPicks
        });
      })
    });
    
    spotify.getMyCurrentPlayingTrack().then(playing => {
      dispatch({
        type: 'SET_PLAYING',
        playing: playing
      });
      dispatch({
        type: 'SET_PROGRESS_MS',
        progress_ms: playing.progress_ms
      });
      playing.is_playing && (document.title = playing.item.name + ' · ' + playing.item.artists.map(artist => ' ' + artist.name));
    });

    spotify.getMyRecentlyPlayedTracks({limit: 50}).then(recents => {
      dispatch({
        type: 'SET_RECENTS',
        recents: recents
      });
    });

    spotify.getMyDevices().then(devices => {
      dispatch({
        type: 'SET_DEVICES',
        devices: devices.devices
      });
    });
  }, [dispatch]);

  useEffect(() => {

    const hash = getTokenFromUrl();

    if(hash.access_token && window.location.href.indexOf("#") > -1) {
      
      dispatch({
        type: 'SET_ACCESS_TOKEN',
        access_token: hash.access_token
      });
      
      dispatch({
        type: 'SET_REFRESH_TOKEN',
        refresh_token: hash.refresh_token
      });

      spotify.setAccessToken(hash.access_token);
      localStorage.setItem('access_token', hash.access_token);
      localStorage.setItem('access_token_date', Date.now());

      dispatchMainInfo();

    } else {

      localStorage.setItem('redirect_url', window.location.pathname);

      if(Date.now() < parseInt(localStorage.getItem('access_token_date')) + 3600000) {

        spotify.setAccessToken(localStorage.getItem('access_token'));

        dispatch({
          type: 'SET_ACCESS_TOKEN',
          access_token: localStorage.getItem('access_token')
        });

        dispatchMainInfo();

      }

    }

  window.history.pushState('', document.title, window.location.pathname + window.location.search);
  }, [dispatch, dispatchMainInfo]);

  return (
    <div className="app">
      {access_token ?
        (devices.length > 0 ?
          <Player/>
            :
          <div className="no_device">
            <h1>Please turn on a device from where Spotify can be played, then refresh the page.</h1>
          </div>
        )
          :
        <Login/>}
    </div>
  );
}

export default App;