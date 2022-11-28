import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

export const Error = () => {
  return (
    <Wrapper className='full-page'>
       <div>
           <img src={img} alt="not found" />
           <h3>Ohh! Page Not Found</h3>
           <p>We cant seem to find the page youre looking for</p>
           <Link to='/'>back home</Link>
       </div>
    </Wrapper>
  )
}
