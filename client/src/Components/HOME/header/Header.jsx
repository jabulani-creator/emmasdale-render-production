import { Link } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/Hero";

export const Header = () => {
  return (
    <>
      <Wrapper>
        <div className="HeroContainer">
          <h1 className="HeroTitle">
            Welcome to <br />
            Emmasdale Sda Church
          </h1>
          <p className="subtitle HeroPara">
            The Perfect Place for People Who Are Not, Whatever You Have Been
            Through, Wherever you have been, This Is The Right Place
          </p>
          <Link to="/new">
            <button className="btnn">I am New to Emmasdale</button>
          </Link>
        </div>
      </Wrapper>
    </>
  );
};
