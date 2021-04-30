import axios from "axios";
import API from "../utils/API";
import { RECIEVE_ARTICLE, RECIEVE_NEWS_LIST } from "./actionTypes";

export const recieveNewList = ({ status, list }) => ({
  type: RECIEVE_NEWS_LIST,
  status,
  list,
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

export const setArticles = (list) => {
  const fetch_list = list.slice(0, 10);
  const articles = [];
  fetch_list.map(
    async (id) =>
      await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        )
        .then((response) => articles.push(response.data))
  );
  return function (dispatch) {
    dispatch(
      recieveArticle({
        status: "success",
        article: articles,
      })
    );
  };
};
