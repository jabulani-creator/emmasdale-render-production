import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  margin-top: -5rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 65%;
    top: 0;
    left: 0;
    background: url(./images/hero.svg);
    background-size: cover;
    background-repeat: no-repeat;
    z-index: -1;
  }
  .hero-center {
    width: 90vw;
    max-width: var(--max-width);
    display: grid;
    align-items: center;

    .hero-info {
      h1 {
        text-transform: none;
        max-width: 500px;
        margin-bottom: 2rem;
      }
      p {
        max-width: 35em;
        line-height: 1.8;
      }
    }
    @media screen and (min-width: 800px) {
      &::before {
        background-size: contain;
        height: 100%;
      }
      .hero-center {
        grid-template-columns: 2fr 1fr;
        .hero-info {
          h1 {
            font-size: 3rem;
          }
          p {
            font-size: 1.25rem;
          }
        }
      }
    }
  }
`;

export default Wrapper;
