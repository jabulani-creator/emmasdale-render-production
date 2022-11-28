import styled from "styled-components";

const Wrapper = styled.section`
  width: var(--fluid-width);
  margin: 0 auto 50px auto;
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    margin: 0 auto 20px auto;
  }

  .ImageContainer {
    flex: 1;
    width: 100%;
    height: 100%;
  }
  .MessageContainer {
    flex: 1;
    margin: 30px;
    @media screen and (max-width: 768px) {
      margin: 0;
    }
    .left_align {
      text-align: left;
      margin: 50px auto 10px auto;
      text-transform: uppercase;
    }
    .Time {
      color: var(--primary-60);
      @media screen and (max-width: 768px) {
        font-size: 90%;
      }
    }
  }
`;
export default Wrapper;
