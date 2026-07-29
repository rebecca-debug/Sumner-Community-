/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { HUB_ACTIVITIES } from '../data';
import { Truck, Palette, Waves, Leaf, Bike, ShieldAlert, Sparkles, ExternalLink, FileText } from 'lucide-react';

export default function SumnerHub() {
  // Map icon names from static definitions to real Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck': return <Truck className="w-5 h-5 text-seagreen-300 stroke-[1.5]" />;
      case 'Palette': return <Palette className="w-5 h-5 text-[#e5ba55] stroke-[1.5]" />;
      case 'Waves': return <Waves className="w-5 h-5 text-blue-400 stroke-[1.5]" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-400 stroke-[1.5]" />;
      case 'Bike': return <Bike className="w-5 h-5 text-[#e5ba55] stroke-[1.5]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-400 stroke-[1.5]" />;
      default: return <Sparkles className="w-5 h-5 text-cream-300" />;
    }
  };

  return (
    <div className="w-full text-cream-105 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 select-text">
      {/* Magazine Cover Header */}
      <div className="text-cream-110 mb-16 border-b border-cream-100/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.3em] uppercase block">
            07 / LOGISTICS & HEARTH
          </span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream-105 font-light mt-2 tracking-tight">
            The Sumner <span className="italic font-normal text-[#e5ba55]">Hub</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-cream-205/85 mt-2 max-w-3xl">
            &ldquo;A place to meet, make, fix, grow, and connect &mdash; right in the heart of Sumner.&rdquo;
          </p>
        </div>
        <div className="text-left md:text-right font-mono text-xs text-cream-200">
          <p>57 NAYLAND STREET, SUMNER</p>
          <p className="text-seagreen-300 mt-1 uppercase tracking-wider">Hub Open Daily</p>
        </div>
      </div>

      {/* Intro Narrative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light">
          The Sumner Hub is home to the Sumner Community Residents&apos; Association &mdash; and so much more. Tucked into the village at 57 Nayland Street, it is where community groups gather, local projects take root, and neighbours find support when they need it most.
        </p>
        <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light">
          Our active role is to provide a community perspective to the Christchurch City Council, the Waihoro Spreydon-Cashmere-Heathcote Community Board, and local media &mdash; helping community groups move forward by articulating and guiding where we can.
        </p>
      </div>

      {/* Hub Programs grid */}
      <div className="mb-20">
        <span className="font-mono text-xs text-[#e5ba55] tracking-[0.2em] uppercase block mb-8">
          What We Host (Hosted Activities)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HUB_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="bg-white/[0.01] border border-white/5 p-6 hover:border-seagreen-500/20 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div className="mb-4">{getIcon(activity.icon)}</div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-cream-50 mb-2">
                {activity.title}
              </h4>
              <p className="text-xs text-cream-200/75 leading-relaxed font-light">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Resources Helper summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 bg-seagreen-950/20 border border-seagreen-700/20 p-6 md:p-8">
        <div>
          <span className="font-mono text-[10px] text-seagreen-350 tracking-widest uppercase">MUTUAL ASSISTANCE</span>
          <h4 className="font-serif text-2xl text-cream-100 font-light mt-1">How We Help</h4>
          <p className="text-xs text-cream-200 leading-relaxed font-light mt-2">
            The Hub isn&apos;t just an administrative building &mdash; it&apos;s a practical community resource. Whether you are an individual with an idea, a community group looking for a meeting room, or a local organisation, we are here to support.
          </p>
        </div>
        <div className="border-l border-white/5 pl-6 flex flex-col justify-between">
          <h5 className="font-mono text-[10px] tracking-wider text-cream-100 font-semibold uppercase">Individual & Group support</h5>
          <p className="text-xs text-cream-200/80 leading-relaxed font-light mt-1">
            Whatever you need &mdash; planning assistance, meeting rooms to book, equipment, or native planting suggestions &mdash; just ask our managers.
          </p>
        </div>
        <div className="border-l border-white/5 pl-6 flex flex-col justify-between col-span-1">
          <h5 className="font-mono text-[10px] tracking-wider text-cream-100 font-semibold uppercase">Community Projects funding</h5>
          <p className="text-xs text-cream-200/80 leading-relaxed font-light mt-1">
            We provide deep administrative assistance with funding applications, financial budgeting, and council proposal paperwork.
          </p>
        </div>
      </div>

      {/* Community Van Section (Title + Layout with Google Calendar embed) */}
      <div className="border-t border-cream-100/10 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="van-booking-calculator">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.2em] uppercase block">
            LOCAL RESOURCE HIRE
          </span>
          <h3 className="font-serif text-3xl font-light text-cream-100">Hire Our Community Van</h3>
          <p className="text-cream-200/90 text-sm leading-relaxed font-light">
            Got a community group to move and nowhere to take them? We have got just the thing! The Sumner Hub&apos;s 10-seater community van is available for hire to local residents, sports clubs, schools, and non-profits.
          </p>
          <p className="text-cream-200/90 text-sm leading-relaxed font-light">
            Whether you are planning a school outing, a sports trip, a day-trip to central Christchurch, or an outdoor weekend adventure around Canterbury &mdash; this is your ride.
          </p>

          {/* Van Guidelines list */}
          <div className="bg-white/[0.01] border border-white/5 p-4 space-y-2">
            <span className="font-mono text-[9px] text-[#e5ba55] tracking-widest uppercase block mb-1">GOOD TO KNOW</span>
            <ul className="space-y-1 text-xs text-cream-220 font-light font-sans list-disc list-inside">
              <li>Bookings are made on a first-come, first-served basis.</li>
              <li>Please return the van clean and with a full tank of fuel.</li>
              <li>A valid New Zealand driver&apos;s licence is strictly required.</li>
            </ul>
          </div>

          {/* Request Booking Slot Link Card */}
          <div className="bg-white/[0.01] border border-white/10 p-6 space-y-4">
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <FileText className="w-5 h-5 text-[#e5ba55]" />
              <h4 className="font-serif text-lg font-light text-cream-50">
                Driver Agreement & Booking
              </h4>
            </div>
            <p className="text-xs text-cream-200/80 font-light leading-relaxed">
              Check the calendar for available dates, then complete our online driver agreement and booking request form:
            </p>
            <a
              href="https://form.jotform.com/Brosnahan_Rebecca/scra-community-van--driver-agreemen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full bg-[#e5ba55] hover:bg-cream-100 text-black px-5 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-md group"
            >
              <span>Request a Booking Slot</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Google Calendar Embed Module on the right */}
        <div className="lg:col-span-7 bg-white/[0.01] border border-white/10 p-4 md:p-6 rounded-none">
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
            <h4 className="font-serif text-xl font-light text-cream-50">
              Van Availability Calendar
            </h4>
            <span className="font-mono text-[10px] text-[#e5ba55] tracking-widest uppercase">
              Live Google Calendar
            </span>
          </div>

          <div className="w-full overflow-hidden bg-white rounded-none border border-white/10 shadow-lg">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=sumnercommunity.nz_53ucst5nqo7uvhofj4gbqp8ng4%40group.calendar.google.com&ctz=Pacific%2FAuckland"
              style={{ border: 0 }}
              width="800"
              height="600"
              frameBorder="0"
              scrolling="no"
              className="w-full h-[550px] md:h-[600px] rounded-none"
              title="Sumner Community Van Calendar"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
