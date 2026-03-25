import styled from 'styled-components'


const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin: 50px 0 0 0;


@media screen and (max-width: 768px){
    flex-direction: column;
}
.MiniMenuLeft {
 flex: 1;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

@media screen and (max-width: 768px){
    width: var(--fluid-width);
}

}
.MiniMenuRight{
flex: 1;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
}

`
export default Wrapper