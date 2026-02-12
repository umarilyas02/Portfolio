'use client';

import { Instagram, Linkedin, Facebook } from 'lucide-react';

const SocialLinksHorizontal = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/umarilyas02',
      icon: Instagram,
      color: 'from-pink-600 to-rose-600',
      hoverColor: 'hover:shadow-pink-500/50',
      username: 'umarilyas02'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/umarilyas02',
      icon: Linkedin,
      color: 'from-blue-600 to-cyan-600',
      hoverColor: 'hover:shadow-blue-500/50',
      username: 'umarilyas02'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/umarilyas02',
      icon: Facebook,
      color: 'from-blue-700 to-indigo-600',
      hoverColor: 'hover:shadow-blue-600/50',
      username: 'umarilyas02'
    }
  ];

  return (
    <div className="flex gap-6 justify-center items-center">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            title={`${social.name} - @${social.username}`}
          >
            {/* Transparent background with border */}
            <div className="relative w-12 h-12 rounded-full bg-transparent border-2 border-gray-600 flex items-center justify-center transition-all duration-300 group-hover:border-transparent md:group-hover:border-transparent md:group-hover:opacity-100 md:opacity-100 opacity-100 md:!opacity-100">
              {/* Premium glow on hover - Desktop */}
              <div className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md hidden md:block`} />
              
              {/* Mobile glow animation */}
              <div className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-full opacity-50 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 blur-lg md:group-hover:blur-md`} />
              
              {/* Solid glow background on hover */}
              <div className={`absolute inset-0 bg-linear-to-r ${social.color} rounded-full opacity-15 md:opacity-0 md:group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Icon with mobile animation */}
              <Icon className="relative z-10 w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 md:group-hover:text-white social-icon-mobile md:animate-none" />
            </div>

            {/* Premium shadow effect */}
            <div className={`absolute inset-0 rounded-full shadow-lg ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinksHorizontal;
