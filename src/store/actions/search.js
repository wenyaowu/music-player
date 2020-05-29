import * as actionTypes from "./actionTypes";
import soundCloud from "../../soundCloud";

export const search = (searchTerm) => {
  return async (dispatch) => {
    dispatch({
      type: actionTypes.SEARCH_INIT,
    });
    try {
      let results = [];
      let scResults = await soundCloud.search(searchTerm);
      scResults.forEach((track) => {
        results.push({
          source: "soundcloud",
          title: track.title,
          image: track.artwork_url,
          artist: track.user.username,
          url: track.permalink_url,
          description: track.description,
        });
      });

      dispatch(searchSuccess(results));
    } catch (err) {
      dispatch(searchFailed(err));
    }
  };
};

export const searchSuccess = (results) => {
  return {
    type: actionTypes.SEARCH_SUCCESS,
    results,
  };
};

export const searchFailed = (error) => {
  return {
    type: actionTypes.SEARCH_FAILED,
    error,
  };
};

export const clearSearch = () => {
  return {
    type: actionTypes.CLEAR_SEARCH,
  };
};
