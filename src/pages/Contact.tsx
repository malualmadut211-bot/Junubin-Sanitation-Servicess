import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { UploadCloud, File, X, ChevronDown, Check, MapPin, Phone, Mail, Clock, ArrowRight, Plus } from "lucide-react";

const shapes = [
  { type: 'circle', size: 180, color: 'rgba(254, 22, 31, 0.08)', top: '10%', left: '5%', duration: 25 },
  { type: 'triangle', size: 120, color: 'rgba(42, 30, 34, 0.05)', top: '60%', left: '15%', duration: 30 },
  { type: 'hexagon', size: 90, color: 'rgba(254, 22, 31, 0.12)', top: '40%', right: '10%', duration: 20 },
  { type: 'square', size: 140, color: 'rgba(34, 27, 31, 0.06)', bottom: '15%', right: '25%', duration: 28 },
  { type: 'pentagon', size: 110, color: 'rgba(254, 22, 31, 0.1)', top: '25%', left: '50%', duration: 35 },
  { type: 'circle', size: 60, color: 'rgba(42, 30, 34, 0.08)', bottom: '30%', left: '30%', duration: 18 },
  { type: 'octagon', size: 95, color: 'rgba(254, 22, 31, 0.07)', top: '70%', right: '5%', duration: 32 },
  { type: 'diamond', size: 75, color: 'rgba(34, 27, 31, 0.09)', top: '5%', right: '30%', duration: 22 }
];

const faqs = [
  { q: "What areas in Juba do you serve?", a: "We provide comprehensive services across all areas of Juba, including Juba Central Business District, Residential zones (Kololo, Munuki, etc.), Industrial areas, and Outlying districts. For emergency services, we operate 24/7 throughout the entire city." },
  { q: "How long does biodigester installation take?", a: "Installation time varies based on project size: Residential (4-6 users): 2-3 days. Small Commercial: 4-5 days. Large Industrial: 1-2 weeks. This includes excavation, installation, and connection to existing plumbing." },
  { q: "Do you offer maintenance contracts?", a: "Yes, we offer flexible maintenance contracts for commercial and residential properties, ensuring your plumbing and sanitation systems operate smoothly year-round." },
  { q: "What is your emergency response time?", a: "Our dedicated emergency team aims to be on-site within 60 minutes for critical plumbing or sanitation emergencies within central Juba." }
];

export default function Contact() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [formState, setFormState] = useState({ fullName: '', phone: '', email: '', service: 'General Construction', type: 'residential' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currentDay, setCurrentDay] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    setCurrentDay(days[new Date().getDay()]);
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && countdown === 0) {
      window.location.href = '/';
    }
  }, [isSuccess, countdown]);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  const createRipple = (e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto overflow-hidden relative">
      
      {/* 1. CONTACT HERO SECTION */}
      <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 lg:px-20 bg-gradient-to-br from-[#E0E0E0] to-[#F5F5F5] overflow-hidden flex flex-col lg:flex-row gap-16">
        
        {/* Floating Shapes */}
        {shapes.map((shape, i) => {
          const speed = (i + 1) * 0.5;
          const offsetX = (mousePos.x - 0.5) * speed * 50;
          const offsetY = (mousePos.y - 0.5) * speed * 50;
          const yScroll = useTransform(scrollY, [0, 1000], [0, (i % 3 + 1) * 100]);
          
          return (
            <motion.div
              key={i}
              style={{ 
                y: yScroll,
                width: shape.size, 
                height: shape.size, 
                backgroundColor: shape.color,
                top: shape.top, 
                left: shape.left, 
                bottom: shape.bottom, 
                right: shape.right,
                borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '10%' : '0'
              }}
              animate={{ x: offsetX, y: offsetY, rotate: 360 }}
              transition={{ rotate: { duration: shape.duration, repeat: Infinity, ease: "linear" }, x: { type: "spring", stiffness: 50 }, y: { type: "spring", stiffness: 50 } }}
              className="absolute pointer-events-none"
            />
          );
        })}

        {/* Left Column: Info Cards */}
        <div className="w-full lg:w-2/5 z-10 flex flex-col gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-montserrat font-black text-5xl md:text-6xl text-[#221B1F] mb-4">Get in <span className="text-primary">Touch</span></h1>
            <p className="text-lg text-gray-600 mb-8">We are ready to assist you with your construction, plumbing, and sanitation needs. Reach out to us today.</p>
          </motion.div>

          {/* Card 1: Phone */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-info-card group" onClick={(e) => { createRipple(e); setTimeout(() => window.location.href='tel:0911459117', 400); }}
          >
            <div className="card-icon-container">
              <Phone className="text-white w-10 h-10 icon-phone" />
            </div>
            <div className="text-xs font-bold text-gray-400 tracking-widest mb-1">PHONE</div>
            <div className="font-montserrat font-bold text-2xl text-[#221B1F] mb-1">0911 459 117</div>
            <div className="text-gray-500 mb-6">24/7 Emergency Hotline</div>
            <button className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
              <Phone className="w-4 h-4" /> Call Now <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </button>
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Available Now
            </div>
          </motion.div>

          {/* Card 2: Address */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="contact-info-card group" onClick={(e) => { createRipple(e); }}
          >
            <div className="card-icon-container">
              <MapPin className="text-white w-10 h-10 icon-location" />
            </div>
            <div className="text-xs font-bold text-gray-400 tracking-widest mb-1">ADDRESS</div>
            <div className="font-montserrat font-bold text-2xl text-[#221B1F] mb-4">Juba, South Sudan</div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-gray-600 text-sm"><span className="text-lg">🏢</span> Main Office: Custom Area</div>
              <div className="flex items-center gap-2 text-gray-600 text-sm"><span className="text-lg">🏭</span> Workshop: Industrial Zone</div>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
              <MapPin className="w-4 h-4" /> Get Directions <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </button>
          </motion.div>

          {/* Card 3: Email */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="contact-info-card group" onClick={(e) => { createRipple(e); setTimeout(() => window.location.href='mailto:info@junubinsanitation.com', 400); }}
          >
            <div className="card-icon-container">
              <Mail className="text-white w-10 h-10 icon-email" />
            </div>
            <div className="text-xs font-bold text-gray-400 tracking-widest mb-1">EMAIL</div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-[#221B1F] font-medium">
                <span className="bg-gray-200 text-xs px-2 py-1 rounded font-bold transition-colors group-hover:bg-primary group-hover:text-white">General</span> info@junubinsanitation.com
              </div>
              <div className="flex items-center gap-3 text-[#221B1F] font-medium">
                <span className="bg-gray-200 text-xs px-2 py-1 rounded font-bold transition-colors group-hover:bg-primary group-hover:text-white">Support</span> support@junubinsanitation.com
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
              <Clock className="w-4 h-4" /> Response within 2 hours
            </div>
            <button className="flex items-center gap-2 text-primary font-bold group-hover:translate-x-2 transition-transform">
              <Mail className="w-4 h-4" /> Send Email <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="w-full lg:w-3/5 z-10">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="contact-form"
          >
            <div className="mb-10">
              <h2 className="font-montserrat font-black text-4xl text-white mb-2 flex gap-2">
                {["Get", "In", "Touch"].map((word, i) => (
                  <motion.span key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>{word}</motion.span>
                ))}
              </h2>
              <p className="text-white/60">We'll respond within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="form-field relative">
                <input type="text" id="fullName" required className="form-input peer" placeholder=" " value={formState.fullName} onChange={e => setFormState({...formState, fullName: e.target.value})} />
                <label htmlFor="fullName" className="form-label">Full Name <span className="text-primary">*</span></label>
                <div className="field-border"></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 peer-focus:text-primary transition-colors field-icon">👤</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="form-field relative">
                  <input type="tel" id="phone" required className="form-input peer" placeholder=" " value={formState.phone} onChange={e => setFormState({...formState, phone: e.target.value})} />
                  <label htmlFor="phone" className="form-label">Phone Number <span className="text-primary">*</span></label>
                  <div className="field-border"></div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 peer-focus:text-primary transition-colors field-icon">📞</div>
                </div>
                {/* Email */}
                <div className="form-field relative">
                  <input type="email" id="email" required className="form-input peer" placeholder=" " value={formState.email} onChange={e => setFormState({...formState, email: e.target.value})} />
                  <label htmlFor="email" className="form-label">Email Address <span className="text-primary">*</span></label>
                  <div className="field-border"></div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 peer-focus:text-primary transition-colors field-icon">✉️</div>
                </div>
              </div>

              {/* Custom Dropdown */}
              <div className="relative">
                <div className={`form-input flex items-center justify-between cursor-pointer ${dropdownOpen ? 'border-primary bg-white/10' : ''}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <span className={formState.service ? 'text-white' : 'text-white/50'}>{formState.service || 'Service Interested In'}</span>
                  <ChevronDown className={`w-5 h-5 text-white/50 transition-transform ${dropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                </div>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul 
                      initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: -10, height: 0 }}
                      className="absolute top-full left-0 w-full mt-2 bg-[#2A1E22] border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl"
                    >
                      {[
                        { val: 'General Construction', icon: '🏗️' },
                        { val: 'Biodigester Installation', icon: '♻️' },
                        { val: 'Plumbing Services', icon: '🔧' },
                        { val: 'Cleaning & Maintenance', icon: '🧹' },
                        { val: 'Consultation', icon: '💡' }
                      ].map(opt => (
                        <li key={opt.val} className="px-5 py-4 hover:bg-primary/15 cursor-pointer flex items-center gap-3 text-white transition-colors relative overflow-hidden group" onClick={() => { setFormState({...formState, service: opt.val}); setDropdownOpen(false); }}>
                          <div className="absolute left-0 top-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                          <span>{opt.icon}</span> {opt.val}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Custom Radio Buttons */}
              <div>
                <label className="block text-white/50 text-sm mb-4">Project Type <span className="text-primary">*</span></label>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { val: 'residential', label: 'Residential', icon: '🏠' },
                    { val: 'commercial', label: 'Commercial', icon: '🏢' },
                    { val: 'industrial', label: 'Industrial', icon: '🏭' },
                    { val: 'emergency', label: 'Emergency', icon: '🚨' }
                  ].map(opt => (
                    <label key={opt.val} className="radio-option flex items-center cursor-pointer group">
                      <input type="radio" name="projectType" value={opt.val} checked={formState.type === opt.val} onChange={() => setFormState({...formState, type: opt.val})} className="hidden" />
                      <span className={`radio-custom w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 transition-all ${formState.type === opt.val ? 'border-primary shadow-[0_0_0_4px_rgba(254,22,31,0.2)]' : 'border-white/30 group-hover:border-primary group-hover:scale-110'}`}>
                        <span className={`w-3 h-3 rounded-full bg-primary transition-transform ${formState.type === opt.val ? 'scale-100' : 'scale-0'}`}></span>
                      </span>
                      <span className={`flex items-center gap-2 transition-colors ${formState.type === opt.val ? 'text-primary font-bold' : 'text-white/80'}`}>
                        <span className="radio-icon transition-transform">{opt.icon}</span> {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-white/50 text-sm mb-4">Attachment (Optional)</label>
                <div 
                  className={`file-upload-area border-2 border-dashed rounded-2xl p-10 text-center transition-all relative overflow-hidden ${isDragging ? 'border-primary bg-primary/10 scale-[1.02]' : 'border-white/20 hover:border-primary hover:bg-primary/5'}`}
                  onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                  onDrop={handleFileDrop}
                >
                  <input type="file" id="fileUpload" multiple className="hidden" onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
                  <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-primary upload-icon transition-transform">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <span className="text-white font-bold mb-2">Drop files here or click to browse</span>
                    <span className="text-white/50 text-sm">Supported: Images, PDF, DOC (Max 5MB)</span>
                  </label>
                </div>
                
                {/* File Previews */}
                {files.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {files.map((file, i) => (
                      <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center"><File className="w-5 h-5" /></div>
                          <div>
                            <div className="text-white text-sm font-bold truncate max-w-[200px]">{file.name}</div>
                            <div className="text-white/50 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile(i)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className="submit-button w-full h-16 rounded-xl font-bold text-lg text-white relative overflow-hidden group shadow-[0_10px_30px_rgba(254,22,31,0.4)] hover:-translate-y-1 transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#FF4D54]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2 h-full">
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAP SECTION & OFFICE HOURS */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Map Placeholder */}
        <div className="h-[500px] rounded-3xl overflow-hidden relative shadow-xl bg-[#212121]">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(100%) contrast(120%)' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#212121] to-transparent"></div>
          
          {/* Custom Marker */}
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(254,22,31,0.5)] border-4 border-white relative z-10">
              <img src="/vite.svg" alt="Logo" className="w-8 h-8 filter brightness-0 invert" />
            </div>
            <div className="w-4 h-4 bg-primary rotate-45 -mt-2 relative z-0"></div>
            <div className="w-12 h-4 bg-black/30 rounded-[100%] mt-2 blur-[2px] animate-pulse"></div>
          </motion.div>

          {/* Map Controls */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center font-bold text-xl hover:bg-gray-100">+</button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center font-bold text-xl hover:bg-gray-100">−</button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center font-bold text-xl hover:bg-gray-100 mt-2">📍</button>
          </div>
        </div>

        {/* Office Hours Widget */}
        <div className="office-hours-widget bg-white rounded-3xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center relative shadow-inner">
              {/* Animated Clock */}
              <svg className="w-16 h-16" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="4" />
                <motion.line x1="50" y1="50" x2="50" y2="30" stroke="#FE161F" strokeWidth="4" strokeLinecap="round" style={{ transformOrigin: '50% 50%', rotate: (time.getHours() % 12 * 30) + (time.getMinutes() * 0.5) }} />
                <motion.line x1="50" y1="50" x2="50" y2="20" stroke="#221B1F" strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '50% 50%', rotate: time.getMinutes() * 6 }} />
              </svg>
            </div>
            <div>
              <h3 className="font-montserrat font-black text-2xl text-[#221B1F] mb-2">BUSINESS HOURS</h3>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-500 text-green-600 px-4 py-1.5 rounded-full text-sm font-bold">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                Always Open
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
              <div key={day} className={`flex justify-between p-4 rounded-xl transition-all ${currentDay === day ? 'bg-primary/10 border-l-4 border-primary pl-4' : 'hover:bg-gray-50'}`}>
                <span className={`capitalize ${currentDay === day ? 'text-primary font-bold' : 'text-gray-600 font-medium'}`}>{day}</span>
                <span className={currentDay === day ? 'text-primary font-bold' : 'text-gray-500'}>24/7 Available</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary to-[#FF4D54] rounded-2xl p-6 text-white flex items-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(255,255,255,0.2)_50%,transparent_70%)] animate-[shine_3s_infinite]"></div>
            <div className="text-5xl animate-[emergency-pulse_2s_infinite]">🚨</div>
            <div className="relative z-10">
              <div className="font-montserrat font-bold text-lg mb-1">24/7 Emergency Response</div>
              <div className="text-white/80 text-sm">Available anytime, anywhere in Juba</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FAQ ACCORDION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-black text-4xl text-[#221B1F] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">Find quick answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-400 relative ${activeFaq === i ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
            >
              <div className={`absolute left-0 top-0 w-1 h-full bg-primary transition-transform duration-400 origin-top ${activeFaq === i ? 'scale-y-100' : 'scale-y-0'}`}></div>
              <div className="p-6 md:p-8 flex items-center cursor-pointer select-none group" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mr-6 transition-all duration-400 ${activeFaq === i ? 'bg-gradient-to-br from-green-400 to-green-600 scale-110' : 'bg-gradient-to-br from-primary to-[#FF4D54] group-hover:scale-105'}`}>
                  <Plus className={`w-6 h-6 text-white transition-transform duration-400 ${activeFaq === i ? 'rotate-45' : ''}`} />
                </div>
                <h3 className="font-montserrat font-bold text-lg text-[#221B1F] flex-grow">{faq.q}</h3>
                <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === i ? 'translate-x-2 text-primary' : ''}`} />
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }}
                    className="px-6 md:px-8 pb-8 pl-[88px]"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. SUCCESS MESSAGE OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", bounce: 0.5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 md:p-14 max-w-lg w-full text-center shadow-[0_30px_80px_rgba(0,0,0,0.3)] relative"
            >
              {/* Animated Checkmark */}
              <div className="w-32 h-32 mx-auto mb-8 relative">
                <svg viewBox="0 0 52 52" className="w-full h-full">
                  <motion.circle cx="26" cy="26" r="25" fill="none" stroke="#4CAF50" strokeWidth="2" strokeDasharray="166" initial={{ strokeDashoffset: 166 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.6, delay: 0.2 }} />
                  <motion.path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" strokeDasharray="48" initial={{ strokeDashoffset: 48 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 0.8 }} />
                </svg>
              </div>

              <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }} className="font-montserrat font-black text-3xl text-[#221B1F] mb-4">Request Submitted!</motion.h2>
              <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }} className="text-gray-600 mb-8">Thank you for contacting us. We'll get back to you within 24 hours.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="bg-gray-100 rounded-xl p-6 mb-8 text-left space-y-4">
                <div className="flex items-center gap-4 text-gray-700 font-medium"><span className="text-xl">📧</span> Confirmation sent to your email</div>
                <div className="flex items-center gap-4 text-gray-700 font-medium"><span className="text-xl">🔔</span> Reference #: <strong className="text-primary">JUN2026-1234</strong></div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center justify-center gap-4 text-gray-500 font-medium mb-8">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#E0E0E0" strokeWidth="4" />
                    <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#FE161F" strokeWidth="4" strokeDasharray={2 * Math.PI * 45} animate={{ strokeDashoffset: (2 * Math.PI * 45) * (1 - countdown / 5) }} transition={{ duration: 1, ease: "linear" }} />
                  </svg>
                  <motion.span key={countdown} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-primary font-bold">{countdown}</motion.span>
                </div>
                Redirecting to homepage...
              </motion.div>

              <button onClick={() => window.location.href = '/'} className="text-primary font-bold hover:underline">Return to Home Now</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS for animations */}
      <style>{`
        .contact-info-card {
          background: #FFFFFF; border-radius: 20px; padding: 40px 35px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
          position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .contact-info-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
          background: linear-gradient(90deg, #FE161F 0%, #FF4D54 50%, #FE161F 100%);
          transform: scaleX(0); transition: transform 0.5s ease; transform-origin: left;
        }
        .contact-info-card:hover::before { transform: scaleX(1); }
        .contact-info-card:hover { transform: translateY(-15px) scale(1.02); box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15); }
        
        .card-icon-container {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #FE161F 0%, #FF3D44 100%);
          display: flex; align-items: center; justify-content: center; margin-bottom: 25px; position: relative;
          box-shadow: 0 8px 20px rgba(254, 22, 31, 0.3), inset 0 -3px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .contact-info-card:hover .card-icon-container { transform: rotate(360deg); }
        
        .card-icon-container::before, .card-icon-container::after {
          content: ''; position: absolute; inset: -10px; border-radius: 50%;
          border: 2px solid rgba(254, 22, 31, 0.4); animation: pulse-ring 2s infinite;
        }
        .card-icon-container::after { animation-delay: 1s; }
        
        .contact-form {
          background: linear-gradient(145deg, #2A1E22 0%, #1F1719 100%);
          border-radius: 25px; padding: 50px 45px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          position: relative; overflow: hidden;
        }
        .contact-form::before {
          content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
          background: radial-gradient(circle, rgba(254, 22, 31, 0.05) 1px, transparent 1px);
          background-size: 30px 30px; animation: pattern-drift 60s linear infinite; pointer-events: none;
        }
        
        .form-input {
          width: 100%; height: 60px; background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
          padding: 20px 50px 20px 20px; font-size: 16px; color: #FFFFFF; transition: all 0.4s ease;
        }
        .form-label {
          position: absolute; left: 20px; top: 50%; transform: translateY(-50%);
          font-size: 16px; color: rgba(255, 255, 255, 0.5); pointer-events: none;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .form-input:focus ~ .form-label, .form-input:not(:placeholder-shown) ~ .form-label {
          top: -10px; left: 15px; font-size: 12px; color: #FE161F; background: #2A1E22; padding: 0 8px; transform: translateY(0);
        }
        .field-border {
          position: absolute; bottom: 0; left: 50%; width: 0; height: 2px;
          background: linear-gradient(90deg, #FE161F, #FF4D54, #FE161F);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); transform: translateX(-50%);
        }
        .form-input:focus ~ .field-border { width: 100%; }
        .form-input:focus {
          border-color: rgba(254, 22, 31, 0.5); box-shadow: 0 0 0 4px rgba(254, 22, 31, 0.1), 0 8px 20px rgba(254, 22, 31, 0.2);
          background: rgba(255, 255, 255, 0.08); outline: none;
        }
        
        .ripple {
          position: absolute; border-radius: 50%; transform: scale(0);
          animation: ripple-anim 600ms linear; background-color: rgba(254, 22, 31, 0.3); pointer-events: none;
        }
        @keyframes ripple-anim { to { transform: scale(4); opacity: 0; } }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes pattern-drift { 0% { transform: translate(0, 0); } 100% { transform: translate(30px, 30px); } }
        @keyframes emergency-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        @keyframes shine { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes phone-ring { 0%, 100% { transform: rotate(0deg); } 10% { transform: rotate(-15deg); } 20% { transform: rotate(15deg); } 30% { transform: rotate(-15deg); } 40% { transform: rotate(15deg); } 50% { transform: rotate(0deg); } }
        .contact-info-card:hover .icon-phone { animation: phone-ring 0.6s infinite; }
      `}</style>
    </div>
  );
}
