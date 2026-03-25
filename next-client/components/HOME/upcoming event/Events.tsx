"use client";

import dynamic from "next/dynamic";
import EventCard from "./Event/EventCard";
import Wrapper from "../../../app/assets/wrappers/Events";

const Carousel = dynamic(() => import("react-elastic-carousel"), {
  ssr: false,
});

export const Events = ({ events = [] }) => {
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];

  return (
    <Wrapper>
      <section className="Slider">
        <h1 className="title">Upcoming Events</h1>
        <div>
          {/* @ts-ignore */}
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
