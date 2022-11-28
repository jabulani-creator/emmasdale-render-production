import moment from "moment";
import { MdPlace } from "react-icons/md";
import { AiTwotoneClockCircle } from "react-icons/ai";
import { useAppContext } from "../../context/appContext";

export const Events = ({
  _id,
  // eventDate,
  venue,
  time,
  eventPhoto,
  eventTitle,
}) => {
  // let date = moment(eventDate);
  // date = date.format("MMM Do");
  let Time = moment(time, "HH:mm:ss").format("hh:mm A");
  const { deleteEvent } = useAppContext();
  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image">
        <img src={eventPhoto} alt="" className="event-image" />
      </div>
      <div className="read-content">
        <h5 className="mini-title center">{eventTitle}</h5>
        <div className="venue">
          <small className="time">
            <AiTwotoneClockCircle className="small-icon" />
            {Time}
          </small>
          <small className="time">
            <MdPlace className="small-icon" />
            {venue}
          </small>
        </div>
        <button
          type="button"
          className="btn btn-block delete-btn"
          onClick={() => deleteEvent(_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
