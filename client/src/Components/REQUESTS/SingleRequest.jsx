import moment from "moment";
import { useAppContext } from "../../context/appContext";
export const SingleRequest = ({
  _id,
  name,
  email,
  phone,
  purpose,
  createdAt,
  message,
}) => {
  const { deleteRequest } = useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <div className="topic request" style={{ width: "90%", margin: "auto" }}>
      <div className="request-purpose">
        <div className="main-icon">{purpose.charAt(0)}</div>
        <div className="request-data">
          <h5>{name}</h5>
          <h5>{purpose}</h5>
        </div>
      </div>
      <div>
        <div className="request-date">
          <small>
            <strong>Email</strong> : {email}
          </small>
          <small>
            <strong>Phone</strong>: {phone}
          </small>
        </div>
        <small>Planned Visit Date: {date}</small>
        <p>{message}</p>

        <footer>
          <div className="actions">
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => deleteRequest(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
