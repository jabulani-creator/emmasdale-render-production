import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../Loading";
import Pastor from "./Pastor";
const WorkersContainer = () => {
  const { getWorkers, workers, isLoading } = useAppContext();

  useEffect(() => {
    getWorkers();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (workers.length === 0) {
    return (
      <Wrapper>
        <h2>NO Workers to display</h2>
      </Wrapper>
    );
  }

  return (
    <section className="leader section">
      {workers.map((leader) => {
        return <Pastor key={leader._id} {...leader} />;
      })}
    </section>
  );
};

export default WorkersContainer;
