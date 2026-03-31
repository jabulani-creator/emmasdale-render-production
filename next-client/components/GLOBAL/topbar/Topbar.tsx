import { FaTimes } from 'react-icons/fa';
import Link from "next/link";

export const Topbar = ({ isOpen, toggle }: { isOpen?: boolean; toggle?: () => void }) => {
  return (
    <div 
      className={`fixed inset-0 z-[999] bg-slate-900 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="absolute top-6 right-6 cursor-pointer" onClick={toggle}>
        <FaTimes className="text-white text-3xl hover:text-teal-400 transition-colors" />
      </div>

      <div className="w-full flex justify-center">
        <ul className="flex flex-col items-center space-y-8">
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/' onClick={toggle}>Home</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/new' onClick={toggle}>I'm New Here</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/about' onClick={toggle}>About Us</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/ministries' onClick={toggle}>Ministries</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/events' onClick={toggle}>Events</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/media' onClick={toggle}>Media</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/resources' onClick={toggle}>Resources</Link>
          <Link className="text-2xl font-medium text-white hover:text-teal-400 transition-colors" href='/contact' onClick={toggle}>Contact</Link>
        </ul>
      </div>
    </div>
  );
};
