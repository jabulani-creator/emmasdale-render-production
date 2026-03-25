import styled from "styled-components";

const Wrapper = styled.header`
  background: var(--primary-500);
  height: calc(100vh - 80px);
  color: var(--white);

  .HeroContainer {
    width: var(--fluid-width);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
  .HeroTitle {
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing);
    line-height: var(--line-height);
  }
`;

export default Wrapper;
