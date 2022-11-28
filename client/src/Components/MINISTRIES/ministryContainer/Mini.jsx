import { Link } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/EventCard";

export const Mini = ({ image, path, name }) => {
  return (
    <Wrapper>
      <Link to={path}>
        <img className=" img" src={image} alt={name} />
        <div className="Overlay"></div>
        <div className="MessageDesc">
          <h4 className="title" style={{ color: "#fff", fontWeight: "700" }}>
            {name}
          </h4>
        </div>
      </Link>
    </Wrapper>
  );
};
