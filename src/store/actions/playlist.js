import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getPlaylist = (playlistId) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PLAYLIST,
    });
    try {
      let { data } = await axios.get(
        `https://music-player-f9307.firebaseio.com/playlists/${playlistId}.json`
      );
      dispatch(getPlaylistSuccess(data.tracks));
    } catch (err) {
      dispatch(getPlaylistFailed(err));
    }
  };
};

export const getPlaylistSuccess = (tracks) => {
  return {
    type: actionTypes.GET_PLAYLIST_SUCCESS,
    tracks,
  };
};

export const getPlaylistFailed = (error) => {
  return {
    type: actionTypes.GET_PLAYLIST_FAILED,
    error,
  };
};
