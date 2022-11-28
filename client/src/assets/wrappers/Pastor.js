import styled from 'styled-components'

const Wrapper = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 80px 0;

 @media screen and (max-width: 768px) {
     flex-direction: column;
 }

 .LeftContainer {
flex: 1;
 display: flex;
 align-items: center;
 flex-direction: column; 

 .Name {
    margin: 30px;
 }
 }
 .MessageContainer {
 flex: 1;
 font-size: 150%;  
 }
`
export default Wrapper
