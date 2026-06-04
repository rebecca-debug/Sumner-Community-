/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COMMITTEE_MEMBERS, MEETING_MINUTES_LIST, PAST_YEARS_ARCHIVES } from '../data';
import { Mail, Users, MessageSquareCode, Send, CheckCircle2, FileText, Download, Search, Inbox, HelpCircle, ArrowRight } from 'lucide-react';

interface CommitteeProps {
  scrollToMinutes?: boolean;
}

export default function Committee({ scrollToMinutes = false }: CommitteeProps) {
  // Committee states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: 'join'
  });

  // Minutes states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Smooth scroll check on mount or when scrollToMinutes alters
  useEffect(() => {
    if (scrollToMinutes) {
      const el = document.getElementById('meeting-minutes-section');
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [scrollToMinutes]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '', interest: 'join' });
      }, 5000);
    }
  };

  const handleDownload = (dateStr: string) => {
    setDownloadSuccessMsg(`Downloading ${dateStr} General Meeting Minutes (PDF)...`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 4000);
  };

  // Filter 2025 General Meeting minutes
  const filtered2025Minutes = MEETING_MINUTES_LIST.filter((minutes) => {
    return (
      minutes.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      minutes.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full text-cream-100 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 select-text">
      {/* Magazine Cover Inspired Header */}
      <div className="mb-16 border-b border-cream-100/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.3em] uppercase">02 / ADVOCACY TEAM</span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream-105 font-light mt-2 tracking-tight">
            Meet Your <span className="italic font-normal text-[#e5ba55]">Committee</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-cream-200/85 mt-2 max-w-3xl">
            &ldquo;The people behind the scenes &mdash; your neighbours, your advocates, your community connectors.&rdquo;
          </p>
        </div>
        <div>
          <span className="px-3 py-1 bg-seagreen-950/60 border border-seagreen-700/50 text-seagreen-200 font-mono text-[10px] uppercase tracking-wider block">
            100% Volunteer Funded
          </span>
        </div>
      </div>

      {/* Intro Copy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <p className="text-cream-100/90 text-sm md:text-base leading-relaxed font-light">
          The Sumner Community Residents&apos; Association (SCRA) is run entirely by volunteers &mdash; local residents who care deeply about this coastal village and give their time to make it a better, more resilient home for everyone.
        </p>
        <p className="text-cream-100/90 text-sm md:text-base leading-relaxed font-light">
          Our committee meets monthly at the Sumner Hub on Nayland Street to resolve everything from municipal planning issues to beach clean-ups, working side-by-side with the Christchurch City Council, environmental action groups, and Canterbury boards.
        </p>
      </div>

      {/* Committee Grid */}
      <div className="mb-24">
        <h3 className="font-mono text-xs uppercase tracking-[0.255em] text-[#e5ba55] mb-8 flex items-center gap-2">
          <Users className="w-4 h-4 text-seagreen-300" />
          Current Committee Members
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMITTEE_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="group relative overflow-hidden bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 hover:border-seagreen-500/40 hover:bg-white/[0.05]"
            >
              <div>
                {/* Simulated Photo Avatar Container */}
                <div className="relative w-full h-48 bg-deep-blue/80 overflow-hidden mb-6 filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500">
                  <div className="absolute inset-0 bg-seagreen-900/10 mix-blend-color" />
                  <img
                    src={member.image || 'https://picsum.photos/seed/profile/400/400'}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <h4 className="font-serif text-xl tracking-tight text-cream-100 group-hover:text-[#e5ba55] transition-colors">
                  {member.name}
                </h4>
                <p className="font-mono text-[10px] text-cream-300/80 uppercase tracking-widest mt-1.5 border-b border-white/5 pb-2">
                  {member.role}
                </p>

                <p className="text-xs text-cream-200/70 mt-3 leading-relaxed font-light">
                  {member.bio}
                </p>

                {member.email && (
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <a
                      href={`mailto:${member.email}`}
                      className="font-mono text-[10.5px] text-[#e5ba55] hover:text-cream-105 transition-all tracking-wide underline decoration-dotted underline-offset-4"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MERGED MEETING MINUTES SECTION */}
      <div id="meeting-minutes-section" className="mb-24 border-t border-cream-100/10 pt-16">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-xs text-seagreen-300 tracking-[0.3em] uppercase">03 / ACCOUNTABILITY</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-105 font-light mt-2 tracking-tight">
              Meeting <span className="italic font-normal text-[#e5ba55]">Minutes</span>
            </h2>
            <p className="font-serif italic text-lg text-cream-200/85 mt-2 max-w-3xl">
              &ldquo;Transparency is important to us. Here&apos;s what we&apos;ve been discussing on your behalf.&rdquo;
            </p>
          </div>
          <div className="text-left md:text-right">
            <span className="text-xs text-cream-300 font-mono tracking-widest block">MONTHLY PUBLIC MEETINGS</span>
            <span className="text-[11px] text-seagreen-200 font-mono block mt-1">OPEN TO EVERYONE</span>
          </div>
        </div>

        {/* Minutes Intro Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-cream-100/90 text-sm md:text-base leading-relaxed font-light">
              At SCRA, we believe our community deserves to know what&apos;s happening. Every month our committee volunteers meet to discuss issues that affect Sumner &mdash; and we publish the summarized minutes here so you can stay in the loop, even if you can&apos;t make it along in person.
            </p>
          </div>
          <div className="bg-seagreen-950/30 p-6 border border-seagreen-700/20 flex flex-col justify-between">
            <p className="text-xs md:text-sm text-cream-200 leading-relaxed font-light">
              Want to raise something at a future meeting? Get in touch and we will review your request to add it to the upcoming agenda using the contact form below.
            </p>
            <button
              onClick={() => {
                const el = document.getElementById('get-involved-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group mt-4 inline-flex items-center gap-2 text-xs text-[#e5ba55] hover:text-cream-100 tracking-wider font-mono uppercase bg-transparent border-none outline-none cursor-pointer self-start"
            >
              Contact us to raise an agenda item <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Search Input Filter Panel */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-300/40" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search minutes by keyword (e.g. 'Nayland', 'budget', 'dune')..."
            className="w-full bg-white/[0.02] border border-white/10 pl-11 pr-4 py-4 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none placeholder-cream-200/30 font-light"
          />
        </div>

        {/* Download Alert Toast */}
        {downloadSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-seagreen-900/60 border border-seagreen-500/30 text-seagreen-250 font-mono text-xs text-center flex items-center justify-center gap-2.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seagreen-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-seagreen-500"></span>
            </span>
            {downloadSuccessMsg}
          </motion.div>
        )}

        {/* 2025 Meeting Minutes Section */}
        <div className="space-y-6 mb-16">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h3 className="font-mono text-xs uppercase tracking-widest text-seagreen-300">
              2025 Meeting Minutes
            </h3>
            <span className="font-mono text-[10px] text-cream-300/50">4 FILES AVAILABLE</span>
          </div>

          {filtered2025Minutes.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.01] border border-white/5 p-6">
              <Inbox className="w-8 h-8 text-cream-300/20 mx-auto mb-2" />
              <p className="text-xs text-cream-200/50">No minutes match your keyword search. Try clearing your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered2025Minutes.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/[0.01] hover:bg-white/[0.04] border border-white/5 hover:border-seagreen-550/30 p-6 md:p-8 flex flex-col justify-between transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-5 h-5 text-seagreen-350 stroke-[1.25]" />
                      <h4 className="font-serif text-lg md:text-xl text-cream-50 font-semibold">
                        {item.date} &mdash; General Meeting
                      </h4>
                    </div>
                    <p className="text-xs md:text-sm text-cream-200/80 leading-relaxed font-light mt-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-cream-300/40 uppercase tracking-wider">
                      SCRA-MINUTES-{item.id}.PDF (1.2 MB)
                    </span>
                    <button
                      onClick={() => handleDownload(item.date)}
                      className="flex items-center gap-1.5 text-xs text-[#e5ba55] hover:text-cream-100 tracking-wider font-mono uppercase bg-transparent border-none cursor-pointer"
                    >
                      Download <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Archives Accordion Collapsible Box */}
        <div className="border-t border-cream-100/10 pt-10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#e5ba55] mb-6 block">
            Archived Minutes (Collapsible)
          </h3>

          <div className="space-y-4">
            {Object.entries(PAST_YEARS_ARCHIVES).map(([year, list]) => {
              const isExpanded = selectedYear === year;
              return (
                <div key={year} className="border border-white/10">
                  <button
                    onClick={() => setSelectedYear(isExpanded ? null : year)}
                    className="w-full text-left bg-white/[0.01] hover:bg-white/[0.03] px-6 py-4 flex items-center justify-between focus:outline-none transition-colors border-none"
                  >
                    <span className="font-serif text-lg text-cream-105 font-light">
                      {year} Archive Directory
                    </span>
                    <span className="font-mono text-xs text-[#e5ba55]">
                      {isExpanded ? 'Collapse ▲' : 'Expand ' + list.length + ' files ▼'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-white/5 bg-black/20"
                      >
                        <div className="p-6 space-y-4">
                          {list.map((m) => (
                            <div
                              key={m.id}
                              className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0 gap-2"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-seagreen-500" />
                                  <h5 className="font-sans font-medium text-xs text-cream-100 uppercase tracking-wide">
                                    {m.date} General Meeting
                                  </h5>
                                </div>
                                <p className="text-xs text-cream-200/60 leading-relaxed font-light mt-1.5 pl-3.5">
                                  {m.summary}
                                </p>
                              </div>
                              <button
                                onClick={() => handleDownload(m.date)}
                                className="self-end sm:self-center flex items-center gap-1 text-[11px] text-[#e5ba55] hover:text-cream-100 font-mono uppercase border-none bg-transparent cursor-pointer"
                              >
                                PDF <Download className="w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Can't find help footer */}
        <div className="bg-[#0b1736]/40 border border-[#e5ba55]/10 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 mt-12">
          <div className="flex gap-4 items-start">
            <HelpCircle className="w-6 h-6 text-[#e5ba55] shrink-0 mt-0.5 stroke-[1.5]" />
            <div>
              <h4 className="font-serif text-lg text-cream-100 font-light">Can&apos;t Find What You&apos;re Looking For?</h4>
              <p className="text-xs text-cream-200/80 leading-relaxed font-light mt-1 max-w-xl">
                If you need minutes or planning proposals from a previous meeting that aren&apos;t listed here, drop us a line. We maintain off-site archives dating back to the restoration periods and will see what we can retrieve.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('get-involved-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="shrink-0 p-3 bg-white/5 hover:bg-seagreen-800/40 text-[#e5ba55] hover:text-cream-50 font-mono text-xs uppercase tracking-widest border border-white/10 hover:border-seagreen-500/20 rounded-none self-start md:self-center cursor-pointer"
          >
            Contact the Committee
          </button>
        </div>
      </div>

      {/* Want to Get Involved? Section + Interactive Form */}
      <div id="get-involved-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-cream-100/10 pt-16">
        <div className="lg:col-span-5 space-y-6">
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.2em] uppercase block">
            PARTICIPATE IN THE FUTURE
          </span>
          <h3 className="font-serif text-3xl font-light text-cream-100">Want to Get Involved?</h3>
          <p className="text-cream-200/90 text-sm leading-relaxed font-light">
            Our committee is open to any Sumner resident, property owner, or business representative who wants to help shape the future of our coastal community. Whether you have just a few hours a month to spare or a specific skill to offer, we would love to hear from you.
          </p>
          <p className="text-cream-200/90 text-sm leading-relaxed font-light">
            New committee members are warmly welcomed at our Annual General Meeting (AGM) held each year in winter, but we are always happy to have a cup of coffee and a chat before then. Let us know what you are passionate about!
          </p>
        </div>

        {/* Contact form on the right */}
        <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 p-6 md:p-8 rounded-none relative">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#e5ba55] mb-6 flex items-center gap-2">
            <MessageSquareCode className="w-4 h-4 text-seagreen-300" />
            Send a Message to the Committee
          </h4>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-seagreen-300 mb-4 stroke-[1.5]" />
              <h5 className="font-serif text-xl text-cream-100">Thank you! Your message is in flight.</h5>
              <p className="text-sm text-cream-200/70 max-w-md mt-2 font-light">
                One of our committee members will review this and drop you an email at your address. We strive to reply within 48 hours. Let&apos;s talk soon!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-cream-350 uppercase mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none placeholder-cream-200/30 font-light"
                    placeholder="e.g. John Doe"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] tracking-widest text-cream-350 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none placeholder-cream-200/30 font-light"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-widest text-cream-350 uppercase mb-1.5">
                  I Want To...
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-black/45 border border-white/15 px-4 py-3 text-sm text-cream-200 focus:outline-none focus:border-seagreen-500 rounded-none cursor-pointer font-light"
                >
                  <option value="join">Inquire about joining the Committee</option>
                  <option value="agenda">Raise an agenda item for the next meeting</option>
                  <option value="general">Ask a general question / Report local issue</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] tracking-widest text-cream-350 uppercase mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none placeholder-cream-200/30 font-light"
                  placeholder="Share details here..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-seagreen-600 hover:bg-seagreen-500 text-cream-50 px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-none shadow-md cursor-pointer"
                >
                  <span>Submit Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Generously Supported By Section */}
      <div className="border-t border-cream-100/10 pt-16 mt-24">
        <div className="text-center md:text-left max-w-3xl mb-12">
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.2em] uppercase block mb-3">
            Our Supporters
          </span>
          <h3 className="font-serif text-3xl font-light text-cream-105 tracking-tight mb-4">
            Generously Supported By
          </h3>
          <p className="text-cream-200/80 text-sm leading-relaxed font-light">
            We are generously supported by local and national funding agencies. Thank you to the following sponsors for their ongoing support. Learn more on our public board <a href="https://sumnercommunity.nz/about-scra/" target="_blank" rel="noopener noreferrer" className="text-[#e5ba55] underline decoration-dotted underline-offset-4 hover:text-cream-100">About SCRA</a> page.
          </p>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-stretch">
          {/* Christchurch City Council */}
          <div className="group bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between items-center text-center hover:border-[#e5ba55]/30 hover:bg-white/[0.04] transition-all duration-300 select-none">
            <div className="w-16 h-16 flex items-center justify-center text-cream-200/40 group-hover:text-[#e5ba55] transition-colors duration-300 mb-4">
              <svg className="w-12 h-12 stroke-[1.2] fill-none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
                <path d="M8 8l8 8" />
                <path d="M16 8l-8 8" />
              </svg>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#e5ba55] font-semibold mb-1">
                Christchurch
              </h4>
              <p className="text-[10px] text-cream-200/60 font-serif italic">
                City Council
              </p>
            </div>
            <span className="text-[8px] font-mono text-cream-300/40 mt-3 block uppercase tracking-wider">
              Community Board
            </span>
          </div>

          {/* Rātā Foundation */}
          <div className="group bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between items-center text-center hover:border-[#e5ba55]/30 hover:bg-white/[0.04] transition-all duration-300 select-none">
            <div className="w-16 h-16 flex items-center justify-center text-cream-200/40 group-hover:text-[#e5ba55] transition-colors duration-300 mb-4">
              <svg className="w-12 h-12 stroke-[1.2] fill-none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.5-2.5-6-6-6zm0 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
              </svg>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#e5ba55] font-semibold mb-1">
                Rātā
              </h4>
              <p className="text-[10px] text-cream-200/60 font-serif italic">
                Foundation
              </p>
            </div>
            <span className="text-[8px] font-mono text-cream-300/40 mt-3 block uppercase tracking-wider">
              Regional Funding
            </span>
          </div>

          {/* Lottery Grants Board */}
          <div className="group bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between items-center text-center hover:border-[#e5ba55]/30 hover:bg-white/[0.04] transition-all duration-300 select-none">
            <div className="w-16 h-16 flex items-center justify-center text-cream-200/40 group-hover:text-[#e5ba55] transition-colors duration-300 mb-4">
              <svg className="w-12 h-12 stroke-[1.2] fill-none" viewBox="0 0 24 24" stroke="currentColor">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
              </svg>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#e5ba55] font-semibold mb-1">
                Lottery
              </h4>
              <p className="text-[10px] text-cream-200/60 font-serif italic">
                Grants Board
              </p>
            </div>
            <span className="text-[8px] font-mono text-cream-300/40 mt-3 block uppercase tracking-wider">
              National Grants
            </span>
          </div>

          {/* COGS */}
          <div className="group bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between items-center text-center hover:border-[#e5ba55]/30 hover:bg-white/[0.04] transition-all duration-300 select-none">
            <div className="w-16 h-16 flex items-center justify-center text-cream-200/40 group-hover:text-[#e5ba55] transition-colors duration-300 mb-4">
              <svg className="w-12 h-12 stroke-[1.2] fill-none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#e5ba55] font-semibold mb-1">
                COGS
              </h4>
              <p className="text-[10px] text-cream-200/60 font-serif italic">
                Community Scheme
              </p>
            </div>
            <span className="text-[8px] font-mono text-cream-300/40 mt-3 block uppercase tracking-wider">
              DIA Funding
            </span>
          </div>

          {/* Sumner Ferrymead Foundation */}
          <div className="group bg-white/[0.02] border border-white/10 p-6 flex flex-col justify-between items-center text-center hover:border-[#e5ba55]/30 hover:bg-white/[0.04] transition-all duration-300 select-none">
            <div className="w-16 h-16 flex items-center justify-center text-cream-200/40 group-hover:text-[#e5ba55] transition-colors duration-300 mb-4">
              <svg className="w-12 h-12 stroke-[1.2] fill-none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M22 18H2a10 10 0 0 1 20 0z" />
                <path d="M12 2v16" />
                <path d="M12 2l7 7h-7" />
              </svg>
            </div>
            <div>
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#e5ba55] font-semibold mb-1">
                S.F.F.
              </h4>
              <p className="text-[10px] text-cream-200/60 font-serif italic">
                Sumner Ferrymead
              </p>
            </div>
            <span className="text-[8px] font-mono text-cream-300/40 mt-3 block uppercase tracking-wider">
              Local Philanthropy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
