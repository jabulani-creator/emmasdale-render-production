import { useEffect } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import { HealthPublic } from "./HealthPublic";
import Loading from "./Loading";

export const PublicHealthContainer = () => {
  const {
    getHealthPost,
    healthPosts,
    totalHealthPosts,
    isLoading,
    page,
    search,
    sort,
  } = useAppContext();

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
        {totalHealthPosts} Health Post{healthPosts.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {healthPosts.map((post) => {
          return <HealthPublic key={post._id} {...post} />;
        })}
      </div>
      <button className="btn" style={{ marginBottom: "20px" }}>
        <Link to={`/`}>Back Home</Link>
      </button>
    </Wrapper>
  );
};
