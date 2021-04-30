import {
  GET_ARTICLE,
  GET_NEWS_ITEMS,
  RECIEVE_ARTICLE,
  RECIEVE_NEWS_LIST,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  articles: [],
  list: [],
  error: "",
};

function reducer(state = initialState, action) {
  if (action.type === GET_NEWS_ITEMS) {
    return { ...state, isFetching: true };
  }

  if (action.type === GET_ARTICLE) {
    return { ...state, isFetching: true };
  }

  if (action.type === RECIEVE_NEWS_LIST) {
    return {
      ...state,
      isFetching: false,
      list: action.status === "success" ? action.list : initialState.list,
      error: action.status === "error" ? action.error : initialState.error,
    };
  }

  if (action.type === RECIEVE_ARTICLE) {
    return {
      ...state,
      articles: action.article,
    };
  }

  return state;
}

export default reducer;
