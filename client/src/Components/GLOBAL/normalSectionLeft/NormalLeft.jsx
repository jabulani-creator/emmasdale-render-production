import React, { useState } from "react";

export const NormalLeft = ({ title, paragraph }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <section className="section primary left">
      <h1 className="left_align">{title}</h1>
      <p className="right-paragraph">
        {readMore ? paragraph : `${paragraph.substring(0, 400)}...`}
        <button className="btn-read" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "read more"}
        </button>
      </p>
    </section>
  );
};
