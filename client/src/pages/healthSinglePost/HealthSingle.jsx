import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer, NewSidebar, PageHero } from "../../Components/GLOBAL";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/singlePost";
import Loading from "../../Components/Loading";
import axios from "axios";

export const HealthSingle = () => {
  const { healthId } = useParams();
  const { token } = useAppContext();
  const [health, setHealth] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSingleHealth = async () => {
      try {
        const response = await axios.get(`/api/v1/health/${healthId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHealth(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    getSingleHealth(healthId);
    // eslint-disable-next-line
  }, [healthId, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  const { healthTitle, healthDesc, healthPhoto } = health;

  return (
    <>
      <NewSidebar />
      <PageHero title={healthTitle} />
      <section className="section">
        <Wrapper>
          <img src={healthPhoto} alt={healthTitle} className="img" />
        </Wrapper>
        <div>
          <h4 className="title primary left">{healthTitle}</h4>

          <p className="right-paragraph">{healthDesc}</p>
        </div>
        <button className="btnn" style={{ marginBottom: "20px" }}>
          <Link to={`/`}>Back to more Health Tips</Link>
        </button>
      </section>
      <Footer />
    </>
  );
};
