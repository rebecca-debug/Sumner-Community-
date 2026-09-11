/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BadgeCheck, Sparkles, AlertCircle, ShoppingBag, Send, Mail, RefreshCw } from 'lucide-react';

export default function BecomeMember() {
  const [formMode, setFormMode] = useState<'signup' | 'update'>('signup');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'household', // household, business, individual
    newsletter: true,
    message: ''
  });

  const memberBenefits = [
    { title: 'Democratic Voice', desc: 'A direct say in the decisions and proposals that shape our coastal village community.' },
    { title: 'AGM Voting Rights', desc: 'Voting rights at the Annual General Meeting to elect coordinators and direct focus.' },
    { title: 'The SCRA Newsletter', desc: 'The SCRA newsletter delivered straight to your inbox with photography and local events.' },
    { title: 'Early Notification alerts', desc: 'Early notice of municipal decisions, environmental policies, and consultations.' },
    { title: 'Cohesive Social network', desc: 'Active connections with neighbours, local groups, and volunteers who care about Sumner.' },
    { title: 'Free Hub Privileges', desc: 'First-option bookings on the community van, tool repository, and workshops.' }
  ];

  // Encodes form fields the way Netlify Forms expects them (same as a normal
  // HTML form POST: application/x-www-form-urlencoded).
  const encodeFormData = (data: Record<string, string>) =>
    Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!(formData.firstName && formData.lastName && formData.email && formData.address)) {
      return;
    }

    setSubmitting(true);
    setSubmitError(false);

    // Submits to Netlify Forms so the enquiry is captured and emailed on.
    // This relies on the hidden "membership" form declared in index.html
    // (Netlify only detects forms it can see in the built static HTML).
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({
        'form-name': 'membership',
        formMode,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        membershipType: formMode === 'signup' ? formData.membershipType : '',
        newsletter: formData.newsletter ? 'yes' : 'no',
        message: formData.message
      })
    })
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            membershipType: 'household',
            newsletter: true,
            message: ''
          });
        }, 6000);
      })
      .catch(() => {
        setSubmitting(false);
        setSubmitError(true);
      });
  };

  return (
    <div className="w-full text-cream-105 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 select-text">
      {/* Magazine Cover Header */}
      <div className="mb-16 border-b border-cream-100/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-mono text-xs text-seagreen-300 tracking-[0.3em] uppercase">04 / CIVIC ALLIANCE</span>
          <h2 className="font-serif text-4xl md:text-6xl text-cream-105 font-light mt-2 tracking-tight">
            Become a <span className="italic font-normal text-[#e5ba55]">Member</span>
          </h2>
          <p className="font-serif italic text-lg md:text-xl text-cream-200/85 mt-2 max-w-2xl">
            &ldquo;Because Sumner is better when we look out for each other.&rdquo;
          </p>
        </div>
        <div className="text-left md:text-right">
          <span className="text-xs text-cream-300 font-mono tracking-widest block font-medium">ANNUAL ALLIANCE FEE</span>
          <span className="text-xl text-seagreen-200 font-serif block mt-1 font-semibold">$25 / YEAR</span>
        </div>
      </div>

      {/* Intro Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        <div className="lg:col-span-7">
          <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light mb-4">
            The Sumner Community Residents&apos; Association has been advocating for this coastal village and its people for years. When you become a member, you are not just joining an official group &mdash; you are actively investing in the place where you live, work, and thrive.
          </p>
          <p className="text-cream-110 text-sm md:text-base leading-relaxed font-light">
            Membership is open to any resident, property owner, or business running in the Sumner area. New to our coastal neighbourhood? Even better &mdash; we would love to welcome you and connect you with local circles instantly!
          </p>
        </div>
        <div className="lg:col-span-5 bg-seagreen-950/40 p-6 md:p-8 border border-seagreen-700/20">
          <span className="font-mono text-[10px] text-[#e5ba55] tracking-widest uppercase">HELP SUPPORT DEEP ADVOCACY</span>
          <h4 className="font-serif text-xl text-cream-50 mt-1 mb-2 font-light">Annual Membership Fee</h4>
          <p className="text-xs text-cream-200 leading-relaxed font-light">
            Our membership rate lists at just <strong className="text-seagreen-300 text-xs font-mono">$25 per household per year</strong>. This small, crucial contribution helps us keep the lights on, fund our clean sustainability projects, support our volunteer hub, and ensure SCRA can continue to stand as a powerful advocate on your behalf to the central Council.
          </p>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#e5ba55] mb-8">
          What You Get as a Member
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberBenefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-seagreen-500/20 p-6 transition-all duration-300"
            >
              <BadgeCheck className="w-5 h-5 text-seagreen-300 mb-4 stroke-[1.5]" />
              <h4 className="font-mono text-xs uppercase tracking-wider text-cream-100 mb-2">
                {benefit.title}
              </h4>
              <p className="text-xs text-cream-200/70 leading-relaxed font-light">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription / Update Forms Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Helper info and form switcher */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2 border-l border-white/10 pl-6 py-1">
            <span className="font-mono text-[10px] text-[#e5ba55] tracking-widest uppercase">REGISTRATION</span>
            <h4 className="font-serif text-2xl font-light text-cream-50">Choose Your Action</h4>
            <p className="text-xs text-cream-200/70 font-light leading-relaxed">
              We coordinate safe and secure local registers. Fill out the signup forms, or choose the updates link below to renew an existing subscription.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setFormMode('signup'); setSubmitted(false); }}
              className={`w-full text-left px-5 py-4 font-mono text-xs uppercase tracking-widest border transition-all cursor-pointer ${
                formMode === 'signup'
                  ? 'bg-[#e5ba55] border-transparent text-black font-semibold shadow-md'
                  : 'bg-transparent border-white/10 hover:bg-white/5 text-cream-200'
              }`}
            >
              New Member Sign-Up
            </button>
            <button
              onClick={() => { setFormMode('update'); setSubmitted(false); }}
              className={`w-full text-left px-5 py-4 font-mono text-xs uppercase tracking-widest border transition-all cursor-pointer ${
                formMode === 'update'
                  ? 'bg-[#e5ba55] border-transparent text-black font-semibold shadow-md'
                  : 'bg-transparent border-white/10 hover:bg-white/5 text-cream-200'
              }`}
            >
              Update / Renew Details
            </button>
          </div>

          <div className="border border-white/5 p-4 flex gap-3 items-start bg-black/15">
            <AlertCircle className="w-4 h-4 text-[#e5ba55] shrink-0 mt-0.5" />
            <p className="text-[11px] text-cream-250 leading-normal font-light">
              Payment is requested via bank deposit after review. One of our coordinators will email instructions with our Westpac account info.
            </p>
          </div>
        </div>

        {/* Right Side: Signup or Update form */}
        <div className="lg:col-span-8 bg-white/[0.01] border border-white/10 p-6 md:p-8 rounded-none">
          <div className="mb-6 flex justify-between items-center pb-4 border-b border-white/5">
            <h4 className="font-serif text-xl font-light text-cream-100">
              {formMode === 'signup' ? 'SCRA Membership Registration' : 'Update Details & Subscription Renewal'}
            </h4>
            <span className="font-mono text-[9px] text-cream-300/40 uppercase tracking-widest">
              SECURE CLIENT SSL
            </span>
          </div>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-seagreen-950 border border-seagreen-500 text-seagreen-300 rounded-none flex items-center justify-center mx-auto mb-4 animate-scaleUp">
                ✓
              </div>
              <h5 className="font-serif text-2xl text-cream-100 font-light">
                {formMode === 'signup' ? 'Registration Request Received!' : 'Update Request Logged!'}
              </h5>
              <p className="text-xs text-cream-200/80 max-w-md mx-auto mt-2 leading-relaxed font-light">
                {formMode === 'signup'
                  ? 'Thank you for investing in Sumner. We have sent a confirmation email containing our Westpac bank account and membership reference. Please deposit $25 to complete activation.'
                  : 'We have registered your updated home and email details in our local systems. We’ll reach out if any additional fee actions are required.'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleFormSubmit}
              name="membership"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-4"
            >
              {/* Hidden fields Netlify Forms needs on the real submission */}
              <input type="hidden" name="form-name" value="membership" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                </label>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none"
                    placeholder="e.g. Rebecca"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none"
                    placeholder="e.g. Fantail"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none"
                    placeholder="rebecca@fantailweddings.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none"
                    placeholder="e.g. 021 555 7890"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                  Sumner Property or Street Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none"
                  placeholder="e.g. 57 Nayland Street, Sumner"
                />
              </div>

              {formMode === 'signup' && (
                <div>
                  <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                    Membership Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`border p-3 flex flex-col justify-between cursor-pointer transition-colors ${
                      formData.membershipType === 'household'
                        ? 'border-seagreen-500 bg-seagreen-950/10'
                        : 'border-white/10 bg-transparent hover:bg-white/5'
                    }`}>
                      <input
                        type="radio"
                        name="membershipType"
                        value="household"
                        checked={formData.membershipType === 'household'}
                        onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-mono text-[10px] text-cream-100 font-semibold uppercase">Household</span>
                      <span className="text-[11px] text-[#e5ba55] mt-1">$25/year</span>
                    </label>

                    <label className={`border p-3 flex flex-col justify-between cursor-pointer transition-colors ${
                      formData.membershipType === 'business'
                        ? 'border-seagreen-500 bg-seagreen-950/10'
                        : 'border-white/10 bg-transparent hover:bg-white/5'
                    }`}>
                      <input
                        type="radio"
                        name="membershipType"
                        value="business"
                        checked={formData.membershipType === 'business'}
                        onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-mono text-[10px] text-cream-100 font-semibold uppercase">Local Business</span>
                      <span className="text-[11px] text-[#e5ba55] mt-1">$50/year</span>
                    </label>

                    <label className={`border p-3 flex flex-col justify-between cursor-pointer transition-colors ${
                      formData.membershipType === 'individual'
                        ? 'border-seagreen-500 bg-seagreen-950/10'
                        : 'border-white/10 bg-transparent hover:bg-white/5'
                    }`}>
                      <input
                        type="radio"
                        name="membershipType"
                        value="individual"
                        checked={formData.membershipType === 'individual'}
                        onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-mono text-[10px] text-cream-100 font-semibold uppercase">Individual Supporter</span>
                      <span className="text-[11px] text-[#e5ba55] mt-1">$25/year</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2.5 py-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                  className="rounded-none border-white/20 bg-black/40 text-seagreen-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="newsletter" className="font-sans text-xs text-cream-200/80 cursor-pointer font-light">
                  Subscribe to the monthly SCRA newsletter and get local updates straight to your inbox.
                </label>
              </div>

              <div>
                <label className="block font-mono text-[9px] tracking-widest text-cream-300 uppercase mb-1.5">
                  Message or Specific Areas of Interest (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black/40 border border-white/15 px-4 py-3 text-sm text-cream-100 focus:outline-none focus:border-seagreen-500 rounded-none"
                  placeholder="Tell us what local topics you’re passionate about (e.g. Civil Defence, beach ecology, path projects)..."
                />
              </div>

              {submitError && (
                <div className="border border-red-500/30 bg-red-950/20 p-3 flex gap-2 items-start">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-red-300 leading-normal font-light">
                    Something went wrong sending that through. Please try again, or email us directly at{' '}
                    <a href="mailto:hub@sumnercommunity.nz" className="underline">hub@sumnercommunity.nz</a>.
                  </p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#e5ba55] hover:bg-cream-100 text-ink-black px-6 py-3.5 font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>
                    {submitting
                      ? 'Sending...'
                      : formMode === 'signup' ? 'Submit Registration' : 'Save Details Update'}
                  </span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
