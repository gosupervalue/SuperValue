import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

// import slide1 from '../../assets/Home/HomeBanner1.png';
import slide2 from '../../assets/Home/HomeBanner2.png';
import slide3 from '../../assets/Home/HomeBanner3.png';
import slide4 from '../../assets/Home/HomeFmcgBanner.png';
import slide5 from '../../assets/Home/HomePerfumeBanner.png';

// home banner 
import slide6 from '../../assets/Home/SilverMaxPhone.png';
import slide7 from '../../assets/Home/PerfumePhone.png';
import slide8 from '../../assets/Home/FmcgPhone.png';
import slide9 from '../../assets/Home/AutoPhone.png';

export default function HomeHero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

const slides = [
    { 
      id: 2, 
      image: slide2, 
      mobileImage: slide6, 
      title: "Silvermax", 
      link: "/silvermax-blade" 
    },
    { 
      id: 5, 
      image: slide5, 
      mobileImage: slide7, 
      title: "Premium Perfumery", 
      link: "/perfumery" 
    },
    { 
      id: 4, 
      image: slide4, 
      mobileImage: slide8, 
      title: "FMCG & Personal Care", 
      link: "/personal-care" 
    },
    { 
      id: 3, 
      image: slide3, 
      mobileImage: slide9, 
      title: "Automotive Solutions", 
      link: "/automobiles" 
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const textElements = sliderRef.current.querySelectorAll('.slide-anim');
    gsap.fromTo(textElements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', overwrite: true }
    );
  }, [currentSlide]);

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] bg-[#07101E] overflow-hidden">
      <div ref={sliderRef} className="w-full h-full relative group">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
           {/* Desktop Banner (Hidden on mobile, block on md and up) */}
            <img
              src={slide.image}
              alt={slide.title}
              className="hidden md:block absolute inset-0 w-full h-full object-cover transform transition-transform duration-[15000ms] group-hover:scale-105"
            />

            {/* Mobile Banner (Block on mobile, hidden on md and up) */}
            <img
              src={slide.mobileImage}
              alt={slide.title}
              className="block md:hidden absolute inset-0 w-full h-full object-cover transform transition-transform duration-[15000ms] group-hover:scale-105"
            />

            {/* Seamless Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07101E]/95 via-[#07101E]/40 to-[#07101E]/30"></div>

            <div className="relative z-20 flex flex-col w-full h-full justify-end max-w-[1400px] mx-auto px-[clamp(1.5rem,5vw,4rem)] pb-[10vh] md:pb-[15vh]">

              <div className="slide-anim flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-orange-500"></span>
                <p className="text-orange-400 font-bold uppercase tracking-widest text-xs">
                  Global Markets
                </p>
              </div>

              <h1 className="slide-anim text-white font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 drop-shadow-lg max-w-3xl">
                {slide.title === "Silvermax" ? (
                  <span className="font-black italic uppercase text-white tracking-tighter">
                    SILVERMAX<sup className="text-[0.4em] align-super font-semibold ml-1">&reg;</sup>
                  </span>
                ) : (
                  slide.title
                )}
              </h1>

              <div className="slide-anim">
                <Link to={slide.link} className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded transition-all">
                  Explore Sector
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-[clamp(1.5rem,5vw,4rem)] z-30 flex gap-3">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.preventDefault(); setCurrentSlide(idx); }}
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentSlide ? 'w-10 bg-orange-500' : 'w-2 bg-white/50 hover:bg-white'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}