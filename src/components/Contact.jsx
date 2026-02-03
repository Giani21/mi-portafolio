import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, CheckCircle2, MapPin, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { language } = useLanguage();
  const formRef = useRef();
  const [status, setStatus] = useState('idle');

  const text = {
    es: {
      title: "Hablemos",
      subtitle: "Estoy disponible para nuevos proyectos",
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      button: "Enviar mensaje",
      success: "¡Mensaje enviado con éxito!",
      successDesc: "Te responderé lo antes posible",
      reset: "Enviar otro mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      location: "Buenos Aires, Argentina",
      response: "Respuesta en 24-48hs"
    },
    en: {
      title: "Let's Talk",
      subtitle: "I'm available for new projects",
      name: "Name",
      email: "Email",
      message: "Message",
      button: "Send message",
      success: "Message sent successfully!",
      successDesc: "I'll get back to you as soon as possible",
      reset: "Send another message",
      messagePlaceholder: "Tell me about your project...",
      location: "Buenos Aires, Argentina",
      response: "Response in 24-48hrs"
    }
  }[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('success');
      formRef.current.reset();
    })
    .catch((error) => {
      console.error('Error al enviar:', error);
      setStatus('idle');
      alert('Error al enviar el mensaje. Por favor, intenta nuevamente.');
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative bg-slate-900 overflow-hidden min-h-screen flex items-center">
      {/* Background gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#60a5fa 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-100 tracking-tight mb-4">
            {text.title}
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 sm:p-8 md:p-10 rounded-2xl relative overflow-hidden"
            >
              {/* Success overlay */}
              {status === 'success' && (
                <motion.div 
                  className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8"
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100 mb-2">
                    {text.success}
                  </h3>
                  <p className="text-slate-400 mb-6">
                    {text.successDesc}
                  </p>
                  <button 
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-slate-100 hover:border-blue-500/30 rounded-xl transition-all font-medium"
                  >
                    {text.reset}
                  </button>
                </motion.div>
              )}

              {/* Form fields */}
              <div className="space-y-6">
                <InputGroup 
                  icon={User} 
                  label={text.name} 
                  name="user_name" 
                  placeholder="Juan Pérez" 
                  required 
                />
                
                <InputGroup 
                  icon={Mail} 
                  label={text.email} 
                  name="user_email" 
                  placeholder="mail@ejemplo.com" 
                  type="email" 
                  required 
                />
                
                {/* Message textarea */}
                <div className="space-y-2 group">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
                    <MessageSquare size={16} className="text-blue-400" /> 
                    {text.message}
                  </label>
                  <textarea 
                    name="message"
                    required
                    rows="5"
                    className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-4 text-slate-200 text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none placeholder:text-slate-600"
                    placeholder={text.messagePlaceholder}
                  />
                </div>

                {/* Submit button */}
                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-blue-500/25"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <div className="relative flex items-center justify-center gap-2 text-sm tracking-wide">
                    {status === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'es' ? 'Enviando...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        {text.button}
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            

            {/* Quote card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 p-6 rounded-2xl">
              <div className="mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic mb-4">
                {language === 'es' 
                  ? '"Cada proyecto es una oportunidad para crear algo único y funcional que realmente aporte valor."'
                  : '"Every project is an opportunity to create something unique and functional that truly adds value."'
                }
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {language === 'es' ? '— Trabajemos juntos' : '— Let\'s work together'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InputGroup = ({ icon: Icon, label, name, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-sm font-medium text-slate-400 flex items-center gap-2 group-focus-within:text-blue-400 transition-colors">
      <Icon size={16} className="text-blue-400" /> 
      {label}
    </label>
    <input 
      {...props}
      name={name}
      className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 text-sm focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-600"
    />
  </div>
);