"use client";

import { FaBars } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../../app/assets/images/LOGO.png';

export const Navbar = ({ toggle, isOpen }: { toggle?: () => void; isOpen?: boolean }) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 w-full z-50 bg-slate-900 border-b border-slate-800 shadow-xl py-3">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={logo} 
                alt="Emmasdale SDA Church" 
                width={160} 
                height={50} 
                // Always keep the logo white on the dark background
                className="object-contain brightness-0 invert" 
                style={{ width: 'auto', height: 'auto' }} 
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1 items-center px-2 py-1.5 rounded-full bg-slate-800/50 border border-slate-700">
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Ministries', path: '/ministries' },
              { name: 'Events', path: '/events' },
              { name: 'Media', path: '/media' },
              { name: 'Give', path: '/give' },
              { name: 'Contact', path: '/contact' }
            ].map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.name}
                  href={link.path} 
                  className={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-teal-500 text-white shadow-md' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              href="/plan-your-visit" 
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5 bg-amber-500 text-white hover:bg-amber-400"
            >
              Plan Your Visit
            </Link>
            <button 
              onClick={toggle}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors text-white hover:text-teal-400"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
