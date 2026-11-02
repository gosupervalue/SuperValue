import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { handleSuccess, handleError } from './HandleUtils'; // Adjust path if necessary

gsap.registerPlugin(ScrollTrigger);

export default function Form() {
  const containerRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', sector: '', message: ''
  });

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.contact-info-anim', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
      gsap.fromTo('.contact-form-anim', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 80%' } });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        handleSuccess("Thank you! Your enquiry has been routed to our desk.");
        setFormData({ firstName: '', lastName: '', email: '', phone: '', sector: '', message: '' });
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
    <section ref={containerRef} className="w-full bg-[#f8fafc] py-16 md:pt-25 font-sans relative overflow-hidden border-t border-slate-200">
      <div className="relative z-10 max-w-[1300px] mx-auto px-[clamp(1.5rem,5vw,4rem)] flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        <div className="w-full lg:w-[55%] flex flex-col items-start pt-2">
          <div className="contact-info-anim flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-orange-500"></span>
            <h4 className="text-orange-500 font-bold uppercase tracking-widest text-xs">Let's Connect</h4>
          </div>
          <h2 className="contact-info-anim text-4xl md:text-5xl lg:text-[52px] font-extrabold text-[#0B1E3A] tracking-tight leading-[1] mb-3">
            Explore New <span className="text-orange-500">Opportunities .</span>
          </h2>
          <div className="contact-info-anim flex flex-col gap-4 mb-6 max-w-xl">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">Whether you're looking to source products, expand your distribution, enter a new market or develop your own brand, our team is here to support you.</p>
          </div>

          <div className="contact-info-anim w-full grid grid-cols-1 sm:grid-cols-2 gap-x-1 gap-y-8 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[#0B1E3A] font-bold text-xs uppercase tracking-widest mb-1.5">Our Office</span>
                <span className="text-slate-500 text-sm leading-relaxed">XL Tower, Damac Properties<br/>Business Bay, Dubai, UAE</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div className="flex flex-col pt-0.5">
                <span className="text-[#0B1E3A] font-bold text-xs uppercase tracking-widest mb-1.5">Direct Line</span>
                <a href="tel:+971529607401" className="text-slate-500 text-sm hover:text-orange-500 transition-colors">+971 52 960 7401</a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-anim w-full lg:w-[45%]">
          <div className="bg-white rounded-[1.5rem] p-5 md:px-6 md:py-6 border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">First Name <span className="text-orange-500">*</span></label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-4 py-3 text-[#0B1E3A] placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">Last Name <span className="text-orange-500">*</span></label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-4 py-3 text-[#0B1E3A] placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">Corporate Email <span className="text-orange-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@company.com" className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-4 py-3 text-[#0B1E3A] placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">Phone Number <span className="text-orange-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-4 py-3 text-[#0B1E3A] placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">Sector of Interest</label>
                <div className="relative">
                  <select name="sector" value={formData.sector} onChange={handleChange} required className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-4 py-3 text-[#0B1E3A] appearance-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer text-sm">
                    <option value="" disabled className="text-slate-400">Select a category...</option>
                    <option value="perfumery">Perfumery & Private Label</option>
                    <option value="automobiles">Automobiles & Spare Parts</option>
                    <option value="fmcg">FMCG & Personal Care</option>
                    <option value="silvermax">Silvermax Blades</option>
                    <option value="other">Other / General Enquiry</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-600 text-[11px] font-bold uppercase tracking-wider">Your Message <span className="text-orange-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="3" placeholder="Tell us about your requirements..." className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 rounded-lg px-4 py-3 text-[#0B1E3A] placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none text-sm"></textarea>
              </div>
              <div className="mt-2">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#f3790a] hover:bg-orange-600 text-white font-bold text-sm md:text-base py-3.5 rounded-lg transition-all duration-300 shadow-[0_4px_14px_rgba(243,121,10,0.25)] hover:shadow-[0_6px_20px_rgba(243,121,10,0.4)] hover:-translate-y-0.5 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}
                  {!isSubmitting && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}