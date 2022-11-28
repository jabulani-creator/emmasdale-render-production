import styled from "styled-components";


const Wrapper = styled.section`
width: var(--fluid-width);
margin: auto;

.Item {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;

@media screen and (max-width: 768px){
    flex-direction: column;
    margin: auto;
}
}

`
export default Wrapper