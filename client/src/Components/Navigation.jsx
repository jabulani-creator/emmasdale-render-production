import React, { useState } from 'react'
import { Navbar, Topbar } from './GLOBAL'


export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }
  return (
    <>

    <Topbar isOpen={isOpen} toggle={toggle}/>
    <Navbar toggle={toggle} isOpen={isOpen} />
    </>
  )
}
