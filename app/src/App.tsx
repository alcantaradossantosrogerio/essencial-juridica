import { Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Curriculum from './sections/Curriculum';
import Method from './sections/Method';
import CinematicVision from './sections/CinematicVision';
import Testimonials from './sections/Testimonials';
import AlumniArchives from './sections/AlumniArchives';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';
import CapabilityDetail from './sections/CapabilityDetail';
import ApresentacaoPipeline from './sections/ApresentacaoPipeline';
import WhatsAppButton from './components/WhatsAppButton';
import PrevidenciarioModal from './components/PrevidenciarioModal';
import { PrevidenciarioModalProvider } from './context/PrevidenciarioModalContext';

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
        <Curriculum />
        <Method />
        <CinematicVision />
        <Testimonials />
        <AlumniArchives />
        <ContactForm />
        <Footer />
      </main>

      <WhatsAppButton />
      <PrevidenciarioModal />
    </div>
  );
}

export default function App() {
  return (
    <PrevidenciarioModalProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/capability/:slug" element={<CapabilityDetail />} />
        <Route path="/apresentacao" element={<ApresentacaoPipeline />} />
        <Route path="/proposta" element={<ApresentacaoPipeline />} />
      </Routes>
      <PrevidenciarioModal />
    </PrevidenciarioModalProvider>
  );
}
