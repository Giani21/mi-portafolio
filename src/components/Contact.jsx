import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Terminal, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { language } = useLanguage();
  const formRef = useRef();
  const [status, setStatus] = useState('idle');

  const text = {
    es: {
      title: "NODO_CONTACTO",
      subtitle: "Establecer enlace de comunicación",
      name: "USUARIO",
      email: "CORREO",
      message: "MENSAJE",
      button: "ENVIAR",
      success: "TRANSMISIÓN COMPLETADA CON ÉXITO",
      reset: "[ REINICIAR_SISTEMA ]",
      messagePlaceholder: "Tu mensaje aquí..."
    },
    en: {
      title: "CONTACT_NODE",
      subtitle: "Establish communication link",
      name: "USER",
      email: "MAIL",
      message: "DATA",
      button: "SEND",
      success: "TRANSMISSION COMPLETED SUCCESSFULLY",
      reset: "[ RESET_SYSTEM ]",
      messagePlaceholder: "Your message here..."
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
      alert('Error de validación (412). Revisa tus credenciales en el .env.local');
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative bg-[#030712] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-green-500/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header - Responsive */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e] sm:shadow-[0_0_10px_#22c55e]" />
            <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.5em] text-green-500/70 uppercase">
              {text.title} // IP_ENCRYPTED
            </span>
          </div>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase italic">
            {language === 'es' ? 'HABLE' : 'LET\'S'}{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
              {language === 'es' ? 'MOS' : 'TALK'}
            </span>
          </h2>
        </div>

        {/* Grid layout - Side panels hidden on mobile/tablet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Form - Full width on mobile/tablet, 8 cols on desktop */}
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-5 sm:p-6 md:p-8 rounded-sm relative overflow-hidden"
          >
            {/* Success overlay */}
            {status === 'success' && (
              <motion.div 
                className="absolute inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
              >
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mb-4 animate-bounce" />
                <h3 className="text-white font-mono text-xs sm:text-sm tracking-widest mb-2">
                  {text.success}
                </h3>
                <button 
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 sm:mt-6 text-green-500/50 hover:text-green-500 font-mono text-[9px] sm:text-[10px] underline uppercase tracking-widest transition-colors"
                >
                  {text.reset}
                </button>
              </motion.div>
            )}

            {/* Form fields */}
            <div className="space-y-5 sm:space-y-6">
              <InputGroup 
                icon={User} 
                label={text.name} 
                name="user_name" 
                placeholder="John Doe" 
                required 
              />
              
              <InputGroup 
                icon={Mail} 
                label={text.email} 
                name="user_email" 
                placeholder="mail@example.com" 
                type="email" 
                required 
              />
              
              {/* Message textarea */}
              <div className="space-y-2 group">
                <label className="font-mono text-[9px] sm:text-[10px] text-zinc-500 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-green-500 transition-colors">
                  <MessageSquare size={12} className="text-green-500" /> {text.message}
                </label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-sm p-3 sm:p-4 text-zinc-300 font-mono text-xs sm:text-sm focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all resize-none"
                  placeholder={text.messagePlaceholder}
                />
              </div>

              {/* Submit button */}
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full py-3 sm:py-4 bg-zinc-900 border border-white/10 hover:border-green-500/50 transition-all overflow-hidden active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center justify-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] sm:tracking-[0.3em] text-zinc-400 group-hover:text-white transition-colors">
                  {status === 'sending' ? 'SENDING_DATA...' : text.button}
                  <Send 
                    size={14} 
                    className={status === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'} 
                  />
                </div>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-500 group-hover:w-full transition-all duration-500" />
              </button>
            </div>
          </motion.form>

          {/* Side panels - Only visible on desktop (lg+) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-4">
            {/* Connection Status */}
            <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-sm">
              <h4 className="font-mono text-[10px] text-green-500 mb-4 uppercase tracking-[0.2em]">
                Connection_Status
              </h4>
              <ul className="space-y-3 font-mono text-[9px] text-zinc-500 italic">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>LOCATION:</span> 
                  <span className="text-zinc-300">ARGENTINA_BUENOS_AIRES</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>LATENCY:</span> 
                  <span className="text-green-400">12MS_OPTIMAL</span>
                </li>
              </ul>
            </div>

            {/* Terminal panel */}
            <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-sm overflow-hidden group">
              <Terminal 
                className="text-zinc-700 mb-4 group-hover:text-green-500 transition-colors" 
                size={20} 
              />
              <code className="text-[10px] text-zinc-600 block leading-tight">
                $ contact --init<br/>
                &gt; ready_to_receive
              </code>
            </div>
          </div>
        </div>

        {/* Mobile status indicator - Only visible on mobile/tablet */}
        <div className="lg:hidden mt-6 flex items-center justify-center gap-2 text-[9px] font-mono text-zinc-600">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          <span>SYSTEM_READY</span>
        </div>
      </div>
    </section>
  );
};

const InputGroup = ({ icon: Icon, label, name, ...props }) => (
  <div className="space-y-2 group">
    <label className="font-mono text-[9px] sm:text-[10px] text-zinc-500 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-green-500 transition-colors">
      <Icon size={12} className="text-green-500" /> {label}
    </label>
    <input 
      {...props}
      name={name}
      className="w-full bg-black/40 border border-white/10 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 text-zinc-300 font-mono text-xs sm:text-sm focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all"
    />
  </div>
);