// NOT A COMPONENT

let querystring = require('querystring');

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUri = window.location.href.includes('localhost') ? 'http://localhost:3000' : 'https://oscarifun.web.app';
const clientId = 'f38abad3e51240e7a0e198cf597b0222';

const scopes = [
  'user-read-currently-playing',
  'user-read-playback-position',
  'playlist-read-collaborative',
  'user-modify-playback-state',
  'user-read-recently-played',
  'user-read-playback-state',
  'playlist-modify-private',
  'playlist-modify-public',
  'playlist-read-private',
  'user-library-modify',
  'app-remote-control',
  'user-follow-modify',
  'user-library-read',
  'user-read-private',
  'user-follow-read',
  'ugc-image-upload',
  'user-top-read',
  'streaming'
];

export const getTokenFromUrl = () => querystring.parse(window.location.hash.substring(1));

export const loginUrl = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'token',
    client_id: clientId,
    scope: scopes.join('%20'),
    redirect_uri : redirectUri
  });