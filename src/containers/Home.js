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
  setComments,
} from "../actions/action";
import { getArticles, getComments } from "../utils/apis";
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
  comments,
  markasRead,
  changePage,
  setComments,
}) => {
  const [articlesList, setarticlesList] = useState([]);
  const [showCommentId, setshowCommentId] = useState(-1);

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

  const handleShowComments = (id) => {
    setshowCommentId(id);
    let commentLis = articles.filter((item) => item.id === id);
    if (commentLis[0].kids) {
      getComments(commentLis[0].kids)
        .then((comments) => setComments(comments))
        .catch();
    } else {
      setComments([]);
    }
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
              list={list}
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
                    url={article.url}
                    showCommentId={showCommentId}
                    comments={comments}
                    showComments={(id) => handleShowComments(id)}
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
  let {
    list,
    isFetching,
    articles,
    deletedList,
    page,
    comments,
  } = state.reducer;
  return {
    list,
    isFetching,
    articles,
    deletedList,
    page,
    comments,
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
      setComments,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDistpatchToProps)(Home);
