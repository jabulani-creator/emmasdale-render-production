import { useState } from "react";
import { Mini } from "./Mini";
import Min from "./ministryData";

export const Ministry = () => {
  /* eslint-disable no-unused-vars */
  const [data, setData] = useState(Min);
  /* eslint-disable no-unused-vars */
  return (
    <main>
      <section className="photos">
        <div className="photos-center">
          {data.map((item) => {
            return <Mini key={item.id} {...item} />;
          })}
        </div>
      </section>
    </main>
  );
};
