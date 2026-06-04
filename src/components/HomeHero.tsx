/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { PageId } from '../types';
import { Waves, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (page: PageId) => void;
  bgImageUrl: string;
}

export default function HomeHero({ onNavigate, bgImageUrl }: HomeHeroProps) {
  // Parallax effect using motion values based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse coordinates to subtle translations for background
  const bgX = useTransform(x, [-300, 300], [-15, 15]);
  const bgY = useTransform(y, [-300, 300], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden select-none bg-ink-black flex flex-col justify-between p-6 md:p-10"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image Panel - Dominates entire viewport with subtle parallax and Bold Typography aesthetic */}
      <div className="absolute inset-0 z-0 bg-ink-black">
        {/* Full Bleed Image fills the canvas */}
        <motion.div
          className="absolute inset-0 scale-105 origin-center"
          style={{
            x: bgX,
            y: bgY,
            backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 25 }}
        />
        
        {/* Elegant Green/Teal Color Overlay to tint and fade the image, preserving the design look */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2d4242]/90 via-[#3c6666]/85 to-[#9ab1a8]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#3D5A5A]/35 mix-blend-overlay" />
        
        {/* Abstract "Beach" Shoreline via CSS Circles/Blurs from the design HTML */}
        <div className="absolute -bottom-20 -left-20 w-[800px] h-[600px] bg-[#f7e8a4] rounded-full mix-blend-soft-light opacity-30 blur-[120px]" />
        
        {/* Horizontal thin design line detail */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white opacity-20" />
      </div>

      {/* Edge Elements: Coordinates & Metadata (Top Left) */}
      <div className="relative z-10 flex justify-between items-start pt-20 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col text-[#FFFDF5] font-mono text-[10px] sm:text-xs tracking-[0.25em]"
        >
          <span>LAT 43.5684° S</span>
          <span className="opacity-70">LON 172.7667° E</span>
        </motion.div>

        {/* Edge Elements: Issue Tag (Top Right) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-right text-[#FFFDF5]/90 font-mono text-[10px] sm:text-xs tracking-[0.2em] flex flex-col items-end"
        >
          <div className="flex items-center gap-1.5 text-soft-yellow">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f7e8a4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e5ba55]"></span>
            </span>
            <span>SUMNER SHORELINE</span>
          </div>
          <span className="text-[#FFFDF5]/55 mt-1">VOL. 2026 ISSUE 01</span>
        </motion.div>
      </div>

      {/* Main Magazine Layout Block */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
        {/* Large Decorative Vertical Captain Line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-cream-100 hidden md:block"
        />

        {/* Luxury Magazine Styled Vertical Captions (Left Floating Side) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-left max-w-[220px]">
          <div className="pl-4 py-1">
            <span className="block text-[9px] font-bold tracking-[0.3em] uppercase mb-1 text-[#FFFDF5] opacity-55">Community Advocate</span>
            <span className="block font-serif italic text-xl text-[#FFFDF5]">Guarding the beautiful Sumner shoreline, wildlife, & heritage</span>
          </div>
        </div>

        {/* Luxury Magazine Styled Vertical Captions (Right Floating Side) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6 text-right max-w-[220px]">
          <div className="pr-4 py-1 flex flex-col items-end">
            <span className="block text-[9px] font-bold tracking-[0.3em] uppercase mb-1 text-[#FFFDF5] opacity-55">Current Project</span>
            <span className="block font-serif italic text-xl text-[#FFFDF5]">The Esplanade Restoration & Seismic Resilience</span>
          </div>
        </div>

        {/* Pre-title Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-mono text-xs sm:text-sm tracking-[0.4em] text-[#f7e8a4] uppercase mb-3 flex items-center gap-2"
        >
          <Waves className="w-4 h-4 text-[#f7e8a4] stroke-[1.5]" />
          <span>ESTABLISHED 1876</span>
        </motion.div>

        {/* THE OVERSIZED SERIF TITLE - Luxury Magazine Cover Style matching Design HTML */}
        <div className="relative pointer-events-none select-none max-w-5xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 30, damping: 15, delay: 0.5 }}
            className="font-serif italic text-[18vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-normal tracking-tighter text-[#FFFDF5] leading-[0.8] block"
          >
            Sumner
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ duration: 1.5, delay: 0.9 }}
            className="flex items-baseline justify-center mt-6 max-w-lg mx-auto"
          >
            <div className="w-16 sm:w-24 h-[1px] bg-[#f7e8a4]/40 mr-4"></div>
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-left text-[#FFFDF5] leading-relaxed">
              Community Residents Association:
              <span className="block font-light mt-1 normal-case tracking-normal text-lg sm:text-xl md:text-2xl italic font-serif text-[#FFFDF5]/90">
                Educate, Engage, and serve as advocates for our beautiful seaside community
              </span>
            </p>
          </motion.div>
        </div>

        {/* Empty placeholder spacer matching the minimal style */}
        <div className="my-3" />
      </div>

      {/* Lower Banner Info & Main Call-to-Actions (Bottom Row) */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 justify-between items-center border-t border-cream-100/10 pt-6 mt-4">
        {/* Brief Mission Text (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-xs text-center md:text-left"
        >
          <p className="font-mono text-[10px] text-[#f7e8a4]/90 uppercase tracking-widest leading-relaxed">
            Welcome to Our Coast
          </p>
          <p className="text-xs text-[#FFFDF5]/90 font-sans mt-1.5 leading-relaxed font-light">
            A small coastal village set inside a dormant volcano, nestled just 10.5 kilometers from central Christchurch.
          </p>
        </motion.div>

        {/* Become A Member Stamp CTA (Center / Bottom Right interaction matching Bold Typography theme) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 1.1 }}
          className="flex flex-wrap gap-6 items-center justify-center z-10"
        >
          <button
            id="cta-become-member"
            onClick={() => onNavigate('become-member')}
            className="group relative flex flex-col items-center justify-center w-36 h-36 md:w-40 md:h-40 rounded-full border border-[#FFFDF5]/35 text-[#FFFDF5] hover:bg-[#FFFDF5] hover:text-slate-900 transition-all duration-500 cursor-pointer bg-transparent"
          >
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Become</span>
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5">A Member</span>
            <div className="mt-3 w-4.5 h-4.5 border-r border-b border-current rotate-45 group-hover:translate-y-1 transition-transform"></div>
          </button>

          <button
            id="cta-emergency-hub"
            onClick={() => onNavigate('civil-defence')}
            className="group inline-flex items-center gap-2 bg-[#FFFDF5] hover:bg-[#f7e8a4] text-slate-900 px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-transparent rounded-full font-bold shadow-lg"
          >
            <ShieldAlert className="w-4 h-4 text-slate-900 animate-pulse-slow shrink-0" />
            Civil Preparedness
          </button>
        </motion.div>
      </div>
    </div>
  );
}
