import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../Loading";
import Pastor from "./Pastor";
const PastorsContainer = () => {
  const { getPastors, pastors, isLoading } = useAppContext();

  useEffect(() => {
    getPastors();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (pastors.length === 0) {
    return (
      <Wrapper>
        <h2>NO Pastors to display</h2>
      </Wrapper>
    );
  }

  return (
    <section className="pastor section">
      {pastors.map((leader) => {
        return <Pastor key={leader._id} {...leader} />;
      })}
    </section>
  );
};

export default PastorsContainer;
