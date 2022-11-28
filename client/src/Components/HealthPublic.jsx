import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export const HealthPublic = ({
  healthTitle,
  healthDesc,
  _id,
  createdAt,
  healthPhoto,
}) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");

  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image">
        <img src={healthPhoto} alt="" className="img-topic" />
      </div>
      <div className="read-content">
        <h5>{healthTitle}</h5>
        <small>{date}</small>
        <p>{readMore ? healthDesc : `${healthDesc.substring(0, 200)}`}</p>
        <button className="btnn">
          <Link to={`/health/${_id}`}>Read Now</Link>
        </button>
      </div>
    </div>
  );
};
