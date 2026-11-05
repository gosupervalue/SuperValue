import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { FaWhatsapp } from 'react-icons/fa'; // Importing React Icons WhatsApp
import logoImg from '../assets/img/logo.png';


export default function Header() {
  const headerRef = useRef(null);
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ============================================================================
  // PAGE-WISE NAVBAR COLOR LOGIC
  // ============================================================================
  const lightHeroPages = ['/example-light-page', '/faq', '/gallery', '/blogs','/thank-you']; // Add more paths as needed
  const isLightPage = lightHeroPages.includes(location.pathname);
  
  const navTextColor = isScrolled 
    ? 'text-[#0B1E3A]' 
    : (isLightPage ? 'text-[#0B1E3A]' : 'text-white');

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );
  }, []);

  return (
    <header 
      ref={headerRef} 
      className={`fixed w-full top-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-3 border-b border-slate-100' 
          : 'bg-transparent py-5 border-b border-transparent'
      } ${navTextColor}`}
    >
      <div className="w-full max-w-[1400px] mx-auto flex flex-wrap items-center justify-between px-[clamp(1.5rem,5vw,4rem)]">
        
        <Link to="/" className="flex items-center gap-3 relative z-[60]">
          <img 
            src={logoImg} 
            alt="Super Value Logo" 
            className="h-[clamp(2.5rem,4vw,3.5rem)] transition-all duration-300" 
          />
        </Link>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-[60] p-2 focus:outline-none cursor-pointer text-inherit"
        >
          <div className="w-6 flex flex-col gap-1.5 items-end">
            <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
            <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`}></span>
          </div>
        </button>

        <nav className="hidden md:flex flex-wrap items-center gap-[clamp(1rem,2vw,2rem)] text-[13px] lg:text-[14px] font-semibold tracking-wide">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-orange-500 transition-colors">About Us</Link>
          
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-orange-500 transition-colors py-4 cursor-pointer outline-none">
              Products & Services 
              <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* ========================================================================= */}
            {/* REFINED MEGA MENU CARD                                                    */}
            {/* ========================================================================= */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[550px] md:w-[640px] bg-white shadow-[0_20px_50px_rgba(11,30,58,0.1)] rounded-2xl p-4 grid grid-cols-2 gap-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-slate-100 z-50 text-left">

               <Link to="/silvermax-blade" className="p-3 rounded-xl bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 flex flex-col gap-1.5 group/item">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[#0B1E3A] font-bold text-sm group-hover/item:text-orange-500 transition-colors duration-300">Silvermax Blades</span>
                  <svg className="w-4 h-4 text-orange-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </div>
                <span className="text-slate-500 text-[12px] font-medium leading-relaxed pr-2">Precision engineered grooming solutions</span>
              </Link>

              <Link to="/personal-care" className="p-3 rounded-xl bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 flex flex-col gap-1.5 group/item">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[#0B1E3A] font-bold text-sm group-hover/item:text-orange-500 transition-colors duration-300">FMCG & Personal Care</span>
                  <svg className="w-4 h-4 text-orange-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </div>
                <span className="text-slate-500 text-[12px] font-medium leading-relaxed pr-2">Premium daily essentials & cosmetics</span>
              </Link>
              
              <Link to="/perfumery" className="p-3 rounded-xl bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 flex flex-col gap-1.5 group/item">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[#0B1E3A] font-bold text-sm group-hover/item:text-orange-500 transition-colors duration-300">Perfumery</span>
                  <svg className="w-4 h-4 text-orange-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </div>
                <span className="text-slate-500 text-[12px] font-medium leading-relaxed pr-2">Private label & luxury fragrances</span>
              </Link>
              
              <Link to="/automobiles" className="p-3 rounded-xl bg-transparent hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all duration-300 flex flex-col gap-1.5 group/item">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[#0B1E3A] font-bold text-sm group-hover/item:text-orange-500 transition-colors duration-300">Automobiles</span>
                  <svg className="w-4 h-4 text-orange-500 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
                </div>
                <span className="text-slate-500 text-[12px] font-medium leading-relaxed pr-2">Vehicles, tires, tubes & spare parts</span>
              </Link>

            </div>
          </div>

          <Link to="/blogs" className="hover:text-orange-500 transition-colors">Blogs</Link>
          <Link to="/gallery" className="hover:text-orange-500 transition-colors">Gallery</Link>
        </nav>

       <div className="hidden md:flex items-center gap-6">
  <a 
    href="https://wa.me/971529607401" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center gap-2 font-bold group"
  >
    <FaWhatsapp className="text-[2rem] text-[#25D366] group-hover:scale-110 transition-transform duration-300" />
  </a>
  <Link to="/contact" className="bg-[#f3790a] hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded transition-all shadow-sm">
    Get In Touch
  </Link>
</div>         
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div 
        onClick={() => setIsMobileMenuOpen(false)}
        className={`fixed inset-0 bg-[#0B1E3A]/40 backdrop-blur-sm z-[50] md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      ></div>

      {/* MOBILE SIDEBAR MENU */}
      <div 
        className={`fixed top-0 h-[100dvh] w-[70%] max-w-[340px] bg-white border-l border-slate-100 z-[55] shadow-[-20px_0_50px_rgba(11,30,58,0.1)] md:hidden flex flex-col pt-24 px-6 pb-8 transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'right-0 visible' : '-right-[100%] invisible'}`}
      >
        <div className="flex flex-col gap-6 overflow-y-auto overflow-x-hidden h-full no-scrollbar pr-2">
          
          <Link to="/" className="text-[17px] font-bold text-[#0B1E3A] hover:text-orange-500 transition-colors border-b border-slate-100 pb-4">Home</Link>
          <Link to="/about" className="text-[17px] font-bold text-[#0B1E3A] hover:text-orange-500 transition-colors border-b border-slate-100 pb-4">About Us</Link>
          
          <div className="flex flex-col border-b border-slate-100 pb-4">
            <button 
              onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
              className="flex justify-between items-center text-[17px] font-bold text-[#0B1E3A] hover:text-orange-500 transition-colors outline-none cursor-pointer"
            >
              Products & Services
              <svg className={`w-5 h-5 transform transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180 text-orange-500' : 'text-slate-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Animated Dropdown Items */}
            <div className={`flex flex-col gap-5 overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? 'max-h-[300px] mt-5 opacity-100 pl-4' : 'max-h-0 opacity-0 pl-4'}`}>
              <Link to="/silvermax-blade" className="text-[15px] font-semibold text-slate-600 hover:text-orange-500 transition-colors">Silvermax Blades</Link>
              <Link to="/personal-care" className="text-[15px] font-semibold text-slate-600 hover:text-orange-500 transition-colors">FMCG & Personal Care</Link>
              <Link to="/perfumery" className="text-[15px] font-semibold text-slate-600 hover:text-orange-500 transition-colors">Perfumery</Link>
              <Link to="/automobiles" className="text-[15px] font-semibold text-slate-600 hover:text-orange-500 transition-colors">Automobiles</Link>
            </div>
          </div>

          <Link to="/blogs" className="text-[17px] font-bold text-[#0B1E3A] hover:text-orange-500 transition-colors border-b border-slate-100 pb-4">Blog</Link>
          <Link to="/gallery" className="text-[17px] font-bold text-[#0B1E3A] hover:text-orange-500 transition-colors border-b border-slate-100 pb-4">Gallery</Link>
          <Link to="/contact" className="text-[17px] font-bold text-[#0B1E3A] hover:text-orange-500 transition-colors border-b border-slate-100 pb-4">Contact Us</Link>
        </div>
        
        {/* MOBILE BOTTOM CONTACT SECTION */}
        <div className="mt-auto pt-6 flex flex-col gap-5 border-t border-slate-100">
          <a 
            href="https://wa.me/917292023399" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-[16px] font-bold text-[#0B1E3A] hover:text-[#25D366] transition-colors group"
          >
            <div className="flex items-center justify-center text-[#25D366]">
              <FaWhatsapp className="text-3xl" />
            </div>
            
          </a>
          <Link to="/contact" className="bg-[#f3790a] hover:bg-[#d9660a] text-white font-bold py-3.5 text-center rounded-xl w-full shadow-md hover:shadow-lg transition-all duration-300">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}