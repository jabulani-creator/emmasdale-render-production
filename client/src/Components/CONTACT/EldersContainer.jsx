import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../Loading";
import Pastor from "./Pastor";
const EldersContainer = () => {
  const { getElders, elders, isLoading } = useAppContext();

  useEffect(() => {
    getElders();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (elders.length === 0) {
    return (
      <Wrapper>
        <h2>NO Elders to display</h2>
      </Wrapper>
    );
  }

  return (
    <section className="leader section">
      {elders.map((leader) => {
        return <Pastor key={leader._id} {...leader} />;
      })}
    </section>
  );
};

export default EldersContainer;
