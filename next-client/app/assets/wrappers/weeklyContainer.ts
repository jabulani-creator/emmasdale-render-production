import styled from 'styled-components'

const Wrapper = styled.section`
 width: var(--fluid-width);
 margin: auto;
background-color: var(--primary-500);
color: var(--white);
text-align: center;
padding: 20px 0 20px 0;

@media screen and (max-width: 768px){
    width: 100%;
}
`

export default Wrapper