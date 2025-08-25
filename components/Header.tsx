"use client";

import { useState } from 'react';
import { Menu, X, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Cart from '@/components/Cart';
import Logo from '@/components/Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm text-gray-600 border-b border-gray-50">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href='tel:+2348141237253'>+2348141237253</a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@koolingkulture.com</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <a href="https://instagram.com/koolingkulture" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-600 transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com/koolingkulture" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-600 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://tiktok.com/@koolingkulture" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-600 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <Cart />
            <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2 transition-all duration-300">
              Get Quote
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-sky-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Cart />
              </div>
              <Button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white w-full mt-4">
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}