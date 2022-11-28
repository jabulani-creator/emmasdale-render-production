import { useEffect } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Loading from "./Loading";
import { PostsPublic } from "./PostsPublic";

export const PostsContainerPublic = () => {
  const { getPosts, posts, isLoading, page, totalPost, sort, search } =
    useAppContext();

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
        <Link to={`/`}>Back Home</Link>
      </button>
    </Wrapper>
  );
};
