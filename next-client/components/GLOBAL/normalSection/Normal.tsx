import React from "react";

export const Normal = (props) => {
  return (
    <section className="section primary">
      <h1 className="title primary">{props.title}</h1>
      <p>{props.paragraph}</p>
    </section>
  );
};
