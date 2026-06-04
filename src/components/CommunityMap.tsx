/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Compass, 
  Map as MapIcon, 
  Navigation, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  Building2, 
  Waves, 
  Home, 
  Anchor, 
  Info,
  Layers,
  Store,
  Film
} from 'lucide-react';

interface MapPinData {
  id: string;
  name: string;
  category: 'community' | 'coastal' | 'emergency' | 'business';
  x: number; // percentage from left
  y: number; // percentage from top
  heading: string;
  description: string;
  coordinates: string;
  address: string;
  icon: React.ComponentType<{ className?: string }>;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

export default function CommunityMap() {
  const [activePinId, setActivePinId] = useState<string>('hub');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isTourMode, setIsTourMode] = useState<boolean>(false);

  // Curated elegant pins for the Sumner Community coastline
  const pins: MapPinData[] = [
    {
      id: 'hub',
      name: 'The Hub',
      category: 'community',
      x: 31,
      y: 53,
      heading: 'SCRA Community Hub',
      description: 'Home of the Sumner Community Residents Association. A dedicated local collaboration space housing advocacy forums, community archives, event planners, and local planning initiatives.',
      coordinates: '43.5694° S, 172.7656° E',
      address: '57 Nayland Street, Sumner',
      icon: Home,
      labelPosition: 'top',
    },
    {
      id: 'library',
      name: 'Matuku Takotako',
      category: 'community',
      x: 46,
      y: 63,
      heading: 'Matuku Takotako: Sumner Centre',
      description: 'The spectacular award-winning community architecture featuring the Christchurch City Council library, local service desk, community rooms, and custom historical galleries celebrating Sumner heritage.',
      coordinates: '43.5689° S, 172.7645° E',
      address: '14/16 Wakefield Avenue, Sumner',
      icon: Building2,
      labelPosition: 'bottom',
    },
    {
      id: 'beach-access',
      name: 'Beach Access & Cave Rock',
      category: 'coastal',
      x: 52,
      y: 28,
      heading: 'Cave Rock (Tuawera) Access',
      description: 'Main coastal pathway leading to Cave Rock Beach. Features historic maritime alert stairs and walking tracks. Crucial environmental monitoring site for shoreline sand levels.',
      coordinates: '43.5658° S, 172.7632° E',
      address: 'The Esplanade, Sumner Shoreline',
      icon: Waves,
      labelPosition: 'right',
    },
    {
      id: 'surf-lifesaving',
      name: 'Sumner Surf Lifesaving',
      category: 'coastal',
      x: 23,
      y: 39,
      heading: 'Sumner Surf Lifesaving Club',
      description: 'Guardian of beachgoers and regional ocean athletes since 1911. Houses vital active patrol gears, safety training assemblies, and acts as the marine safety anchor along Sumner sands.',
      coordinates: '43.5662° S, 172.7710° E',
      address: 'The Esplanade (at Head Street), Sumner',
      icon: Waves,
      labelPosition: 'right',
    },
    {
      id: 'coast-guard',
      name: 'Sumner Coast Guard',
      category: 'coastal',
      x: 76,
      y: 36,
      heading: 'Sumner Lifeboat & Coastguard',
      description: 'Operating out of the estuary mouth. A dedicated fleet of volunteer rescue mariners providing essential 24/7 offshore search & rescue, vessels guidance, and oceanic checks.',
      coordinates: '43.5631° S, 172.7584° E',
      address: '1 Marine Parade, Sumner',
      icon: Anchor,
      labelPosition: 'left',
    },
    {
      id: 'assembly-school',
      name: 'Emergency Point: Sumner School',
      category: 'emergency',
      x: 42,
      y: 78,
      heading: 'Civil Defence Welfare Hub',
      description: 'The primary designated civil defence emergency response center for Sumner. Equipped with high-frequency emergency radio, relief backups, and welfare coordination spaces.',
      coordinates: '43.5712° S, 172.7662° E',
      address: 'Colenso Street, Sumner',
      icon: Shield,
      labelPosition: 'bottom',
    },
    {
      id: 'assembly-scarborough',
      name: 'Emergency Point: Scarborough',
      category: 'emergency',
      x: 88,
      y: 46,
      heading: 'Scarborough Coastal Assembly Point',
      description: 'Alternative high-ground staging point. Serving coastal Scarborough with critical communication kits and coastal emergency response gear during seismic alerts or extreme tide swells.',
      coordinates: '43.5671° S, 172.7812° E',
      address: 'Scarborough Park Pavilion, Marine Parade',
      icon: Shield,
      labelPosition: 'left',
    },
    {
      id: 'fresh-choice',
      name: 'FreshChoice Sumner',
      category: 'business',
      x: 37,
      y: 53,
      heading: 'FreshChoice Sumner Supermarket',
      description: 'Our beautifully curated local community supermarket. Proudly stocking local Christchurch region produce, premium New Zealand wines, artisan beach picnic boards, and everyday essentials with supreme coastal service.',
      coordinates: '43.5691° S, 172.7651° E',
      address: '43 Nayland Street, Sumner',
      icon: Store,
      labelPosition: 'bottom',
    },
    {
      id: 'silky-otter',
      name: 'Silky Otter Cinema',
      category: 'business',
      x: 44,
      y: 58,
      heading: 'Silky Otter Cinemas Sumner',
      description: 'An elegant, state-of-the-art boutique cinema lounge featuring the ultimate in coastal cinematic luxury. Treat yourself to cozy full-recliner leather seats, an in-house wine and food menu, and personal seat delivery service.',
      coordinates: '43.5695° S, 172.7638° E',
      address: '3 Nayland Street, Sumner',
      icon: Film,
      labelPosition: 'right',
    }
  ];

  // Map filtering logic
  const filteredPins = pins.filter(pin => activeCategory === 'all' || pin.category === activeCategory);

  const selectedPin = pins.find(pin => pin.id === activePinId) || pins[0];

  // Sequential Tour navigation
  const nextPinInTour = () => {
    const currentIndex = pins.findIndex(p => p.id === activePinId);
    if (currentIndex < pins.length - 1) {
      setActivePinId(pins[currentIndex + 1].id);
    } else {
      setActivePinId(pins[0].id); // loop back
    }
  };

  const prevPinInTour = () => {
    const currentIndex = pins.findIndex(p => p.id === activePinId);
    if (currentIndex > 0) {
      setActivePinId(pins[currentIndex - 1].id);
    } else {
      setActivePinId(pins[pins.length - 1].id);
    }
  };

  return (
    <div id="community-map-section" className="border-t border-cream-100/10 pt-16 mt-20">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-10">
        <div>
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.25em] uppercase flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#e5ba55] animate-spin-slow" />
            02 / CARTOGRAPHIC EXPLORATION
          </span>
          <h3 className="font-serif text-3xl md:text-5xl font-light text-cream-105 tracking-tight mt-2">
            Interactive Community Map
          </h3>
          <p className="font-serif italic text-base text-cream-200/70 mt-1 max-w-2xl">
            A stylized perspective of Sumner&apos;s coastline, marking key community landmarks, historical points, and vital preparedness zones.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex flex-wrap gap-2 items-center bg-white/[0.03] border border-white/10 p-1 rounded-full text-center">
          <button
            onClick={() => { setActiveCategory('all'); setIsTourMode(false); }}
            className={`px-3 md:px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeCategory === 'all' && !isTourMode
                ? 'bg-[#e5ba55] text-slate-950 font-bold shadow-sm'
                : 'text-cream-200/80 hover:text-white hover:bg-white/5'
            }`}
          >
            All Areas
          </button>
          <button
            onClick={() => { setActiveCategory('community'); setIsTourMode(false); }}
            className={`px-3 md:px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeCategory === 'community' && !isTourMode
                ? 'bg-[#e5ba55] text-slate-950 font-bold shadow-sm'
                : 'text-cream-200/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Community
          </button>
          <button
            onClick={() => { setActiveCategory('coastal'); setIsTourMode(false); }}
            className={`px-3 md:px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeCategory === 'coastal' && !isTourMode
                ? 'bg-[#e5ba55] text-slate-950 font-bold shadow-sm'
                : 'text-cream-200/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Coastal
          </button>
          <button
            onClick={() => { setActiveCategory('business'); setIsTourMode(false); }}
            className={`px-3 md:px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeCategory === 'business' && !isTourMode
                ? 'bg-emerald-550 bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-cream-200/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Local Businesses
          </button>
          <button
            onClick={() => { setActiveCategory('emergency'); setIsTourMode(false); }}
            className={`px-3 md:px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeCategory === 'emergency' && !isTourMode
                ? 'bg-rose-950/40 text-rose-300 font-bold border border-rose-900/40 shadow-sm'
                : 'text-cream-200/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Emergency
          </button>
          <div className="w-[1px] h-4 bg-white/15 mx-1" />
          <button
            onClick={() => setIsTourMode(!isTourMode)}
            className={`px-3 md:px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              isTourMode
                ? 'bg-[#f7e8a4] text-slate-900 font-extrabold shadow-sm'
                : 'text-cream-100 bg-white/5 border border-[#e5ba55]/30 hover:bg-white/10'
            }`}
          >
            <Navigation className="w-3 h-3 animate-pulse text-[#e5ba55]" />
            Tour
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* MAP CONTAINER (8 Columns on Desktop) */}
        <div className="lg:col-span-8 bg-[#1e293b] border border-white/15 relative overflow-hidden flex flex-col min-h-[440px] md:min-h-[520px] shadow-2xl">
          
          {/* Subtle Topographical blueprint background layer using SVG with scaling viewBox */}
          <div className="absolute inset-0 pointer-events-none select-none opacity-[0.9] transition-all duration-300">
            <svg viewBox="0 0 1000 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.35" />
                </pattern>
                <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#oceanGrad)" />
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Grayscale coastal topography outline (Sumner beach shape) */}
              {/* This mimics the layout of Cave Rock / Estuary of Christchurch / Sumner Bay coastline */}
              {/* Smooth curves from top-left (Estuary) down and around Sumner, then climbing up on right (Scarborough cliffs) */}
              <g stroke="#ffffff" fill="none" strokeWidth="1.2" strokeOpacity="0.7">
                <path d="M -50 400 C 150 410, 200 180, 410 160 C 510 150, 520 280, 580 320 C 680 340, 750 210, 890 190 C 950 180, 1100 0, 1200 0" strokeDasharray="4 4" />
                <path d="M -50 380 C 140 390, 190 170, 400 150 C 490 140, 510 260, 570 300 C 670 320, 740 200, 880 180 C 940 170, 1090 0, 1190 0" strokeWidth="3" strokeOpacity="0.9" />
                <path d="M -50 360 C 130 370, 180 160, 390 140 C 470 130, 500 240, 560 280 C 665 300, 730 190, 870 170 C 930 160, 1080 0, 1180 0" strokeDasharray="2 6" />
                
                {/* Visual landmark of Cave Rock (Center Monolith) */}
                <path d="M 470 120 Q 500 80, 530 120 Q 550 150, 520 180 Q 480 180, 470 120 Z" fill="#334155" fillOpacity="0.9" stroke="#e5ba55" strokeWidth="1.5" strokeOpacity="1" />
                {/* Visual text notes - outlines added for absolute legibility */}
                <text x="500" y="195" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#f7e8a4" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.25em" textAnchor="middle">CAVE ROCK</text>
                <text x="80" y="360" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#cbd5e1" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.2em">ESTUARY OUTLET</text>
                <text x="690" y="140" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#cbd5e1" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.2em">PEGASUS BAY</text>
                <text x="860" y="230" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#cbd5e1" fontSize="11" fontWeight="bold" fontFamily="monospace" letterSpacing="0.2em" textAnchor="end">SCARBOROUGH</text>
              </g>

              {/* Stylized Coastal Streets & Main Roads (Vibrant Off-White and Light Gray for Contrast) */}
              <g strokeLinecap="round" strokeLinejoin="round">
                {/* The Esplanade / Marine Parade along the coastline */}
                <path d="M 0 410 C 150 420, 200 200, 410 180 C 480 170, 500 280, 560 320 C 660 340, 730 220, 870 200 C 930 190, 1080 30, 1180 30" fill="none" stroke="#f8fafc" strokeWidth="7.5" strokeOpacity="0.95" />
                <path d="M 0 410 C 150 420, 200 200, 410 180 C 480 170, 500 280, 560 320 C 660 340, 730 220, 870 200 C 930 190, 1080 30, 1180 30" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.8" />

                {/* Nayland Street (Village central business road) */}
                <path d="M 150 270 L 600 270" fill="none" stroke="#f8fafc" strokeWidth="7.5" strokeOpacity="0.95" />
                <path d="M 150 270 L 600 270" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.8" />

                {/* Wakefield Avenue */}
                <path d="M 460 270 L 460 420" fill="none" stroke="#f8fafc" strokeWidth="7.5" strokeOpacity="0.95" />
                <path d="M 460 270 L 460 420" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.8" />
              </g>

              {/* Road Labels */}
              <g fill="#ffffff" fontSize="9.5" fontWeight="bold" fontFamily="monospace" letterSpacing="0.15em">
                <text x="260" y="212" transform="rotate(-6, 260, 212)" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#e2e8f0">THE ESPLANADE</text>
                <text x="270" y="262" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#e2e8f0">NAYLAND STREET</text>
                <text x="474" y="340" transform="rotate(90, 474, 340)" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#e2e8f0">WAKEFIELD AVE</text>
                <text x="960" y="98" transform="rotate(-8, 960, 98)" stroke="#0f172a" strokeWidth="2.5" paintOrder="stroke" strokeLinejoin="round" fill="#e2e8f0">MARINE PARADE</text>
              </g>

              {/* Topographical concentric sea waves with fill="none" to prevent solid black fills */}
              <circle cx="500" cy="130" r="120" fill="none" stroke="#FFFDF5" strokeOpacity="0.25" strokeDasharray="2 8" />
              <circle cx="500" cy="130" r="220" fill="none" stroke="#FFFDF5" strokeOpacity="0.25" strokeDasharray="2 8" />
            </svg>
          </div>

          {/* Compass Rose Accent */}
          <div className="absolute top-5 left-5 pointer-events-none opacity-80 flex items-center gap-2">
            <div className="relative w-12 h-12 flex items-center justify-center border border-white/25 bg-slate-950/60 rounded-full">
              <Compass className="w-6 h-6 text-[#e5ba55] stroke-[1] animate-spin-slow" />
              <div className="absolute top-0 text-[8px] font-mono font-bold text-[#e5ba55]">N</div>
              <div className="absolute bottom-0 text-[7px] font-mono text-[#FFFDF5]/60">S</div>
              <div className="absolute left-0 text-[7px] font-mono pl-0.5 text-[#FFFDF5]/60">W</div>
              <div className="absolute right-0 text-[7px] font-mono pr-0.5 text-[#FFFDF5]/60">E</div>
            </div>
            <div className="font-mono text-[9px] text-[#FFFDF5]/90 flex flex-col bg-slate-950/60 p-1 rounded">
              <span className="font-semibold tracking-wider text-seagreen-200">SUMNER COAST GRID</span>
              <span>43.5684° S / 172.7667° E</span>
            </div>
          </div>

          {/* Scale Legend */}
          <div className="absolute bottom-5 left-5 pointer-events-none opacity-80 bg-black/60 backdrop-blur-sm p-2 border border-white/5 font-mono text-[8px] tracking-widest text-cream-205">
            <span>SCALE 1:12,500</span>
            <div className="w-16 h-[2px] bg-seagreen-400 mt-1 flex">
              <div className="w-1/2 h-full bg-[#e5ba55]"></div>
            </div>
            <span className="block mt-0.5">250 METERS</span>
          </div>

          {/* Emergency Alert Badge - Static reminder */}
          <div className="absolute bottom-5 right-5 pointer-events-none opacity-90 flex items-center gap-1.5 bg-rose-950/50 backdrop-blur-md border border-rose-800/40 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-rose-300 font-bold">
              Emergency Hub Link active
            </span>
          </div>

          {/* INTERACTIVE PINS LAYER */}
          <div className="absolute inset-0">
            {filteredPins.map((pin) => {
              const isActive = pin.id === activePinId;
              const isEmergency = pin.category === 'emergency';
              const isCoastal = pin.category === 'coastal';
              const isBusiness = pin.category === 'business';
              
              const categoryColorClasses = isEmergency
                ? isActive ? 'bg-rose-500 text-white ring-rose-300' : 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                : isCoastal
                ? isActive ? 'bg-sky-500 text-white ring-sky-300' : 'bg-sky-950/80 text-sky-300 border-sky-500/50'
                : isBusiness
                ? isActive ? 'bg-emerald-500 text-slate-955 ring-emerald-300 font-bold' : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : isActive ? 'bg-[#e5ba55] text-slate-900 ring-yellow-200' : 'bg-[#151920]/90 text-[#f7e8a4] border-[#e5ba55]/50';

              const getLabelStyle = (pos?: 'top' | 'bottom' | 'left' | 'right') => {
                switch (pos) {
                  case 'top':
                    return 'bottom-full left-1/2 -translate-x-1/2 mb-2.5';
                  case 'bottom':
                    return 'top-full left-1/2 -translate-x-1/2 mt-2.5';
                  case 'left':
                    return 'right-full top-1/2 -translate-y-1/2 mr-2.5';
                  case 'right':
                  default:
                    return 'left-full top-1/2 -translate-y-1/2 ml-2.5';
                }
              };

              return (
                <div
                  key={pin.id}
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 select-none group/pin cursor-pointer"
                  onClick={() => {
                    setActivePinId(pin.id);
                  }}
                >
                  {/* Subtle pulsing animation rings surrounding active pin */}
                  {isActive && (
                    <>
                      <span className={`absolute -inset-4 rounded-full animate-ping opacity-25 ${isEmergency ? 'bg-rose-400' : isCoastal ? 'bg-sky-400' : isBusiness ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                      <span className={`absolute -inset-7 rounded-full animate-pulse-slow opacity-15 ${isEmergency ? 'bg-rose-400' : isCoastal ? 'bg-sky-400' : isBusiness ? 'bg-emerald-400' : 'bg-yellow-400'}`} />
                    </>
                  )}

                  {/* Pin container */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shadow-lg transition-all duration-300 ${categoryColorClasses} ${
                    isActive ? 'scale-125 ring-4' : 'hover:scale-115 hover:border-white/50'
                  }`}>
                    <pin.icon className="w-4 h-4 stroke-[2]" />
                  </div>

                  {/* High contrast, permanent, beautifully positioned physical labels */}
                  <div className={`absolute ${getLabelStyle(pin.labelPosition)} bg-slate-950 border ${
                    isActive 
                      ? 'border-[#e5ba55] text-[#e5ba55] font-black shadow-lg shadow-black/50 scale-110 z-20' 
                      : 'border-white/25 text-white font-bold shadow-md shadow-black/40 hover:border-white/40'
                  } px-2.5 py-1 rounded text-[9.5px] font-mono tracking-wider uppercase whitespace-nowrap z-10 transition-all pointer-events-none`}>
                    {pin.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tour Navigation Controls HUD Overlay */}
          {isTourMode && (
            <div className="absolute top-5 right-5 bg-slate-950/90 border border-[#e5ba55]/30 p-3 shadow-xl backdrop-blur-md flex items-center gap-4 z-20">
              <span className="font-mono text-[9px] uppercase tracking-wider text-[#e5ba55] font-black animate-pulse">
                • Tour Mode Active
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={prevPinInTour}
                  className="p-1 px-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cream-105 rounded hover:text-white transition-colors cursor-pointer"
                  title="Previous Pin"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextPinInTour}
                  className="p-1 px-1.5 bg-[#e5ba55] hover:bg-[#f7e8a4] text-slate-950 rounded font-bold transition-colors cursor-pointer"
                  title="Next Pin"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR DETAILS INFORMATION PANEL (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-slate-950/30 border border-white/10 p-6 relative overflow-hidden backdrop-blur-md select-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedPin.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Category label indicator */}
              <div className="flex items-center justify-between">
                <span className={`font-mono text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 font-bold ${
                  selectedPin.category === 'emergency'
                    ? 'bg-rose-950/60 text-rose-300 border border-rose-900/40'
                    : selectedPin.category === 'coastal'
                    ? 'bg-sky-950/60 text-sky-300 border border-sky-900/40'
                    : selectedPin.category === 'business'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-900/40'
                    : 'bg-[#e5ba55]/10 text-[#e5ba55] border border-[#e5ba55]/20'
                }`}>
                  {selectedPin.category === 'emergency' 
                    ? 'Safety / Assembly Point' 
                    : selectedPin.category === 'coastal' 
                    ? 'Coastal Access' 
                    : selectedPin.category === 'business'
                    ? 'Local Business'
                    : 'Community Spot'}
                </span>
                
                {/* Visual Icon matching category */}
                <span className="text-cream-200/30 font-mono text-xs">
                  {selectedPin.coordinates.split(',')[0]}
                </span>
              </div>

              {/* Landmark Heading */}
              <div>
                <h4 className="font-serif text-2xl text-cream-105 font-light tracking-tight leading-tight">
                  {selectedPin.heading}
                </h4>
                <p className="font-mono text-[9px] text-[#e5ba55] tracking-widest uppercase mt-1">
                  COORDINATES: {selectedPin.coordinates}
                </p>
              </div>

              {/* Dynamic decorative visual line */}
              <div className="h-[1px] w-full bg-white/10 flex">
                <div className={`h-full w-12 ${
                  selectedPin.category === 'emergency' 
                    ? 'bg-rose-500' 
                    : selectedPin.category === 'coastal' 
                    ? 'bg-sky-500' 
                    : selectedPin.category === 'business'
                    ? 'bg-emerald-500'
                    : 'bg-[#e5ba55]'
                }`} />
              </div>

              {/* Description Body */}
              <p className="text-cream-200/90 text-xs md:text-sm leading-relaxed font-light">
                {selectedPin.description}
              </p>

              {/* Physical Address details */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-none space-y-1.5">
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#e5ba55]/80 block">
                  PHYSICAL ROUTING ADDRESS
                </span>
                <p className="font-sans text-xs text-cream-100 font-normal">
                  {selectedPin.address}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-white/10 pt-4 mt-8 flex items-center justify-between text-left">
            <div className="flex items-center gap-2 text-cream-200/40">
              <Info className="w-3.5 h-3.5" />
              <span className="text-[10px] font-mono tracking-wider uppercase">
                Select other pins to explore
              </span>
            </div>

            {/* Quick mini switcher for comfort */}
            <div className="flex gap-1">
              <button
                onClick={prevPinInTour}
                className="p-1 px-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cream-100 rounded hover:text-white cursor-pointer transition-colors"
                title="Previous Point"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                onClick={nextPinInTour}
                className="p-1 px-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-cream-100 rounded hover:text-white cursor-pointer transition-colors"
                title="Next Point"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
