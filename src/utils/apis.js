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
