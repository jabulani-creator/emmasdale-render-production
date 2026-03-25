import styled from "styled-components";

const wrapper = styled.section`
  .nav {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-500);
    position: relative;
    z-index: 1;

    .nav-center {
      width: 90vw;
      max-width: 1170px;

      .nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btnn {
          font-size: 1rem;
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius);
          border-color: transparent;
          color: white;
          background: var(--clr-black);
          cursor: pointer;
          transition: var(--transition);

          &:hover {
            background: var(--clr-grey-5);
          }
        }
      }
      .nav-links {
        display: none;
      }
    }
  }
  @media screen and (min-width: 800px) {
    .nav {
      .nav-center {
        display: grid;
        grid-template-columns: 3fr auto;
        align-items: center;
        .toggle-btn {
          display: none;
        }
        .nav-links {
          display: block;
          justify-self: center;
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          text-align: center;
          text-transform: UPPERCASE;
          height: 100%;
          display: grid;
          align-items: center;

          li {
            height: 100%;

            .link-btn {
              height: 100%;
              background: transparent;
              border-color: transparent;
              font-size: 1.1rem;
              color: white;
              letter-spacing: 1px;
              width: 10rem;
              text-transform: UPPERCASE;
            }
          }
        }
        .signin-btn {
          display: inline-block;
        }
      }
    }
  }
`;
export default wrapper;
