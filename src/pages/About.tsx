import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Target, Eye, Heart, Linkedin, Mail, Phone, Award, CheckCircle, 
  Users, Building, Briefcase, Globe, X
} from "lucide-react";

// --- Helper Components ---

const StatCounter = ({ target, suffix, label, icon: Icon }: any) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(target * easeOutQuart));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      requestAnimationFrame(updateCounter);
    }
  }, [inView, target]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = inView ? 0 : circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div 
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", duration: 1.5 }}
        className="w-20 h-20 mb-8 bg-gradient-to-br from-[#FE161F] to-[#C41118] rounded-full flex items-center justify-center relative"
      >
        <div className="absolute -inset-2 border-2 border-primary/30 rounded-full animate-[ping_2s_ease-out_infinite]" />
        <Icon className="w-10 h-10 text-white" />
      </motion.div>

      <div className="relative w-[200px] h-[200px] mb-6">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <motion.circle 
            cx="100" cy="100" r={radius} fill="none" stroke="#FE161F" strokeWidth="8" strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 10px rgba(254,22,31,0.5))" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-4xl font-bold text-white leading-none flex items-baseline">
            {count.toLocaleString()}
            <span className="text-3xl text-primary font-semibold ml-1">{suffix}</span>
          </div>
        </div>
      </div>
      <p className="text-white/80 font-montserrat font-medium text-lg text-center">{label}</p>
    </div>
  );
};

const TeamCard = ({ member }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ opacity: 0, background: "" });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({
      opacity: 1,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`
    });
  };

  const handleMouseLeave = () => {
    setTransform(`perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`);
    setGlare({ opacity: 0, background: "" });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-white rounded-2xl p-8 shadow-lg transition-transform duration-200 ease-out preserve-3d group cursor-pointer border border-gray-100"
      style={{ transform }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-overlay transition-opacity duration-300 z-20" style={glare} />
      
      <div className="relative z-10 translate-z-[40px]">
        <div className="relative w-40 h-40 mx-auto mb-6 translate-z-[60px]">
          <div className="absolute -inset-2 rounded-full border-4 border-primary opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 animate-[spin_10s_linear_infinite]" />
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover rounded-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        
        <div className="text-center">
          <h3 className="font-montserrat font-bold text-xl text-[#221B1F] mb-1">{member.name}</h3>
          <p className="text-primary font-medium text-sm mb-4">{member.role}</p>
          <p className="text-gray-500 text-sm mb-6">{member.bio}</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30 rounded-b-2xl flex justify-center gap-4">
        {[Linkedin, Mail, Phone].map((Icon, i) => (
          <a key={i} href="#" className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-500 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
            <Icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default function About() {
  const { scrollYProgress } = useScroll();
  const [certModal, setCertModal] = useState<any>(null);

  const timelineData = [
    { year: "2008", title: "Foundation", desc: "Founded by local entrepreneurs passionate about sanitation." },
    { year: "2010", title: "First Major Contract", desc: "Secured our first government contract for urban sanitation." },
    { year: "2013", title: "Expansion", desc: "Expanded services to include general construction." },
    { year: "2016", title: "Innovation", desc: "Introduced Biodigester technology to South Sudan." },
    { year: "2020", title: "ISO Certification", desc: "Achieved international standards for quality management." },
    { year: "2024", title: "Market Leader", desc: "Recognized as the leading environmental solutions provider." }
  ];

  const team = [
    { name: "Dr. John Makuei", role: "CEO & Founder", bio: "Visionary leader with 20+ years in environmental engineering.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop" },
    { name: "Sarah Nyuon", role: "Chief Operations Officer", bio: "Expert in large-scale project management and logistics.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop" },
    { name: "David Deng", role: "Head of Construction", bio: "Certified civil engineer overseeing all major builds.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop" },
    { name: "Grace Akol", role: "Sustainability Director", bio: "Leading our green initiatives and biodigester programs.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden font-roboto">
      {/* HERO INTRO AREA */}
      <section className="pt-40 pb-24 px-6 md:px-20 max-w-[1400px] mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-montserrat font-bold text-4xl md:text-6xl lg:text-7xl text-[#221B1F] leading-tight mb-6">
            Building South Sudan's <br/>
            <span className="text-primary relative inline-block">
              Future Since 2008
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 h-2 bg-primary rounded-full opacity-30"
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a team of dedicated professionals committed to excellence in sanitation, construction, and environmental sustainability.
          </p>
        </motion.div>
      </section>

      {/* HORIZONTAL TIMELINE */}
      <section className="py-24 bg-gray-50 relative overflow-hidden hidden md:block">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative">
          <div className="relative h-[400px] flex items-center">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 h-1 bg-gray-200 top-1/2 -translate-y-1/2" />
            <motion.div 
              className="absolute left-0 h-1 bg-primary top-1/2 -translate-y-1/2 origin-left"
              style={{ scaleX: scrollYProgress }}
            />

            {/* Nodes and Cards */}
            <div className="relative w-full flex justify-between items-center z-10">
              {timelineData.map((item, i) => {
                const isTop = i % 2 !== 0;
                return (
                  <div key={i} className="relative flex flex-col items-center group">
                    {/* Node */}
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-primary relative z-20 group-hover:scale-150 transition-transform duration-300 shadow-[0_0_15px_rgba(254,22,31,0.5)]">
                      <div className="absolute -inset-2 rounded-full border-2 border-primary opacity-0 group-hover:opacity-100 group-hover:animate-[ping_1.5s_ease-out_infinite]" />
                    </div>

                    {/* Card */}
                    <motion.div 
                      initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`absolute w-[280px] bg-white p-6 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-primary/30 ${isTop ? 'bottom-12' : 'top-12'}`}
                    >
                      <div className="bg-gray-100 text-primary font-bold px-4 py-1 rounded-full inline-block mb-4 text-sm group-hover:bg-primary group-hover:text-white transition-colors">{item.year}</div>
                      <h4 className="font-montserrat font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group perspective-1000">
              <div className="absolute -top-10 -left-10 w-32 h-32 border-t-4 border-l-4 border-primary animate-[pulse_3s_ease-in-out_infinite]" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b-4 border-r-4 border-primary animate-[pulse_3s_ease-in-out_infinite_1.5s]" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-square rounded-full overflow-hidden border-8 border-primary shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                  alt="Dr. John Makuei" 
                  className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Meet Our Founder</div>
                <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-[#221B1F] mb-2">Dr. John Makuei</h2>
                <p className="text-xl text-gray-500 mb-8">CEO & Visionary Leader</p>
                
                <div className="space-y-6 text-gray-600 leading-relaxed mb-10">
                  <p>
                    "When we started Junubin in 2008, our goal was simple: to create a cleaner, safer, and more sustainable environment for the people of South Sudan. Today, that vision has grown into a multi-disciplinary enterprise."
                  </p>
                  <p>
                    We believe that true development starts with foundational infrastructure and proper sanitation. By introducing innovative technologies like Biodigester systems, we are not just building structures; we are building a healthier future.
                  </p>
                </div>

                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                  <a href="#" className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "OUR MISSION", icon: Target, text: "To provide sustainable and innovative solutions in construction and sanitation that improve the quality of life and protect the environment in South Sudan." },
              { title: "OUR VISION", icon: Eye, text: "To be the leading and most trusted infrastructure and environmental services company in East Africa, setting standards for quality and sustainability." },
              { title: "OUR VALUES", icon: Heart, text: "Integrity in all we do. Excellence in our delivery. Innovation in our solutions. Commitment to our community and environment." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2, type: "spring" }}
                className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-primary relative group overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 group-hover:scale-150 transition-all duration-700">
                  <item.icon className="w-64 h-64 text-primary" />
                </div>
                <item.icon className="w-12 h-12 text-primary mb-6 relative z-10" />
                <h3 className="font-montserrat font-bold text-2xl mb-4 relative z-10">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{item.text}</p>
                <div className="w-12 h-1 bg-gray-200 mt-8 group-hover:w-full group-hover:bg-primary transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-32 relative bg-white overflow-hidden">
        {/* Background Particles (Simulated with CSS for simplicity) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(254,22,31,0.1)_1px,transparent_1px)] bg-[length:40px_40px]" />
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-montserrat font-bold text-4xl md:text-5xl text-[#221B1F] mb-4">The Experts Behind Junubin</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A multidisciplinary team of engineers, environmentalists, and project managers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TeamCard member={member} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS & PARTNERSHIPS */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="text-center mb-16 relative z-20">
          <h2 className="font-montserrat font-bold text-3xl text-[#221B1F]">Certifications & Partners</h2>
        </div>

        <div className="flex gap-16 animate-[marqueeScroll_30s_linear_infinite] hover:[animation-play-state:paused] w-max px-10">
          {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((item, i) => (
            <div 
              key={i} 
              className="w-[200px] h-[120px] bg-white rounded-xl shadow-md flex items-center justify-center p-6 cursor-pointer group hover:-translate-y-2 hover:shadow-xl hover:border-primary border border-transparent transition-all duration-300 relative overflow-hidden"
              onClick={() => setCertModal({
                title: `ISO ${9000 + item} Certification`,
                issuer: "Global Standards Board",
                date: "Jan 2024",
                description: "Certified for exceptional quality management and environmental safety standards in construction and sanitation.",
                image: `https://images.unsplash.com/photo-1614036417651-1d451f0f87b1?q=80&w=400&auto=format&fit=crop&sig=${item}`
              })}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Award className="w-16 h-16 text-gray-300 group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* COMPANY STATS SECTION */}
      <section className="relative min-h-[600px] flex items-center py-24 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2560&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-[120%] object-cover -translate-y-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 to-primary/40" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_20px)] animate-[patternMove_20s_linear_infinite]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <StatCounter target={1500} suffix="+" label="Projects Completed" icon={Building} />
            <StatCounter target={50} suffix="+" label="Expert Staff" icon={Users} />
            <StatCounter target={15} suffix="" label="Years Experience" icon={Briefcase} />
            <StatCounter target={100} suffix="%" label="Client Satisfaction" icon={CheckCircle} />
          </div>
        </div>
      </section>

      {/* Cert Modal */}
      <AnimatePresence>
        {certModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setCertModal(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <button onClick={() => setCertModal(null)} className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <div className="h-48 relative bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={certModal.image} alt="Cert" className="w-full h-full object-cover opacity-50 blur-sm" />
                <Award className="absolute w-24 h-24 text-primary drop-shadow-lg" />
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="font-montserrat font-bold text-2xl mb-2">{certModal.title}</h2>
                <p className="text-primary font-medium mb-2">Issued by: {certModal.issuer}</p>
                <p className="text-gray-500 text-sm mb-6">Date: {certModal.date}</p>
                <p className="text-gray-700 leading-relaxed mb-8">{certModal.description}</p>
                
                <button className="w-full bg-gray-100 hover:bg-primary hover:text-white text-[#221B1F] font-bold py-3 rounded-lg transition-colors">
                  Download Certificate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
