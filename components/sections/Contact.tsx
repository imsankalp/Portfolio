'use client';

import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { AnimatedSection } from '@/components/ui';
import { ContactForm } from '@/components/ui/ContactForm';
import { socialLinks } from '@/lib/constants';
import type { SocialLink } from '@/lib/types';

interface ContactProps {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: SocialLink[];
}

/**
 * Contact Section Component
 * 
 * Features:
 * - Contact form with EmailJS integration
 * - Contact information display
 * - Social media links
 * - Responsive two-column layout
 * - Smooth animations
 * - Accessibility features
 */
export function Contact({
  title = "Get In Touch",
  subtitle = "Have a project in mind or want to collaborate? Feel free to reach out!",
  email = "sankalpkumar.singh60@gmail.com",
  phone = "+917839125089",
  location = "Pune, India",
  socialLinks: providedSocialLinks = socialLinks,
}: ContactProps) {
  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-12 md:mb-16">
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <AnimatedSection animation="slide-left" delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Phone
                    </h4>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Location
                    </h4>
                    <p className="text-gray-900 dark:text-white">{location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {providedSocialLinks.map((link) => {
                    const Icon = iconMap[link.platform.toLowerCase() as keyof typeof iconMap];
                    if (!Icon) return null;

                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-110"
                        aria-label={`Visit my ${link.platform} profile`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="slide-right" delay={0.4}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>
              <ContactForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
