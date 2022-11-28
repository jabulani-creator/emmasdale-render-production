import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer, NewSidebar, PageHero } from "../../Components/GLOBAL";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/singlePost";
import Loading from "../../Components/Loading";
import axios from "axios";

export const SinglePost = () => {
  const { postId } = useParams();
  const { token } = useAppContext();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    getSinglePost(postId);
    // eslint-disable-next-line
  }, [postId, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const { postTitle, postDesc, postPhoto } = post;

  return (
    <>
      <NewSidebar />
      <PageHero title={postTitle} />
      <section className="section">
        <Wrapper>
          <img src={postPhoto} alt={postTitle} className="img" />
        </Wrapper>
        <div>
          <h4 className="title primary left">{postTitle}</h4>
          <p className="right-paragraph">{postDesc}</p>
        </div>
        <button className="btnn" style={{ marginBottom: "20px" }}>
          <Link to={`/`}>Back to more posts</Link>
        </button>
      </section>
      <Footer />
    </>
  );
};
