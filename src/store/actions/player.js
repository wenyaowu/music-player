import * as actionTypes from "./actionTypes";

export const playTrack = (track) => {
  return {
    type: actionTypes.PLAY_TRACK,
    track,
  };
};

export const playPlaylist = (tracks, from) => {
  return {
    type: actionTypes.PLAY_PLAYLIST,
    queue: tracks,
    from,
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

export const next = () => {
  return {
    type: actionTypes.NEXT,
  };
};

export const previous = () => {
  return {
    type: actionTypes.PREVIOUS,
  };
};


export const spotifyPlayerReady = () => {
  return {
    type: actionTypes.SPOTIFY_PLAYER_READY
  }
}

export const spotifyPlayerUnmount = () => {
  return {
    type: actionTypes.SPOTIFY_PLAYER_UNMOUNT
  }
}