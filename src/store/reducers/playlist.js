import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  tracks: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PLAYLIST: {
      return {
        ...state,
        tracks: [],
        loading: true,
        error: null,
      };
    }
    case actionTypes.GET_PLAYLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        tracks: action.tracks,
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
