import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getNewsItems, setArticles } from "../actions/action";

const Home = ({ list, getNewsItems, setArticles, articles }) => {
  useEffect(() => {
    getNewsItems();
  }, []);

  useEffect(() => {
    setArticles(list);
  }, [list]);

  return (
    <React.Fragment>
      <div className="container">
        <h3>Homepage</h3>
        {articles.length > 0 ? (
          articles.map((article) => (
            <React.Fragment key={article.id}>
              <h5>{article.title}</h5>
            </React.Fragment>
          ))
        ) : (
          <h5>Loading....</h5>
        )}
        <h3>List of id's</h3>
        {list.map((item) => (
          <h5 key={item}>{item}</h5>
        ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  let { list, isFetching, articles } = state.reducer;
  return {
    list,
    isFetching,
    articles,
  };
};

const mapDistpatchToProps = (dispatch) => {
  return bindActionCreators({ getNewsItems, setArticles }, dispatch);
};

export default connect(mapStateToProps, mapDistpatchToProps)(Home);
