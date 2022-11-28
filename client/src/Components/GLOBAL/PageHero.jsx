import { Link } from "react-router-dom";
import Wrapper from "../../assets/wrappers/PageHero";
import { useAppContext } from "../../context/appContext";

const PageHero = ({ title }) => {
  const { closeSubmenu } = useAppContext();
  return (
    <Wrapper onMouseOver={closeSubmenu}>
      <div className="section-center">
        <h3>
          <Link to="/"></Link>
        </h3>
      </div>
    </Wrapper>
  );
};

export default PageHero;
