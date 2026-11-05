import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <section className="w-full min-h-[80vh] bg-[#f8fafc] flex items-center justify-center md:mt-10 py-20 px-4 font-sans">
      <div className="bg-white rounded-[1.5rem] p-8 md:p-12 max-w-lg w-full text-center border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center">
        
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1E3A] mb-4 tracking-tight">
          Thank You!
        </h2>
        
        <p className="text-slate-500 mb-8 text-base md:text-lg leading-relaxed">
          Your enquiry has been successfully routed to our desk. Our sales team will review your requirements and reply within one business day.
        </p>
        
        <Link 
          to="/" 
          className="bg-[#f3790a] hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-lg transition-all duration-300 shadow-[0_4px_14px_rgba(243,121,10,0.25)] hover:shadow-[0_6px_20px_rgba(243,121,10,0.4)] hover:-translate-y-0.5 inline-block"
        >
          Return to Homepage
        </Link>
        
      </div>
    </section>
  );
}