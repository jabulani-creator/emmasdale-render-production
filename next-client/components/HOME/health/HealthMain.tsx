import React from "react";
import Link from "next/link";
import { Health } from "./Health";

export const HealthMain = ({ healthPosts = [] }) => {
  return (
    <section className="section primary">
      <h1 className="title">weekly health tip</h1>
      <div>
        {healthPosts.map((tip) => {
          return <Health key={tip._id} {...tip} />;
        })}
      </div>
      <button className="btn" style={{ margin: "20px 0" }}>
        <Link href={`/all-health-posts`}>See more health tips</Link>
      </button>
    </section>
  );
};
