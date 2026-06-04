/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import HomeHero from './components/HomeHero';
import Committee from './components/Committee';
import BecomeMember from './components/BecomeMember';
import AboutSumner from './components/AboutSumner';
import NewsEvents from './components/NewsEvents';
import CivilDefence from './components/CivilDefence';
import SumnerHub from './components/SumnerHub';
import { Menu, X, Waves, HelpCircle, Anchor, ArrowRight, ShieldAlert, Instagram, Facebook } from 'lucide-react';

// Relative image asset paths
// @ts-ignore
import bgImage from '../Hero-Sumner.jpg';
const hubImage = './assets/images/sumner_community_hub_1780561196126.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position to adjust navigation density
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll back to top when switching pages
  const handleNavigation = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about-sumner', label: 'About Sumner' },
    { id: 'committee', label: 'Committee' },
    { id: 'sumner-hub', label: 'The Hub & Van' },
    { id: 'news-events', label: 'News & Events' },
    { id: 'civil-defence', label: 'Civil Defence' },
    { id: 'become-member', label: 'Join Us' },
  ];

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeHero onNavigate={handleNavigation} bgImageUrl={bgImage} />;
      case 'about-sumner':
        return <AboutSumner />;
      case 'committee':
        return <Committee />;
      case 'meeting-notes':
        return <Committee scrollToMinutes={true} />;
      case 'become-member':
        return <BecomeMember />;
      case 'news-events':
        return <NewsEvents />;
      case 'civil-defence':
        return <CivilDefence />;
      case 'sumner-hub':
        return <SumnerHub />;
      default:
        return <HomeHero onNavigate={handleNavigation} bgImageUrl={bgImage} />;
    }
  };

  const isLightBg = scrollY > 30 || currentPage !== 'home';

  return (
    <div className="relative min-h-[100dvh] bg-ink-black text-cream-100 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* Background Ambience Layer - Active on sub-pages as a dynamic blurred canvas anchor */}
      {currentPage !== 'home' && (
        <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000">
          <div
            className="absolute inset-0 bg-cover bg-center brightness-[0.95] saturate-[0.6] scale-105 blur-2xl opacity-15"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {/* Subtle beachfront watercolor overlay matching the design theme layout */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3D5A5A]/10 via-[#FFFDF5]/80 to-[#C9D6D1]/25" />
        </div>
      )}

      {/* MASTER TOP NAVIGATION TUCKED INTO EDGES (Magazine-style slim outline) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
          isLightBg
            ? 'glassmorphism border-black/10 py-3 md:py-4 bg-[#FFFDF5]/95 shadow-sm'
            : 'border-transparent py-5 md:py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          {/* Brand Logo & Slogan Header */}
          <button
            onClick={() => handleNavigation('home')}
            className="flex items-center gap-3 group text-left cursor-pointer border-none bg-transparent"
          >
            <div className={`relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 transition-transform duration-500 group-hover:rotate-180 rounded-none border ${
              isLightBg 
                ? 'bg-slate-900 border-transparent text-white' 
                : 'bg-cream-100 border-white/10 text-ink-black'
            }`}>
              <Waves className={`w-4 h-4 md:w-5 md:h-5 stroke-[1.5] ${isLightBg ? 'text-[#f7e8a4]' : 'text-seagreen-600'}`} />
            </div>
            <div>
              <span className={`font-serif text-sm md:text-lg tracking-[0.1em] block font-semibold leading-none ${
                isLightBg ? 'text-slate-900' : 'text-[#FFFDF5]'
              }`}>
                S.C.R.A.
              </span>
              <span className={`text-[9px] md:text-[10px] uppercase font-mono tracking-widest block mt-1 font-semibold ${
                isLightBg ? 'text-seagreen-805 text-emerald-800' : 'text-[#f7e8a4]'
              }`}>
                Sumner, Christchurch
              </span>
            </div>
          </button>

          {/* Desktop Links (small vertical alignment options, tucked into the edge) */}
          <div className="hidden lg:flex items-center gap-6">
            <div className={`flex gap-4 border-r pr-6 mr-2 ${isLightBg ? 'border-slate-300/60' : 'border-white/15'}`}>
              {navItems.slice(1, -1).map((item) => {
                const isActive = currentPage === item.id;
                let textClass = '';
                if (isLightBg) {
                  textClass = isActive 
                    ? 'text-slate-900 font-bold border-b border-slate-900' 
                    : 'text-slate-700 hover:text-slate-950 font-semibold border-b border-transparent hover:border-slate-400';
                } else {
                  textClass = isActive 
                    ? 'text-[#f7e8a4] font-bold border-b border-[#f7e8a4]' 
                    : 'text-[#FFFDF5]/90 hover:text-white border-b border-transparent hover:border-[#FFFDF5]/40';
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id as PageId)}
                    className={`font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em] transition-all cursor-pointer border-none bg-transparent pb-1 ${textClass}`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* CTA action tucked into upper right edge */}
            <button
              id="header-nav-join"
              onClick={() => handleNavigation('become-member')}
              className={`font-mono text-[11px] uppercase tracking-[0.15em] px-5 py-2 border rounded-full transition-all duration-300 cursor-pointer ${
                isLightBg
                  ? currentPage === 'become-member'
                    ? 'bg-slate-900 text-[#FFFDF5] border-slate-900 font-bold'
                    : 'bg-transparent border-slate-900/35 text-slate-800 hover:bg-slate-900 hover:text-white hover:border-transparent font-medium'
                  : currentPage === 'become-member'
                    ? 'bg-[#FFFDF5] text-slate-900 border-[#FFFDF5] font-bold'
                    : 'bg-transparent border-[#FFFDF5]/40 text-[#FFFDF5] hover:bg-[#FFFDF5] hover:text-slate-900 font-medium'
              }`}
            >
              Become A Member
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-full cursor-pointer border-none transition-all duration-300 ${
              isLightBg 
                ? 'text-slate-950 bg-black/5 hover:bg-black/10' 
                : 'text-white bg-white/15 hover:bg-white/25 shadow-sm'
            }`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
          </button>
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN SLIDING JOURNAL MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="fixed inset-0 z-30 glassmorphism-dark flex flex-col justify-between p-8 pt-28"
          >
            {/* Top decorative stamp */}
            <div className="border-b border-white/5 pb-4">
              <span className="font-mono text-[10px] text-seagreen-300 tracking-[0.2em] block uppercase">
                SCRA OFFICIAL DIRECTORY
              </span>
              <span className="font-serif italic text-sm text-cream-300 mt-1 block">
                Educate, Engage, and be advocates for our beautiful seaside community
              </span>
            </div>

            {/* Menu options grouped vertically */}
            <div className="flex flex-col gap-5 py-4 text-left">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id as PageId)}
                  className={`font-serif text-3xl text-left font-light transition-all cursor-pointer border-none bg-transparent ${
                    currentPage === item.id
                      ? 'text-[#e5ba55] italic font-normal pl-4 border-l-2 border-[#e5ba55]'
                      : 'text-cream-100 hover:text-seagreen-200'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Bottom info cards */}
            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#e5ba55]">
                <ShieldAlert className="w-4 h-4" />
                <span>CIVIL DEFENCE PORTAL LIVE</span>
              </div>
              <p className="text-[11px] text-cream-205 leading-relaxed font-light">
                SCRA acts as a collective voice representing over 3,500 active residents under Christchurch City Council.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIVE PAGE PORTAL CANVAS - RENDERS ACCURATE MARKUPS */}
      <main className="flex-grow z-10 relative mt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full ${currentPage !== 'home' ? 'pt-24 md:pt-28' : ''}`}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER SECTION - Slim vertical footer only visible on sub-pages */}
      {currentPage !== 'home' && (
        <footer className="relative z-10 border-t border-white/5 bg-ink-black py-12 md:py-16 mt-20 select-text">
          <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Logo details */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-cream-100 text-ink-black flex items-center justify-center">
                  <Waves className="w-3.5 h-3.5 text-seagreen-600" />
                </div>
                <span className="font-serif text-sm tracking-widest text-cream-100 uppercase">
                  Sumner Residents Association
                </span>
              </div>
              <p className="text-[11px] text-cream-200/60 leading-relaxed font-light">
                A volunteer-led organisation dedicated to preserving beach-lifestyle heritage and advocating for environmental safety in Sumner beach, New Zealand.
              </p>
            </div>

            {/* Quick Links map */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-mono text-[9px] uppercase tracking-widest text-[#e5ba55] mb-2.5">
                  The Directory
                </h5>
                <ul className="space-y-1.5 text-xs text-cream-200/80 font-light">
                  <li><button onClick={() => handleNavigation('about-sumner')} className="hover:text-white cursor-pointer bg-transparent border-none">About Sumner</button></li>
                  <li><button onClick={() => handleNavigation('committee')} className="hover:text-white cursor-pointer bg-transparent border-none">Committee Bios</button></li>
                  <li><button onClick={() => handleNavigation('sumner-hub')} className="hover:text-white cursor-pointer bg-transparent border-none">Hub & Van Reservation</button></li>
                  <li><button onClick={() => handleNavigation('news-events')} className="hover:text-white cursor-pointer bg-transparent border-none">News feed</button></li>
                </ul>
              </div>

              <div>
                <h5 className="font-mono text-[9px] uppercase tracking-widest text-red-300 mb-2.5">
                  Resources
                </h5>
                <ul className="space-y-1.5 text-xs text-cream-200/80 font-light">
                  <li><button onClick={() => handleNavigation('civil-defence')} className="hover:text-white cursor-pointer bg-transparent border-none">Emergency Kit Check</button></li>
                  <li><button onClick={() => handleNavigation('meeting-notes')} className="hover:text-white cursor-pointer bg-transparent border-none">2025 Minutes PDF</button></li>
                  <li><button onClick={() => handleNavigation('become-member')} className="hover:text-white cursor-pointer bg-transparent border-none">Become a Member</button></li>
                </ul>
              </div>
            </div>

            {/* Social channels and coordinates */}
            <div className="md:col-span-4 space-y-4">
              <div>
                <h5 className="font-mono text-[9px] uppercase tracking-widest text-cream-300 mb-2">
                  Shoreline Coordinates
                </h5>
                <div className="font-mono text-[10px] text-cream-200/60 tracking-wider">
                  <div>LAT: -43.5684° S</div>
                  <div>LON: 172.7667° E</div>
                  <div className="mt-1">57 Nayland Street, Sumner, Christchurch</div>
                </div>
              </div>

              <div className="flex gap-3 text-cream-300">
                <a href="#" className="hover:text-[#e5ba55]" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="hover:text-[#e5ba55]" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-10 border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <span className="font-mono text-[9px] text-cream-200/40 uppercase tracking-widest">
              © {new Date().getFullYear()} SCRA INCORPORATED. ALL COPIES PROTECTED.
            </span>
            <span className="font-mono text-[9px] text-seagreen-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-seagreen-500 animate-ping" />
              COASTAL RESILIENCE PROTOCOL ENABLED
            </span>
          </div>
        </footer>
      )}
    </div>
  );
}
