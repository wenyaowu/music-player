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
      dispatch(getPlaylistSuccess(data));
    } catch (err) {
      dispatch(getPlaylistFailed(err));
    }
  };
};

export const getUserPlaylists = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_USER_PLAYLISTS,
    });
    try {
      let { data } = await axios.get(
        `https://music-player-f9307.firebaseio.com/playlists.json?orderBy="userId"&eqaulTo="${userId}"`
      );
      const playlists = [];
      for (let key of Object.keys(data)) {
        playlists.push({
          ...data[key],
          id: key,
        });
      }
      dispatch(getUserPlaylistsSuccess(playlists));
    } catch (err) {
      dispatch(getUserPlaylistsFailed(err));
    }
  };
};

export const getUserPlaylistsSuccess = (playlists) => {
  return {
    type: actionTypes.GET_USER_PLAYLISTS_SUCCESS,
    playlists,
  };
};

export const getUserPlaylistsFailed = (error) => {
  return {
    type: actionTypes.GET_USER_PLAYLISTS_FAILED,
    error,
  };
};

export const getPlaylistSuccess = (playlist) => {
  return {
    type: actionTypes.GET_PLAYLIST_SUCCESS,
    playlist,
  };
};

export const getPlaylistFailed = (error) => {
  return {
    type: actionTypes.GET_PLAYLIST_FAILED,
    error,
  };
};
