import Wrapper from '../../../assets/wrappers/Normal'
import { Link } from 'react-router-dom'

export const NormalFlexReverse = ({title, message, cta, image}) => {
  return (
    <Wrapper>
      <div className='MessageContainer'>
            <h2 className='title left primary'>{title}</h2>
            <p className="subtitle left">{message}</p>
            <Link to='our-beliefs' >
                <button className="btnn">{cta}</button>
                 </Link>
        </div>
        <div className='ImageContainer'>
          <img src={image} alt="" className="img" />
        </div>
    </Wrapper>
  )
}
