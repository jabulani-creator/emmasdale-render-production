import styled from "styled-components";

const Wrapper = styled.nav`
  background: var(--primary-500);
  height: var(--nav-height);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }

  .NavbarContainer {
    display: flex;
    justify-content: space-between;
    height: var(--nav-height);
    z-index: 1;
    padding: 0;
    width: var(--fluid-width);
  }

  .NavLogo {
    color: var(--white);
    display: flex;
    align-items: center;
    justify-self: flex-start;
    cursor: pointer;
    font-weight: bold;
  }
  .MobileIcon {
    display: none;

    @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
      color: var(--white);
    }
  }
  .NavMenu {
    display: flex;
    align-items: center;
    list-style: none;

    @media screen and (max-width: 768px) {
      display: none;
    }

    .NavItem {
      height: 80px;
      color: var(--white);
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0 1rem;
      height: 100%;
      cursor: pointer;
      text-transform: uppercase;
    }
  }
`;

export default Wrapper;
