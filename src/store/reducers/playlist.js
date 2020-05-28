import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  playlists: [],
  selectedPlaylist: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
