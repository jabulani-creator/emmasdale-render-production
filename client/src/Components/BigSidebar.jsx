import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/BigSidebar'
import emmas from '../assets/images/emmas.svg'
import { NavLinks } from './NavLinks'
import { useAppContext } from '../context/appContext'

export const BigSidebar = () => {
  const {showSidebar} = useAppContext();
  return (
    <Wrapper>
        <div
        className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}
        >
       <div className="content">
         <header>
         <Link to='/'>
              <img src={emmas} alt="" className='emmas' />
         </Link>
         </header>
          <NavLinks />
       </div>
        </div>
    </Wrapper>
  )
}
