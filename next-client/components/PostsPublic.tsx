"use client";

import { useState } from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export const PostsPublic = ({
  postTitle,
  postDesc,
  _id,
  createdAt,
  postPhoto,
}: any) => {
  /* eslint-disable no-unused-vars */
  const [readMore, setReadMore] = useState(false);
  /* eslint-disable no-unused-vars */
  let date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <div className="topic" style={{ width: "90%", margin: "auto" }}>
      <div className="topic-image relative w-full h-48">
        <Image src={postPhoto} alt={postTitle || "Post"} fill className="img-topic object-cover" />
      </div>
      <div className="read-content">
        <h5>{postTitle}</h5>
        <small>{date}</small>
        <p>{readMore ? postDesc : `${postDesc.substring(0, 200)}`}</p>
        <button className="btnn">
          <Link href={`/post/${_id}`}>Read Now</Link>
        </button>
      </div>
    </div>
  );
};
