import Wrapper from "../../assets/wrappers/Leader";

const Pastor = ({ name, phone, email, position, photo }) => {
  return (
    <Wrapper>
      <div className="ImageContainer">
        <img src={photo} alt={position} className="img img-circle" />
      </div>
      <div className="Details">
        <small className="con ">Name: {name}</small>
        <small className="con">Position: {position}</small>
        <small className="con">Phone: {phone}</small>
        <small className="con">Email: {email}</small>
      </div>
    </Wrapper>
  );
};

export default Pastor;
