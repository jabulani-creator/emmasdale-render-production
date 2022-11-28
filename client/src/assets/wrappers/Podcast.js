import styled from "styled-components";

const Wrapper = styled.section`
  width: var(--fluid-width);
  margin: auto;
  position: relative;

  .PodcastImage {
    width: var(--fluid-width);
    margin: auto;
  }
  .PodcastMessage {
    position: absolute;
    top: 50%;
    left: 35%;
    text-align: center;
    color: #fff;

    @media screen and (max-width: 768px) {
      left: 3%;
    }
  }
`;
export default Wrapper;
