/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HUB_ACTIVITIES } from '../data';
import { Truck, Palette, Waves, Leaf, Bike, ShieldAlert, Sparkles, HelpCircle, CalendarDays, Calculator, Check, ArrowRight, UserCheck } from 'lucide-react';

export default function SumnerHub() {
  const [kmsInput, setKmsInput] = useState<number>(30);
  const [isOvernight, setIsOvernight] = useState<boolean>(false);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);
  const [calcActive, setCalcActive] = useState<boolean>(true);

  const [bookingForm, setBookingForm] = useState({
    name: '',
    group: '',
    email: '',
    date: '',
    notes: ''
  });

  // Calculate Community Van hire values
  const ratePerKm = 1.20;
  const overnightFee = 50.00;
  const computedMileageCost = parseFloat((kmsInput * ratePerKm).toFixed(2));
  const computedTotal = parseFloat((computedMileageCost + (isOvernight ? overnightFee : 0)).toFixed(2));

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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.email && bookingForm.date) {
      setBookingSubmitted(true);
      setTimeout(() => {
        setBookingSubmitted(false);
        setBookingForm({ name: '', group: '', email: '', date: '', notes: '' });
      }, 5000);
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
          The Sumner Hub is home to the Sumner Community Residents&apos; Association &mdash; and so much more. Tucked into the village at 57 Nayland Street, it is where community groups gather, local projects take root, and neighbors find support when they need it most.
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

      {/* Community Van Section (Title + Layout with booking calculator) */}
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
        </div>

        {/* Form and calculator module on the right */}
        <div className="lg:col-span-7 bg-white/[0.01] border border-white/10 p-6 md:p-8 rounded-none">
          <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
            <h4 className="font-serif text-xl font-light text-cream-50">
              {calcActive ? 'Trip Fee Estimator' : 'Secure Booking Request'}
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => setCalcActive(true)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase border transition-all ${
                  calcActive ? 'bg-[#e5ba55] border-transparent text-black' : 'bg-transparent border-white/10 text-cream-200'
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => setCalcActive(false)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase border transition-all ${
                  !calcActive ? 'bg-[#e5ba55] border-transparent text-black' : 'bg-transparent border-white/10 text-cream-200'
                }`}
              >
                Request Slot
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {calcActive ? (
              <motion.div
                key="calc"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex justify-between font-mono text-[10px] tracking-widest text-cream-300 uppercase mb-2">
                    <span>Estimated Distance</span>
                    <span className="text-[#e5ba55] font-semibold">{kmsInput} KILOMETRES</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={kmsInput}
                    onChange={(e) => setKmsInput(parseInt(e.target.value))}
                    className="w-full accent-seagreen-500 h-1.5 bg-white/10 rounded-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-cream-200/50 mt-1.5 font-light">
                    <span>5 km</span>
                    <span>250 km (Canterbury Coast)</span>
                    <span>500 km</span>
                  </div>
                </div>

                <div className="p-4 bg-black/25 border border-white/5">
                  <span className="font-mono text-[9px] text-[#e5ba55] tracking-widest block uppercase mb-1">HIRE SCHEME TARIFFS</span>
                  <div className="flex justify-between text-xs font-light text-cream-200 mb-2 font-mono">
                    <span>Kilometer Rate (Fuel covers included)</span>
                    <span>$1.20 / km</span>
                  </div>
                  <div className="flex justify-between text-xs font-light text-cream-200 font-mono">
                    <span>Overnight Fee (Required if kept overnight)</span>
                    <span>$50.00</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="overnight-check"
                    checked={isOvernight}
                    onChange={(e) => setIsOvernight(e.target.checked)}
                    className="rounded-none border-white/20 bg-black/40 text-seagreen-500 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="overnight-check" className="font-sans text-xs text-cream-200/80 cursor-pointer font-light select-none">
                    My group will keep the van overnight (adds $50 fee).
                  </label>
                </div>

                {/* COMPUTED TICKET RECEIPT */}
                <div className="border-t border-dashed border-white/10 pt-4 mt-6">
                  <span className="font-mono text-[9px] text-cream-300/40 uppercase tracking-widest block mb-2">PROVISIONAL COST STATEMENT</span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs text-cream-200 font-light">
                      <span>Mileage Subtotal ({kmsInput} km &times; $1.20)</span>
                      <span className="font-mono">${computedMileageCost.toFixed(2)}</span>
                    </div>
                    {isOvernight && (
                      <div className="flex justify-between text-xs text-cream-200 font-light">
                        <span>Overnight Surcharge</span>
                        <span className="font-mono">$50.00</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-serif text-[#e5ba55] pt-2 border-t border-white/5">
                      <span>Estimated Amount</span>
                      <span className="font-mono font-bold">${computedTotal.toFixed(2)} NZD</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCalcActive(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-ink-black px-4 py-3 font-mono text-xs uppercase tracking-widest font-semibold rounded-none mt-2 transition-all"
                >
                  <span>Request Booking Slot for this Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {bookingSubmitted ? (
                  <div className="text-center py-8">
                    <UserCheck className="w-12 h-12 text-seagreen-400 mx-auto mb-4 stroke-[1.5]" />
                    <h5 className="font-serif text-xl">Booking Enquiry Logged</h5>
                    <p className="text-xs text-cream-200/70 mt-2 font-light max-w-sm mx-auto leading-relaxed">
                      Thank you! We have logged your request of {kmsInput} km for {bookingForm.date || 'your selected date'}. Our manager will cross-reference the calendar and email booking confirmations within 24 hours.
                    </p>
                    <button
                      onClick={() => setCalcActive(true)}
                      className="mt-6 font-mono text-xs text-[#e5ba55] uppercase tracking-widest bg-transparent border-none cursor-pointer"
                    >
                      ← Back to Estimator
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2.5 text-xs text-cream-100 focus:outline-none"
                          placeholder="e.g. Mereana"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                          Group / Organisation
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.group}
                          onChange={(e) => setBookingForm({...bookingForm, group: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2.5 text-xs text-cream-100 focus:outline-none"
                          placeholder="e.g. Sumner Art Club"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2.5 text-xs text-cream-100 focus:outline-none"
                          placeholder="contact@email.com"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                          Date of Booking Focus
                        </label>
                        <input
                          type="text"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2.5 text-xs text-cream-100 focus:outline-none"
                          placeholder="e.g. Saturday 14 June"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                        Provisional Mileage Target: {kmsInput} km {isOvernight ? '(with Overnight keep)' : ''}
                      </label>
                      <div className="p-3 bg-seagreen-950/20 border border-seagreen-700/20 text-[#e5ba55] text-xs font-mono font-semibold">
                        Estimated Hire Fee: ${computedTotal.toFixed(2)} NZD
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                        Planned Destination / Trip Notes
                      </label>
                      <textarea
                        rows={3}
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                        className="w-full bg-black/45 border border-white/10 px-3 py-2.5 text-xs text-cream-101 focus:outline-none placeholder-cream-200/20"
                        placeholder="Detail where you will drive (e.g. Lyttelton, Akaroa, Banks Peninsula)..."
                      />
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setCalcActive(true)}
                        className="flex-1 bg-transparent hover:bg-white/5 border border-white/10 text-cream-200 px-4 py-3 font-mono text-xs uppercase tracking-widest"
                      >
                        Adjust KMS
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-seagreen-600 hover:bg-seagreen-500 text-cream-50 px-4 py-3 font-mono text-xs uppercase tracking-widest"
                      >
                        Send Booking Request
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
