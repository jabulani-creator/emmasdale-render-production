import { useState } from "react";
import moment from "moment";
import { useAppContext } from "../context/appContext";

export const Posts = ({ postTitle, postDesc, _id, createdAt, postPhoto }) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  const { deletePost } = useAppContext();
  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image">
        <img src={postPhoto} alt="" className="img-topic" />
      </div>
      <div className="read-content">
        <h5>{postTitle}</h5>
        <small>{date}</small>
        <p>{readMore ? postDesc : `${postDesc.substring(0, 200)}`}</p>
      </div>
      <footer>
        <div className="actions">
          {/* <Link to={`/admin/edit-post/${_id}`} className="btn edit-btn">
            Edit
          </Link> */}
          <button
            type="button"
            className="btn btn-block delete-btn"
            onClick={() => deletePost(_id)}
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  );
};
