import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  creating: false,
  adding: false,
  playlists: [],
  selectedPlaylist: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TRACK_TO_PLAYLIST: {
      return {
        ...state,
        loading: true,
        adding: true,
        error: null,
      };
    }
    case actionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS: {
      const playlists = [...state.playlists];
      const playlist = playlists.find((p) => p.id === action.playlistId);
      playlist.tracks.push(action.track);
      return {
        ...state,
        adding: false,
        loading: false,
        playlists,
      };
    }
    case actionTypes.ADD_TRACK_TO_PLAYLIST_FAILED: {
      return {
        ...state,
        loading: false,
        adding: false,
        error: action.error,
      };
    }
    case actionTypes.INIT_CREATE_PLAYLIST: {
      return {
        ...state,
        creating: true,
      };
    }
    case actionTypes.CANCEL_CREATE_PLAYLIST: {
      return {
        ...state,
        creating: false,
      };
    }
    case actionTypes.CREATE_PLAYLIST: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.CREATE_PLAYLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        creating: false,
        playlists: [...state.playlists, action.playlist],
      };
    }
    case actionTypes.CREATE_PLAYLIST_FAILED: {
      return {
        ...state,
        creating: false,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.GET_USER_PLAYLISTS: {
      return {
        ...state,
        loading: true,
        error: null,
        playlists: [],
      };
    }
    case actionTypes.GET_USER_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        playlists: action.playlists,
      };
    }
    case actionTypes.GET_USER_PLAYLISTS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.GET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: null,
        loading: true,
        error: null,
      };
    }
    case actionTypes.GET_PLAYLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedPlaylist: action.playlist,
      };
    }
    case actionTypes.GET_PLAYLIST_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
