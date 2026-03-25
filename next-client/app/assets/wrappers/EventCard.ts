import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  .MessageDesc {
    width: 70%;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 768px) {
      width: 60%;
    }
  }
  .Overlay {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    background: linear-gradient(rgba(0, 0, 0, 0.001), var(--grey-800));
    transition: var(--transition);
  }

  hr {
    background-color: white;
    height: 2px;
    border: 0;
    margin: 0 auto;
    width: 100%;
  }
`;

export default Wrapper;
