"use client";

import {FaAlignLeft, FaUserCircle, FaCaretDown} from 'react-icons/fa'
import Wrapper from '../app/assets/wrappers/Navbar'
import { useAuthStore } from '../store/useAuthStore'
import { useUIStore } from '../store/useUIStore'
import { useState } from 'react'

export const Navbar = () => {
    const { user, logoutUser } = useAuthStore();
    const { toggleSidebar } = useUIStore();
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
