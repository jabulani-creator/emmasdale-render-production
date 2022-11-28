import styled from "styled-components";

const Wrapper = styled.section`
  .app__navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--gray-color);

    padding: 1rem 2rem;

    position: fixed;
    z-index: 2;

    .app__navbar-logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-weight: bold;

      img {
        width: 90px;
        height: 20px;

        @media screen and (min-width: 1200px) {
          width: 180px;
          height: 40px;
        }
      }
      @media screen and (min-width: 1200px) {
        padding: 0 0 0 6rem;
      }
    }
    .app__navbar-links {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      list-style: none;

      .li {
        margin: 0 1rem;
        cursor: pointer;

        flex-direction: column;

        text-decoration: none;
        flex-direction: column;

        text-transform: uppercase;
        font-weight: 700;

        transition: all 0.3s ease-in-out;

        div {
          width: 5px;
          height: 5px;
          background: transparent;
          border-radius: 50%;

          margin-bottom: 5px;
        }

        // p {
        //   color: var(--gray-color);
        //   text-decoration: none;
        //   flex-direction: column;

        //   text-transform: uppercase;
        //   font-weight: 500;

        //   transition: all 0.3s ease-in-out;

        //   &:hover {
        //     color: var(--secondary-color);
        //   }
        // }

        &:hover {
          div {
            background: var(--secondary-color);
          }
        }
      }

      @media screen and (max-width: 900px) {
        display: none;
      }
    }
    .app__navbar-menu {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 70%;
        height: 70%;
        color: #fff;
      }

      div {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 5;

        padding: 1rem;

        width: 80%;
        height: 88vh;

        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        flex-direction: column;

        background: var(--grey-200);
        background-size: cover;
        background-repeat: repeat;

        /* top box shadow */
        box-shadow: 0px 0px 20px rgba(168, 168, 168, 0.15);

        svg {
          width: 35px;
          height: 35px;
          color: var(--secondary-color);
          margin: 0.5rem 1rem;
        }

        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100%;

          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          flex-direction: column;

          .li {
            color: var(--primary-500);
            text-decoration: none;
            font-size: 1.5rem;
            text-transform: uppercase;
            font-weight: bold;
            margin: 0.71rem;

            transition: all 0.3s ease-in-out;

            &:hover {
              color: var(--secondary-color);
            }
          }
        }

        @media screen and (min-width: 900px) {
          display: none;
        }
      }

      @media screen and (min-width: 900px) {
        display: none;
      }
    }
  }
  .header-bg {
    background: var(--primary-500);
  }
`;

export default Wrapper;
