import styled from "styled-components";

const Wrapper = styled.section`
  width: var(--fluid-width);
  display: flex;
  margin: 100px auto;
  .left_align {
    text-align: left;
    margin: 50px auto 10px auto;
    text-transform: uppercase;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 0 auto 100px auto;
  }

  .PrayerMessage {
    flex: 1;
    margin: 30px;
    @media screen and (max-width: 768px) {
      margin: 0;
    }
  }

  .PrayerImage {
    flex: 1;
    width: 100%;
    height: 100%;
  }
`;
export default Wrapper;
