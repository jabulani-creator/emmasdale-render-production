import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .value {
    padding: 1rem 1.5rem;
    border: 2px solid var(--clr-grey-special);
    margin-bottom: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
    border-radius: var(--borderRadius);
    box-shadow: var(--light-shadow);
    background-color: var(--grey-400);

    h4 {
      text-transform: none;
      line-height: 1.5;
    }
    p {
      color: var(--clr-grey-3);
      margin-bottom: 0;
      margin-top: 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    height: 150x;
  }
`;

export default Wrapper;
