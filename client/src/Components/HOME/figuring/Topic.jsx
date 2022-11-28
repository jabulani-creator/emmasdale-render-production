import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export const Topic = ({ postTitle, postDesc, _id, createdAt, postPhoto }) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <div className="topic">
      <div className="topic-image">
        <img src={postPhoto} alt="" className="img-topic" />
      </div>
      <div className="read-content">
        <h4>{postTitle}</h4>
        <small>{date}</small>
        <p>{readMore ? postDesc : `${postDesc.substring(0, 300)}...`}</p>
        <button className="btnn">
          <Link to={`/post/${_id}`}>Read Now</Link>
        </button>
      </div>
    </div>
  );
};
