"use client";

import { useEffect } from "react";
import Link from "next/link";
import Wrapper from "../app/assets/wrappers/JobsContainer";
import { useDataStore } from "../store/useDataStore";
import { useFormStore } from "../store/useFormStore";
import { HealthPublic } from "./HealthPublic";
import Loading from "./Loading";

export const PublicHealthContainer = () => {
  const {
    getHealthPost,
    healthPosts,
    totalHealthPost,
    isLoading,
  } = useDataStore();

  const { page, search, sort } = useFormStore();

  useEffect(() => {
    getHealthPost();
    // eslint-disable-next-line
  }, [search, sort, page]);

  if (isLoading) {
    return <Loading />;
  }
  if (healthPosts.length === 0) {
    return (
      <Wrapper>
        <h2>NO health tip to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalHealthPost} Health Post{healthPosts.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {healthPosts.map((post) => {
          return <HealthPublic key={post._id} {...post} />;
        })}
      </div>
      <button className="btn" style={{ marginBottom: "20px" }}>
        <Link href={`/`}>Back Home</Link>
      </button>
    </Wrapper>
  );
};
