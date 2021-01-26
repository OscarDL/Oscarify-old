import React from 'react';
import { Route, Switch } from "react-router-dom";

import Home from './Home';
import Header from './Header';
import User from './User/User';
import Likes from './Likes/Likes';
import Album from './Album/Album';
import Artist from './Artist/Artist';
import Search from './Search/Search';
import Library from './Library/Library';
import Playlist from './Playlist/Playlist';

import Albums from './Library/Albums';
import Artists from './Library/Artists';
import Podcasts from './Library/Podcasts';
import Playlists from './Library/Playlists';

import '../Styles/Body.css';

function Body() {
  return (
    <div className="body">
      <Switch>
        <Route exact path="/">
          <Header/>
          <Home/>
        </Route>
        <Route path="/search">
          <Search/>
        </Route>
        <Route path="/user/:id">
          <User/>
        </Route>
        <Route path="/album/:id">
          <Album/>
        </Route>
        <Route path="/artist/:id">
          <Artist/>
        </Route>
        <Route path="/playlist/:id">
          <Playlist/>
        </Route>
        <Route exact path="/collection">
          <Library/>
        </Route>
        <Route path="/collection/tracks">
          <Likes/>
        </Route>
        <Route path="/collection/albums">
          <Albums/>
        </Route>
        <Route path="/collection/artists">
          <Artists/>
        </Route>
        <Route path="/collection/podcasts">
          <Podcasts/>
        </Route>
        <Route path="/collection/playlists">
          <Playlists/>
        </Route>
      </Switch>
    </div>
  )
}

export default Body