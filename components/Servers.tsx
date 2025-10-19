import React, { useState } from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import type { Server } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ServersProps {
  servers: Server[];
}

const ServerCard: React.FC<{ server: Server; isVisible: boolean; delay: number }> = ({ server, isVisible, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <a 
      href={server.inviteLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`block h-full transform motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-8 scale-95 -rotate-2'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card className="p-6 h-full">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={server.avatar} 
              alt={`${server.name} server logo`} 
              onLoad={() => setIsLoaded(true)}
              className={`w-12 h-12 rounded-lg object-cover ${isLoaded ? 'image-loaded' : 'image-loading'}`} 
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{server.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{server.description}</p>
          </div>
        </div>
        <div className="mt-4">
          <span className="inline-block bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {server.role}
          </span>
        </div>
      </Card>
    </a>
  );
};

const Servers: React.FC<ServersProps> = ({ servers }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

  return (
    <Section ref={ref}>
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8 dynamic-gradient-text">Servers I Manage</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {servers.map((server, index) => (
          <ServerCard key={server.name} server={server} isVisible={isVisible} delay={index * 150} />
        ))}
      </div>
    </Section>
  );
};

export default Servers;