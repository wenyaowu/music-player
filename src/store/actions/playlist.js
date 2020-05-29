import * as actionTypes from "./actionTypes";
import db from "../../firestore";

export const initCreatePlaylist = () => {
  return {
    type: actionTypes.INIT_CREATE_PLAYLIST,
  };
};

export const cancelCreatePlaylist = () => {
  return {
    type: actionTypes.CANCEL_CREATE_PLAYLIST,
  };
};

export const createPlaylist = (userId, name, description) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.CREATE_PLAYLIST,
    });
    try {
      const playlist = {
        name,
        description,
        userId,
        tracks: [],
      };
      let docRef = await db.collection("playlists").add(playlist);
      dispatch(
        createPlaylistSuccess({
          id: docRef.id,
          ...playlist,
        })
      );
    } catch (err) {
      dispatch(createPlaylistFailed(err));
    }
  };
};

export const createPlaylistSuccess = (playlist) => {
  return {
    type: actionTypes.CREATE_PLAYLIST_SUCCESS,
    playlist,
  };
};

export const createPlaylistFailed = (error) => {
  return {
    type: actionTypes.CREATE_PLAYLIST_FAILED,
    error,
  };
};

export const getPlaylist = (playlistId) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PLAYLIST,
    });
    try {
      let doc = await db.collection("playlists").doc(playlistId).get();
      dispatch(getPlaylistSuccess({
        id:doc.id,
        ...doc.data()
      }));
      
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
      const playlists = [];
      let querySnapshot = await db.collection("playlists").get();

      querySnapshot.forEach((doc) => {
        playlists.push({
          ...doc.data(),
          id: doc.id,
        });
      });

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
