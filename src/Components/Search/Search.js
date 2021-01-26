import React/*, { useEffect, useState }*/ from 'react';
//import SpotifyWebApi from 'spotify-web-api-js';

import Header from '../Header';
//import { useDataLayerValue } from '../../Context/DataLayer';

import '../../Styles/Header.css';

//const spotify = new SpotifyWebApi();

function Search() {

  /*const [categories, setCategories] = useState({});
  const [{ user }, ] = useDataLayerValue();

  useEffect(() => {
    spotify.getCategories({country: user?.country, limit: 50}).then(categories => setCategories(categories));
  }, []);*/

  return (
    <>
      <Header/>
    </>
  );
}

export default Search;