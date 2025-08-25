"use client";

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-HVAC",
      subDetails: "24/7 Emergency Line",
      color: "text-sky-600",
      bg: "bg-sky-50"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@koolingkulture.com",
      subDetails: "Response within 24 hours",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "123 HVAC Street",
      subDetails: "Your City, ST 12345",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Mon-Fri: 7AM-7PM",
      subDetails: "Weekend Emergency Service",
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full text-sm font-medium mb-4">
            📞 Get In Touch
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Contact Our HVAC Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to improve your comfort? Get in touch with our certified HVAC professionals 
            for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Request a Quote
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Thank You for Your Inquiry!
                    </h3>
                    <p className="text-gray-600">
                      We&apos;ll contact you within 24 hours to schedule your consultation.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name *</label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone *</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Service Needed</label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger className="border-gray-200 focus:border-sky-500 focus:ring-sky-500">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="installation">New Installation</SelectItem>
                          <SelectItem value="repair">Repair Service</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="emergency">Emergency Service</SelectItem>
                          <SelectItem value="upgrade">System Upgrade</SelectItem>
                          <SelectItem value="commercial">Commercial Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Message</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="border-gray-200 focus:border-sky-500 focus:ring-sky-500 min-h-[120px]"
                        placeholder="Describe your HVAC needs..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white py-4"
                    >
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${info.bg} group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                      <p className="text-gray-900 font-medium">{info.details}</p>
                      <p className="text-sm text-gray-600">{info.subDetails}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Emergency CTA */}
            <Card className="border-0 bg-gradient-to-r from-red-500 to-orange-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-bold mb-2">HVAC Emergency?</h3>
                <p className="text-red-100 text-sm mb-4">
                  We provide 24/7 emergency repair services for urgent HVAC issues.
                </p>
                <Button variant="secondary" size="sm" className="bg-white text-red-600 hover:bg-gray-100">
                  Call Emergency Line
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}