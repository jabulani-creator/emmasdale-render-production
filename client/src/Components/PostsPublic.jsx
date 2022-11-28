import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export const PostsPublic = ({
  postTitle,
  postDesc,
  _id,
  createdAt,
  postPhoto,
}) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image">
        <img src={postPhoto} alt="" className="img-topic" />
      </div>
      <div className="read-content">
        <h5>{postTitle}</h5>
        <small>{date}</small>
        <p>{readMore ? postDesc : `${postDesc.substring(0, 200)}`}</p>
        <button className="btnn">
          <Link to={`/post/${_id}`}>Read Now</Link>
        </button>
      </div>
    </div>
  );
};
