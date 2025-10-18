
import React from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import type { Skill } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SkillsProps {
  skills: Skill[];
}

const SkillBar: React.FC<{ skill: Skill; isVisible: boolean }> = ({ skill, isVisible }) => {
  return (
    <div className="flex items-center space-x-4">
      <skill.icon className="w-8 h-8 text-cyan-500 dark:text-cyan-400 flex-shrink-0" />
      <div className="w-full">
        <p className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</p>
        <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2.5 rounded-full motion-safe:transition-all motion-safe:duration-1000 motion-safe:ease-out"
            style={{ width: isVisible ? `${skill.level}%` : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Section ref={ref}>
      <Card className="p-8">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <SkillBar skill={skill} isVisible={isVisible} />
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
};

export default Skills;
