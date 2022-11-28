import { useEffect } from "react";
import { useAppContext } from "../../../context/appContext";
import Carousel from "react-elastic-carousel";
import EventCard from "./Event/EventCard";
import Wrapper from "../../../assets/wrappers/Events";

export const Events = () => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  const { getEvents, events } = useAppContext();
  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <section className="Slider">
        <h1 className="title">Upcoming Events</h1>
        <div>
          <Carousel breakPoints={breakPoints} showArrows={false}>
            {events.map((event) => {
              return <EventCard key={event._id} {...event} />;
            })}
          </Carousel>
        </div>
      </section>
    </Wrapper>
  );
};
