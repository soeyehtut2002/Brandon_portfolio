import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Calendar, Users, Mail, Phone, User, MessageSquare, Send, Sparkles, Clock, CheckCircle } from 'lucide-react';

export default function ReservationSection() {
  const { addReservation, sections, chefProfile } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: 2,
    eventType: 'VIP Private Tasting',
    specialRequests: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!sections.contact?.visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;

    addReservation(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        guests: 2,
        eventType: 'VIP Private Tasting',
        specialRequests: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-obsidian-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{sections.contact.title || "Reservations & Events"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-100">
            Book Private Dining
          </h2>
          <p className="text-sm text-stone-400 mt-2 font-light">
            Inquire for exclusive chef's table tasting menus, private estate dining, or masterclasses.
          </p>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-4" />
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-800 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-stone-100">
                Direct Concierge
              </h3>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-400 font-medium">Inquiries Email</div>
                    <div className="font-semibold text-stone-200">{chefProfile.socials.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-400 font-medium">Telephone Concierge</div>
                    <div className="font-semibold text-stone-200">{chefProfile.socials.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-400 font-medium">Private Service Hours</div>
                    <div className="font-semibold text-stone-200">Tue - Sun: 18:00 - 23:30</div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-950 border border-gold-500/20 text-xs text-stone-400 leading-relaxed font-light">
                * Note: Private dining experiences require a minimum 72-hour advance reservation. Customized wine pairings curated by Head Sommelier.
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-800">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/40">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-stone-100">
                    Reservation Request Received
                  </h3>
                  <p className="text-xs text-stone-400 max-w-md mx-auto">
                    Thank you. Chef {chefProfile.name}'s concierge team will review your preferred date and contact you within 24 hours to finalize details.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Lord / Lady / Mr / Ms..."
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl pl-10 pr-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-500 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="client@luxury.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl pl-10 pr-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+33 6..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none"
                      />
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                        Number of Guests
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Event Type
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-stone-200 focus:outline-none"
                    >
                      <option value="VIP Private Tasting">VIP Private Tasting (12-Course)</option>
                      <option value="Private Estate Catering">Private Estate Catering</option>
                      <option value="Masterclass & Tasting">Masterclass & Culinary Workshop</option>
                      <option value="Corporate Executive Dinner">Corporate Executive Gala</option>
                    </select>
                  </div>

                  {/* Special requests */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                      Dietary Preferences & Special Requests
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Allergies, wine pairing preferences, seating requests..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="w-full bg-obsidian-950 border border-obsidian-800 focus:border-gold-500 rounded-xl p-4 text-xs text-stone-200 placeholder-stone-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-obsidian-950 font-bold uppercase tracking-wider text-xs hover:from-gold-400 hover:to-gold-500 transition-all shadow-xl shadow-gold-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Reservation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
