import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-[0_4px_15px_rgba(254,22,31,0.4)]">
                J
              </div>
              <span className="font-montserrat font-bold text-2xl tracking-tight">
                JUNUBIN
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Building sustainable solutions since 2008. Premier construction, plumbing, and environmental sanitation excellence in South Sudan.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(254,22,31,0.4)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {["Home", "Services", "Projects", "About Us", "Contact", "Blog"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-6 relative inline-block">
              Contact Info
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-primary">
                  <MapPin size={18} />
                </div>
                <div className="mt-2">Juba, South Sudan</div>
              </li>
              <li className="flex items-start gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-primary">
                  <Phone size={18} />
                </div>
                <div className="mt-2">0911 459 117</div>
              </li>
              <li className="flex items-start gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-primary">
                  <Mail size={18} />
                </div>
                <div className="mt-2">info@junubinsanitation.com</div>
              </li>
              <li className="flex items-start gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 text-primary">
                  <Clock size={18} />
                </div>
                <div className="mt-2">Always Open - 24/7 Emergency</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 Junubin Sanitation Services | All Rights Reserved</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
