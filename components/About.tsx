import React from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import { useLanyard } from '../hooks/useLanyard';
import { DISCORD_USER_ID, PERSONAL_INFO, DEFAULT_AVATAR_URL } from '../constants';
import { MoonIcon } from '@heroicons/react/24/solid';

const statusConfig = {
  online: { color: 'bg-green-500', text: 'Online' },
  idle: { color: 'bg-yellow-500', text: 'Idle' },
  dnd: { color: 'bg-red-500', text: 'Do Not Disturb' },
  offline: { color: 'bg-gray-500', text: 'Offline' },
};

const statusMessages: Record<string, string> = {
    online: "Probably coding or debugging my Discord bots 😅",
    idle: "AFK, might be grabbing a snack.",
    dnd: "Focused... please do not disturb!",
    offline: "Offline. See you soon!"
};

const About: React.FC = () => {
  const lanyardData = useLanyard(DISCORD_USER_ID);

  const avatarUrl = lanyardData?.discord_user
    ? `https://cdn.discordapp.com/avatars/${lanyardData.discord_user.id}/${lanyardData.discord_user.avatar}.png?size=128`
    : DEFAULT_AVATAR_URL;

  const status = lanyardData?.discord_status ?? 'offline';
  const statusInfo = statusConfig[status];
  const statusMessage = lanyardData ? statusMessages[status] : 'Loading status...';

  return (
    <Section>
      <div className="grid md:grid-cols-3 gap-8 items-center">
        <Card className="md:col-span-1 w-48 h-48 mx-auto rounded-full flex flex-col items-center justify-center motion-safe:animate-fade-in-up motion-safe:delay-100">
          <div className="relative">
            <img 
              src={avatarUrl} 
              alt="Mohammed's Avatar" 
              className="w-40 h-40 rounded-full object-cover ring-4 ring-cyan-500/50" 
            />
            {lanyardData && (
              <div title={statusInfo.text} className={`absolute bottom-2 right-2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-gray-900/80 ${statusInfo.color}`}>
                {status === 'idle' && <MoonIcon className="w-5 h-5 text-white" />}
                {status === 'dnd' && <div className="w-5 h-1 bg-white rounded-full"></div>}
                {status === 'offline' && <div className="w-4 h-4 bg-gray-300 rounded-full"></div>}
              </div>
            )}
          </div>
        </Card>
        
        <Card className="md:col-span-2 p-8 motion-safe:animate-fade-in-up motion-safe:delay-200">
          <h2 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">About Me</h2>
          <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {PERSONAL_INFO.bio}
          </p>
          <div className="mt-6 flex space-x-8 text-sm">
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-400">Age:</span>
              <span className="ml-2">{PERSONAL_INFO.age}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-600 dark:text-gray-400">From:</span>
              <span className="ml-2">{PERSONAL_INFO.nationality}</span>
            </div>
          </div>
          <div className="mt-6 p-3 bg-white/5 dark:bg-gray-900/40 rounded-lg">
             <div className="flex items-center gap-3">
                <span className={`flex-shrink-0 w-4 h-4 rounded-full ${statusInfo.color} ${status === 'online' ? 'animate-pulse' : ''}`}></span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-bold">{statusInfo.text}:</span> {statusMessage}
                </p>
             </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};

export default About;