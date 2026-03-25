"use client";

import React, { useState } from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";

export const Topic = ({
  postTitle,
  postDesc,
  _id,
  createdAt,
  postPhoto,
}: {
  postTitle?: string;
  postDesc?: string;
  _id?: string;
  createdAt?: string;
  postPhoto?: string;
}) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <div className="topic">
      <div className="topic-image relative w-full h-48">
        <Image src={postPhoto || ""} alt={postTitle || "Post"} fill className="img-topic object-cover" />
      </div>
      <div className="read-content">
        <h4>{postTitle}</h4>
        <small>{date}</small>
        <p>{readMore ? postDesc : `${postDesc.substring(0, 300)}...`}</p>
        <button className="btnn">
          <Link href={`/post/${_id}`}>Read Now</Link>
        </button>
      </div>
    </div>
  );
};
