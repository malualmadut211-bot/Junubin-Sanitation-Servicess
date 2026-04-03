import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Clock, CalendarCheck, CheckSquare, Star, ArrowRight, MousePointer2, ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <TrustIndicators />
      <ServicesOverview />
      <WhyChooseSection />
      <RecentProjects />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}

function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 50;
      const y = (e.clientY - top - height / 2) / 50;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
          alt="Construction site"
          className="w-full h-full object-cover opacity-60 scale-105 animate-[kenburns_30s_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-darker/85 via-dark/75 to-darker/65 mix-blend-multiply animate-[breathe_8s_infinite_alternate]"></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        <motion.div
          animate={{ x: -mousePos.x * 0.3, y: -mousePos.y * 0.3 }}
          className="absolute top-[10vh] right-[10vw] w-[180px] h-[180px] border-2 border-primary/30 bg-primary/5 backdrop-blur-sm animate-[spin_20s_linear_infinite]"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        />
        <motion.div
          animate={{ x: -mousePos.x * 0.5, y: -mousePos.y * 0.5 }}
          className="absolute top-[45vh] left-[15vw] w-[120px] h-[120px] rounded-full border-4 border-primary/40 bg-[radial-gradient(circle,rgba(254,22,31,0.15),transparent)] animate-[pulse_4s_ease-in-out_infinite]"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center mt-20">
        <h1 className="font-montserrat font-extrabold text-white text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 max-w-5xl text-shadow-md">
          <motion.span
            initial={{ x: -100, opacity: 0, skewX: -15 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block"
          >
            Building <span className="text-primary font-black text-shadow-glow">Sustainable</span>
          </motion.span>{" "}
          <motion.span
            initial={{ x: 100, opacity: 0, skewX: 15 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block"
          >
            Solutions for <span className="text-primary font-black text-shadow-glow">South Sudan</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ y: 30, opacity: 0, filter: "blur(5px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-6 mb-12"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="hidden md:block h-0.5 bg-primary"
          />
          <p className="font-lato text-gray-200 text-lg md:text-xl uppercase tracking-widest font-light text-shadow-sm max-w-2xl">
            Premier Construction, Plumbing & Environmental Sanitation Excellence
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="hidden md:block h-0.5 bg-primary"
          />
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6">
          <motion.button
            initial={{ y: 100, scale: 0, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="bg-primary hover:bg-gradient-to-br hover:from-primary hover:to-primary-dark text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(254,22,31,0.4)] hover:shadow-[0_15px_40px_rgba(254,22,31,0.6),0_0_30px_rgba(252,40,48,0.8)] transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
          >
            Get Free Quote
          </motion.button>
          <motion.button
            initial={{ y: 100, scale: 0, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1.15, ease: [0.68, -0.55, 0.265, 1.55] }}
            className="group relative bg-transparent text-white px-10 py-4 rounded-full font-bold text-lg border-2 border-primary shadow-[0_5px_20px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary-dark hover:shadow-[0_10px_35px_rgba(254,22,31,0.5)]"
          >
            <span className="absolute inset-0 w-0 bg-primary transition-all duration-400 ease-out group-hover:w-full"></span>
            <span className="relative z-10">Our Services</span>
          </motion.button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <div className="w-[25px] h-[40px] border-2 border-primary rounded-full bg-primary/10 flex justify-center p-1 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(254,22,31,0.9)] transition-all duration-300">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
        <span className="text-gray-300 text-xs tracking-widest mt-2 group-hover:text-primary transition-colors">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
        >
          <ChevronDown size={20} className="text-primary mt-1" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrustIndicators() {
  const items = [
    { icon: Clock, count: "24/7", label: "Available", color: "#FE161F" },
    { icon: CalendarCheck, count: "15+", label: "Years Experience", color: "#FC2830" },
    { icon: CheckSquare, count: "1000+", label: "Projects Completed", color: "#FE161F" },
    { icon: Star, count: "100%", label: "Satisfaction", color: "#FC2830" },
  ];

  return (
    <section className="relative bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 py-10 border-t-4 border-primary overflow-hidden">
      {/* Decorative Stripes */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #221B1F, #221B1F 2px, transparent 2px, transparent 30px)",
        }}
      />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group flex items-center gap-5 p-6 bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.08)] border-l-4 border-transparent hover:border-primary hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(254,22,31,0.15)] hover:bg-gradient-to-br hover:from-white hover:to-red-50 transition-all duration-400"
            >
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_4px_15px_rgba(254,22,31,0.3)] group-hover:rotate-[360deg] group-hover:shadow-[0_0_30px_rgba(254,22,31,0.6)] transition-all duration-600">
                <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:animate-[pulse-ring_2s_infinite]"></div>
                <item.icon size={28} className="text-white drop-shadow-md" />
              </div>
              <div>
                <span className="block font-montserrat font-extrabold text-3xl text-dark bg-clip-text text-transparent bg-gradient-to-br from-dark to-primary mb-1">
                  {item.count}
                </span>
                <span className="block font-lato font-bold text-sm text-gray-500 uppercase tracking-wider group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  const services = [
    {
      id: "construction",
      title: "General Construction",
      desc: "Quality infrastructure built to last",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white drop-shadow-md transition-all duration-500 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110">
          <path d="M12 2C9.79 2 8 3.79 8 6v1H6c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-2V6c0-2.21-1.79-4-4-4z" />
          <circle cx="12" cy="13" r="2" />
          <path d="M6 20h12v1H6z" />
        </svg>
      ),
    },
    {
      id: "biodigester",
      title: "Biodigester Septic Tanks",
      desc: "Eco-friendly waste management solutions",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white drop-shadow-md transition-all duration-500 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.63 3.34 1.67 4.59L12 20l5.33-6.41C18.37 12.34 19 10.74 19 9c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
          <path d="M8 22h8v-1.5H8z" />
          <path d="M7 20.5h10v-1H7z" />
        </svg>
      ),
    },
    {
      id: "plumbing",
      title: "Plumbing Services",
      desc: "Expert installation & maintenance",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white drop-shadow-md transition-all duration-500 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
          <path d="M15 9h2v6h-2z" transform="rotate(45 16 12)" />
        </svg>
      ),
    },
    {
      id: "cleaning",
      title: "Cleaning Services",
      desc: "Professional sanitation for all spaces",
      icon: (
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white drop-shadow-md transition-all duration-500 relative z-10 group-hover:rotate-[360deg] group-hover:scale-110">
          <path d="M12 1l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.7-6.3 4.7 2.3-7.4-6-4.6h7.6z" />
          <circle cx="18" cy="6" r="1.5" />
          <circle cx="6" cy="18" r="1.5" />
          <path d="M3 3l3 3M21 21l-3-3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-montserrat font-extrabold text-4xl md:text-5xl text-dark mb-6 relative inline-block"
          >
            Our Core Services
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 80, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"
            />
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto mt-8"
          >
            Delivering comprehensive solutions with unmatched expertise and commitment to sustainability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 80, scale: 0.9, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative bg-darker rounded-3xl p-10 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:bg-[#221B1F] shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(254,22,31,0.25)]"
            >
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'><circle cx=\'1\' cy=\'1\' r=\'1\' fill=\'rgba(255,255,255,0.02)\'/></svg>")' }}></div>

              <div className="relative w-24 h-24 mx-auto mb-8 perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-full shadow-[0_8px_20px_rgba(254,22,31,0.3)] transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:from-primary-dark group-hover:to-primary">
                  <div className="absolute inset-0 rounded-full border-2 border-primary opacity-0 group-hover:animate-[pulse-ring_2s_infinite]"></div>
                </div>
                {service.icon}
              </div>

              <h3 className="font-montserrat font-bold text-2xl text-white mb-4 transition-all duration-400 group-hover:text-primary group-hover:translate-x-1 group-hover:text-shadow-glow">
                {service.title}
              </h3>
              <p className="font-lato text-gray-400 mb-8 transition-colors duration-400 group-hover:text-gray-200">
                {service.desc}
              </p>

              <div className="w-0 h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full mb-6 transition-all duration-600 group-hover:w-full group-hover:shadow-[0_0_15px_rgba(254,22,31,0.6)] relative">
                <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[pulse_1s_infinite] transition-opacity duration-300 delay-400"></div>
              </div>

              <div className="inline-flex items-center gap-2 font-lato font-bold text-gray-300 uppercase tracking-wider text-sm transition-all duration-400 group-hover:text-primary group-hover:gap-3">
                <span className="transition-transform duration-400 group-hover:-translate-x-1">Learn More</span>
                <ArrowRight size={18} className="opacity-0 -translate-x-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0 group-hover:animate-[bounce-x_1s_infinite]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const benefits = [
    { title: "Licensed & Certified Professionals", desc: "Fully accredited team meeting international standards" },
    { title: "Latest Eco-Friendly Technologies", desc: "Sustainable biodigester systems for environmental protection" },
    { title: "24/7 Emergency Response", desc: "Round-the-clock availability for urgent sanitation needs" },
    { title: "Transparent Pricing, No Hidden Fees", desc: "Clear quotations and honest cost breakdowns upfront" },
    { title: "Local Expertise, International Standards", desc: "Deep South Sudan knowledge with global quality benchmarks" },
    { title: "Comprehensive Warranty Coverage", desc: "Extended guarantees on all installations and services" },
  ];

  return (
    <section className="py-24 bg-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-50" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(34,27,31,0.02) 10px, rgba(34,27,31,0.02) 20px)" }}></div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="inline-block bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-bold uppercase tracking-widest px-6 py-2 rounded-full mb-6 shadow-[0_4px_15px_rgba(254,22,31,0.3)] relative overflow-hidden"
            >
              <span className="relative z-10">Industry Leader</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shine_3s_infinite]"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -50, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-montserrat font-extrabold text-4xl md:text-5xl text-dark leading-tight mb-8"
            >
              Why Junubin Leads South Sudan's <span className="text-primary relative inline-block">Sanitation Industry<span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark rounded-full"></span></span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-lato text-lg text-gray-600 mb-10 leading-relaxed"
            >
              With over 15 years of excellence, we deliver unmatched expertise in construction, environmental sanitation, and sustainable solutions.
            </motion.p>

            <ul className="space-y-5 mb-10">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -80, filter: "blur(3px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.6 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="group flex items-start gap-5 p-5 bg-white rounded-xl shadow-sm border-l-4 border-transparent hover:border-primary hover:translate-x-2 hover:shadow-md transition-all duration-400 relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-0 bg-gradient-to-r from-primary/5 to-transparent transition-all duration-400 group-hover:w-full"></div>
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md transition-all duration-400 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(254,22,31,0.5)]">
                    <svg className="w-6 h-6 stroke-white stroke-[3] fill-none stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
                      <motion.polyline
                        initial={{ strokeDasharray: 50, strokeDashoffset: 50 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 + i * 0.15 }}
                        points="20 6 9 17 4 12"
                      />
                    </svg>
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-montserrat font-bold text-lg text-dark mb-1 group-hover:text-primary transition-colors">{benefit.title}</h4>
                    <p className="font-lato text-gray-600 group-hover:text-gray-800 transition-colors">{benefit.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-lg px-10 py-4 rounded-full shadow-[0_8px_25px_rgba(254,22,31,0.4)] hover:shadow-[0_12px_35px_rgba(254,22,31,0.6)] hover:-translate-y-1 transition-all duration-400 active:scale-95"
            >
              Request Consultation
            </motion.button>
          </div>

          {/* Right Content - Image Collage */}
          <div className="order-1 lg:order-2 relative h-[400px] lg:h-[600px] perspective-1000">
            {[
              { src: "https://images.unsplash.com/photo-1541888081643-eb709c513266?q=80&w=800&auto=format&fit=crop", title: "Biodigester Installation", pos: "top-0 left-0 w-[45%] h-[55%] z-20", delay: 1.2 },
              { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop", title: "Modern Construction", pos: "top-0 right-0 w-[50%] h-[45%] z-30", delay: 1.35 },
              { src: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=800&auto=format&fit=crop", title: "Plumbing Excellence", pos: "bottom-0 left-0 w-[50%] h-[45%] z-40", delay: 1.5 },
              { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", title: "Sanitation Services", pos: "bottom-0 right-0 w-[45%] h-[55%] z-10", delay: 1.65 },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, rotateX: -25, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: img.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`absolute rounded-2xl overflow-hidden shadow-xl group cursor-pointer ${img.pos}`}
              >
                <div className="absolute inset-0 border-4 border-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-20 pointer-events-none"></div>
                <img src={img.src} alt={img.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-darker/95 to-transparent text-white font-montserrat font-bold text-sm translate-y-full group-hover:translate-y-0 transition-transform duration-400 z-30">
                  {img.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RecentProjects() {
  const projects = [
    { cat: "Biodigester", title: "Juba Medical Center", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { cat: "Construction", title: "Nimule Shopping Complex", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" },
    { cat: "Plumbing", title: "Gudele Estate", img: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop" },
    { cat: "Cleaning", title: "Konyo Konyo Market", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-dark mb-4 inline-block relative">
            Recent Projects
          </h2>
          <p className="text-gray-600 text-lg">Showcasing our commitment to quality and excellence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-2xl overflow-hidden bg-darker aspect-[3/4] cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110 group-hover:brightness-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary-dark/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 z-10">
                <span className="inline-block bg-black/40 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3 border border-white/20">
                  {p.cat}
                </span>
                <h3 className="font-montserrat font-bold text-2xl text-white mb-2 text-shadow-md">{p.title}</h3>
                <div className="flex items-center gap-2 text-white font-bold uppercase text-sm mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                  View Details <ArrowRight size={16} className="group-hover:animate-[bounce-x_1s_infinite]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-darker relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #FE161F 0%, transparent 50%), radial-gradient(circle at 80% 80%, #FC2830 0%, transparent 50%)" }}></div>
      <div className="absolute top-[10%] right-[10%] text-[20rem] font-serif text-primary/5 leading-none pointer-events-none animate-[float_8s_ease-in-out_infinite]">"</div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-white mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <p className="text-gray-400 text-lg">What our partners say about our services.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-dark rounded-3xl p-10 md:p-14 border-l-4 border-primary shadow-[0_20px_60px_rgba(254,22,31,0.2)] relative"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative w-24 h-24 rounded-full border-4 border-primary overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Client" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="font-montserrat font-bold text-2xl text-white">Dr. Sarah Lual</h4>
                <p className="text-primary font-bold">Hospital Director, Juba Medical Center</p>
                <div className="flex gap-1 mt-2 justify-center md:justify-start">
                  {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />)}
                </div>
              </div>
            </div>
            <p className="font-lato text-xl text-gray-300 italic leading-relaxed">
              "Junubin's biodigester installation transformed our facility's waste management system. The team demonstrated exceptional professionalism, delivered on time, and their eco-conscious approach exceeded all our expectations."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 flex">
        <div className="w-[40%] bg-primary"></div>
        <div className="w-[60%] bg-dark"></div>
      </div>
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-white max-w-2xl">
          <h2 className="font-montserrat font-extrabold text-4xl mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl opacity-90">Get expert consultation and a free quote today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-white text-primary font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            Get Quote
          </button>
          <button className="bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-white hover:text-dark transition-colors">
            Call: 0911 459 117
          </button>
        </div>
      </div>
    </section>
  );
}
