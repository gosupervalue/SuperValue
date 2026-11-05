import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const solutionsData = [
  {
    num: "01",
    kicker: "SOURCE",
    title: "Find the Right Products",
    desc: "Access a wide range of quality products and trusted suppliers across our global network — from established brands to specialized manufacturers.",
    linkText: "EXPLORE PRODUCTS",
    linkTo: "/about",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
    )
  },
  {
    num: "02",
    kicker: "BUILD",
    title: "Create Your Own Brand",
    desc: "From fragrance and personal care to selected consumer and automotive products, develop customized solutions through our OEM and manufacturing network.",
    linkText: "OEM SOLUTIONS",
    linkTo: "/contact",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
    )
  },
  {
    num: "03",
    kicker: "DISTRIBUTE",
    title: "Take Products to New Markets",
    desc: "Connect your products with distributors, retailers and commercial partners across the UAE and international markets.",
    linkText: "OUR MARKETS",
    linkTo: "/about",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    )
  },
  {
    num: "04",
    kicker: "PARTNER",
    title: "Build Long-Term Business",
    desc: "We work alongside brands, manufacturers and buyers to create sustainable partnerships and long-term growth across global markets.",
    linkText: "WORK WITH US",
    linkTo: "/contact",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    )
  }
];

const featuresData = [
  { icon: "🌍", title: "GLOBAL REACH", desc: "Multiple Markets" },
  { icon: "🤝", title: "TRUSTED PARTNERS", desc: "Across Industries" },
  { icon: "🛡️", title: "RELIABLE SUPPLY", desc: "Quality & Compliance" },
  { icon: "📈", title: "LONG-TERM GROWTH", desc: "Built on Relationships" },
];

export default function BusinessSolutions() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.sol-header', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top 85%' } }
      );
      
      // Staggered Cards Reveal
      gsap.fromTo('.sol-card', 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '.sol-grid', start: 'top 80%' } }
      );

      // Bottom Features Reveal
      gsap.fromTo('.sol-feature', 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.sol-features-wrapper', start: 'top 95%' } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-[#f8fafc] pt-12 pb-4 md:pt-15 font-sans overflow-hidden relative">
      
      {/* Background graphic elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      {/* FIX: Shifted the entire content block right using relative positioning on large screens */}
      <div className="max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] flex flex-col items-center relative ">
        
        {/* ======================================================= */}
        {/* SECTION HEADER                                          */}
        {/* ======================================================= */}
        <div className="sol-header flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-5">
            <span className="w-12 h-[1px] bg-[#f3790a]"></span>
            <h4 className="text-[#f3790a] font-bold uppercase tracking-[0.2em] text-xs md:text-sm">
              GLOBAL OPPORTUNITIES
            </h4>
            <span className="w-12 h-[1px] bg-[#f3790a]"></span>
          </div>
          
          <h2 className="text-3xl md:text-5xl  font-semibold text-[#0B1E3A] tracking-tight leading-[1.15] mb-5">
            How We Help Businesses <br className="hidden md:block" /> Move Beyond Borders
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed">
            From sourcing to distribution, we connect brands, products and people to create lasting opportunities worldwide.
          </p>
        </div>

        {/* ======================================================= */}
        {/* THE CARDS GRID                                          */}
        {/* ======================================================= */}
        <div className="sol-grid w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
          {solutionsData.map((item, index) => (
            <Link 
              to={item.linkTo} 
              key={index}
              className="sol-card group relative bg-white rounded-3xl p-6 flex flex-col h-full border border-slate-200/60 shadow-sm hover:shadow-[0_20px_40px_rgba(11,30,58,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden z-10"
            >
              {/* Subtle top border highlight on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#f3790a] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
              
              {/* Large Watermark Number (01, 02, etc.) */}
              <div className="absolute top-4 right-4 text-7xl font-black text-slate-50 group-hover:text-orange-50 transition-colors duration-500 select-none -z-10 tracking-tighter">
                {item.num}
              </div>

              {/* Card Header (Icon & Kicker) */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-orange-500 group-hover:bg-orange-50 transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest group-hover:text-orange-500 transition-colors duration-300">
                  {item.kicker}
                </span>
              </div>

              {/* Card Body */}
              <h3 className="text-[#0B1E3A] font-bold text-xl mb-4 leading-tight group-hover:text-orange-500 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                {item.desc}
              </p>

              {/* Link Arrow at Bottom */}
              <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100 group-hover:border-orange-100 transition-colors duration-300">
                <span className="text-[#0B1E3A] font-bold text-xs tracking-widest uppercase group-hover:text-orange-500 transition-colors duration-300">
                  {item.linkText}
                </span>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* ======================================================= */}
        {/* BOTTOM FEATURES BAR                                     */}
        {/* ======================================================= */}
        <div className="sol-features-wrapper w-full border-t border-slate-200/80 pt-6 pb-15  mt-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x-0 md:divide-x md:divide-slate-200/80">
            {featuresData.map((feature, idx) => (
              <div key={idx} className="sol-feature flex items-center gap-4 md:px-6 lg:px-10 justify-start md:justify-center">
                <span className="text-2xl grayscale opacity-70">{feature.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[#0B1E3A] font-bold text-[10px] uppercase tracking-widest mb-0.5">{feature.title}</span>
                  <span className="text-slate-500 text-xs font-medium">{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}