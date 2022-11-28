import moment from "moment";
import { MdPlace } from "react-icons/md";
import { AiTwotoneClockCircle } from "react-icons/ai";
const EventCard = ({ eventDate, venue, time, eventPhoto, eventTitle }) => {
  let date = moment(eventDate);
  date = date.format("MMM Do");
  let Time = moment(time, "HH:mm:ss").format("hh:mm A");
  return (
    <section>
      <div className="image">
        <img src={eventPhoto} alt="" className="event-image" />
        <div className="date">{date}</div>
        <div className="evemt-message">
          <small className="event">{eventTitle}</small>
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
        </div>
      </div>
    </section>
  );
};

export default EventCard;
