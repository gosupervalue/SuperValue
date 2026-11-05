import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Import your structural components
import Header from './components/Header';
import Footer from './components/Footer';

// Import your pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'; 
import NotFound from './pages/NotFound'; 
import Blogs from './pages/BlogMain'; 
import Perfumery from './pages/Perfumery'; 
import Automobliles from './pages/Automobiles'; 
import PersonalCarePage from './pages/PersonalCarePage'; 
import Silvermax from './pages/Silvermax';  // Import the Silvermax page
// import BusinessActivities from './pages/BusinessActivities'; // Import this when ready for the "Others" link
import ScrollToTop from './components/ScrollToTop';
import Gallery from './pages/Gallery';
import ScrollRestoration from './components/ScrollRestoration';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ThankYou from './components/Contact/ThankYou';  // Import the Thank You page


function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

function AppShell() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className={`flex min-h-screen flex-col bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fc_45%,#ffffff_100%)] text-[#16202E] ${isHomePage ? '' : 'non-home-theme'}`}>
      <ScrollRestoration />
      <Header />

      <main className="flex-grow w-full">
        <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/silvermax-blade" element={<Silvermax />} />  {/* Route for Silvermax page */}
          <Route path="/contact" element={<Contact />} /> 
          
          {/* Products & Services Routes */}
          <Route path="/perfumery" element={<Perfumery />} /> 
          <Route path="/automobiles" element={<Automobliles />} /> 
          <Route path="/personal-care" element={<PersonalCarePage />} /> 
          
          {/* Fallback for "Others" dropdown link (Uncomment and add component when ready) */}
          {/* <Route path="/business" element={<BusinessActivities />} /> */}

          <Route path="/blogs" element={<Blogs />} /> 
         <Route path="/gallery" element={<Gallery />} /> 
         <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/thank-you" element={<ThankYou />} />  {/* Route for Thank You page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* The Footer will always show at the bottom */}
      <Footer />
      <ScrollToTop />

    </div>
  );
}

export default App;