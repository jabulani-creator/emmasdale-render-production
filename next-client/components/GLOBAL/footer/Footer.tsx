import { FaFacebook, FaWhatsapp, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const footerLinkClass =
  'flex min-h-[44px] items-center text-slate-200 hover:text-teal-400 transition-colors py-2 border-b border-transparent hover:border-teal-500/30';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-teal-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Mission */}
        <div className="col-span-1 lg:col-span-2">
          <h3 className="font-display text-xl font-bold text-white mb-6 uppercase tracking-wide">Emmasdale SDA Church</h3>
          <p className="text-slate-300 max-w-md leading-relaxed">
            To Lift up Jesus Christ and Proclaim the Everlasting Gospel to All the World, Baptizing them in the name of the Father, the Son, and the Holy Spirit.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wide">Quick links</h3>
          <ul className="space-y-1">
            <li><Link href="/" className={footerLinkClass}>Home</Link></li>
            <li><Link href="/about" className={footerLinkClass}>About us</Link></li>
            <li><Link href="/events" className={footerLinkClass}>Events</Link></li>
            <li><Link href="/events/singles-unplugged" className={footerLinkClass}>Singles Unplugged</Link></li>
            <li><Link href="/media" className={footerLinkClass}>Media & sermons</Link></li>
            <li><Link href="/contact" className={footerLinkClass}>Contact</Link></li>
            <li><Link href="/give" className={footerLinkClass}>Give</Link></li>
            <li><Link href="/plan-your-visit" className={footerLinkClass}>Plan your visit</Link></li>
          </ul>
        </div>

        {/* Contact & social */}
        <div>
          <h3 className="font-display text-lg font-bold text-white mb-6 uppercase tracking-wide">Contact us</h3>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-teal-500 mt-1 shrink-0" aria-hidden />
              <span className="text-slate-200">Private Bag FW 42 Off Vubu Road<br/>Emmasdale, Lusaka, Zambia</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-teal-500 shrink-0" aria-hidden />
              <a href="tel:+260972975737" className="text-slate-200 hover:text-teal-400 transition-colors min-h-[44px] inline-flex items-center">
                +260 97 297 5737
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-teal-500 shrink-0" aria-hidden />
              <a href="mailto:emmasdale@gmail.com" className="text-slate-200 hover:text-teal-400 transition-colors break-all">
                emmasdale@gmail.com
              </a>
            </li>
          </ul>

          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Connect</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/emmasdalesda"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-teal-600 hover:text-white transition-colors"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-teal-600 hover:text-white transition-colors"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/260972975737"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-teal-600 hover:text-white transition-colors"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Emmasdale SDA Church. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/privacy" className="min-h-[44px] inline-flex items-center hover:text-teal-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="min-h-[44px] inline-flex items-center hover:text-teal-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
