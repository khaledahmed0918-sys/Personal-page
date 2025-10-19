import React, { useState } from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import { FAV_PLAYER_INFO } from '../constants';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FavPlayer: React.FC = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const [isPlayerImgLoaded, setIsPlayerImgLoaded] = useState(false);
  const [isSigImgLoaded, setIsSigImgLoaded] = useState(false);


  return (
    <Section ref={ref} className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1465px] mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 dynamic-gradient-text">My Favorite Player</h2>
        <Card
          className="p-8 md:p-12 overflow-hidden relative w-full"
          style={{
            backgroundImage: `url(${FAV_PLAYER_INFO.cardBackgroundUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 dark:bg-black/75 rounded-2xl z-0"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              
              {/* Player Image */}
              <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center items-center">
                <img
                  src="https://i.postimg.cc/HxvZs8Cr/IMG-7553.png"
                  alt="Real Madrid"
                  onLoad={() => setIsPlayerImgLoaded(true)}
                  className={`h-96 md:h-[450px] object-contain drop-shadow-2xl ${isPlayerImgLoaded ? 'image-loaded' : 'image-loading'}`}
                />
              </div>
              
              {/* Player Info */}
              <div className="w-full md:w-2/3 text-center md:text-left">
                 <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white">{FAV_PLAYER_INFO.fullName}</h3>
                 <p className="text-base text-gray-300 mt-2 mb-6">A living legend of the sport.</p>

                 <div className="mb-8 space-y-4 text-gray-200">
                    <div>
                        <p className="font-bold text-gray-100">Born</p>
                        <p className="text-sm">{FAV_PLAYER_INFO.birthDate} in {FAV_PLAYER_INFO.birthPlace}</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-100">Career Summary</p>
                        <p className="text-sm leading-relaxed">{FAV_PLAYER_INFO.careerSummary}</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                   {FAV_PLAYER_INFO.stats.map((stat, index) => (
                      <div 
                        key={stat.label}
                        className={`bg-white/10 dark:bg-white/5 backdrop-blur-sm p-4 rounded-lg motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                         <p className="text-base font-semibold text-gray-300">{stat.label}</p>
                         <p className="text-xl font-bold text-white">{stat.value}</p>
                      </div>
                   ))}
                 </div>
              </div>

            </div>
            
            <img 
              src="https://cdn.discordapp.com/attachments/1425236976298102814/1428890546822320250/IMG_7549.jpg?ex=68f42585&is=68f2d405&hm=365525a98842e3d96964f2f852300a091b45fb26c4457cb6adfc45e2bf3f555d&"
              alt="Cristiano Ronaldo signature and celebration"
              onLoad={() => setIsSigImgLoaded(true)}
              className={`block mx-auto mt-8 w-full max-w-[600px] h-[240px] object-cover rounded-2xl shadow-lg motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} ${isSigImgLoaded ? 'image-loaded' : 'image-loading'}`}
              style={{ transitionDelay: '200ms' }}
            />

          </div>
        </Card>
      </div>
    </Section>
  );
};

export default FavPlayer;