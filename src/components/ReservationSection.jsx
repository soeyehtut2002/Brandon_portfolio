import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, User, Send, Sparkles, Clock, CheckCircle } from 'lucide-react';

export default function ReservationSection() {
  const { addReservation, sections, chefProfile } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', date: '', guests: 2,
    eventType: 'VIP Private Tasting', specialRequests: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!sections.contact?.visible) return null;

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) return;
    addReservation(formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', date: '', guests: 2, eventType: 'VIP Private Tasting', specialRequests: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-theme-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{sections.contact.title || "Reservations & Events"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">Book a Table</h2>
          <p className="text-sm text-theme-muted mt-2 font-light">
            Contact us to book a private dinner, a special event, or a cooking class.
          </p>
          <div className="divider-orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Info Panel */}
          <div className="lg:col-span-5">
            <div className="glass-card border border-theme p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">Contact Us</h3>
              <div className="space-y-4 text-xs">
                {[
                  { icon: Mail,  label: 'Email',       value: chefProfile.socials.email },
                  { icon: Phone, label: 'Phone',       value: chefProfile.socials.phone },
                  { icon: Clock, label: 'Opening Hours', value: 'Tue - Sun: 6:00pm - 11:30pm' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-theme-muted text-orange-500 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-theme-muted font-medium">{label}</div>
                      <div className="font-semibold text-theme-primary break-all">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-theme-muted border border-theme text-xs text-theme-muted leading-relaxed font-light">
                * Please book at least 3 days in advance. Wine pairings are available on request.
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="glass-card border border-theme p-6 sm:p-8 rounded-3xl">
              {submitted ? (
                <div className="py-12 sm:py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-theme-muted text-orange-500 flex items-center justify-center mx-auto border border-theme">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">Your Request Was Sent</h3>
                  <p className="text-xs text-theme-muted max-w-md mx-auto">
                    Thank you. We will contact you within 24 hours to confirm your booking.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-orange-300 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" required placeholder="Mr / Ms..." value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="input-theme w-full rounded-xl pl-9 pr-3 py-2.5 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-orange-300 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="email" required placeholder="client@luxury.com" value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="input-theme w-full rounded-xl pl-9 pr-3 py-2.5 text-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Phone</label>
                      <input type="tel" placeholder="+33 6..." value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="input-theme w-full rounded-xl px-3 py-2.5 text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Date *</label>
                      <input type="date" required value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="input-theme w-full rounded-xl px-3 py-2.5 text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Guests</label>
                      <input type="number" min="1" max="30" value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="input-theme w-full rounded-xl px-3 py-2.5 text-xs" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Event Type</label>
                    <select value={formData.eventType}
                      onChange={e => setFormData({ ...formData, eventType: e.target.value })}
                      className="input-theme w-full rounded-xl px-3 py-2.5 text-xs">
                      <option value="VIP Private Tasting">VIP Private Tasting (12-Course)</option>
                      <option value="Private Estate Catering">Private Estate Catering</option>
                      <option value="Masterclass & Tasting">Masterclass & Culinary Workshop</option>
                      <option value="Corporate Executive Dinner">Corporate Executive Gala</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Special Requests</label>
                    <textarea rows={3} placeholder="Allergies, wine preferences, seating requests..."
                      value={formData.specialRequests}
                      onChange={e => setFormData({ ...formData, specialRequests: e.target.value })}
                      className="input-theme w-full rounded-xl px-3 py-2.5 text-xs resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                    <Send className="w-4 h-4" />
                    <span>Send Booking Request</span>
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
