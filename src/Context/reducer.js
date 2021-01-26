export const initialState = {
  user:null,
  albums: null,
  artists: null,
  playing: null,
  podcasts: null,
  playlists: null,
  is_playing:null,
  top_tracks: null,
  top_artists: null,
  album_picks: null,
  progress_ms: null,
  access_token: null,
  refresh_token: null,
  current_playlist: null,
  current_url: null,
  volume: null,
  devices: [],
  item: null
}

export const reducer = (state, action) => {
  //console.log(action);

  // action -> type, [payload]

  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        access_token: action.access_token
      }
    case 'SET_REFRESH_TOKEN':
      return {
        ...state,
        refresh_token: action.refresh_token
      }
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists
      }      
    case 'SET_PODCASTS':
      return {
        ...state,
        podcasts: action.podcasts
      }
    case 'SET_RECENTS':
      return {
        ...state,
        recents: action.recents
      }
    case 'SET_ARTISTS':
      return {
        ...state,
        artists: action.artists
      }
    case 'SET_ALBUMS':
      return {
        ...state,
        albums: action.albums
      }
    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing
      }
    case 'SET_TOP_TRACKS':
      return {
        ...state,
        top_tracks: action.top_tracks
      }
    case 'SET_TOP_ARTISTS':
      return {
        ...state,
        top_artists: action.top_artists
      }
    case 'SET_ALBUM_PICKS':
      return {
        ...state,
        album_picks: action.album_picks
      }
    case 'SET_IS_PLAYING':
      return {
        ...state,
        is_playing: action.is_playing
      }
    case 'SET_PROGRESS_MS':
      return {
        ...state,
        progress_ms: action.progress_ms
      }
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.volume
      }
    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.devices
      }
    case 'SET_CURRENT_URL':
      return {
        ...state,
        current_url: action.current_url
      }
    case 'SET_CURRENT_PLAYLIST':
      return {
        ...state,
        current_playlist: action.current_playlist
      }
    default:
      return state;
  }
}