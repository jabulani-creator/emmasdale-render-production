import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto 100px auto;

  @media screen and (max-width: 768px) {
    margin: 50px auto 50px auto;
  }

  .SabbathSchoolMessage {
    flex: 1;
    line-height: var(--line-height);
  }

  .LessonLink {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Wrapper;
