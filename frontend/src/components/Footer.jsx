import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { handleSuccess, handleError } from './Contact/HandleUtils'; // Adjust path if necessary
import Logo from '../assets/img/logo.png';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', sector: '', message: ''
  });

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.footer-item',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power2.out',
          force3D: true, 
          scrollTrigger: { 
            trigger: footerRef.current, 
            start: 'top 95%', 
            once: true,       
          }
        }
      );

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        handleSuccess("Success! Redirecting...");
        setFormData({ firstName: '', lastName: '', email: '', phone: '', sector: '', message: '' });
        
        setTimeout(() => {
          navigate('/thank-you');
        }, 1500);
      } else {
        handleError(data.message || "Failed to send email.");
      }
    } catch (error) {
      handleError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer ref={footerRef} className="relative w-full bg-[#07101E] text-white pt-24 pb-8 overflow-hidden border-t border-white/10 font-sans">
      
      {/* ======================================================= */}
      {/* BACKGROUND IMAGE & CINEMATIC OVERLAY                      */}
      {/* ======================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050A14]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1E3A]/40 via-[#07101E]/40 to-[#050A14]/80"></div>
      </div>

      {/* ======================================================= */}
      {/* FOOTER CONTENT                                            */}
      {/* ======================================================= */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)]">
        
        {/* --- TOP SECTION: DIRECT CONTACT & FORM --- */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24 justify-between">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="footer-item flex items-center gap-4 mb-6">
              <span className="w-6 h-[2px] bg-orange-500"></span>
              <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">
                Contact Us
              </p>
            </div>
            
            <h2 className="footer-item text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] mb-6 text-white tracking-tight drop-shadow-md">
              Let's Build <br />
              <span className="text-orange-500">Something Global.</span>
            </h2>
            
            <div className="footer-item flex flex-col gap-4 mb-10 max-w-lg">
              <p className="text-slate-300 text-base leading-relaxed">
                Whether you're looking to source products, expand your distribution, enter a new market or develop your own brand, our team is here to help.
              </p>
              <p className="text-slate-300 text-base leading-relaxed">
                Get in touch and let's find the right way forward, together.
              </p>
            </div>

            <div className="footer-item flex flex-col gap-6 border-l-2 border-orange-500/30 pl-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Direct Line</p>
                <a href="tel:+971529607401" className="text-xl font-medium text-white hover:text-orange-500 transition-colors">+971 52 960 7401</a>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Trading Enquiries</p>
                <a href="mailto:info@supervalue.com" className="text-lg font-medium text-white hover:text-orange-500 transition-colors">info@supervalue.com</a>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:items-end">
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-5 bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-2xl shadow-2xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="footer-item relative group">
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                    placeholder="First Name *"
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2.5 outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="footer-item relative group">
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                    placeholder="Last Name *"
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2.5 outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="footer-item relative group">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="Corporate Email *"
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2.5 outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="footer-item relative group">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                    placeholder="Phone Number *"
                    className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2.5 outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400 text-sm"
                  />
                </div>
              </div>

              <div className="footer-item relative group">
                <select 
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2.5 outline-none focus:border-orange-500 transition-colors text-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-[#0B1E3A] text-slate-400">Sector of Interest *</option>
                  <option value="perfumery" className="bg-[#0B1E3A] text-white">Perfumery & Private Label</option>
                  <option value="automobiles" className="bg-[#0B1E3A] text-white">Automobiles & Spare Parts</option>
                  <option value="fmcg" className="bg-[#0B1E3A] text-white">FMCG & Personal Care</option>
                  <option value="silvermax" className="bg-[#0B1E3A] text-white">Silvermax Blades</option>
                  <option value="other" className="bg-[#0B1E3A] text-white">Other / General Enquiry</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              <div className="footer-item relative group">
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="2" 
                  placeholder="Tell us about your requirements..."
                  className="w-full bg-transparent border-b border-white/20 text-white px-0 py-2.5 outline-none focus:border-orange-500 transition-colors placeholder:text-slate-400 text-sm resize-none"
                ></textarea>
              </div>

              <div className="footer-item pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="text-white bg-orange-500 hover:bg-[#d9660a] shadow-[0_4px_20px_rgba(243,121,10,0.3)] hover:shadow-[0_6px_25px_rgba(243,121,10,0.5)] font-bold py-3.5 px-10 rounded-xl text-sm tracking-wide transition-all duration-300 w-full md:w-auto hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:shadow-none"
                >
                  {isSubmitting ? 'Sending Enquiry...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* --- BOTTOM SECTION: 4-COLUMN MEGA FOOTER --- */}
        <div className="border-t border-white/10 pt-12 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            <div className="footer-item flex flex-col gap-6">
              <Link to="/" className="flex items-center -gap-1 group">
                <div className="leading-tight">
                  <img src={Logo} alt="Super Value General Trading LLC Logo" className="w-16 h-16 md:w-20 md:h-20 object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div>
                   <span className="text-white text-xl md:text-2xl ml-2 font-semibold tracking-tight">Super Value</span>
                   <p className="text-orange-500 text-xs md:text-sm ml-2 font-bold tracking-tight">General Trading LLC</p>    
                </div>
              </Link>
            
            </div>

            <div className="footer-item flex flex-col gap-4 lg:pl-8">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Company</h4>
              <Link to="/" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">Home</Link>
              <Link to="/about" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">About Us</Link>
              <Link to="/blogs" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">Blogs</Link>
              <Link to="/gallery" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">Gallery</Link>
            </div>

            <div className="footer-item flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Sectors</h4>
              <Link to="/personal-care" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">FMCG & Personal Care</Link>
              <Link to="/perfumery" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">Perfumery & Fragrances</Link>
              <Link to="/automobiles" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">Automotive Solutions</Link>
              <Link to="/silvermax-blade" className="text-slate-400 text-sm hover:text-orange-500 hover:translate-x-1 transition-all w-fit">Silvermax Blades</Link>
            </div>

            <div className="footer-item flex flex-col gap-4">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-2">Office Location</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Office 1707, Damac XL Tower<br />
                Marasi Drive, Business Bay<br />
                Dubai, United Arab Emirates
              </p>
            </div>

          </div>
        </div>

        {/* --- COPYRIGHT & SOCIALS --- */}
        <div className="footer-item flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-xs font-medium">
            © {new Date().getFullYear()} Super Value General Trading LLC. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="https://creativeoncoffee.com/" target="_blank" className="text-slate-400 text-xs hover:text-white transition-colors">Design & Developed By Creative On Coffee</Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/privacy" className="text-slate-400 text-xs hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-400 text-xs hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}