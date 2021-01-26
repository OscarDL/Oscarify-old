import React from 'react';
//import SpotifyWebApi from 'spotify-web-api-js';
import { IoPlaySharp } from 'react-icons/io5';

//import { useDataLayerValue } from '../../Context/DataLayer';

import './Actions.css';

//const spotify = new SpotifyWebApi();

function Actions() {

  //const [{ user }, ] = useDataLayerValue();

  return (
    <div className="likes__actions">
      <div
        className="likes__actions__play"
        onClick={() => null}
        style={{cursor: 'no-drop', opacity: 0.5}}
      >
        <IoPlaySharp size={28} fill="white"/>
      </div>
    </div>
  );
}

export default Actions;