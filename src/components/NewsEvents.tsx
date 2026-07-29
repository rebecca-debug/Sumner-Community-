/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UPCOMING_EVENTS, NEWS_ITEMS } from '../data';
import { Calendar, Newspaper, Mail, PlusCircle, Check, ArrowRight, MapPin, Clock, X, BookOpen, ExternalLink } from 'lucide-react';

export default function NewsEvents() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    submitterName: '',
    submitterEmail: '',
    type: 'event' // event, news
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      const recipient = 'hub@sumnercommunity.nz';
      const subject = encodeURIComponent('Newsletter Signup');
      const body = encodeURIComponent(`Please add my email to the SCRA Newsletter mailing list:\n\nEmail: ${newsletterEmail}`);
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
      setNewsletterSubscribed(true);
    }
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventData.title && eventData.description && eventData.submitterEmail) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowSubmitModal(false);
        setEventData({
          title: '',
          date: '',
          time: '',
          location: '',
          description: '',
          submitterName: '',
          submitterEmail: '',
          type: 'event'
        });
      }, 4000);
    }
  };

  return (
    <div className="w-full text-cream-105 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 select-text relative">
      {/* Magazine Cover Header */}
      <div className="mb-16 border-b border-cream-100/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.3em] uppercase">05 / DIARY & GAZETTE</span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream-105 font-light mt-2 tracking-tight">
            News & <span className="italic font-normal text-[#e5ba55]">Events</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-cream-200/85 mt-2 max-w-2xl">
            &ldquo;Local news, upcoming events, and everything worth knowing about this corner of Christchurch.&rdquo;
          </p>
        </div>
        <div>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="group inline-flex items-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-black px-4 py-3.5 border-none font-mono text-xs uppercase tracking-widest font-semibold transition-all rounded-none shadow-md cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-black shrink-0" />
            <span>Submit News or Event</span>
          </button>
        </div>
      </div>

      {/* Intro block */}
      <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light max-w-4xl mb-12">
        From beach clean-ups to community markets, trivia nights to council workshops &mdash; there is always something energetic happening in Sumner. This is your go-to guide for what&apos;s on and what&apos;s new in our village.
      </p>

      {/* Monthly Newsletter Access Section */}
      <div className="mb-16 bg-white/[0.02] border border-white/10 p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex gap-2 items-center">
              <BookOpen className="w-4 h-4 text-[#e5ba55]" />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-seagreen-300">
                Monthly SCRA Newsletter
              </h3>
            </div>
            <h4 className="font-serif text-2xl md:text-3xl text-cream-50 font-light leading-snug">
              Read Our Monthly Newsletters
            </h4>
            <p className="text-xs md:text-sm text-cream-200/80 leading-relaxed font-light">
              Catch up on local community updates, committee decisions, event highlights, and village notices. Access and read all current and past editions directly in our shared folder archive.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href="https://drive.google.com/drive/folders/1t7m2tS9klw93oQ-NUAlFSFx-XsW9tePP?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#e5ba55] hover:bg-cream-100 text-black px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold transition-all group shadow-md"
            >
              <span>Read Monthly Newsletters</span>
              <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Live Calendar of Events */}
      <div className="mb-20">
        <div className="flex gap-2 items-center mb-8 pb-3 border-b border-white/5">
          <Calendar className="w-4 h-4 text-[#e5ba55]" />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-seagreen-300">
            Upcoming Coastal Calendar
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {UPCOMING_EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-white/[0.01] border border-white/10 p-6 md:p-8 flex flex-col justify-between hover:border-seagreen-550/35 hover:bg-white/[0.03] transition-all duration-300"
            >
              <div>
                <span className="font-mono text-[10px] text-[#e5ba55] tracking-widest uppercase block mb-1">
                  {event.date}
                </span>
                <h4 className="font-serif text-2xl text-cream-100 font-normal leading-tight mt-1 mb-4">
                  {event.name}
                </h4>

                <div className="space-y-2 mb-6 font-mono text-[11px] text-cream-200/60">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-seagreen-300 shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-seagreen-300 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                </div>

                <p className="text-xs text-cream-200/80 leading-relaxed font-light mb-6">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                {event.linkUrl ? (
                  <a
                    href={event.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-widest text-[#e5ba55] hover:text-cream-100 font-semibold inline-flex items-center gap-1.5 no-underline transition-colors"
                  >
                    {event.linkText || 'Register to Join'} <ArrowRight className="w-3 h-3" />
                  </a>
                ) : (
                  <button
                    onClick={() => alert(`RSVP registered for ${event.name}! Details sent to your account.`)}
                    className="font-mono text-[11px] uppercase tracking-widest text-[#e5ba55] hover:text-cream-100 font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    {event.linkText || 'Register to Join'} <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local News Feed & Newsletter Sign-ups */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* News Items left */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex gap-2 items-center mb-3 pb-2 border-b border-white/5">
            <Newspaper className="w-4 h-4 text-[#e5ba55]" />
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-seagreen-300">
              Community News Feed
            </h3>
          </div>

          <div className="space-y-8">
            {NEWS_ITEMS.map((item) => (
              <div key={item.id} className="group border-b border-white/5 pb-8 last:border-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-[10px] text-[#e5ba55] tracking-widest uppercase mb-1 sm:mb-0">
                    PUBLISHED: {item.publishedDate}
                  </span>
                  <span className="font-mono text-[9px] text-[#e5ba55] bg-[#e5ba55]/10 px-2.5 py-0.5 rounded-none uppercase">
                    Council Consultation
                  </span>
                </div>

                <h4 className="font-serif text-2xl text-cream-100 font-light mt-2 mb-4 group-hover:text-seagreen-200 transition-colors">
                  {item.headline}
                </h4>

                <p className="text-sm text-cream-200/80 leading-relaxed font-light mb-4">
                  {item.summary}
                </p>

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`Sourcing consultation parameters for under-review items...`); }}
                  className="inline-flex items-center gap-1 font-mono text-xs text-[#e5ba55] uppercase tracking-widest hover:text-cream-50"
                >
                  {item.linkText || 'Read more'} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter right */}
        <div className="lg:col-span-4 bg-white/[0.01] border border-white/10 p-6 md:p-8 rounded-none">
          <div className="mb-6">
            <span className="font-mono text-[9px] text-seagreen-300 tracking-widest uppercase">STAY IN THE LOOP</span>
            <h4 className="font-serif text-2xl text-cream-100 font-light mt-1 mb-3">Newsletter Mail list</h4>
            <p className="text-xs text-cream-200/70 leading-relaxed font-light">
              The SCRA newsletter is where we share the good stuff &mdash; crucial community updates, council submissions, upcoming events, and the occasional beautiful lifestyle photo of our beach. Delivered straight to your inbox monthly.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="p-5 bg-seagreen-950/60 border border-[#e5ba55]/40 text-cream-100 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#e5ba55] font-mono text-xs uppercase tracking-wider font-semibold">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscription Ready to Send</span>
              </div>
              <p className="text-xs text-cream-200/80 leading-relaxed font-light">
                Your email client should open pre-addressed to <strong className="text-[#e5ba55] font-normal">hub@sumnercommunity.nz</strong> with subject line &ldquo;Newsletter Signup&rdquo;.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`mailto:hub@sumnercommunity.nz?subject=${encodeURIComponent('Newsletter Signup')}&body=${encodeURIComponent(`Please add my email to the SCRA Newsletter mailing list:\n\nEmail: ${newsletterEmail}`)}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-black px-4 py-2.5 font-mono text-xs uppercase tracking-widest font-semibold transition-colors no-underline"
                >
                  Click Here if Mail Didn&apos;t Open
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setNewsletterSubscribed(false);
                    setNewsletterEmail('');
                  }}
                  className="font-mono text-[10px] text-cream-200/70 hover:text-white uppercase tracking-wider underline cursor-pointer bg-transparent border-none text-center"
                >
                  Subscribe Another Email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-2">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="e.g. rebecca@fantailweddings.com"
                  className="w-full bg-black/40 border border-white/15 px-4 py-3 text-xs text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none placeholder-cream-200/30"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-ink-black px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none"
              >
                <span>Subscribe Now</span>
                <Mail className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="border border-white/5 p-4 flex gap-3 items-start bg-black/15 mt-6">
            <span className="text-xs text-seagreen-300 shrink-0">ⓘ</span>
            <p className="text-[10px] text-cream-250 leading-relaxed font-light">
              We sync this list safely with our Mailchimp directory. You can easily opt-out or modify preferences at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Submit news / event modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-deep-blue text-cream-100 border border-white/15 p-6 md:p-8 max-w-xl w-full rounded-none relative shadow-2xl"
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-4 right-4 text-cream-300 hover:text-cream-100 bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6 pr-6">
                <h4 className="font-serif text-2xl text-cream-50 font-light">Submit Local Content</h4>
                <p className="text-xs text-cream-200/70 font-light mt-1">
                  Want to broadcast local affairs? Submit events or local news logs, and our SCRA curators will review and circulate them on the beach boards.
                </p>
              </div>

              {submitSuccess ? (
                <div className="text-center py-8">
                  <Check className="w-12 h-12 text-seagreen-300 mx-auto mb-4 stroke-[1.5]" />
                  <h5 className="font-serif text-lg">Submission Logged!</h5>
                  <p className="text-xs text-cream-200/70 mt-2 font-light max-w-sm mx-auto">
                    Thanks for contributing! One of our committee editors will check the guidelines and get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Submission Type</label>
                      <select
                        value={eventData.type}
                        onChange={(e) => setEventData({ ...eventData, type: e.target.value })}
                        className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-200 rounded-none cursor-pointer focus:outline-none"
                      >
                        <option value="event">Community Event notice</option>
                        <option value="news">Local News update</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Headline / Title</label>
                      <input
                        type="text"
                        required
                        value={eventData.title}
                        onChange={(e) => setEventData({...eventData, title: e.target.value})}
                        className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-100 rounded-none focus:outline-none"
                        placeholder="e.g. Sand Dune Study Group"
                      />
                    </div>
                  </div>

                  {eventData.type === 'event' && (
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Date</label>
                        <input
                          type="text"
                          value={eventData.date}
                          onChange={(e) => setEventData({...eventData, date: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-105 rounded-none focus:outline-none"
                          placeholder="Saturday 20 July"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Time</label>
                        <input
                          type="text"
                          value={eventData.time}
                          onChange={(e) => setEventData({...eventData, time: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-105 rounded-none focus:outline-none"
                          placeholder="2pm - 4pm"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Location</label>
                        <input
                          type="text"
                          value={eventData.location}
                          onChange={(e) => setEventData({...eventData, location: e.target.value})}
                          className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-105 rounded-none focus:outline-none"
                          placeholder="Sumner Library"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      value={eventData.description}
                      onChange={(e) => setEventData({...eventData, description: e.target.value})}
                      className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-105 rounded-none focus:outline-none"
                      placeholder="Details of the event or news brief here..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Submitter Name</label>
                      <input
                        type="text"
                        required
                        value={eventData.submitterName}
                        onChange={(e) => setEventData({...eventData, submitterName: e.target.value})}
                        className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-105 rounded-none focus:outline-none"
                        placeholder="Your Name"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1">Contact Email</label>
                      <input
                        type="email"
                        required
                        value={eventData.submitterEmail}
                        onChange={(e) => setEventData({...eventData, submitterEmail: e.target.value})}
                        className="w-full bg-black/45 border border-white/10 px-3 py-2 text-xs text-cream-105 rounded-none focus:outline-none"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#e5ba55] hover:bg-cream-100 text-ink-black px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors font-medium border-none"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
