import { FaFacebook, FaWhatsapp, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-teal-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Mission */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wide">Emmasdale SDA Church</h3>
          <p className="text-slate-400 max-w-md leading-relaxed">
            To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World, Baptizing them in the name of the Father, the Son, and the Holy Spirit.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-teal-500 mt-1 shrink-0" />
              <span>Private Bag FW 42 Off Vubu Road<br/>Emmasdale, Lusaka, Zambia</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-teal-500 shrink-0" />
              <span>+26 0972975737</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-teal-500 shrink-0" />
              <a href="mailto:emmasdale@gmail.com" className="hover:text-teal-400 transition-colors">
                emmasdale@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Links & Social */}
        <div>
          <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Connect</h3>
          <ul className="space-y-3 mb-8">
            <li>
              <Link href="/resources" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Sabbath School Podcast
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-teal-400 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> Adventist Organization
              </Link>
            </li>
          </ul>
          
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
              <FaFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors">
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Emmasdale SDA Church. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex gap-6">
          <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
