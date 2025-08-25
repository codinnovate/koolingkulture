"use client";

import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Portfolio() {
  const projects = [
    {
      title: "Downtown Office Complex",
      location: "Business District",
      date: "2024",
      description: "Complete HVAC system installation for 50,000 sq ft office complex with smart automation.",
      image: "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg",
      category: "Commercial Installation",
      features: ["Smart Controls", "Energy Efficient", "Zone Management"]
    },
    {
      title: "Luxury Residential Estate",
      location: "Suburban Hills",
      date: "2023",
      description: "High-end residential HVAC system with advanced air purification and climate control.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      category: "Residential Installation",
      features: ["Air Purification", "Smart Thermostats", "Quiet Operation"]
    },
    {
      title: "Manufacturing Facility",
      location: "Industrial Zone",
      date: "2023",
      description: "Industrial-grade ventilation and cooling system for 100,000 sq ft manufacturing plant.",
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg",
      category: "Industrial HVAC",
      features: ["Heavy Duty", "Air Quality Control", "24/7 Operation"]
    },
    {
      title: "Medical Center Upgrade",
      location: "Healthcare District",
      date: "2024",
      description: "Hospital-grade HVAC system upgrade with advanced filtration and redundant systems.",
      image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
      category: "Healthcare HVAC",
      features: ["HEPA Filtration", "Backup Systems", "Compliance Ready"]
    },
    {
      title: "Retail Shopping Center",
      location: "City Center",
      date: "2023",
      description: "Multi-zone HVAC installation for shopping center with energy optimization.",
      image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
      category: "Retail HVAC",
      features: ["Multi-Zone", "Energy Savings", "Customer Comfort"]
    },
    {
      title: "School District Project",
      location: "Education Campus",
      date: "2024",
      description: "Complete HVAC renovation for multiple school buildings with improved air quality.",
      image: "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg",
      category: "Educational HVAC",
      features: ["Air Quality", "Energy Efficient", "Quiet Systems"]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
            🏗️ Our Work
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our recent HVAC projects across residential, commercial, and industrial sectors. 
            Each project showcases our commitment to excellence and innovation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white overflow-hidden">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={192}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your HVAC Project?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied customers. Get a custom quote for your HVAC needs today.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4">
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}