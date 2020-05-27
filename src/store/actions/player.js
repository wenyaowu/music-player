import * as actionTypes from "./actionTypes";

export const playTrack = (track) => {
  return {
    type: actionTypes.PLAY_TRACK,
    track,
  };
};

export const play = () => {
  return {
    type: actionTypes.PLAY,
  };
};

export const pause = () => {
  return {
    type: actionTypes.PAUSE,
  };
};
