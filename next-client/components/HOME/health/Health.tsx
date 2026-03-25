"use client";

import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

export const Health = ({
  _id,
  healthTitle,
  healthDesc,
  createdAt,
  healthPhoto,
}: {
  _id?: string;
  healthTitle?: string;
  healthDesc?: string;
  createdAt?: string;
  healthPhoto?: string;
}) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  let date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <section className="section primary">
      <div className="topic-image relative w-full h-48">
        <Image src={healthPhoto || ""} alt={healthTitle || "Health Tip"} fill className="img object-cover" />
      </div>
      <h4>{healthTitle}</h4>
      <small>{date}</small>
      <p className="right-paragraph">
        {readMore ? healthDesc : `${healthDesc.substring(0, 500)}...`}
        <button className="btn-read" onClick={() => setReadMore(!readMore)}>
          {readMore ? "show less" : "read more"}
        </button>
      </p>
      <button className="btnn">
        <Link href={`/health/${_id}`}>Read Now</Link>
      </button>
    </section>
  );
};
