import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/JobsContainer";
import Loading from "../Loading";
import Pastor from "./Pastor";
const DepartmentContainer = () => {
  const { getPositions, leaders, isLoading } = useAppContext();

  useEffect(() => {
    getPositions();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (leaders.length === 0) {
    return (
      <Wrapper>
        <h2>NO leaders to display</h2>
      </Wrapper>
    );
  }

  return (
    <section className="leader section">
      {leaders.map((leader) => {
        return <Pastor key={leader._id} {...leader} />;
      })}
    </section>
  );
};

export default DepartmentContainer;
