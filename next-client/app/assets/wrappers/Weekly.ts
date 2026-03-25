import styled from 'styled-components'

const Wrapper = styled.section`
width: var(--fluid-width);
margin: auto;
background-color: var(--primary-500);
color: var(--white);
padding: 4px 20px 15px 20px;
margin: 30px 0;

@media screen and (max-width: 768px){
    width: 100%;
}
.Time{
color: var(--white);
@media screen and (max-width: 768px) {
     font-size: 90%;
 }
}
`
export default Wrapper