import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AiOutlineUser } from 'react-icons/ai';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowDropdown } from 'react-icons/io';

import { useDataLayerValue } from '../Context/DataLayer';

import '../Styles/Header.css';

function Header() {

  const [{user}, ] = useDataLayerValue();
  const history = useHistory();

  return (
    <div className="header">
      <div className="header__controls">
        <div className="header__back" onClick={() => history.goBack()}>
          <IoIosArrowBack size={24}/>
        </div>
        <div className="header__forward" onClick={() => history.goForward()}>
          <IoIosArrowForward size={24}/>
        </div>
      </div>
      {(window.location.href.indexOf('/collection') > -1 && window.location.pathname !== ('/collection/tracks'))
        &&
      <div className="header__library">
        <span style={{backgroundColor: window.location.href.indexOf('/collection/playlists') > - 1 && '#333'}}>
          <Link to='/collection/playlists'>
            Playlists
          </Link>
        </span>
        <span style={{backgroundColor: window.location.href.indexOf('/collection/podcasts') > - 1 && '#333'}}>
          <Link to='/collection/podcasts'>
            Podcasts
          </Link>
        </span>
        <span style={{backgroundColor: window.location.href.indexOf('/collection/artists') > - 1 && '#333'}}>
          <Link to='/collection/artists'>
            Artists
          </Link>
        </span>
        <span style={{backgroundColor: window.location.href.indexOf('/collection/albums') > - 1 && '#333'}}>
          <Link to='/collection/albums'>
            Albums
          </Link>
        </span>
      </div>}
      {(window.location.href.indexOf('/search') > -1)
        &&
      <div className="header__search">
        <div>
          <div>
            <IoSearchOutline size={24}/>
          </div>
          <input placeholder='Search for Artists, Songs, or Podcasts'/>
        </div>
      </div>}
      <div className="header__profile">
        {user?.images[0] !== undefined
          ?
        <img src={user?.images[0]?.url} alt="profile"/>
          :
        <AiOutlineUser size={20}/>}
        <span>{user?.display_name}</span>
        <div>
          <IoMdArrowDropdown size={21}/>
        </div>
      </div>
    </div>
  )
}

export default Header
