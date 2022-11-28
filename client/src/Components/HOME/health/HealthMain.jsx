import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/appContext";
import { Health } from "./Health";

export const HealthMain = () => {
  const { getHealthPost, healthPosts } = useAppContext();

  useEffect(() => {
    getHealthPost();
    // eslint-disable-next-line
  }, []);
  return (
    <section className="section primary">
      <h1 className="title">weekly health tip</h1>
      <div>
        {healthPosts.map((tip) => {
          return <Health key={tip._id} {...tip} />;
        })}
      </div>
      <button className="btn" style={{ margin: "20px 0" }}>
        <Link to={`/all-health-posts`}>See more health tips</Link>
      </button>
    </section>
  );
};
