import React, { useState } from 'react';
import {
  Mail,
  CheckCircle,
  Copy,
  Linkedin,
  Github,
  Twitter,
  Clock,
  MessageCircle,
  ArrowRight,
  Send,
  Calendar,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { PersonalDetails, ThemeColor } from '../types';
import { themeConfigs } from '../lib/theme';
import { ui } from '../i18n';

interface ContactProps {
  personal: PersonalDetails;
  themeColor: ThemeColor;
}

export const Contact: React.FC<ContactProps> = ({ personal, themeColor }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const theme = themeConfigs[themeColor];
  const whatsappPhone = '34613370218';
  const whatsappUrl = `https://wa.me/${whatsappPhone}`;

  // Web3Forms state
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd7a26fd7-a56a-489f-9e65-a62c3dd0229b',
          subject: ui.contact.subject,
          name: formData.name,
          company: formData.company || ui.contact.noCompany,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (response.ok && (result.success || result.status === 200)) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(
          ui.contact.errSend
        );
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage(
        ui.contact.errConn
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-slate-50/60 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold mb-3 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-xs">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
            <span>{ui.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {ui.contact.title}
          </h2>
          <div className="space-y-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-xl mx-auto">
            <p>
              {ui.contact.p1}
            </p>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              {ui.contact.p2}
            </p>
          </div>
        </div>

        {/* Contact Cards Grid: 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {/* 1. Tarjeta "WhatsApp Directo" */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {ui.contact.fast}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {ui.contact.waTitle}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {ui.contact.waText}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{ui.contact.waBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* 2. Tarjeta "Agendar una llamada" (DESTACADA) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-400 dark:border-emerald-500 shadow-lg shadow-emerald-500/10 hover:shadow-xl transition-all flex flex-col justify-between relative ring-2 ring-emerald-400/20">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {ui.contact.noWait}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {ui.contact.callTitle}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {ui.contact.callText}
              </p>
            </div>

            <a
              href={`https://wa.me/34613370218?text=${encodeURIComponent(ui.whatsBookMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-6"
            >
              <Calendar className="w-5 h-5" />
              <span>{ui.contact.callBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* 3. Tarjeta "Déjame un mensaje" (Formulario Web3Forms) */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${theme.accentLight} flex items-center justify-center shadow-xs`}>
                  <Mail className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  {ui.contact.reply24}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {ui.contact.msgTitle}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                {ui.contact.msgText}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {ui.contact.name} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={ui.contact.namePh}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {ui.contact.company} <span className="text-slate-400 text-[10px] font-normal">{ui.contact.optional}</span>
                  </label>
                  <input
                    type="text"
                    id="contact-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={ui.contact.companyPh}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {ui.contact.email} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={ui.contact.emailPh}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1"
                  >
                    {ui.contact.message} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={ui.contact.messagePh}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{ui.contact.thanks}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{errorMessage || ui.contact.errGeneric}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{ui.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{ui.contact.send}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Small link to copy email */}
            <div className="text-center pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 underline underline-offset-2 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {ui.contact.copied} ({personal.email})
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{ui.contact.copyEmail}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Availability info & Social bar */}
        <div className="mt-8 max-w-6xl mx-auto p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">{ui.contact.availLabel}</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {ui.contact.availValue}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 shrink-0">
            {personal.socialLinks.linkedin && (
              <a
                href={personal.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors shadow-xs"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personal.socialLinks.github && (
              <a
                href={personal.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors shadow-xs"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {personal.socialLinks.twitter && (
              <a
                href={personal.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-sky-500 transition-colors shadow-xs"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
