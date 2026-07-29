/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, AlertTriangle, Phone, CheckSquare, Zap, Map, FileCheck } from 'lucide-react';

export default function CivilDefence() {
  const [checklistItems, setChecklistItems] = useState([
    { id: 'water', text: 'Water - At least 3 litres per person per day (for drinking & hygiene)', checked: false },
    { id: 'food', text: 'Food - Non-perishable canned/dried foods & can opener (minimum 3-day supply)', checked: false },
    { id: 'torch', text: 'Flashlight / Torch with extra batteries or hand-crank charging', checked: false },
    { id: 'radio', text: 'Portable battery-powered radio (for official Civil Defence updates)', checked: false },
    { id: 'meds', text: 'Essential medicines, first-aid kit, masks, and sanitary items', checked: false },
    { id: 'docs', text: 'Copies of critical documents (ID, insurance policies, local emergency maps)', checked: false },
    { id: 'baby_pet', text: 'Special supplies for babies, toddlers, or household pets', checked: false },
    { id: 'phones', text: 'Mobile phone power bank & charging cords', checked: false }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const getKitReadyPercentage = () => {
    const checkedCount = checklistItems.filter((i) => i.checked).length;
    return Math.round((checkedCount / checklistItems.length) * 100);
  };

  return (
    <div className="w-full text-cream-105 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 select-text">
      {/* Magazine Cover Header */}
      <div className="mb-16 border-b border-cream-100/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-xs text-red-400 tracking-[0.3em] uppercase block">
            06 / EMERGENCY PLAN
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream-105 font-light mt-2 tracking-tight">
            Civil <span className="italic font-normal text-red-450 text-red-300">Defence</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-cream-200/85 mt-2 max-w-3xl">
            &ldquo;In Sumner, we look out for each other &mdash; especially when it matters most.&rdquo;
          </p>
        </div>
        <div className="text-left md:text-right">
          <span className="text-xs text-red-400 font-mono tracking-widest block">SECURE COMMUNITY RADIALS</span>
          <span className="text-[11px] text-[#e5ba55] font-mono block mt-1">EMERGENCY PREPAREDNESS</span>
        </div>
      </div>

      {/* Intro Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light">
          Living in a gorgeous coastal village on the edge of the Pacific Ocean, in a city still rebuilding from earthquakes, means being prepared isn&apos;t just sensible &mdash; it is a fundamental part of how we live here. The good news is, being ready doesn&apos;t have to be overwhelming.
        </p>
        <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light">
          This portal brings together the key safety protocols you need for the two most likely emergencies in Sumner: earthquakes and coastal flooding or tsunami incidents. We have also mapped official links so you always have up-to-date guidance at your fingertips.
        </p>
      </div>

      {/* Extreme Alert Box: Long or Strong, Get Gone */}
      <motion.div
        initial={{ scale: 0.98, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="bg-red-950/40 border border-red-500/35 p-6 md:p-8 mb-16 rounded-none flex flex-col md:flex-row gap-6 items-start"
      >
        <AlertTriangle className="w-12 h-12 text-red-400 shrink-0 mt-1 stroke-[1.5]" />
        <div>
          <span className="font-mono text-[10px] text-red-300 uppercase tracking-widest font-semibold">Tsunami Warning Rule</span>
          <h3 className="font-serif text-2xl text-cream-105 font-light mt-1 mb-2">If an Earthquake is LONG or STRONG, GET GONE</h3>
          <p className="text-sm text-cream-200/90 leading-relaxed font-light">
            Do not wait for sirens or official CDEM cellular alerts. If you experience shaking that lasts longer than a minute, OR is strong enough to make it hard to stand: move immediately to higher ground (the hills) or inland beyond the designated orange evacuation boundaries.
          </p>
        </div>
      </motion.div>

      {/* Dual Protocol Grid: Tsunami and Earthquake */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Tsunami Column */}
        <div className="bg-white/[0.01] border border-white/10 p-6 md:p-8 rounded-none">
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#e5ba55] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Tsunami & Coastal Flooding
          </h4>

          <div className="space-y-6 text-sm font-light leading-relaxed text-cream-205">
            <div>
              <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wider mb-1.5">1. Evacuation Boundaries</h5>
              <p className="text-xs text-cream-200/80">
                Sumner is divided into Red (beach beaches), Orange (high risk coastal roads), and Yellow (rare event padding) zones. Familiarise yourself with Christchurch City Council&apos;s CDEM map boundaries on Nayland Street.
              </p>
            </div>

            <div>
              <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wider mb-1.5">2. Safe Evacuation Routes</h5>
              <p className="text-xs text-cream-200/80">
                Depending on your street, evacuate up Clifton Hill, Evans Pass Road, or Scarborough Hill. Avoid using cars unless absolutely necessary to prevent severe road grids.
              </p>
            </div>

            <div>
              <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wider mb-1.5">3. Natural Warning Signs</h5>
              <p className="text-xs text-cream-200/80">
                Move to safety immediately if you notice an unusual rising or falling of ocean waters, or hear loud, roaring sea sounds from the cliff bases.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-2">
              <a
                href="https://www.civildefence.govt.nz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-wider text-[#e5ba55] hover:text-cream-100 font-semibold"
              >
                Official Civil Defence NZ Portal ↗
              </a>
            </div>
          </div>
        </div>

        {/* Earthquake Column */}
        <div className="bg-white/[0.01] border border-white/10 p-6 md:p-8 rounded-none">
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#e5ba55] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            Earthquake Preparedness
          </h4>

          <div className="space-y-6 text-sm font-light leading-relaxed text-cream-205">
            <div>
              <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wider mb-1.5">1. Drop, Cover, and Hold</h5>
              <p className="text-xs text-cream-200/80">
                During shaking, immediately DROP to hands & knees, COVER head and neck under sturdy furniture, and HOLD ON until the shaking stops. If outdoors, move away from cliff shelves and brick structures.
              </p>
            </div>

            <div>
              <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wider mb-1.5">2. After Shaking Stops</h5>
              <p className="text-xs text-cream-200/80">
                Check yourself and others for injuries. Shut off gas supply lines. Check local water reservoirs. Prepare for immediate coastal alerts if the shaking felt long or strong.
              </p>
            </div>

            <div>
              <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wider mb-1.5">3. Local Welfare Gathering Hub</h5>
              <p className="text-xs text-cream-200/80">
                In a sector-wide emergency, the <strong className="text-seagreen-200 font-normal">Sumner Hub at 57 Nayland Street</strong> operates as our primary civil coordinate, safe water outlet, and emergency shelter.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-4">
              <span className="font-mono text-[10px] text-cream-200/40">CIVIL DEFENCE NZ RECOVERY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Emergency Kit Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-cream-100/10 pt-16 mb-16">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs text-red-300 tracking-[0.2em] uppercase block">KIT ACCOUNTABILITY</span>
          <h3 className="font-serif text-3xl font-light text-cream-100">Your Emergency Kit Checklist</h3>
          <p className="text-cream-200/90 text-sm leading-relaxed font-light">
            Civil Defence New Zealand recommends every household maintains a self-contained emergency supply that can sustain all family members for <strong>at least three days</strong>.
          </p>
          <p className="text-cream-200/90 text-sm leading-relaxed font-light">
            Use our interactive list to audit your household assets. Let&apos;s assemble your emergency pack today!
          </p>

          {/* Progress gauge */}
          <div className="bg-black/30 border border-white/5 p-6 text-center">
            <span className="font-mono text-[10px] text-cream-300 tracking-wider block mb-1">HOUSEHOLD KIT AUDIT PROGRESS</span>
            <div className="text-4xl font-serif text-[#e5ba55] my-2 font-normal">
              {getKitReadyPercentage()}%
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden mt-3">
              <div
                className="bg-[#e5ba55] h-full transition-all duration-500"
                style={{ width: `${getKitReadyPercentage()}%` }}
              />
            </div>
            <span className="text-[10px] text-cream-205 block mt-2 font-mono uppercase">
              {getKitReadyPercentage() === 100 ? '✓ SECURE & READY' : 'ⓘ ACTION REQUIRED'}
            </span>
          </div>
        </div>

        {/* Checklist boxes */}
        <div className="lg:col-span-7 bg-white/[0.01] border border-white/10 p-6 md:p-8 rounded-none">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#e5ba55] mb-6 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-[#e5ba55]" />
            Check Off Hand-Pack Supplies
          </h4>

          <div className="space-y-3">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`p-4 border transition-colors cursor-pointer flex items-start gap-3 select-none ${
                  item.checked
                    ? 'bg-[#e5ba55]/10 border-[#e5ba55]/50 text-cream-100'
                    : 'bg-black/20 border-white/5 text-cream-100/70 hover:border-white/15'
                }`}
              >
                <div className={`w-4 h-4 border mt-0.5 flex items-center justify-center rounded-none shrink-0 ${
                  item.checked ? 'border-[#e5ba55] bg-[#e5ba55] text-black font-bold' : 'border-white/30'
                }`}>
                  {item.checked && '✓'}
                </div>
                <span className="text-xs font-sans leading-normal font-light">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Contacts Table */}
      <div className="bg-deep-blue/40 border border-white/10 p-6 md:p-10">
        <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#e5ba55] mb-8 flex items-center gap-2">
          <Phone className="w-4 h-4 text-red-300" />
          Key Emergency Contacts
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-l border-red-500/30 pl-4 py-1">
            <span className="font-mono text-[9px] text-red-300 uppercase block tracking-wider">POLICE, FIRE, AMBULANCE</span>
            <span className="text-2xl font-serif text-cream-100 block mt-1 font-semibold">111</span>
            <span className="text-xs text-cream-205 leading-relaxed mt-1 font-mono uppercase block">IMMEDIATE THREAT DEPLOY</span>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <span className="font-mono text-[9px] text-cream-300 uppercase block tracking-wider">CIVIL DEFENCE CHCH</span>
            <span className="text-lg font-serif text-cream-100 block mt-1 font-semibold">03 941 8999</span>
            <span className="text-[11px] text-cream-205 font-mono uppercase block mt-1">EMERGENCY OPERATIONS LINE</span>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <span className="font-mono text-[9px] text-cream-300 uppercase block tracking-wider">CHRISTCHURCH CITY COUNCIL</span>
            <span className="text-lg font-serif text-cream-100 block mt-1 font-semibold">03 941 8999</span>
            <span className="text-[11px] text-cream-205 font-mono uppercase block mt-1">CCC FAULT & POWER RECOVERY</span>
          </div>

          <div className="border-l border-white/10 pl-4 py-1">
            <span className="font-mono text-[9px] text-seagreen-300 uppercase block tracking-wider">SCRA COORDINATOR</span>
            <span className="text-lg font-serif text-cream-100 block mt-1 font-semibold">021 555 0192</span>
            <span className="text-[11px] text-cream-205 font-mono uppercase block mt-1">LOCAL SUMNER HUB DESK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
