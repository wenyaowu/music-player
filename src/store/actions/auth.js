import axios from "axios";
import * as actionTypes from "./actionTypes";
const apiKey = process.env.REACT_APP_FIREBASE_API_KEY;

export const clearAuthError = () => {
  return {
    type: actionTypes.CLEAR_AUTH_ERROR
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (userId, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFailed = (error) => {
  return {
    type: actionTypes.AUTH_FAILED,
    error,
  };
};

export const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiresIn * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expireAt");
  localStorage.removeItem("userId");
  localStorage.removeItem("spotify-token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const signup = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

    axios
      .post(`${url}?key=${apiKey}`, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem(
          "expireAt",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

    axios
      .post(`${url}?key=${apiKey}`, authData)
      .then((res) => {
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem(
          "expireAt",
          new Date(new Date().getTime() + res.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", res.data.localId);
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFailed(err.response.data.error.message));
      });
  };
};

export const spotifyAuthSccess = (spotifyToken, expireIn) => {
  localStorage.setItem("spotify-token", spotifyToken);
  return {
    type: actionTypes.AUTH_SPOTIFY_SUCCESS,
    spotifyToken,
  };
};

export const authInit = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const expireAt = new Date(localStorage.getItem("expireAt"));
      if (expireAt > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(userId, token));
        dispatch(
          checkAuthTimeout((expireAt.getTime() - new Date().getTime()) / 1000)
        );
      } else {
        dispatch(logout());
      }
    }
    const spotifyToken = localStorage.getItem("spotify-token");
    if (spotifyToken) {
      dispatch(spotifyAuthSccess(spotifyToken));
    }
  };
};
