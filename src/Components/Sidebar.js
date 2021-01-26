import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link, useHistory } from 'react-router-dom';

import { VscLibrary } from "react-icons/vsc";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";

import SidebarOption from './SidebarOption';
import { useDataLayerValue } from '../Context/DataLayer';

import '../Styles/Sidebar.css';

const spotify = new SpotifyWebApi();

function Sidebar() {

  const history = useHistory();
  const [{playlists, user}, dispatch] = useDataLayerValue();

  const createPlaylist = () => {
    user.id !== undefined && spotify.createPlaylist(user.id, {name: 'New Playlist'}).then(playlist => {

      history.push(`/playlist/${playlist.id}`);
      playlists?.items?.unshift(playlist);
      playlists.total += 1;
      dispatch({
        type: 'SET_PLAYLISTS',
        playlists: playlists
      });

    });
  };

  return (
    <div className="sidebar">
      <br/>
      <MainNav/>
      <br/>

      <span className="playlists__title"><strong>PLAYLISTS</strong></span>
      <div id="create__playlist" onClick={() => createPlaylist()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="playlists__svg" shapeRendering="crispEdges">
          <path d="m28 20h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z"/>
        </svg>
        <span className="sidebar__text">Create Playlist</span>
      </div>
      <Link className="sidebarOption__link" to={'/collection/tracks'}>
        <div id="liked__songs">
          <svg viewBox="0 0 24 24" className="playlists__svg">
            <path fill="none" d="M4 4h16v16H4z"></path>
            <path fill="white" d="M17.797 6.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"></path>
          </svg>
          <span className="sidebar__text">Liked Songs</span>
        </div>
      </Link>

      <hr/>

      <div className="all__playlists">
        {playlists?.items?.map((playlist, i) => (
          <SidebarOption key={i} id={playlist.id} title={playlist.name} type='playlist' Icon=''/>
        ))}
      </div>
    </div>
  )
}

function MainNav() {
  return (
  <>
    <Link
      to='/'
      id='MainNavHome'
      className='sidebarOption'
      onClick={() => {
        document.getElementById('MainNavHome').style.opacity = 1;
        document.getElementById('MainNavHome').style.backgroundColor = '#282828';
        document.getElementById('MainNavSearch').style.opacity = 0.75;
        document.getElementById('MainNavSearch').style.backgroundColor = 'transparent';
        document.getElementById('MainNavLibrary').style.opacity = 0.75;
        document.getElementById('MainNavLibrary').style.backgroundColor = 'transparent';
      }}
      style={{
        backgroundColor: window.location.pathname === '/' ? '#282828' : 'transparent',
        opacity: window.location.pathname === '/' ? 1 : 0.7
      }}
    >
      <span className="sidebarOption__link">
        <IoHomeOutline className="sidebarOption__icon" size="24px"/>
        Home
      </span>
    </Link>
    <Link
      to='/search'
      id='MainNavSearch'
      className='sidebarOption'
      onClick={() => {
        document.getElementById('MainNavHome').style.opacity = 0.75;
        document.getElementById('MainNavHome').style.backgroundColor = 'transparent';
        document.getElementById('MainNavSearch').style.opacity = 1;
        document.getElementById('MainNavSearch').style.backgroundColor = '#282828';
        document.getElementById('MainNavLibrary').style.opacity = 0.75;
        document.getElementById('MainNavLibrary').style.backgroundColor = 'transparent';
      }}
      style={{
        backgroundColor: window.location.pathname === '/search' ? '#282828' : 'transparent',
        opacity: window.location.pathname === '/search' ? 1 : 0.7
      }}
    >
      <span className="sidebarOption__link">
        <IoSearchOutline className="sidebarOption__icon" size="24px"/>
        Search
      </span>
    </Link>
    <Link
      to='/collection'
      id='MainNavLibrary'
      className='sidebarOption'
      onClick={() => {
        document.getElementById('MainNavHome').style.opacity = 0.75;
        document.getElementById('MainNavHome').style.backgroundColor = 'transparent';
        document.getElementById('MainNavSearch').style.opacity = 0.75;
        document.getElementById('MainNavSearch').style.backgroundColor = 'transparent';
        document.getElementById('MainNavLibrary').style.opacity = 1;
        document.getElementById('MainNavLibrary').style.backgroundColor = '#282828';
      }}
      style={{
        backgroundColor: (window.location.href.indexOf('/collection') > -1 && window.location.pathname !== '/collection/tracks') ? '#282828' : 'transparent',
        opacity: (window.location.href.indexOf('/collection') > -1 && window.location.pathname !== '/collection/tracks') ? 1 : 0.7
      }}
    >
      <span className="sidebarOption__link">
        <VscLibrary className="sidebarOption__icon" size="24px"/>
        Your Library
      </span>
    </Link>
  </>
  );
}

export default Sidebar