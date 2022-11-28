import { AiTwotoneClockCircle } from "react-icons/ai";
import Wrapper from "../../../assets/wrappers/Worship";

export const Worship = () => {
  return (
    <section className="section center">
      <h1 className="title primary">Worship with us</h1>
      <p className="subtitle">
        Come we that love the lord and let ours joys be known join in a song
        with Genesis 2:5
      </p>
      <h2 style={{ color: "#083183" }}>Worship time</h2>
      <Wrapper>
        <div className="WorshipLeft">
          <div className="WorshipTimes">
            <div>
              <h3 className="SabbathHeader">Sabbath Worship (SAT)</h3>
              <h5 className="Time">
                <small className="w">Sabbath School</small>
                <span>
                  <AiTwotoneClockCircle />
                  08:00 AM - 09:00 AM
                </span>{" "}
              </h5>
              <h5 className="Time">
                <small className="w">Main Service</small>
                <span>
                  <AiTwotoneClockCircle /> 10:00 AM - 12:00 PM
                </span>{" "}
              </h5>
              <h5 className="Time">
                <small className="w">Bible Study</small>
                <span>
                  <AiTwotoneClockCircle /> 02:00 PM - 05:00 PM
                </span>{" "}
              </h5>
            </div>
            <div>
              <h3 className="SabbathHeader">Weekly WEDS and FRI</h3>
              <div className="Time">
                <small className="w">Vespers</small>
                <span>
                  <AiTwotoneClockCircle /> 05:00 PM - 07:00 PM
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="WorshipRight">
          <img
            src="https://images.unsplash.com/photo-1622598453695-4fbaf151aadc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHdvcnNoaXB8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt=""
            className="img"
          />
        </div>
      </Wrapper>
      <a href="https://www.facebook.com/emmasdalesda">
        <button className="btnn">Join Our Live Service</button>
      </a>
    </section>
  );
};
