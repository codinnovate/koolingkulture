"use client";

import { Thermometer, Wrench, Settings, ShieldCheck, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Services() {
  const services = [
    {
      icon: Thermometer,
      title: "AC Installation",
      description: "Complete system installation for residential and commercial properties with energy-efficient solutions.",
      features: ["New system design", "Energy efficiency analysis", "Professional installation", "System testing"],
      gradient: "from-sky-500 to-blue-600"
    },
    {
      icon: Wrench,
      title: "Repair & Maintenance",
      description: "Expert repair services and preventive maintenance to keep your systems running optimally.",
      features: ["Emergency repairs", "Preventive maintenance", "Parts replacement", "System diagnostics"],
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Settings,
      title: "System Upgrades",
      description: "Modernize your existing HVAC systems with the latest technology and smart controls.",
      features: ["Smart thermostat installation", "System modernization", "Efficiency upgrades", "Automation setup"],
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: ShieldCheck,
      title: "Commercial HVAC",
      description: "Comprehensive HVAC solutions for commercial buildings, offices, and industrial facilities.",
      features: ["Large-scale installations", "Building automation", "Energy management", "Compliance consulting"],
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Zap,
      title: "Emergency Service",
      description: "24/7 emergency repair services to restore comfort when you need it most.",
      features: ["24/7 availability", "Rapid response", "Emergency repairs", "Priority scheduling"],
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "Maintenance Plans",
      description: "Comprehensive maintenance plans to extend system life and prevent costly breakdowns.",
      features: ["Regular inspections", "Filter replacements", "Performance optimization", "Priority service"],
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
            🔧 Professional Services
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Complete HVAC Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From installation to emergency repairs, we provide comprehensive HVAC services 
            to keep your environment comfortable and energy-efficient.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-sky-600 transition-colors duration-300">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-200 hover:border-sky-500 hover:text-sky-600 transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need HVAC Service Today?</h3>
            <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
              Our certified technicians are ready to help with all your heating and cooling needs. 
              Get a free estimate for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-gray-50 px-8 py-3">
                Get Free Quote
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-3">
                Call (555) 123-HVAC
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}