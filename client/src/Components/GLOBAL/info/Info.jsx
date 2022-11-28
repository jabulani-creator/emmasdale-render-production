import Wrapper from '../../../assets/wrappers/Info'
export const Info = ({image, name, phone, email, position}) => {
  return (
    <Wrapper>
        <div className='ImageContainer'>
         <img src={image} alt="" className="img img-circle" />
        </div>
        <div className='Details'>
             <small className='con '>Name: {name}</small>
             <small className='con'>Position: {position}</small>
             <small className='con'>Phone: {phone}</small>
             <small className='con'>Email: {email}</small>
        </div>
    </Wrapper>
  )
}
