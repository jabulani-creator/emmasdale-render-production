import moment from "moment";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";

export const Health = ({
  _id,
  healthTitle,
  healthDesc,
  createdAt,
  healthPhoto,
}) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  const { deleteHealthPost } = useAppContext();

  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image">
        <img src={healthPhoto} alt="" className="img-topic" />
      </div>
      <div className="read-content">
        <h5>{healthTitle}</h5>
        <small>{date}</small>
        <p>{readMore ? healthDesc : `${healthDesc.substring(0, 200)}`}</p>
      </div>
      <footer>
        <div className="actions">
          {/* <Link
            to="/admin/add-health"
            onClick={() => setEditHealthPost(_id)}
            className="btn edit-btn"
          >
            Edit
          </Link> */}
          <button
            type="button"
            className="btn btn-block delete-btn"
            onClick={() => deleteHealthPost(_id)}
          >
            Delete
          </button>
        </div>
      </footer>
    </div>
  );
};
