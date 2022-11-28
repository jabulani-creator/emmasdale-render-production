import Wrapper from "../../../assets/wrappers/EventCard";
import { Link } from "react-router-dom";

const Card = ({ image, name, message, path }) => {
  return (
    <Wrapper>
      <img className="carousel-image group-image" src={image} alt={name} />

      <div className="Overlay"></div>
      <div className="MessageDesc">
        <h5 className="title">{name}</h5>
        <hr />
        <small>{message}</small>
        <button className="btn ">
          <Link to={path} state={{ cursor: "pointer" }}>
            Learn More
          </Link>
        </button>
      </div>
    </Wrapper>
  );
};

export default Card;
