import {FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Wrapper from '../assets/wrappers/Navbar'
import { useAppContext } from '../context/appContext'
import { useState } from 'react'
export const Navbar = () => {
    const {user, toggleSidebar, logoutUser} = useAppContext()
    const [showLogout, setShowLogout] = useState(false)
  return (
    <Wrapper>
        <div className="nav-center">
            <button 
            type='button'
            className="toggle-btn"
            onClick={toggleSidebar}
            >
               <FaAlignLeft />
            </button>
            <div className="btn-container">
                <button 
                type='button'
                className="btn"
                onClick={() => setShowLogout(!showLogout)}
                >
                    <FaUserCircle />
                    {user?.name}
                    <FaCaretDown />
                </button>
                <div className={ showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                    <button
                     onClick={logoutUser}
                     className='dropdown-btn'
                    >
                        logout
                    </button>
                </div>
            </div>
        </div> 

    </Wrapper>
  )
}
