import {
  CHANGE_PAGE,
  DELETE_ITEM,
  GET_ARTICLE,
  GET_NEWS_ITEMS,
  MARK_AS_READ,
  RECIEVE_ARTICLE,
  RECIEVE_NEWS_LIST,
  SHOW_COMMENTS,
} from "../actions/actionTypes";

const initialState = {
  isFetching: false,
  articles: [],
  list: [],
  deletedList: [],
  comments: [],
  error: "",
  page: 1,
};

function reducer(state = initialState, action) {
  if (action.type === GET_NEWS_ITEMS) {
    return { ...state, isFetching: true };
  }

  if (action.type === GET_ARTICLE) {
    return { ...state, isFetching: true };
  }

  if (action.type === DELETE_ITEM) {
    let deletedList = state.deletedList;
    deletedList.push(action.deleteID);
    let articlesList = state.articles;
    articlesList = articlesList.filter((ar) => deletedList.find((id) => ar.id));
    return { ...state, deletedList: deletedList, articles: articlesList };
  }

  if (action.type === MARK_AS_READ) {
    let articlesList = state.articles;
    let articlesListIndex = articlesList.findIndex(
      (article) => article.id === action.readID
    );
    articlesList[articlesListIndex].read =
      !articlesList[articlesListIndex].read || false;
    return { ...state, articles: articlesList };
  }

  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.page };
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
      isFetching: false,
    };
  }

  if (action.type === SHOW_COMMENTS) {
    return {
      ...state,
      comments: action.comment,
    };
  }

  return state;
}

export default reducer;
