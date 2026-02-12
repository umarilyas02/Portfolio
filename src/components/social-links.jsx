'use client';

import { Instagram, Linkedin, Facebook } from 'lucide-react';

const SocialLinks = () => {
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
    <div className="fixed right-8 bottom-8 flex flex-col gap-4 z-40">
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
            <div className="relative w-12 h-12 rounded-full bg-transparent border-2 border-gray-600 flex items-center justify-center transition-all duration-300 group-hover:border-transparent">
              {/* Premium glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`} />
              
              {/* Solid glow background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${social.color} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              
              {/* Icon */}
              <Icon className="relative z-10 w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
            </div>

            {/* Tooltip on hover */}
            <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-700">
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${social.color}`}>
                @{social.username}
              </span>
              <div className={`absolute left-full top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45`} />
            </div>

            {/* Premium shadow effect */}
            <div className={`absolute inset-0 rounded-full shadow-lg ${social.hoverColor} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
