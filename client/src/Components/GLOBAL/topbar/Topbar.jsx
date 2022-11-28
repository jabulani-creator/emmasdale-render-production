import {FaTimes} from 'react-icons/fa'
import Wrapper from "../../../assets/wrappers/MainTopbar"
import { Link } from "react-router-dom"

export const Topbar = ({isOpen, toggle}) => {
  return (
    <Wrapper isOpen={isOpen} onClick={toggle}>
      <div className="Icon">
          <FaTimes className="CloseIcon"/>
      </div>

      <div className="TopbarWrapper">
          <ul className="TopbarMenu">
                     <Link className="TopbarItem" to='/' onClick={toggle}>Home</Link>
                     <Link className="TopbarItem" to='/new' onClick={toggle}>I am new</Link>
                     <Link className="TopbarItem" to='/about' onClick={toggle}>who are we</Link>
                     <Link className="TopbarItem" to='/ministries' onClick={toggle}>Ministries</Link>
                     <Link className="TopbarItem" to='/media' onClick={toggle}>Media</Link>
                     <Link className="TopbarItem" to='/contact' onClick={toggle}>Contact</Link>
                     <Link className="TopbarItem" to='/resources' onClick={toggle}>Resources</Link>
          </ul>
      </div>
    </Wrapper>
  )
}
