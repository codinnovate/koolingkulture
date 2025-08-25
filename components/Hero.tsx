"use client";

import { ArrowRight, Shield, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                ❄️ Premium HVAC Solutions
              </div>
              <h1 className="text-3xl lg:text-4xl  text-gray-900">
                Expert HVAC <span className="playfair  bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Engineering </span>
                Services 
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional installation, repair, and maintenance of heating, ventilation, and air conditioning systems. 
                Keeping your environment comfortable year-round with cutting-edge solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-2 border-sky-200 text-sky-700 hover:bg-sky-50 px-8 py-4 text-lg transition-all duration-300">
                Emergency Repair
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="w-8 h-8 text-sky-500" />
                </div>
                <div className="font-semibold text-gray-900">Licensed</div>
                <div className="text-sm text-gray-600">& Insured</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Zap className="w-8 h-8 text-sky-500" />
                </div>
                <div className="font-semibold text-gray-900">Fast</div>
                <div className="text-sm text-gray-600">Response</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock className="w-8 h-8 text-sky-500" />
                </div>
                <div className="font-semibold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Emergency</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/8005399/pexels-photo-8005399.jpeg"
                alt="HVAC technician working on air conditioning unit"
                width={600}
                height={600}
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
}