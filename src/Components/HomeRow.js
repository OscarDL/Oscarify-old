import React from 'react';
import { Link } from 'react-router-dom';

import '../Styles/HomeRow.css';
import HomeCard from './HomeCard';
import { useDataLayerValue } from '../Context/DataLayer';

function HomeRow({rowType, type}) {

  const [{recents, playlists, top_tracks, top_artists, album_picks}, ] = useDataLayerValue();

  return (
    (type !== 'album-picks' || (type === 'album-picks' && album_picks !== null)) &&
    <div>
      <div>
        <h2>{rowType}</h2>
      </div>
      <div className="homerow">
        {type === 'recents' && recents?.items?.map((recent, i) =>
          <HomeCard key={i} title={recent?.track?.name} desc={recent?.track?.artists?.map((artist, i) => <span key={i}>{i !== 0 && ', '}<Link to={`/artist/${artist?.id}`}>{artist?.name}</Link></span>)} image={recent?.track?.album?.images?.[1]?.url} id={recent?.track?.album?.id} type='album'/>
        )}
        {type === 'playlists' && playlists?.items?.map((playlist, i) =>
          //i > index &&
          <HomeCard key={i} title={playlist?.name} desc={playlist?.description !== '' ? playlist?.description : <span>By <Link to={`/user/${playlist?.owner?.id}`}>{playlist?.owner?.display_name}</Link></span>} image={playlist?.images?.[0]?.url} id={playlist?.id} type='playlist'/>
        )}
        {type === 'album-picks' && album_picks?.items?.map((album, i) =>
          <HomeCard key={i} title={album?.album?.name} desc={album?.album?.artists?.map((artist, i) => <span key={i}>{i !== 0 && ', '}<Link key={i} to={`/artist/${artist?.id}`}>{artist?.name}</Link></span>)} image={album?.album?.images?.[0]?.url} id={album?.album?.id} type='album'/>
        )}
        {type === 'top-artists' && top_artists?.items?.map((artist, i) =>
          <HomeCard key={i} title={artist?.name} desc='Artist' image={artist?.images?.[0]?.url} id={artist?.id} type='artist'/>
        )}
        {type === 'top-tracks' && top_tracks?.items?.map((album, i) =>
          <HomeCard key={i} title={album?.album?.name} desc={album?.album?.artists?.map((artist, i) => <span key={i}>{i !== 0 && ', '}<Link key={i} to={`/artist/${artist?.id}`}>{artist?.name}</Link></span>)} image={album?.album?.images?.[0]?.url} id={album?.album?.id} type='album'/>
        )}
      </div>
    </div>
  )
}

export default HomeRow