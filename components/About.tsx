"use client";

import { Award, Users, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function About() {
  const stats = [
    {
      icon: Award,
      number: "15+",
      label: "Years Experience",
      color: "text-sky-600"
    },
    {
      icon: Users,
      number: "500+",
      label: "Happy Customers",
      color: "text-green-600"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Emergency Service",
      color: "text-orange-600"
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Success Rate",
      color: "text-purple-600"
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium">
                🏆 Industry Leaders
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Expert HVAC Engineers
                <span className="block text-sky-600">You Can Trust</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At KoolingKulture Engineering Services, we bring over 15 years of expertise in HVAC systems 
                design, installation, and maintenance. Our certified engineers and technicians are committed 
                to delivering exceptional service and innovative solutions.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Why Choose KoolingKulture?</h3>
              <div className="space-y-3">
                {[
                  "Licensed and insured professional technicians",
                  "State-of-the-art diagnostic and repair equipment",
                  "Energy-efficient solutions that save money",
                  "Comprehensive warranties on all work performed",
                  "24/7 emergency service availability",
                  "Transparent pricing with no hidden fees"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image and Stats */}
          <div className="space-y-8">
            <div className="relative">
              <Image
                src="https://images.pexels.com/photos/5691636/pexels-photo-5691636.jpeg"
                alt="Professional HVAC team at work"
                width={600}
                height={384}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 mb-4`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}