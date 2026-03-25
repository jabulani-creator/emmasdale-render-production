"use client";

import Link from 'next/link'
import Wrapper from '../app/assets/wrappers/BigSidebar'
import emmas from '../app/assets/images/emmas.svg'
import { NavLinks } from './NavLinks'
import { useUIStore } from '../store/useUIStore'
import Image from 'next/image'

export const BigSidebar = () => {
  const { showDashboardSidebar } = useUIStore();
  return (
    <Wrapper>
        <div
        className={showDashboardSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}
        >
       <div className="content">
         <header>
         <Link href='/'>
              <Image src={emmas.src} alt="Emmasdale" width={150} height={50} className='emmas' />
         </Link>
         </header>
          <NavLinks />
       </div>
        </div>
    </Wrapper>
  )
}
