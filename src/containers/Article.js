import React from "react";

const Article = ({
  id,
  title,
  time,
  kids,
  handleDelete,
  url,
  score,
  read,
  handleRead,
  showComments,
  comments,
  showCommentId,
}) => {
  return (
    <React.Fragment key={id}>
      <div
        className={`container p-2 m-1 border`}
        style={showCommentId === id ? { backgroundColor: "#DCDCDD" } : null}
      >
        <div className={`row`} onClick={() => showComments(id)}>
          <div className="col-10">
            {" "}
            <h5>
              {title}
              <br />
              <a href={url}>
                <small>{url}</small>
              </a>
            </h5>
            <span className="mr-3">
              {new Date(time * 1000).toLocaleDateString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </span>
            <a
              href={`https://news.ycombinator.com/item?id=${id}`}
              target="_blank"
              rel="noreferrer"
            >
              {`${kids && kids.length > 0 ? kids.length : 0} comments`}
            </a>
            <br />
            <p>
              <strong>Upvotes:</strong> {score}
            </p>
          </div>
          <div className="col-2">
            <button
              className="btn btn-sm btn-danger m-3"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={read}
                onClick={() => handleRead(id)}
              />
              <label className="form-check-label">Mark as Read</label>
            </div>
          </div>
        </div>
        {showCommentId === id &&
          comments.map((comment, i) => (
            <div className="row m-2 p-2 border">
              <div className="col-2">
                <small>
                  <strong>{comment.by}</strong>
                </small>
                <br />
                <small>
                  {new Date(comment.time * 1000).toLocaleDateString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </small>
              </div>
              <div className="col-9">
                <small>{comment.text}</small>
              </div>
              <div></div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default Article;
