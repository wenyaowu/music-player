import * as actionTypes from "./actionTypes";

export const search = (searchTerm) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SEARCH_INIT,
    });
    try {
      setTimeout(() => {
        let results = [{ name: "test1" }, { name: "test2" }];
        dispatch(searchSuccess(results));
      }, 1000);
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
