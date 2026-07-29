/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { COMMITTEE_MEMBERS } from '../data';
import { Users, MessageSquareCode, Send, CheckCircle2, FolderOpen, ExternalLink } from 'lucide-react';

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
      const recipient = 'hub@sumnercommunity.nz';
      const subject = encodeURIComponent(`SCRA Committee Enquiry from ${formData.name} (${formData.interest})`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.interest}\n\nMessage:\n${formData.message}`
      );
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
      
      // Trigger mailto link to direct enquiry to hub@sumnercommunity.nz
      window.location.href = mailtoUrl;

      setFormSubmitted(true);
    }
  };

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
          <span className="px-3 py-1 bg-[#e5ba55] text-black font-mono text-[10px] uppercase tracking-wider font-semibold block shadow-sm">
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
                {/* Photo Avatar Container */}
                <div className="relative w-full aspect-[4/5] bg-deep-blue/80 overflow-hidden mb-6 transition-all duration-500">
                  <img
                    src={member.image || `/images/${member.name.split(' ')[0].toLowerCase()}.jpg`}
                    alt={member.name}
                    className={`w-full h-full object-cover ${member.imagePosition || 'object-[center_25%]'} group-hover:scale-105 transition-transform duration-700`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const firstName = member.name.split(' ')[0].toLowerCase();
                      if (!target.src.endsWith(`/images/${firstName}.jpg`)) {
                        target.src = `/images/${firstName}.jpg`;
                      } else if (!target.src.endsWith(`/images/uploaded_${firstName}.jpg`)) {
                        target.src = `/images/uploaded_${firstName}.jpg`;
                      }
                    }}
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

      {/* MEETING MINUTES & AGM SUMMARIES SECTION */}
      <div id="meeting-minutes-section" className="mb-24 border-t border-cream-100/10 pt-16">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-xs text-seagreen-300 tracking-[0.3em] uppercase">03 / ACCOUNTABILITY</span>
            <h2 className="font-serif text-3xl md:text-5xl text-cream-105 font-light mt-2 tracking-tight">
              Meeting Minutes &amp; <span className="italic font-normal text-[#e5ba55]">AGM Summaries</span>
            </h2>
            <p className="font-serif italic text-lg text-cream-200/85 mt-2 max-w-3xl">
              &ldquo;Transparency is essential to our community. All SCRA monthly meeting minutes and AGM summaries are openly accessible.&rdquo;
            </p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <h3 className="font-serif text-xl md:text-2xl text-cream-100 font-light flex items-center gap-2.5">
              <FolderOpen className="w-6 h-6 text-[#e5ba55] shrink-0" />
              Access SCRA Google Drive Archive
            </h3>
            <p className="text-cream-200/90 text-sm md:text-base leading-relaxed font-light">
              If you are interested in reading our monthly meeting minutes and AGM summaries, please click the button below. You will be directed to our official Google Drive folder where you can view all meeting records.
            </p>
          </div>

          <a
            href="https://drive.google.com/drive/folders/1gbbS93i1tNs2F5YtR8sg1WfWjkuhDQjl?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 bg-[#e5ba55] hover:bg-cream-100 text-black px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md cursor-pointer group no-underline"
          >
            <span>View Meeting Minutes</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/5 pb-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#e5ba55] flex items-center gap-2">
              <MessageSquareCode className="w-4 h-4 text-seagreen-300" />
              Send a Message to the Committee
            </h4>
            <span className="font-mono text-[10px] text-cream-200/70 tracking-wider">
              Enquiries: <a href="mailto:hub@sumnercommunity.nz" className="text-[#e5ba55] underline hover:text-white">hub@sumnercommunity.nz</a>
            </span>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <CheckCircle2 className="w-12 h-12 text-[#e5ba55] mb-4 stroke-[1.5]" />
              <h5 className="font-serif text-2xl text-cream-100">Enquiry Ready to Send!</h5>
              <p className="text-sm text-cream-200/80 max-w-md mt-3 leading-relaxed font-light">
                Your default email app should open automatically pre-addressed to <strong className="text-[#e5ba55] font-normal">hub@sumnercommunity.nz</strong> with your message details.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`mailto:hub@sumnercommunity.nz?subject=${encodeURIComponent(`SCRA Committee Enquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.interest}\n\nMessage:\n${formData.message}`)}`}
                  className="inline-flex items-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-black px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-semibold transition-colors no-underline"
                >
                  Click Here if Mail Didn&apos;t Open
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', message: '', interest: 'join' });
                  }}
                  className="font-mono text-xs text-cream-200/70 hover:text-white uppercase tracking-wider underline cursor-pointer bg-transparent border-none"
                >
                  Send Another Message
                </button>
              </div>
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
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-black px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-none shadow-md cursor-pointer"
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
