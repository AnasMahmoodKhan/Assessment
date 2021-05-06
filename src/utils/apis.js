import axios from "axios";

const getStory = async (id) => {
  try {
    const story = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return story.data;
  } catch (error) {
    console.log("Error while getting a story.");
  }
};

export const getArticles = async (list, page) => {
  try {
    const stories = await Promise.all(
      list.slice((page - 1) * 30, 30 * page).map(getStory)
    );
    return stories;
  } catch (error) {
    console.log("Error while getting list of stories.");
  }
};

const getComment = async (id) => {
  try {
    const comment = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return comment.data;
  } catch (error) {
    console.log("Error while getting a comment.");
  }
};

export const getComments = async (list) => {
  console.log(list);
  try {
    const comments = await Promise.all(list.slice(0, 5).map(getComment));
    return comments;
  } catch (error) {
    console.log("Error while getting list of comments.");
  }
};
