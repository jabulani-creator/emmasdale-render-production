import Carousel from "react-elastic-carousel";
import Card from "./Card";
import connectData from "./connectData";
import { useState } from "react";
import Wrapper from "../../../assets/wrappers/Events";

export const ConnectGroup = () => {
  /* eslint-disable no-unused-vars */
  const [groups, setGroups] = useState(connectData);
  /* eslint-disable no-unused-vars */
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 3 },
  ];
  return (
    <Wrapper>
      <section className="Slider">
        <h1 className="title">Find your Connect Group</h1>
        <div>
          <p className="connect-sub">
            Everyone has a place to belong to, join a small group where you can
            feel at home
          </p>
        </div>
        <div>
          <Carousel
            breakPoints={breakPoints}
            enableAutoPlay
            autoPlaySpeed={5000}
            showArrows={false}
          >
            {groups.map((group) => {
              return <Card key={group.id} {...group} />;
            })}
          </Carousel>
        </div>
      </section>
    </Wrapper>
  );
};
