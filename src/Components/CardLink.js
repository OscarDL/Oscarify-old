import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

function CardLink({id}) {
  const spotify = new SpotifyWebApi();
  return (
    <div>
      {
        spotify.getAlbum(id).then(album => console.log(album))
      }
    </div>
  )
}

export default CardLink