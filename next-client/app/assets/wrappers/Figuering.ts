import styled from 'styled-components'

const Wrapper = styled.div`
 display: flex;
 justify-content: space-between;

 @media screen and (max-width: 768px){
    flex-direction: column;
}
`
export default Wrapper