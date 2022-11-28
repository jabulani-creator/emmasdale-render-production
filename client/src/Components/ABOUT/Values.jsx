import { useState } from "react";
import Wrapper from "../../assets/wrappers/Values";
import { values } from "./individualbelief/beliefData";
export const Values = () => {
  /* eslint-disable no-unused-vars */
  const [data, setData] = useState(values);
  /* eslint-disable no-unused-vars */
  return (
    <section className="section">
      <h1 className="title primary">our values</h1>
      <Wrapper>
        {data.map(({ id, title, message }) => {
          return (
            <div className="value" key={id}>
              <h4>{title}</h4>
              <p>{message}</p>
            </div>
          );
        })}
      </Wrapper>
    </section>
  );
};
