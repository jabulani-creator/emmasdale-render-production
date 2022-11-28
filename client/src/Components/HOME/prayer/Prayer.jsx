import { Link } from "react-router-dom";
import Wrapper from "../../../assets/wrappers/Prayer";

export const Prayer = () => {
  return (
    <Wrapper>
      <div className="PrayerMessage">
        <h1 className="primary left_align">What troubles you today?</h1>
        <p className="subtitle left">
          you dont have to go through tough times by yourself. We are here to
          give your support through prayers and visitations. Thats what family
          is for.
        </p>
        <Link to="/contact">
          <button className="btnn" style={{ marginBottom: "20px" }}>
            Yes Pray for me
          </button>
        </Link>
      </div>
      <div className="PrayerImage">
        <img
          src="https://images.unsplash.com/photo-1543702474-2c562b1845eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJheWVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
          className="img"
        />
      </div>
    </Wrapper>
  );
};
