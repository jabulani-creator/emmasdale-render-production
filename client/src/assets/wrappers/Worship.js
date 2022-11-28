import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin: 50px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 30px 0;
  }

  .WorshipLeft {
    flex: 1;
    text-align: left;

    .WorshipTimes {
      @media screen and (max-width: 768px) {
        display: flex;
      }
      .SabbathHeader {
        text-transform: uppercase;
      }
      .Time {
        color: var(--primary-60);
        .w {
          text-transform: uppercase;
          font-size: 120%;
          padding-right: 10px;
          font-weight: bold;
        }
        @media screen and (max-width: 768px) {
          font-size: 90%;
          display: flex;
          //   align-items: center;
          justify-content: space-even;
          flex-direction: column;
        }
      }
    }
  }
  .WorshipRight {
    flex: 1;
    width: 100%;
    height: 100%;
  }
`;
export default Wrapper;
