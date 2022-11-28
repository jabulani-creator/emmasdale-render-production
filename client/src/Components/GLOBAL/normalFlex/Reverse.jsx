import Wrapper from "../../../assets/wrappers/Reverse";

export const Reverse = ({ title, message, time, service, image, learn }) => {
  return (
    <Wrapper>
      <div className="MessageContainer">
        <h2 className="left_align  primary">{title}</h2>
        <p className="subtitle left">{message}</p>
        <h5 className="Time">
          {service} {time}
        </h5>
      </div>
      <div className="ImageContainer">
        <img src={image} alt="" className="img" />
      </div>
    </Wrapper>
  );
};
