import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  changePage,
  deleteItem,
  getArticleList,
  getNewsItems,
  markasRead,
  setArticles,
} from "../actions/action";
import { getArticles } from "../utils/apis";
import Article from "./Article";
import Paginator from "./Paginator";

const Home = ({
  list,
  page,
  getNewsItems,
  getArticleList,
  setArticles,
  isFetching,
  articles,
  deleteItem,
  deletedList,
  markasRead,
  changePage,
}) => {
  const [articlesList, setarticlesList] = useState([]);

  useEffect(() => {
    getNewsItems();
  }, []);

  useEffect(() => {
    getArticleList();
    getArticles(list, page)
      .then((stories) => {
        setarticlesList(stories);
      })
      .catch(() => {});
  }, [list, page]);

  useEffect(() => {
    setArticles(articlesList);
  }, [articlesList]);

  const deleteHandler = (id) => {
    deleteItem(id);
  };

  const markasReadHandler = (id) => {
    markasRead(id);
  };

  const pageChangeHandler = (num) => {
    changePage(num);
  };

  return (
    <React.Fragment>
      <div className="container">
        <h3>Homepage</h3>

        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            <Paginator
              active={page}
              pageNumber={(number) => pageChangeHandler(number)}
            />
            {articles.map((article) =>
              deletedList.find((id) => article.id === id) ? null : (
                <React.Fragment key={article.id}>
                  <Article
                    id={article.id}
                    title={article.title}
                    kids={article.kids}
                    time={article.time}
                    score={article.score}
                    read={article.read}
                    handleDelete={(id) => deleteHandler(id)}
                    handleRead={(id) => markasReadHandler(id)}
                  />
                </React.Fragment>
              )
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  let { list, isFetching, articles, deletedList, page } = state.reducer;
  return {
    list,
    isFetching,
    articles,
    deletedList,
    page,
  };
};

const mapDistpatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getNewsItems,
      setArticles,
      getArticleList,
      deleteItem,
      markasRead,
      changePage,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDistpatchToProps)(Home);
