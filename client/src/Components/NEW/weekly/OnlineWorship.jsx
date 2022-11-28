import { AiTwotoneClockCircle } from "react-icons/ai";
import Wrapper from "../../../assets/wrappers/Online";

export const OnlineWorship = () => {
  return (
    <Wrapper>
      <h1 className="title">join us online this saturday</h1>
      <h5 className="Time">
        Main Service{" "}
        <span>
          <AiTwotoneClockCircle />
        </span>
        10:00 AM - 12:00 PM
      </h5>
      <a href="https://www.facebook.com/emmasdalesda">
        <button className="btnn">Join Our Live Service</button>
      </a>
    </Wrapper>
  );
};
