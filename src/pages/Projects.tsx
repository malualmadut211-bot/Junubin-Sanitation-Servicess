import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { X, ZoomIn, ChevronLeft, ChevronRight, MapPin, Calendar, ArrowRight, CheckCircle } from "lucide-react";

// Mock Data
const projectsData = [
  { id: 1, title: "Juba Central Hospital", category: "Construction", location: "Juba", date: "Oct 2025", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop", size: "large", client: "Ministry of Health", duration: "18 months", budget: "$2.5M", team: "45 people", desc: "Complete construction of the new wing including specialized plumbing and sanitation facilities.", outcomes: ["Completed 2 months ahead of schedule", "Zero safety incidents", "LEED Silver equivalent"] },
  { id: 2, title: "Green Valley Farm", category: "Biodigester", location: "Yei Road", date: "Mar 2026", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop", size: "medium", client: "Private Enterprise", duration: "3 months", budget: "$150K", team: "12 people", desc: "Installation of a high-capacity commercial biodigester to handle agricultural waste and produce biogas.", outcomes: ["100% waste recycling", "Produces 50% of farm's energy needs", "Eliminated odor issues"] },
  { id: 3, title: "Nile View Apartments", category: "Plumbing", location: "Riverside", date: "Jan 2026", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", size: "small", client: "Nile Developers", duration: "6 months", budget: "$400K", team: "20 people", desc: "Complete plumbing infrastructure for a 5-story luxury apartment complex.", outcomes: ["High-pressure water system", "Smart leak detection installed", "Premium fixture fitting"] },
  { id: 4, title: "Ministry Complex", category: "Cleaning", location: "Ministries Road", date: "Ongoing", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop", size: "large", client: "Government", duration: "Annual Contract", budget: "Confidential", team: "30 people", desc: "Comprehensive daily cleaning and deep sanitation services for the main government complex.", outcomes: ["Maintained 5-star hygiene rating", "Eco-friendly products used exclusively", "24/7 standby team"] },
  { id: 5, title: "Munuki School", category: "Biodigester", location: "Munuki", date: "Nov 2025", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=800&auto=format&fit=crop", size: "medium", client: "NGO Partner", duration: "2 months", budget: "$80K", team: "8 people", desc: "Sanitation upgrade for a local school serving 800 students, replacing traditional latrines with a biodigester.", outcomes: ["Improved student health metrics", "Zero maintenance required for 5 years", "Educational biogas kitchen installed"] },
  { id: 6, title: "Commercial Hub", category: "Construction", location: "Custom Market", date: "Aug 2025", image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", size: "small", client: "Custom Traders Assoc.", duration: "12 months", budget: "$1.2M", team: "60 people", desc: "Construction of a modern multi-level commercial trading center.", outcomes: ["Accommodates 200+ vendors", "Integrated modern drainage", "Fire-safe construction"] },
  { id: 7, title: "Airport Road Hotel", category: "Plumbing", location: "Airport Road", date: "Feb 2026", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop", size: "medium", client: "Hospitality Group", duration: "4 months", budget: "$300K", team: "15 people", desc: "Emergency overhaul and upgrade of hotel plumbing systems without disrupting operations.", outcomes: ["Zero downtime for guests", "Water efficiency improved by 30%", "New boiler system installed"] },
  { id: 8, title: "UN Compound", category: "Cleaning", location: "Tongping", date: "Ongoing", image: "https://images.unsplash.com/photo-1628177142898-93e46e48dc0c?q=80&w=800&auto=format&fit=crop", size: "small", client: "UN Agency", duration: "2 Year Contract", budget: "Confidential", team: "25 people", desc: "Specialized deep cleaning and sanitization protocols meeting international health standards.", outcomes: ["Passed all international audits", "Specialized COVID-19 protocols", "Rapid response team deployed"] },
  { id: 9, title: "Residential Villa", category: "Construction", location: "Hai Cinema", date: "Dec 2025", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", size: "large", client: "Private Client", duration: "9 months", budget: "$600K", team: "20 people", desc: "Turnkey construction of a luxury residential villa including all sanitation and plumbing.", outcomes: ["Custom architectural design", "Integrated smart home features", "Premium finishing"] },
];

const categories = ["All", "Construction", "Biodigester", "Plumbing", "Cleaning"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  // Filter Logic with Animation Delay
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      if (activeFilter === "All") {
        setFilteredProjects(projectsData);
      } else {
        setFilteredProjects(projectsData.filter(p => p.category === activeFilter));
      }
      setIsFiltering(false);
    }, 400); // Wait for exit animation
    return () => clearTimeout(timer);
  }, [activeFilter]);

  // Parallax transforms for Hero
  const yOdd = useTransform(scrollY, [0, 1000], [0, 150]);
  const yEven = useTransform(scrollY, [0, 1000], [0, 300]);

  const openModal = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Lock scroll
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Unlock scroll
  };

  const navigateProject = (direction: 'next' | 'prev') => {
    if (!selectedProject) return;
    const currentIndex = filteredProjects.findIndex(p => p.id === selectedProject.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredProjects.length;
    } else {
      newIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    }
    setSelectedProject(filteredProjects[newIndex]);
  };

  return (
    <div className="min-h-screen bg-[#1A1416] font-roboto overflow-hidden">
      
      {/* 1. PROJECTS HERO SECTION */}
      <section ref={heroRef} className="relative w-full h-[70vh] min-h-[600px] pt-24 overflow-hidden bg-[#1A1416]">
        {/* Mosaic Grid */}
        <div className="absolute inset-0 flex flex-wrap gap-2 p-2 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards]">
          {/* Top Row */}
          <motion.div style={{ y: yOdd }} className="w-[calc(40%-4px)] h-[calc(50%-4px)] relative rounded-xl overflow-hidden group">
            <img src={projectsData[0].image} className="w-full h-full object-cover filter grayscale-[60%] brightness-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221B1F]/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
            <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
              <h2 className="font-montserrat font-black text-white text-2xl md:text-3xl drop-shadow-lg">{projectsData[0].title}</h2>
            </div>
          </motion.div>
          
          <motion.div style={{ y: yEven }} className="w-[calc(20%-4px)] h-[calc(50%-4px)] relative rounded-xl overflow-hidden group">
             <img src={projectsData[1].image} className="w-full h-full object-cover filter grayscale-[60%] brightness-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#221B1F]/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
          </motion.div>

          <motion.div style={{ y: yOdd }} className="w-[calc(40%-4px)] h-[calc(50%-4px)] relative rounded-xl overflow-hidden group">
             <img src={projectsData[8].image} className="w-full h-full object-cover filter grayscale-[60%] brightness-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#221B1F]/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
             <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
              <h2 className="font-montserrat font-black text-white text-2xl md:text-3xl drop-shadow-lg">{projectsData[8].title}</h2>
            </div>
          </motion.div>

          {/* Bottom Row */}
          <motion.div style={{ y: yEven }} className="w-[calc(30%-4px)] h-[calc(50%-4px)] relative rounded-xl overflow-hidden group">
             <img src={projectsData[3].image} className="w-full h-full object-cover filter grayscale-[60%] brightness-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#221B1F]/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
          </motion.div>

          <motion.div style={{ y: yOdd }} className="w-[calc(40%-4px)] h-[calc(50%-4px)] relative rounded-xl overflow-hidden group">
             <img src={projectsData[4].image} className="w-full h-full object-cover filter grayscale-[60%] brightness-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#221B1F]/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
             <div className="absolute bottom-6 left-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
              <h2 className="font-montserrat font-black text-white text-2xl md:text-3xl drop-shadow-lg">{projectsData[4].title}</h2>
            </div>
          </motion.div>

          <motion.div style={{ y: yEven }} className="w-[calc(30%-4px)] h-[calc(50%-4px)] relative rounded-xl overflow-hidden group">
             <img src={projectsData[6].image} className="w-full h-full object-cover filter grayscale-[60%] brightness-80 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#221B1F]/80 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-400" />
          </motion.div>
        </div>

        {/* Filter Tab Overlay */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-[#221B1F]/85 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex overflow-x-auto hide-scrollbar"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-6 py-3 rounded-full font-montserrat font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                  activeFilter === cat 
                    ? 'text-white bg-primary shadow-[0_6px_20px_rgba(254,22,31,0.4)]' 
                    : 'text-gray-400 hover:text-primary hover:bg-primary/10'
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  />
                )}
                {/* Count Badge */}
                {activeFilter === cat && (
                  <motion.span 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white text-primary rounded-full flex items-center justify-center text-xs font-bold shadow-md"
                  >
                    {cat === "All" ? projectsData.length : projectsData.filter(p => p.category === cat).length}
                  </motion.span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. PROJECT GRID */}
      <section className="py-20 px-6 md:px-16 max-w-[1920px] mx-auto min-h-screen">
        
        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && !isFiltering && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse">
                <X className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-8">Try selecting a different category.</p>
              <button onClick={() => setActiveFilter("All")} className="px-8 py-3 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-bold">
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {!isFiltering && filteredProjects.map((project, i) => {
              // Determine height based on size property
              const heightClass = project.size === 'large' ? 'h-[560px]' : project.size === 'medium' ? 'h-[420px]' : 'h-[320px]';
              
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.85, rotateY: 90, y: 30 }}
                  transition={{ duration: 0.6, delay: i * 0.05, type: "spring", bounce: 0.4 }}
                  className={`relative w-full ${heightClass} rounded-xl overflow-hidden cursor-pointer group break-inside-avoid perspective-1000`}
                  onClick={() => openModal(project)}
                >
                  {/* Image Layer */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 origin-center">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:brightness-110" loading="lazy" />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1416]/90 via-[#1A1416]/40 to-transparent opacity-80 group-hover:opacity-95 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-400" />

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1.5 rounded-full font-montserrat font-bold text-xs tracking-wider shadow-[0_4px_12px_rgba(254,22,31,0.4)] group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-400">
                    {project.category}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="font-montserrat font-black text-white text-2xl leading-tight mb-3 drop-shadow-lg group-hover:text-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-white/80 text-sm font-medium mb-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-100">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" /> {project.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" /> {project.date}</span>
                    </div>

                    <button className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400 delay-200 hover:bg-[#FF2F38] shadow-[0_0_20px_rgba(254,22,31,0.5)]">
                      View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Hover Border Accent */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/60 rounded-xl transition-colors duration-500 pointer-events-none" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. PROJECT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-[#1A1416]/95"
              onClick={closeModal}
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50, transition: { duration: 0.3 } }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1600px] h-[90vh] max-h-[1000px] bg-[#221B1F] rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
            >
              {/* Header Bar */}
              <div className="h-20 bg-gradient-to-b from-[#1A1416] to-transparent sticky top-0 z-50 backdrop-blur-md flex items-center justify-between px-8">
                <button onClick={closeModal} className="text-white/60 hover:text-primary font-montserrat font-bold text-sm tracking-wider flex items-center gap-2 transition-colors">
                  <ChevronLeft className="w-5 h-5" /> BACK TO PROJECTS
                </button>
                <h2 className="font-montserrat font-black text-white text-xl hidden md:block">{selectedProject.title}</h2>
                <button onClick={closeModal} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:rotate-90 transition-all duration-300">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
                
                {/* Main Image Area (70%) */}
                <div className="w-full lg:w-[70%] h-[50vh] lg:h-full p-4 lg:p-8 flex flex-col">
                  <div className="relative flex-grow bg-black rounded-2xl overflow-hidden group">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain filter contrast-105" />
                    
                    {/* Controls Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 bg-black/50 hover:bg-primary rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-colors">
                        <ZoomIn className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Strip (Mocked) */}
                  <div className="h-28 mt-4 flex gap-3 overflow-x-auto hide-scrollbar snap-x px-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer snap-center transition-all duration-300 ${i === 1 ? 'border-2 border-primary scale-105 shadow-[0_0_20px_rgba(254,22,31,0.4)]' : 'opacity-60 filter grayscale-[50%] hover:opacity-100 hover:grayscale-0 hover:scale-105'}`}>
                        <img src={selectedProject.image} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar Info (30%) */}
                <div className="w-full lg:w-[30%] h-full overflow-y-auto p-8 custom-scrollbar bg-[#1A1416]/50">
                  <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <h1 className="font-montserrat font-black text-4xl text-white leading-tight mb-4">{selectedProject.title}</h1>
                    <div className="flex items-center gap-3 font-montserrat font-bold text-sm mb-8">
                      <span className="text-primary">{selectedProject.category}</span>
                      <span className="text-white/30">|</span>
                      <span className="text-white/80 flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedProject.location}</span>
                    </div>

                    <div className="h-px w-full bg-white/10 mb-8" />

                    <h3 className="font-montserrat font-bold text-xs text-white/50 tracking-[2px] mb-6">DETAILS</h3>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3 text-white/90 font-medium"><span className="text-primary font-bold w-24 shrink-0">Client:</span> {selectedProject.client}</li>
                      <li className="flex items-start gap-3 text-white/90 font-medium"><span className="text-primary font-bold w-24 shrink-0">Duration:</span> {selectedProject.duration}</li>
                      <li className="flex items-start gap-3 text-white/90 font-medium"><span className="text-primary font-bold w-24 shrink-0">Budget:</span> {selectedProject.budget}</li>
                      <li className="flex items-start gap-3 text-white/90 font-medium"><span className="text-primary font-bold w-24 shrink-0">Team:</span> {selectedProject.team}</li>
                    </ul>

                    <div className="h-px w-full bg-white/10 mb-8" />

                    <h3 className="font-montserrat font-bold text-xs text-white/50 tracking-[2px] mb-6">DESCRIPTION</h3>
                    <p className="text-white/80 leading-relaxed mb-8">
                      {selectedProject.desc}
                    </p>

                    <h3 className="font-montserrat font-bold text-xs text-white/50 tracking-[2px] mb-6">KEY OUTCOMES</h3>
                    <ul className="space-y-3 mb-10">
                      {selectedProject.outcomes.map((outcome: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-white/90 text-sm">
                          <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="w-full bg-primary hover:bg-[#FF2F38] text-white font-montserrat font-bold py-4 rounded-xl transition-colors shadow-[0_10px_30px_rgba(254,22,31,0.3)]">
                      Request Similar Project
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-50 hidden lg:flex">
                <button onClick={() => navigateProject('prev')} className="pointer-events-auto w-14 h-14 bg-black/50 hover:bg-primary rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 border border-white/10">
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button onClick={() => navigateProject('next')} className="pointer-events-auto w-14 h-14 bg-black/50 hover:bg-primary rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 border border-white/10">
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Styles for custom scrollbar in modal */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FE161F; border-radius: 10px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
