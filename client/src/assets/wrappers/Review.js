import styled from 'styled-components'

const Wrapper = styled.section`
width: 100vw;
color: var(--white);
padding: 50px 0;

.Slider{
 width: var(--fluid-width);
 margin: auto;

 @media screen and (max-width: 768px ){
     width: 100%;
 }
}
`
export default Wrapper
