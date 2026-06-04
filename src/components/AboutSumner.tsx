/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Leaf, History, Sparkles, MapPin, Compass, ChevronRight, Store, Film } from 'lucide-react';
import CommunityMap from './CommunityMap';

export default function AboutSumner() {
  const bulletPoints = [
    { title: 'Village Surfing Lagoon', text: 'Surf beach and popular swimming spot right in the village.' },
    { title: 'Coastal Bush & Port Hills Trails', text: 'Walking and biking tracks through native bush, ridges, and along the coast.' },
    { title: 'Beachfront Commons', text: 'Local artisan shops, high-end cafes, and restaurants within easy walking distance.' },
    { title: 'Safe Haven', text: 'A safe, welcoming environment for children and growing families.' },
    { title: 'Urban Accessibility', text: 'Well-connected by public transport directly to central Christchurch.' },
    { title: 'Volcanic Microclimate', text: 'A microclimate warmth that supports diverse seaside gardens and outdoor living.' },
    { title: 'Coastal Ecosystem Reserves', text: 'Abundant native birdsong, wildlife, and indigenous plant species throughout reserves.' }
  ];

  return (
    <div className="w-full text-cream-100 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 select-text">
      {/* Header section in Magazine style */}
      <div className="mb-16 border-b border-cream-100/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-xs text-[#e5ba55] tracking-[0.3em] uppercase">01 / COASTAL BIOSPHERE</span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream-105 font-light mt-2 tracking-tight">
            Welcome to <span className="italic font-normal text-seagreen-200">Sumner</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-cream-200/80 mt-2 max-w-2xl">
            &ldquo;A seaside village with a big heart, a wild beach, and views that stop you in your tracks.&rdquo;
          </p>
        </div>
        <div className="font-mono text-xs text-cream-300 text-left md:text-right">
          <p>CHRISTCHURCH CITY, CANTERBURY</p>
          <p className="opacity-60">POPULATION: ~3,500 NEIGHBOURS</p>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column (8 Cols on large screen): Content & History */}
        <div className="lg:col-span-7 space-y-12">
          {/* Main Geo Paragraph */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-seagreen-300 flex items-center gap-2">
              <Compass className="w-4 h-4 animate-spin-slow text-[#e5ba55]" />
              Geography & Vibe
            </h3>
            <p className="text-cream-100/90 text-sm md:text-base leading-relaxed font-light">
              Tucked along the coastline just 10.5 kilometres from central Christchurch, Sumner is the kind of place people come to visit and end up never wanting to leave. Set inside a dormant volcano with the Pacific Ocean at its doorstep and the Port Hills rising up behind it, this little village has a geography unlike anywhere else in New Zealand.
            </p>
            <p className="text-cream-100/90 text-sm md:text-base leading-relaxed font-light">
              Most mornings here begin with birdsong &mdash; bellbirds, fantails, and others in full chorus &mdash; and the sound of waves on the rocks below. On a clear day, you can see the Southern Alps glistening across the bay from the beach. It&apos;s the sort of place that quietly gets under your skin.
            </p>
          </div>

          {/* History Box */}
          <div className="bg-deep-blue/40 border border-white/10 p-6 md:p-8 rounded-none relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <History className="w-32 h-32" />
            </div>
            <span className="font-mono text-[10px] text-[#e5ba55] tracking-widest uppercase block mb-3">HISTORIC RESILIENCE</span>
            <h4 className="font-serif text-2xl text-cream-100 mb-4 font-light">A Bit of History</h4>
            <div className="space-y-4 font-light text-sm text-cream-200/95 leading-relaxed">
              <p>
                Sumner has a long and rich history, shaped by its Māori heritage, its early European settlers, and more recently, by the resilience of a community that rebuilt together after the devastating 2010&ndash;2011 Canterbury earthquakes.
              </p>
              <p>
                The rock formation once known as <strong className="text-seagreen-200 font-normal">Shag Rock</strong> &mdash; renamed <strong className="text-[#e5ba55] font-normal">Shag Pile (Kā Kōhatu a Tuterakihaunoa)</strong> after it changed shape dramatically in the February 2011 earthquake &mdash; stands as one of many landmarks and proud reminders that this community has weathered deep change and come through stronger for it.
              </p>
            </div>
          </div>

          {/* Slogan Quote Block */}
          <div className="border-l-2 border-[#e5ba55] pl-6 italic font-serif text-lg text-cream-200">
            &ldquo;For many Sumner residents, the measure of a good weekend is this: park the car on Friday afternoon, and don&apos;t touch the keys again until Monday morning. Everything you need is right here.&rdquo;
          </div>
        </div>

        {/* Right column (5 Cols): Life in Sumner & Community */}
        <div className="lg:col-span-5 space-y-8">
          {/* Life in Sumner list */}
          <div className="glassmorphism-dark border border-white/10 p-6 md:p-8 rounded-none">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#e5ba55] mb-6 flex items-center gap-2">
              <Leaf className="w-4 h-4 text-seagreen-300" />
              Life in Sumner
            </h3>
            <ul className="space-y-4">
              {bulletPoints.map((item, index) => (
                <li key={index} className="flex items-start gap-3 border-b border-white/5 pb-3">
                  <ChevronRight className="w-4 h-4 text-seagreen-300 mt-1 shrink-0" />
                  <div>
                    <h5 className="font-sans font-medium text-xs text-cream-100 tracking-wide uppercase">{item.title}</h5>
                    <p className="text-xs text-cream-200/70 mt-1 leading-relaxed font-light">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Community card */}
          <div className="bg-seagreen-950/40 p-6 md:p-8 border border-seagreen-700/30">
            <span className="font-mono text-[10px] text-seagreen-300 tracking-[0.2em] uppercase">PEOPLE OF THE BAY</span>
            <h4 className="font-serif text-2xl text-cream-100 mt-1 mb-3 font-light">Our Community</h4>
            <p className="text-xs md:text-sm text-cream-200 leading-relaxed font-light">
              Sumner is home to an incredibly diverse mix of people &mdash; long-timers and newcomers, surfers and hikers, artists and teachers, families and retirees. What we share is a deep love of this unique coastal microclimate and a genuine sense of looking out for one another.
            </p>
            <p className="text-xs md:text-sm text-cream-200 leading-relaxed font-light mt-3">
              The <strong className="text-seagreen-200 font-normal">Sumner Community Residents&apos; Association (SCRA)</strong> exists to give this community a voice &mdash; to advocate, connect, and make sure Sumner remains the special place it has always been.
            </p>
          </div>
        </div>
      </div>

      {/* Local Business Section */}
      <div id="local-businesses" className="border-t border-cream-100/10 pt-16 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <span className="font-mono text-xs text-emerald-400 tracking-[0.3em] uppercase">02 / LOCAL VILLAGE BUSINESSES</span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-cream-105 tracking-tight mt-2">
              Sumner&apos;s Boutique Scene
            </h3>
            <p className="font-serif italic text-base text-cream-200/70 mt-1 max-w-2xl">
              Support local. Sumner Nayland Street features premium artisan markets, boutique shops, and a state-of-the-art cinematic lounge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fresh Choice Card */}
          <div className="bg-[#141922]/50 border border-emerald-500/15 hover:border-emerald-500/40 p-6 md:p-8 rounded-none flex flex-col justify-between transition-all group backdrop-blur-md">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-none border border-emerald-500/20">
                  <Store className="w-6 h-6" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#e5ba55] bg-[#e5ba55]/10 border border-[#e5ba55]/20 px-2.5 py-1">
                  COMMUNITY FRESH MARKET
                </span>
              </div>
              <h4 className="font-serif text-2xl text-cream-105 font-light group-hover:text-emerald-300 transition-colors">
                FreshChoice Sumner
              </h4>
              <p className="text-xs text-cream-200/50 font-mono tracking-widest uppercase mt-1 mb-4">
                43 Nayland Street, Sumner
              </p>
              <p className="text-cream-200/80 text-sm leading-relaxed font-light mb-6">
                FreshChoice Sumner is a beautifully curated local community supermarket at the heart of the village. It features boutique regional New Zealand wines, gorgeous fresh-cut flowers, high-quality local Canterbury cheeses, custom seaside picnic supplies, and warm, welcoming service for locals and visitors alike.
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-400/80">7:00 AM &ndash; 9:00 PM Daily</span>
              <a 
                href="#community-map-section"
                className="text-[#e5ba55] flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity hover:underline"
              >
                Find on Map &rarr;
              </a>
            </div>
          </div>

          {/* Silky Otter Card */}
          <div className="bg-[#141922]/50 border border-emerald-500/15 hover:border-emerald-500/40 p-6 md:p-8 rounded-none flex flex-col justify-between transition-all group backdrop-blur-md">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className="p-3 bg-emerald-500/10 text-emerald-400 rounded-none border border-emerald-500/20">
                  <Film className="w-6 h-6" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-sky-400 bg-sky-500/10 border border-sky-450/20 px-2.5 py-1">
                  LUXURY CINEMAS
                </span>
              </div>
              <h4 className="font-serif text-2xl text-cream-105 font-light group-hover:text-emerald-300 transition-colors">
                Silky Otter Cinema
              </h4>
              <p className="text-xs text-cream-200/50 font-mono tracking-widest uppercase mt-1 mb-4">
                3 Nayland Street, Sumner
              </p>
              <p className="text-cream-200/80 text-sm leading-relaxed font-light mb-6">
                An ultra-premium boutique cinema development delivering unmatched comfort and design. Silky Otter Sumner features plush full-reclining leather seats in cozy state-of-the-art theatres, an exquisite lounge menu curated by local chefs, fine Canterbury wines, and personal delivery directly to your seat.
              </p>
            </div>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-400/80">Showtimes Daily &bull; In-Theatre Dining</span>
              <a 
                href="#community-map-section"
                className="text-[#e5ba55] flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity hover:underline"
              >
                Find on Map &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Interactive Community Map Block */}
      <CommunityMap />
    </div>
  );
}
