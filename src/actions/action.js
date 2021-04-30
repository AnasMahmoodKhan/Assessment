import API from "../utils/API";
import {
  CHANGE_PAGE,
  DELETE_ITEM,
  GET_ARTICLE,
  MARK_AS_READ,
  RECIEVE_ARTICLE,
  RECIEVE_NEWS_LIST,
} from "./actionTypes";

export const recieveNewList = ({ status, list }) => ({
  type: RECIEVE_NEWS_LIST,
  status,
  list,
});

export const getArticleList = () => ({
  type: GET_ARTICLE,
  isFetching: true,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  deleteID: id,
});

export const markasRead = (id) => ({
  type: MARK_AS_READ,
  readID: id,
});

export const changePage = (page) => ({
  type: CHANGE_PAGE,
  page: page,
});

export const recieveArticle = ({ status, article }) => ({
  type: RECIEVE_ARTICLE,
  status,
  article,
});

export const getNewsItems = () => {
  return async function (dispatch) {
    await API.fetchNewsItems()
      .then((response) => {
        dispatch(
          recieveNewList({
            status: "success",
            list: response.data
              .filter((item, id) => id < 90)
              .sort(function (a, b) {
                return a - b;
              }),
          })
        );
      })
      .catch((error) => {
        dispatch(
          recieveNewList({
            status: "error",
            error: error,
          })
        );
      });
  };
};

export const setArticles = (articles) => {
  return function (dispatch) {
    dispatch(
      recieveArticle({
        status: "success",
        article: articles,
      })
    );
  };
};
