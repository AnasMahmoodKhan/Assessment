import React from "react";

const Article = ({
  id,
  title,
  time,
  kids,
  handleDelete,
  score,
  read,
  handleRead,
}) => {
  return (
    <React.Fragment key={id}>
      <div className={`container p-2 m-1 border`}>
        <div className={`row`}>
          <div className="col-8">
            <h5>{title}</h5>
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
          <div className="col-4">
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
      </div>
    </React.Fragment>
  );
};

export default Article;
