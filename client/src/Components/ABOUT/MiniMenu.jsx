import Wrapper from "../../assets/wrappers/Mini";
import { Link } from "react-router-dom";

export const MiniMenu = () => {
  return (
    <section className="section">
      <Wrapper>
        <div className="MiniMenuLeft">
          <img
            src="https://images.unsplash.com/photo-1543702404-38c2035462ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHx3b3JzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="image-flex"
          />
          <Link to="/about/our-beliefs">
            <button className="btnn btn-relative">Our Beliefs</button>
          </Link>
        </div>
        <div className="MiniMenuRight">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGJpYmxlJTIwc3R1ZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="image-flex"
          />
          <Link to="/about/our-history">
            <button className="btnn btn-relative">Our History </button>
          </Link>
        </div>
      </Wrapper>
    </section>
  );
};
