"use client";

import { useEffect } from "react";
import Link from "next/link";
import Wrapper from "../app/assets/wrappers/JobsContainer";
import { useDataStore } from "../store/useDataStore";
import { useFormStore } from "../store/useFormStore";
import Loading from "./Loading";
import { PostsPublic } from "./PostsPublic";

export const PostsContainerPublic = () => {
  const { getPosts, posts, isLoading, totalPost } = useDataStore();
  const { page, sort, search } = useFormStore();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, [search, sort, page]);

  if (isLoading) {
    return <Loading />;
  }
  if (posts.length === 0) {
    return (
      <Wrapper>
        <h2>NO post to display</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalPost} Post{posts.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {posts.map((post) => {
          return <PostsPublic key={post._id} {...post} />;
        })}
      </div>
      <button className="btn" style={{ marginBottom: "20px" }}>
        <Link href={`/`}>Back Home</Link>
      </button>
    </Wrapper>
  );
};
