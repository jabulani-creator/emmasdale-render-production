import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content
  text-align: center;
  margin: 1.5rem;


  .ImageContainer {
    width:90px;
    height:90px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;

    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
    @media screen and(min-width:2000px) {
      height: 150px;
      width: 150px;
    }
    @media screen and(min-width:450px) {
      height: 70px;
      width: 70px;
    }

  }
  

  .Details {
    flex:1;
    display: flex;
    flex-direction: column;
    width:100%;
    height:90px;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:0.5rem;

    .con {
      font-size: 60%;
      color: var(--primary-500);
    }
    @media screen and(min-width:2000px) {
      margin: 1rem 2rem;
      margin-top:1rem;
    }
  }
`;
export default Wrapper;
