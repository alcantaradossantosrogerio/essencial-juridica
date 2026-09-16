import { Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import PrevidenciarioQualifier from './sections/PrevidenciarioQualifier';
import Curriculum from './sections/Curriculum';
import Method from './sections/Method';
import CinematicVision from './sections/CinematicVision';
import Testimonials from './sections/Testimonials';
import AlumniArchives from './sections/AlumniArchives';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';
import CapabilityDetail from './sections/CapabilityDetail';
import WhatsAppButton from './components/WhatsAppButton';

function HomePage() {
  return (
    <div
      style={{
        background: '#0a0a0a',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Navigation />

      <main>
        <Hero />
        <PrevidenciarioQualifier />
        <Curriculum />
        <Method />
        <CinematicVision />
        <Testimonials />
        <AlumniArchives />
        <ContactForm />
        <Footer />
      </main>

      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/capability/:slug" element={<CapabilityDetail />} />
    </Routes>
  );
}
