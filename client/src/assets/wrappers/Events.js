import styled from "styled-components";

const Wrapper = styled.section`
  width: 100vw;
  background: var(--primary-500);
  color: var(--white);
  text-align: center;
  padding: 50px 0;

  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }

  .Slider {
    width: var(--fluid-width);
    margin: auto;

    @media screen and (max-width: 768px) {
      width: 90vw;
      margin: auto;
    }
  }
`;

export default Wrapper;
