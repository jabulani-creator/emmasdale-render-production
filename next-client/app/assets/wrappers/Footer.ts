import styled from 'styled-components'

const Wrapper = styled.section`
display: flex;
width: var(--fluid-width);
margin: auto;
padding: 40px 0;

@media screen and (max-width: 768px){
    flex-direction: column;
    width: var(--fluid-width);
    padding-bottom: 50px;
    align-items: flex-start;
}

.Last{
flex: 3;
display: flex;
height: 90%;

@media screen and (max-width: 768px){
    width: var(--fluid-width);
}
}

.Mission{
flex: 2;
@media screen and (max-width: 768px){
   margin-bottom: 40px;
}
}
.Contact{
flex: 2;
@media screen and (max-width: 768px){
   margin-bottom: 40px;
}
}

.Socials{
    flex: 1;
}
.UsefulLinks{
    flex: 1;
}

`
export default Wrapper
