import * as actionTypes from "../actions/actionTypes";

const initialState = {
  playing: false,
  track: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_TRACK: {
      return {
        ...state,
        playing: true,
        track: action.track,
      };
    }
    case actionTypes.PLAY: {
      return {
        ...state,
        playing: true,
      };
    }
    case actionTypes.PAUSE: {
      return {
        ...state,
        playing: false,
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
