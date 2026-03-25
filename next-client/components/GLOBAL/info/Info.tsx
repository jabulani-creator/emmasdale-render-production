import Wrapper from '../../../app/assets/wrappers/Info'
import Image from 'next/image'

export const Info = ({image, name, phone, email, position}) => {
  return (
    <Wrapper>
        <div className='ImageContainer relative w-full h-[400px]'>
         <Image src={image || ""} alt={name || "Image"} fill className="img img-circle object-cover" />
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
