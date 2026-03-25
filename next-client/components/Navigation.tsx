"use client";

import React, { useState } from 'react'
import { Navbar, Topbar } from './GLOBAL'

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }
  return (
    <div className="sticky top-0 z-[100] w-full shadow-sm bg-white">
      <Topbar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle} isOpen={isOpen} />
    </div>
  )
}
