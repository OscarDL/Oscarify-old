import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';
import HomeCard from '../HomeCard';

import { useDataLayerValue } from '../../Context/DataLayer';

import './Songs.css';

const spotify = new SpotifyWebApi();

function Songs({info}) {

  const [latestAlbum, setLatestAlbum] = useState([]);
  const [appearsOn, setAppearsOn] = useState([]);
  const [topSongs, setTopSongs] = useState([]);
  const [related, setRelated] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [{ user }, ] = useDataLayerValue();


  useEffect(() => {
    if (info.id !== undefined && user !== null){
      spotify.getArtistTopTracks(info.id, user.country).then(top => setTopSongs(top));

      spotify.getArtistRelatedArtists(info.id).then(related => setRelated(related));

      spotify.getArtistAlbums(info.id, {country: user.country, limit: 50, include_groups: ['appears_on']}).then(albums => setAppearsOn(albums));

      spotify.getArtistAlbums(info.id, {country: user.country, limit: 50, include_groups: ['album', 'single']}).then(albums => {
        setAlbums(albums);
        let timestamps = [];
        albums.items.map(album => timestamps.push(new Date(album.release_date).getTime() / 1000));
        setLatestAlbum(albums.items[timestamps.indexOf(Math.max(...timestamps))]);
      });
    }
  }, [info, user]);

  return (
    <div className="artist__songs">
      <div className="artist__top">
        {topSongs?.tracks?.length > 0 && <>
          <div className="artist__popular">
            <h2>Popular</h2>
            {topSongs && topSongs?.tracks?.map((track, i) => (<span key={i}>
              <div className={i > 4 ? 'artist__popular__track artist__popular__hidden' : 'artist__popular__track'}>
                <span className="artist__popular__track__count">{i+1}</span>

                <span className="artist__popular__track__title">
                  <img src={track.album?.images?.[0]?.url} alt="artwork"/>
                  <span>
                    {track.name}
                    {/*<span>{track.artists.map((artist, j) => <span key={j}>{j !== 0 && ', '}{artist?.id ? <Link to={`/artist/${artist.id}`}>{artist.name}</Link> : artist?.name}</span>)}</span>*/}
                  </span>
                </span>

                <span className="artist__popular__track__album">{track.album?.id ? <Link to={`/album/${track.album.id}`}>{track.album.name}</Link> : track.album?.name}</span>
                
                <span className="artist__popular__track__duration">{track.duration_ms/1000 < 60 ? (track.duration_ms/1000 < 10 ? '0:0' + ~~(track.duration_ms/1000) : '0:' + ~~(track.duration_ms/1000)) : parseInt((track.duration_ms/1000)/60) + ':' + ((track.duration_ms/1000)%60 < 10 ? '0' + ~~(track.duration_ms/1000)%60 : ~~(track.duration_ms/1000)%60)}</span>
              </div>
              {(topSongs.tracks[i+1] === undefined && topSongs.tracks.length > 5)
                &&
              <button className="artist__popular__seeMore" onClick={() => {
                let array = [];

                Array.prototype.slice.call(document.getElementsByClassName('artist__popular__hidden')).length !== 0
                  ?
                array = Array.prototype.slice.call(document.getElementsByClassName('artist__popular__hidden'))
                  :
                array = Array.prototype.slice.call(document.getElementsByClassName('artist__popular__shown'));

                return (array.map(element => {
                  if (element.classList.contains('artist__popular__hidden')) {
                    element.classList.add('artist__popular__shown');
                    element.classList.remove('artist__popular__hidden');
                    document.querySelector('.artist__popular__seeMore').innerHTML = 'SHOW LESS';
                  } else {
                    element.classList.add('artist__popular__hidden');
                    element.classList.remove('artist__popular__shown');
                    document.querySelector('.artist__popular__seeMore').innerHTML = 'SEE MORE';
                  }
                  return null;
                }))

              }}>SEE MORE</button>}
            </span>))}
          </div>
          <div className="artist__pick">
            <h2>Artist pick</h2>
            {latestAlbum.name !== undefined &&
            <Link to={`/album/${latestAlbum?.id}`} className="artist__pick__album">
              <img src={latestAlbum?.images?.[0]?.url} alt="artwork-pick"/>
              <span>
                <div>
                  <img src={info?.images?.[0]?.url} alt="artist"/>
                  Now Available!
                </div>
                <span>{latestAlbum?.name}</span>
                <span>{latestAlbum?.album_type}</span>
              </span>
            </Link>}
          </div>
        </>}
      </div>
      <div className="artist__discography">
        <div>
          <h2>Discography</h2>
        </div>
        <div className="homerow">
          <HomeCard key={0} title={latestAlbum?.name} desc={'Latest Release • ' + latestAlbum?.album_type?.[0]?.toUpperCase() + latestAlbum?.album_type?.slice(1)} image={latestAlbum?.images?.[0]?.url} id={latestAlbum?.id} type='album'/>
          {albums.items !== undefined && albums?.items?.map((album, i) =>
            album?.name !== latestAlbum?.name && <HomeCard key={i+1} title={album?.name} desc={album?.release_date?.slice(0,4)+' • '+album?.album_type?.[0]?.toUpperCase() + album?.album_type?.slice(1)} image={album?.images?.[0]?.url} id={album?.id} type='album'/>
          )}
        </div>
      </div>
      {appearsOn?.items?.length > 0 &&
      <div className="artist__appearsOn">
        <div>
          <h2>Appears On</h2>
        </div>
        <div className="homerow">
          {appearsOn.items !== undefined && appearsOn?.items?.map((album, i) =>
            album?.album_type !== 'compilation' && <HomeCard key={i} title={album?.name} desc={<>{album?.release_date?.slice(0,4)+' • '}{album?.artists?.map((artist, i) => <span key={i}>{i !== 0 && ', '}<Link to={`/artist/${artist?.id}`}>{artist?.name}</Link></span>)}</>} image={album?.images?.[0]?.url} id={album?.id} type='album'/>
          )}
        </div>
      </div>}
      {related?.artists?.length > 0 &&
      <div className="artist__related">
        <div>
          <h2>Fans also like</h2>
        </div>
        <div className="homerow">
          {related.artists !== undefined && related?.artists?.map((artist, i) =>
            <HomeCard key={i} title={artist?.name} desc={artist?.type?.[0]?.toUpperCase() + artist?.type?.slice(1)} image={artist?.images?.[0]?.url} id={artist?.id} type='artist'/>
          )}
        </div>
      </div>}
    </div>
  );
}

export default Songs;