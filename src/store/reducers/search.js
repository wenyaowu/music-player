import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_INIT: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case actionTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        results: action.results,
      };
    }
    case actionTypes.SEARCH_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case actionTypes.CLEAR_SEARCH: {
      return {
        ...state,
        results: [],
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
