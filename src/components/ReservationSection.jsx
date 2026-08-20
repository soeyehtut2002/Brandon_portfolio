import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, User, Send, Sparkles, CheckCircle, Briefcase, MessageSquare } from 'lucide-react';

export default function ReservationSection() {
  const { addReservation, sections, chefProfile } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: 'Internship Opportunity', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!sections.contact?.visible) return null;

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    addReservation({
      ...formData,
      eventType: formData.subject,
      specialRequests: formData.message,
      date: new Date().toISOString().split('T')[0]
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: 'Internship Opportunity', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-theme-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4" />
            <span>{sections.contact.title || "Get in Touch"}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-theme-primary">Contact & Opportunity</h2>
          <p className="text-sm text-theme-muted mt-2 font-light">
            Looking for a dedicated junior chef or culinary intern? Feel free to reach out!
          </p>
          <div className="divider-orange" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Info Panel */}
          <div className="lg:col-span-5">
            <div className="glass-card border border-theme p-6 sm:p-8 rounded-3xl space-y-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">Contact Details</h3>
              <p className="text-xs text-theme-muted font-light leading-relaxed">
                I am actively seeking culinary internship, staging, or entry-level commis chef opportunities in professional kitchen environments.
              </p>
              <div className="space-y-4 text-xs">
                {[
                  { icon: Mail,      label: 'Email',        value: chefProfile.socials?.email || 'brandon.chef@example.com' },
                  { icon: Phone,     label: 'Phone',        value: chefProfile.socials?.phone || '+1 (555) 234-5678' },
                  { icon: Briefcase, label: 'Availability', value: 'Immediate / Open for Internship & Staging' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-theme-muted text-orange-500 shrink-0 border border-theme">
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
                ✨ Ready to bring enthusiasm, clean working habits, and strong work ethic to your kitchen team.
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
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">Message Sent Successfully</h3>
                  <p className="text-xs text-theme-muted max-w-md mx-auto">
                    Thank you for reaching out! I will respond to your email as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Your Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-orange-300 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" required placeholder="Executive Chef / Recruiter..." value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="input-theme w-full rounded-xl pl-9 pr-3 py-2.5 text-xs" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-orange-300 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="email" required placeholder="chef@restaurant.com" value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="input-theme w-full rounded-xl pl-9 pr-3 py-2.5 text-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Phone (Optional)</label>
                      <input type="tel" placeholder="+1..." value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="input-theme w-full rounded-xl px-3 py-2.5 text-xs" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Inquiry Type</label>
                      <select value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="input-theme w-full rounded-xl px-3 py-2.5 text-xs">
                        <option value="Internship Opportunity">Culinary Internship Opportunity</option>
                        <option value="Junior Chef Position">Commis / Junior Chef Position</option>
                        <option value="Kitchen Staging Request">Kitchen Staging Inquiry</option>
                        <option value="General Inquiry">General Collaboration / Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-theme-muted font-semibold mb-1.5">Message *</label>
                    <div className="relative">
                      <textarea rows={4} required placeholder="Tell me about your restaurant, position, or inquiry..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="input-theme w-full rounded-xl px-3 py-2.5 text-xs resize-none" />
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-orange-500 text-white font-bold uppercase tracking-wider text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
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
