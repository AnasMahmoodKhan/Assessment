import axios from "axios";
export default {
  fetchNewsItems: async () => {
    return await axios
      .get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => res)
      .catch((err) => err);
  },
  fetchArticles: async (id) => {
    return await axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then((res) => res)
      .catch((err) => err);
  },
};
