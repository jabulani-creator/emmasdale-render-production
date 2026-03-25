"use client";

import { useState } from "react";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";

export const HealthPublic = ({
  healthTitle,
  healthDesc,
  _id,
  createdAt,
  healthPhoto,
}: {
  healthTitle?: string;
  healthDesc?: string;
  _id?: string;
  createdAt?: string;
  healthPhoto?: string;
}) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image relative w-full h-48">
        <Image src={healthPhoto || ""} alt={healthTitle || "Health Tip"} fill className="img-topic object-cover" />
      </div>
      <div className="read-content">
        <h5>{healthTitle}</h5>
        <small>{date}</small>
        <p>{readMore ? healthDesc : `${healthDesc.substring(0, 200)}`}</p>
        <button className="btnn">
          <Link href={`/health/${_id}`}>Read Now</Link>
        </button>
      </div>
    </div>
  );
};
