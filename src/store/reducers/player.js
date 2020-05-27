import * as actionTypes from "../actions/actionTypes";

const initialState = {
  playing: false,
  queue: [],
  currentPlayingIndex: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAY_TRACK: {
      return {
        ...state,
        playing: true,
        queue: [action.track],
        currentPlayingIndex: 0,
      };
    }
    case actionTypes.PLAY_PLAYLIST: {
      return {
        ...state,
        playing: true,
        queue: action.queue,
        currentPlayingIndex: action.from ? action.from : 0,
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
    case actionTypes.NEXT: {
      if (state.currentPlayingIndex >= state.queue.length - 1) {
        return {
          ...state,
          currentPlayingIndex: 0,
          playing: false,
        };
      } else {
        return {
          ...state,
          currentPlayingIndex: state.currentPlayingIndex + 1,
        };
      }
    }
    case actionTypes.PREVIOUS: {
      if (state.currentPlayingIndex <= 0) {
        return {
          ...state,
          currentPlayingIndex: 0,
          playing: false,
        };
      } else {
        return {
          ...state,
          currentPlayingIndex: state.currentPlayingIndex - 1,
        };
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
