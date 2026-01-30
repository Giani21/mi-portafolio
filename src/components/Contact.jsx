import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Terminal, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { language } = useLanguage();
  const formRef = useRef();
  const [status, setStatus] = useState('idle');

  // 1. Definimos las traducciones PRIMERO para que estén disponibles abajo
  const text = {
    es: {
      title: "NODO_CONTACTO",
      subtitle: "Establecer enlace de comunicación",
      name: "USUARIO",
      email: "CORREO",
      message: "MENSAJE",
      button: "ENVIAR",
      success: "TRANSMISIÓN COMPLETADA CON ÉXITO"
    },
    en: {
      title: "CONTACT_NODE",
      subtitle: "Establish communication link",
      name: "USER",
      email: "MAIL",
      message: "DATA",
      button: "SEND",
      success: "TRANSMISSION COMPLETED SUCCESSFULLY"
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
      // El error 412 suele ser por IDs incorrectos en el .env.local
      alert('Error de validación (412). Revisa tus credenciales en el .env.local');
    });
  };

  return (
    <section id="contact" className="py-32 px-6 relative bg-[#030712] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="font-mono text-[10px] tracking-[0.5em] text-green-500/70 uppercase">
              {text.title} // IP_ENCRYPTED
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase italic">
            {language === 'es' ? 'HABLE' : 'LET\'S'}{" "}
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
              {language === 'es' ? 'MOS' : 'TALK'}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <motion.form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="md:col-span-8 bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-sm relative overflow-hidden"
          >
            {status === 'success' && (
              <motion.div 
                className="absolute inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                <h3 className="text-white font-mono text-sm tracking-widest">{text.success}</h3>
                <button 
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-green-500/50 hover:text-green-500 font-mono text-[10px] underline uppercase tracking-widest"
                >
                  [ REINICIAR_SISTEMA ]
                </button>
              </motion.div>
            )}

            <div className="space-y-6">
              <InputGroup icon={User} label={text.name} name="user_name" placeholder="John Doe" required />
              <InputGroup icon={Mail} label={text.email} name="user_email" placeholder="mail@example.com" type="email" required />
              
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-zinc-500 flex items-center gap-2 uppercase tracking-widest">
                  <MessageSquare size={12} className="text-green-500" /> {text.message}
                </label>
                <textarea 
                  name="message"
                  required
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-sm p-4 text-zinc-300 font-mono text-sm focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className="group relative w-full py-4 bg-zinc-900 border border-white/10 hover:border-green-500/50 transition-all overflow-hidden active:scale-[0.98]"
              >
                <div className="relative flex items-center justify-center gap-3 font-mono text-xs font-bold tracking-[0.3em] text-zinc-400 group-hover:text-white">
                  {status === 'sending' ? 'SENDING_DATA...' : text.button}
                  <Send size={14} className={status === 'sending' ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'} />
                </div>
              </button>
            </div>
          </motion.form>

          <div className="md:col-span-4 space-y-4">
            <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-sm">
              <h4 className="font-mono text-[10px] text-green-500 mb-4 uppercase tracking-[0.2em]">Connection_Status</h4>
              <ul className="space-y-3 font-mono text-[9px] text-zinc-500 italic">
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>LOCATION:</span> <span className="text-zinc-300">ARGENTINA_BUENOS_AIRES</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-1">
                  <span>LATENCY:</span> <span className="text-green-400">12MS_OPTIMAL</span>
                </li>
              </ul>
            </div>
            <div className="p-6 bg-zinc-900/20 border border-white/5 rounded-sm overflow-hidden group">
               <Terminal className="text-zinc-700 mb-4 group-hover:text-green-500 transition-colors" size={20} />
               <code className="text-[10px] text-zinc-600 block leading-tight">
                 $ contact --init<br/>
                 &gt; ready_to_receive
               </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InputGroup = ({ icon: Icon, label, name, ...props }) => (
  <div className="space-y-2 group">
    <label className="font-mono text-[10px] text-zinc-500 flex items-center gap-2 uppercase tracking-widest group-focus-within:text-green-500 transition-colors">
      <Icon size={12} className="text-green-500" /> {label}
    </label>
    <input 
      {...props}
      name={name}
      className="w-full bg-black/40 border border-white/10 rounded-sm px-4 py-3 text-zinc-300 font-mono text-sm focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 outline-none transition-all"
    />
  </div>
);