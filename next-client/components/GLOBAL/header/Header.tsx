import Wrapper from "../../../app/assets/wrappers/Header";

export const Header = (props) => {
  return (
    <>
      <Wrapper>
        <div className="HeroContainer">
          <h1 className="HeroTitle">{props.title}</h1>
        </div>
      </Wrapper>
    </>
  );
};
