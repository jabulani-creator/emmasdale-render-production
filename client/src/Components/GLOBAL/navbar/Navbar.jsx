import logo from '../../../assets/images/LOGO.png'
import {FaBars} from 'react-icons/fa'
import Wrapper from '../../../assets/wrappers/MainNavbar'
import { Link } from 'react-router-dom'

export const Navbar = ({toggle}) => {
  return (
     <>
     <Wrapper>
         <div className='NavbarContainer'>
             <Link to='/' className='NavLogo'>
                 <img src={logo} alt="" className='emmas' />
             </Link>
             <div className='MobileIcon' onClick={toggle}>
             <FaBars />
             </div>
                 <ul className='NavMenu'>
                     <Link className='NavItem' to='/' >Home</Link>
                     <Link className='NavItem' to='/new' >I am new</Link>
                     <Link className='NavItem' to='/about' >who are we</Link>
                     <Link className='NavItem' to='/ministries' >Ministries</Link>
                     <Link className='NavItem' to='/media' >Media</Link>
                     <Link className='NavItem' to='/contact' >Contact</Link>
                     <Link className='NavItem' to='/resources' >Resources</Link>
                 </ul>
         </div>
     </Wrapper>
    </>
  )
}
