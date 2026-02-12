
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import Button from './button';

const CertificationsSection = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const defaultCertifications = [
      {
        name: 'Full Stack Developer',
        issuer: 'Udemy',
        issueDate: 'January 2026',
        credentialUrl: 'https://www.udemy.com/certificate/UC-1f8f7e4e-2377-4bfb-a055-292f38104350/',
        icon: '',
        badgeLogos: [
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', alt: 'PostgreSQL' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', alt: 'Express', invert: true },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React' },
          { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', alt: 'Node.js' },
        ],
        tech: ['Next.js', 'Tailwind CSS', 'Bootstrap', 'MUI', 'MongoDB', 'MySQL', 'PostgreSQL', 'Prisma', 'Zod', 'Docker', 'RTK']
      },
      {
        name: 'Frontend React Developer Intern',
        issuer: 'DevelopersHub Corp',
        issueDate: 'September 2025',
        credentialUrl: 'https://drive.google.com/file/d/1Dm_er2FlNbee4MNTeuwNNMNPkBtn6jK6/view',
        icon: '⚛️',
        tech: ['React.js', 'TypeScript', 'Firebase', 'WebRTC']
      },
      {
        name: 'Graphic Design',
        issuer: 'Global Tech Sialkot',
        issueDate: 'March 2025',
        credentialUrl: '#',
        icon: '🎨',
        tech: ['Photoshop', 'Illustrator']
      },
      {
        name: 'Office Management',
        issuer: 'Global Tech Sialkot',
        issueDate: 'March 2022',
        credentialUrl: '#',
        icon: '📊',
        tech: ['Excel', 'Word', 'PowerPoint']
      },
    ];

    setCertifications(defaultCertifications);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="h-96 bg-black flex items-center justify-center">
        <div className="text-white">Loading certifications...</div>
      </div>
    );
  }

  return (
    <section id="certifications" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-950 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-indigo-900/10 via-transparent to-transparent opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
          <p className="text-gray-400 text-lg">
            Continuously learning and earning industry-recognized credentials
          </p>
        </div>

        {certifications.length > 0 ? (
          <div className="flex overflow-x-auto space-x-4 md:space-x-0 md:flex md:flex-row md:gap-6 md:overflow-x-auto snap-x snap-mandatory items-stretch pb-2 custom-scrollbar">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="min-w-[85%] md:min-w-0 group relative bg-linear-to-br from-gray-900 to-gray-950 border border-indigo-200 rounded-lg p-6 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 snap-start flex-shrink-0 flex flex-col"
              >
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{cert.icon}</div>
                      {cert.badgeLogos && (
                        <div className="flex items-center gap-1.5 mt-1">
                          {cert.badgeLogos.map((logo) => (
                            <span
                              key={logo.alt}
                              className="flex items-center justify-center w-6 h-6 rounded-md bg-gray-900 border border-gray-800"
                            >
                              <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={18}
                                height={18}
                                className={`object-contain ${logo.invert ? 'invert' : ''}`}
                              />
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-indigo-400 transition-colors" /> */}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                    {cert.name}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-gray-400">
                      <span className="text-indigo-400">Issuer:</span> {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-400">
                      <span className="text-indigo-400">Issue Date:</span> {cert.issueDate}
                    </p>
                  </div>

                  {cert.tech && cert.tech.length > 0 && (
                    <div className="mb-6 flex-grow">
                      <p className="text-xs text-indigo-400 font-semibold mb-3">Technologies:</p>
                      <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                        {cert.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="text-xs bg-indigo-900/40 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-500/30 whitespace-nowrap text-center"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button href={cert.credentialUrl}>
                    View Credential
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Certifications loading...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificationsSection;
