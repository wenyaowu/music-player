import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  spotifyToken: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_AUTH_ERROR: {
      return {
        ...state,
        error: null,
      };
    }
    case actionTypes.AUTH_SPOTIFY_SUCCESS: {
      return {
        ...state,
        spotifyToken: action.spotifyToken,
      };
    }
    case actionTypes.AUTH_START: {
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
        loading: true,
      };
    }
    case actionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        loading: false,
      };
    }
    case actionTypes.AUTH_FAILED: {
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    }
    case actionTypes.AUTH_LOGOUT: {
      return {
        ...state,
        token: null,
        userId: null,
        spotifyToken: null,
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
