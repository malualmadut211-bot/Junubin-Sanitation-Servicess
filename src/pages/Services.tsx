import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  ChevronRight, Wrench, Droplets, Leaf, DollarSign, Wind, Flame, Clock, 
  Maximize, Phone, Check, X, MapPin, ArrowRight, ShieldCheck, MousePointer2,
  HardHat, Hammer, Ruler, Truck, Sparkles, Home, Trash2, Bath
} from "lucide-react";

export default function Services() {
  const { scrollY } = useScroll();
  const [activeStep, setActiveStep] = useState(1);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState({ before: "", after: "" });
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Auto slide for before/after
  useEffect(() => {
    if (isDragging) return;
    let progress = 50;
    let direction = 1;
    let animationId: number;

    const animate = () => {
      progress += direction * 0.2;
      if (progress >= 70 || progress <= 30) direction *= -1;
      setSliderPos(progress);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, percent)));
  };

  const openLightbox = (before: string, after: string) => {
    setLightboxImg({ before, after });
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden font-roboto">
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-[#221B1F]">
        {/* Background Image with Ken Burns */}
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ scale: [1.05, 1.1, 1.05] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#221B1F]/85 to-[#221B1F]/40 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2560&auto=format&fit=crop" 
            alt="Construction Worker" 
            className="w-full h-full object-cover filter brightness-75 contrast-110"
          />
        </motion.div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute border border-white/5 backdrop-blur-[2px]"
              style={{
                width: 300 + i * 100,
                height: 300 + i * 100,
                left: `${20 * i}%`,
                top: `${10 * i}%`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                backgroundColor: i % 2 === 0 ? "rgba(254,22,31,0.1)" : "transparent"
              }}
              animate={{ rotate: 360, y: [-20, 20, -20] }}
              transition={{ 
                rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: i }
              }}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-20 pt-32 pb-20">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, staggerChildren: 0.1 }}
              className="flex items-center text-sm font-montserrat font-medium text-white/70 uppercase tracking-widest mb-8"
            >
              <span className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer">Home</span>
              <span className="mx-4">/</span>
              <span className="text-white">Services</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
              animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.65, 0, 0.35, 1] }}
            >
              <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] drop-shadow-2xl">
                Comprehensive <br/>
                <span className="text-primary">Solutions</span> For <br/>
                A Better Future
              </h1>
            </motion.div>

            {/* Decorative Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="h-1 bg-primary mt-8 mb-6 origin-left"
            />

            {/* Subheading */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed mb-10"
            >
              From groundbreaking construction to innovative sanitation systems, we deliver excellence across South Sudan with unmatched expertise and dedication.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.5, type: "spring" }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-primary hover:bg-[#D41219] text-white px-8 py-4 rounded font-montserrat font-semibold transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30">
                Get a Quote
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#221B1F] px-8 py-4 rounded font-montserrat font-semibold transition-all">
                Explore Services
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MousePointer2 className="w-6 h-6 mb-2" />
          <span className="text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* SECTION 1: GENERAL CONSTRUCTION */}
      <section className="py-24 bg-[#E0E0E0] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Column - Image */}
            <motion.div 
              initial={{ opacity: 0, x: -80, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-5 -left-5 w-[100px] h-[100px] border-t-8 border-l-8 border-primary z-0" />
              
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl aspect-4/3">
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop" 
                  alt="Construction" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                {/* Overlay Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMjBMMjAgMEgwaC0yMHoiIGZpbGw9IiNGRTE2MUYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] mix-blend-multiply pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg p-10 md:p-14 shadow-xl border-l-8 border-primary"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-primary font-bold text-sm uppercase tracking-widest mb-4"
              >
                Build With Confidence
              </motion.div>
              
              <motion.h2 
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0 0 0)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="font-montserrat font-bold text-4xl text-[#221B1F] mb-6"
              >
                General Construction
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-gray-600 mb-8 leading-relaxed"
              >
                We deliver robust, scalable, and sustainable construction projects. From residential complexes to commercial infrastructure, our team ensures quality at every phase.
              </motion.p>

              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 }}
                className="h-1 bg-primary mb-8"
              />

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: HardHat, text: "Project Management" },
                  { icon: Hammer, text: "Structural Works" },
                  { icon: Ruler, text: "Architecture" },
                  { icon: Truck, text: "Logistics" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0 + (i * 0.1), type: "spring" }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FEF0F0] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-sm text-gray-800">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Features List */}
              <div className="space-y-3 mb-10">
                {["ISO Certified Materials", "On-time Delivery", "Safety First Approach"].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 + (i * 0.1) }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2.0 }}
              >
                <button className="bg-primary text-white px-8 py-3 rounded font-montserrat font-semibold hover:bg-[#D41219] transition-colors shadow-lg shadow-primary/20">
                  Discuss Your Project
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BIODIGESTER SEPTIC TANK */}
      <section className="py-24 relative bg-gradient-to-br from-[#F5F5F5] via-white to-[#F0FFF4]">
        {/* Hexagon Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzAgMEg5MGwzMCA1Mi0zMCA1MkgzMEwwIDUyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNENBRjUwIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')" }} />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-[#221B1F] mb-4">Biodigester Septic Tanks</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The modern, eco-friendly solution to waste management.</p>
          </div>

          {/* Infographic Container */}
          <div className="bg-white rounded-2xl p-10 shadow-[0_30px_90px_rgba(0,0,0,0.08)] mb-20">
            <div className="relative w-full h-[500px] flex items-center justify-center">
              {/* Simplified SVG Representation of Infographic */}
              <svg viewBox="0 0 800 500" className="w-full h-full max-w-3xl">
                {/* Tank */}
                <rect x="300" y="100" width="200" height="300" rx="20" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="4" />
                <rect x="310" y="150" width="180" height="240" rx="10" fill="rgba(76,175,80,0.1)" />
                
                {/* Pipes */}
                <path d="M 150 150 L 300 150" stroke="#BDBDBD" strokeWidth="20" fill="none" />
                <path d="M 500 350 L 650 350" stroke="#BDBDBD" strokeWidth="20" fill="none" />
                
                {/* Animated Arrows */}
                <motion.path 
                  d="M 150 150 L 280 150" 
                  stroke="#FE161F" strokeWidth="4" strokeDasharray="10 5" fill="none"
                  animate={{ strokeDashoffset: [100, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path 
                  d="M 520 350 L 650 350" 
                  stroke="#4CAF50" strokeWidth="4" strokeDasharray="10 5" fill="none"
                  animate={{ strokeDashoffset: [100, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Bubbles */}
                {[1,2,3,4,5].map(i => (
                  <motion.circle
                    key={i}
                    cx={350 + (i * 20)}
                    cy="350"
                    r={Math.random() * 5 + 2}
                    fill="rgba(76,175,80,0.6)"
                    animate={{ y: [-10, -200], opacity: [0, 0.8, 0] }}
                    transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }}
                  />
                ))}

                {/* Labels */}
                <text x="220" y="130" className="font-bold text-sm" fill="#221B1F">Waste In</text>
                <text x="550" y="330" className="font-bold text-sm" fill="#221B1F">Clean Water Out</text>
                <text x="400" y="250" textAnchor="middle" className="font-bold text-lg" fill="#4CAF50">Digestion Chamber</text>
              </svg>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Leaf, title: "100% Eco-Friendly", desc: "Zero environmental impact with natural bacterial breakdown.", color: "from-green-400 to-green-600" },
              { icon: DollarSign, title: "Cost Effective", desc: "No exhaustation needed. Saves money in the long run.", color: "from-yellow-400 to-yellow-600" },
              { icon: Wind, title: "Odorless", desc: "Completely sealed system prevents any foul smells.", color: "from-blue-400 to-blue-600" },
              { icon: Flame, title: "Biogas Potential", desc: "Can be adapted to capture gas for cooking.", color: "from-orange-400 to-orange-600" },
              { icon: Clock, title: "Long Lifespan", desc: "Built to last decades with minimal maintenance.", color: "from-purple-400 to-purple-600" },
              { icon: Maximize, title: "Space Saving", desc: "Requires a fraction of the space of traditional tanks.", color: "from-teal-400 to-teal-600" }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="relative w-20 h-20 mb-6 mx-auto">
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} rounded-full opacity-20 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700`} />
                  <benefit.icon className="absolute inset-0 m-auto w-10 h-10 text-gray-700 group-hover:text-white transition-colors duration-300 z-10" />
                </div>
                <h4 className="text-center font-bold text-lg mb-3">{benefit.title}</h4>
                <p className="text-center text-gray-600 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Before/After Slider */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-center font-bold text-2xl mb-8">See the Difference</h3>
            <div 
              ref={sliderRef}
              className="relative h-[400px] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
            >
              {/* Before Image */}
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" alt="Traditional" className="w-full h-full object-cover grayscale" />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded font-bold text-sm tracking-wider">TRADITIONAL SYSTEM</div>
              </div>
              
              {/* After Image */}
              <div 
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1000&auto=format&fit=crop" alt="Biodigester" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-[#4CAF50] text-white px-4 py-2 rounded font-bold text-sm tracking-wider">BIODIGESTER</div>
              </div>

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-primary flex items-center justify-center shadow-lg">
                  <div className="flex gap-1">
                    <ChevronRight className="w-4 h-4 rotate-180 text-primary" />
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PLUMBING SERVICES */}
      <section className="relative">
        {/* Emergency Banner */}
        <div className="sticky top-20 z-50 bg-gradient-to-r from-[#FE161F] to-[#D41219] py-4 px-6 shadow-[0_10px_40px_rgba(254,22,31,0.4)]">
          <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-white rounded-full animate-[ping_2s_ease-out_infinite]" />
                <Phone className="w-6 h-6 text-white animate-[wiggle_1s_ease-in-out_infinite]" />
              </div>
              <div>
                <div className="text-white/90 text-sm font-bold tracking-wider">24/7 EMERGENCY SERVICE</div>
                <div className="text-white text-lg">Response within 60 minutes</div>
              </div>
            </div>
            <a href="tel:0911459117" className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
              <span className="tracking-widest">0911 459 117</span>
              <span>CALL NOW</span>
            </a>
          </div>
        </div>

        <div className="py-24 bg-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-20">
            <div className="text-center mb-16">
              <h2 className="font-montserrat font-bold text-4xl text-[#221B1F] mb-4">Professional Plumbing</h2>
              <p className="text-xl text-gray-600">Expert solutions for residential and commercial needs.</p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
              {[
                { icon: Droplets, title: "Leak Repair", desc: "Fast detection and repair of all leaks." },
                { icon: Wrench, title: "Pipe Installation", desc: "Full piping systems for new builds." },
                { icon: Bath, title: "Fixture Fitting", desc: "Sinks, toilets, and shower installations." },
                { icon: ShieldCheck, title: "Maintenance", desc: "Regular checkups to prevent disasters." }
              ].map((service, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-xl p-8 text-center relative group cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-400"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FE161F] to-[#FF4550] opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-0" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                      <div className="absolute inset-0 bg-[#FEF0F0] rounded-full group-hover:bg-white/20 group-hover:scale-120 group-hover:rotate-180 transition-all duration-400" />
                      <service.icon className="absolute inset-0 m-auto w-12 h-12 text-primary group-hover:text-white transition-colors duration-400" />
                    </div>
                    <h4 className="font-bold text-xl mb-4 group-hover:text-white transition-colors">{service.title}</h4>
                    
                    {/* Tooltip-like reveal */}
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-400 overflow-hidden">
                      <p className="text-white/90 text-sm mb-4">{service.desc}</p>
                      <span className="text-white font-bold text-sm flex items-center justify-center gap-1">Learn More <ArrowRight className="w-4 h-4"/></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="py-24 bg-[#221B1F]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-20">
            <h3 className="text-center font-bold text-3xl text-white mb-12">Our Work Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="relative aspect-4/3 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(
                    `https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop&sig=${i}`, 
                    `https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop&sig=${i}`
                  )}
                >
                  <img src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop&sig=${i}`} alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-600" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-[#221B1F]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                    <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider">BEFORE / AFTER</div>
                    <Maximize className="w-10 h-10 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: CLEANING SERVICES */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Video Background (Simulated with Image for now) */}
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2560&auto=format&fit=crop" alt="Cleaning" className="w-full h-full object-cover filter brightness-40 contrast-110" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#221B1F]/85 to-primary/75 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-20 py-24">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl text-white mb-4">Professional Cleaning</h2>
            <p className="text-xl text-white/80">Spotless results for homes and offices.</p>
          </div>

          {/* Checklist */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Residential Deep Cleaning", "Office & Commercial Spaces", 
                "Post-Construction Cleanup", "Move-in / Move-out Cleaning"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
                >
                  <div className="w-10 h-10 bg-[#4CAF50] rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { name: "BASIC", price: "15,000", color: "bg-primary", features: ["Standard room cleaning", "Bathroom sanitization", "Kitchen surface cleaning", "Floor mopping", "Trash removal"] },
              { name: "POPULAR", price: "25,000", color: "bg-gradient-to-br from-primary to-[#FF4550]", featured: true, features: ["Everything in Basic", "Deep carpet cleaning", "Window washing", "Cabinet interior cleaning", "Appliance detailing"] },
              { name: "PREMIUM", price: "40,000", color: "bg-gradient-to-br from-[#D41219] to-[#A00F14]", features: ["Everything in Popular", "Exterior pressure washing", "Gutter cleaning", "Roof sweeping", "Monthly maintenance plan"] }
            ].map((pkg, i) => (
              <div key={i} className={`relative perspective-1000 h-[450px] ${pkg.featured ? 'lg:scale-105 z-10' : ''}`}>
                {pkg.featured && (
                  <div className="absolute -top-4 right-6 bg-[#4CAF50] text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider z-50 shadow-lg">
                    POPULAR
                  </div>
                )}
                <div className="w-full h-full transition-transform duration-700 preserve-3d hover:rotate-y-180 group">
                  {/* Front */}
                  <div className={`absolute inset-0 backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50 shadow-xl ${pkg.featured ? 'border-2 border-primary' : ''}`}>
                    <div className={`${pkg.color} text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider mb-6`}>{pkg.name}</div>
                    <div className="w-24 h-24 relative mb-6">
                      <div className="absolute inset-0 bg-[#FEF0F0] rounded-full animate-[pulse_2s_ease_infinite]" />
                      <Sparkles className="absolute inset-0 m-auto w-12 h-12 text-primary z-10" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-gray-500 font-semibold text-xl">SSP</span>
                      <span className="text-4xl font-bold text-[#221B1F]">{pkg.price}</span>
                      <span className="text-gray-500">/service</span>
                    </div>
                    <div className="text-primary text-sm font-medium mt-auto">Hover for details &rarr;</div>
                  </div>
                  
                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-8 flex flex-col bg-gradient-to-br from-[#FE161F] to-[#D41219] text-white shadow-2xl">
                    <h4 className="font-bold text-xl mb-6 text-center">{pkg.name} Package</h4>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {pkg.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400" style={{ transitionDelay: `${0.3 + j * 0.1}s` }}>
                          <Check className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-white text-primary py-3 rounded-full font-bold hover:bg-[#221B1F] hover:text-white transition-colors opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 duration-500 delay-700">
                      Select Package
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Badge */}
          <div className="relative w-48 h-48 mx-auto mt-24">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4CAF50] to-[#45A049] rounded-full shadow-[0_10px_40px_rgba(76,175,80,0.4)] flex flex-col items-center justify-center z-10">
              <div className="relative w-12 h-12 mb-2">
                <ShieldCheck className="w-full h-full text-white opacity-40" />
                <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
              </div>
              <div className="text-white text-center">
                <div className="font-bold text-sm tracking-wider">100% Satisfaction</div>
                <div className="text-xs opacity-90">Guaranteed</div>
              </div>
            </div>
            <div className="absolute -inset-4 border-2 border-dashed border-white/30 rounded-full animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="py-24 bg-[#E0E0E0]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-3xl text-[#221B1F]">Service Comparison</h2>
          </div>
          
          <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
            <table className="w-full min-w-[800px] border-collapse">
              <thead className="bg-[#221B1F] text-white sticky top-0 z-10">
                <tr>
                  <th className="p-6 text-left font-montserrat font-bold border-b-4 border-primary min-w-[250px] bg-[#1A1416]">Feature</th>
                  <th className="p-6 text-center font-montserrat font-bold border-b-4 border-primary">Construction</th>
                  <th className="p-6 text-center font-montserrat font-bold border-b-4 border-primary">Biodigester</th>
                  <th className="p-6 text-center font-montserrat font-bold border-b-4 border-primary">Plumbing</th>
                  <th className="p-6 text-center font-montserrat font-bold border-b-4 border-primary">Cleaning</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feat: "24/7 Availability", vals: [false, false, true, true] },
                  { feat: "Free Consultation", vals: [true, true, false, false] },
                  { feat: "Eco-Friendly Materials", vals: [true, true, true, true] },
                  { feat: "Maintenance Plan", vals: [false, true, true, true] },
                  { feat: "Warranty Included", vals: [true, true, true, false] }
                ].map((row, i) => (
                  <motion.tr 
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-b border-gray-200 hover:bg-red-50/50 transition-colors group"
                  >
                    <td className="p-6 font-semibold text-[#221B1F]">{row.feat}</td>
                    {row.vals.map((val, j) => (
                      <td key={j} className="p-6 text-center">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${val ? 'bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white' : 'bg-red-100 text-red-500 group-hover:bg-red-500 group-hover:text-white'}`}>
                          {val ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden bg-primary text-white text-center p-3 rounded-b-xl animate-pulse text-sm">
            Swipe to see more &rarr;
          </div>
        </div>
      </section>

      {/* SERVICE AREA MAP */}
      <section className="py-24 bg-[#221B1F] text-white relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-4xl mb-4">Service Areas in Juba</h2>
            <p className="text-white/70">Find out if we cover your location.</p>
          </div>

          <div className="relative max-w-4xl mx-auto bg-[#1A1416] p-8 rounded-2xl border border-white/10">
            {/* Simulated Map SVG */}
            <svg viewBox="0 0 800 500" className="w-full h-auto drop-shadow-[0_10px_30px_rgba(254,22,31,0.2)]">
              {/* Base Map Outline (Abstract shape for Juba) */}
              <path d="M 100 200 C 150 100, 300 50, 500 100 C 700 150, 750 300, 600 400 C 450 500, 200 450, 100 350 Z" fill="#2A2226" stroke="#FE161F" strokeWidth="2" />
              
              {/* Zones */}
              <path 
                d="M 300 200 C 350 150, 450 150, 500 250 C 450 350, 350 350, 300 250 Z" 
                className="fill-green-500/20 stroke-green-500/50 hover:fill-green-500/40 hover:stroke-green-500 transition-all cursor-pointer"
                onMouseEnter={(e) => { setActiveZone("Central Juba"); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                onMouseLeave={() => setActiveZone(null)}
              />
              <path 
                d="M 150 250 C 200 200, 280 200, 300 250 C 280 350, 200 350, 150 300 Z" 
                className="fill-yellow-500/20 stroke-yellow-500/50 hover:fill-yellow-500/40 hover:stroke-yellow-500 transition-all cursor-pointer"
                onMouseEnter={(e) => { setActiveZone("Munuki"); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                onMouseLeave={() => setActiveZone(null)}
              />
              <path 
                d="M 500 250 C 550 200, 650 250, 600 350 C 550 400, 480 350, 500 250 Z" 
                className="fill-red-500/20 stroke-red-500/50 hover:fill-red-500/40 hover:stroke-red-500 transition-all cursor-pointer"
                onMouseEnter={(e) => { setActiveZone("Gudele"); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                onMouseLeave={() => setActiveZone(null)}
              />

              {/* Pins */}
              {[
                { x: 400, y: 250, delay: 0.2 },
                { x: 250, y: 280, delay: 0.4 },
                { x: 550, y: 300, delay: 0.6 }
              ].map((pin, i) => (
                <motion.g 
                  key={i}
                  initial={{ y: -50, opacity: 0, scale: 0 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: pin.delay, type: "spring" }}
                  className="cursor-pointer group"
                >
                  <circle cx={pin.x} cy={pin.y} r="15" className="fill-primary/60 animate-[ping_2s_ease_infinite]" />
                  <circle cx={pin.x} cy={pin.y} r="6" className="fill-primary group-hover:fill-white group-hover:r-8 transition-all" />
                </motion.g>
              ))}
            </svg>

            {/* Tooltip */}
            <AnimatePresence>
              {activeZone && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed bg-white text-[#221B1F] p-4 rounded-lg shadow-xl pointer-events-none z-50 min-w-[200px]"
                  style={{ left: tooltipPos.x + 20, top: tooltipPos.y - 20 }}
                >
                  <div className="font-bold text-primary mb-1">{activeZone}</div>
                  <div className="text-sm">
                    {activeZone === "Central Juba" && "Full Service Available. Response time: < 1hr"}
                    {activeZone === "Munuki" && "Limited Service. Response time: 2-4hrs"}
                    {activeZone === "Gudele" && "On Request Only. Scheduled visits."}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-8 mt-10 p-6 bg-white/5 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-green-500/50 border-2 border-white" />
              <span className="text-sm">Full Service</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-yellow-500/50 border-2 border-white" />
              <span className="text-sm">Limited Service</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-red-500/50 border-2 border-white" />
              <span className="text-sm">On Request</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setLightboxOpen(false)} />
            
            <motion.div 
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 50, scale: 0.9 }}
              className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden"
            >
              <button 
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-primary text-white p-2 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-2 gap-1 relative">
                <div className="relative aspect-4/3">
                  <img src={lightboxImg.before} alt="Before" className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-black/80 text-white px-4 py-2 rounded font-bold tracking-widest">BEFORE</div>
                </div>
                <div className="relative aspect-4/3">
                  <img src={lightboxImg.after} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute top-6 left-6 bg-[#4CAF50] text-white px-4 py-2 rounded font-bold tracking-widest">AFTER</div>
                </div>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
