import moment from "moment";
import { MdPlace } from "react-icons/md";
import { AiTwotoneClockCircle } from "react-icons/ai";
import Image from "next/image";
const EventCard = ({ eventDate, venue, time, eventPhoto, eventTitle }: {
  eventDate?: string;
  venue?: string;
  time?: string;
  eventPhoto?: string;
  eventTitle?: string;
}) => {
  let date = moment(eventDate).format("MMM Do");
  let Time = moment(time, "HH:mm:ss").format("hh:mm A");
  return (
    <section>
      <div className="image relative w-full h-48">
        <Image src={eventPhoto} alt={eventTitle || "Event"} fill className="event-image object-cover" />
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
