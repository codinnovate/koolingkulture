"use client";

import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

// Custom TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const services = [
    "HVAC Installation",
    "System Repairs",
    "Maintenance Plans",
    "Emergency Service",
    "Commercial HVAC",
    "Energy Audits"
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
    { name: "Emergency Service", href: "#contact" },
    { name: "Get Quote", href: "#contact" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/koolingkulture", name: "Facebook" },
    { icon: TikTokIcon, href: "https://tiktok.com/@koolingkulture", name: "TikTok" },
    { icon: Instagram, href: "https://instagram.com/koolingkulture", name: "Instagram" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent mb-2">
                KoolingKulture
              </div>
              <div className="text-gray-400 text-sm">
                Engineering Services
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Professional HVAC solutions for residential and commercial properties. 
              Licensed, insured, and committed to your comfort.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-sky-400" />
                <span className="text-gray-300">(555) 123-HVAC</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-sky-400" />
                <span className="text-gray-300">info@koolingkulture.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-sky-400" />
                <span className="text-gray-300">123 HVAC Street, Your City, ST</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#services" 
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-sky-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Business Hours</h3>
            <div className="space-y-3 mb-6">
              <div className="text-sm">
                <div className="text-gray-300">Monday - Friday</div>
                <div className="text-sky-400 font-medium">7:00 AM - 7:00 PM</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-300">Weekend</div>
                <div className="text-sky-400 font-medium">Emergency Service Only</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-300">Emergency</div>
                <div className="text-sky-400 font-medium">24/7 Available</div>
              </div>
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 KoolingKulture Engineering Services. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-sky-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-sky-400 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-sky-400 transition-colors duration-200">License Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}