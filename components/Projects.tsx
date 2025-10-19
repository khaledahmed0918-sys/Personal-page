import React, { useState } from 'react';
import Section from './ui/Section';
import Card from './ui/Card';
import type { Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ProjectsProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project; isVisible: boolean; delay: number }> = ({ project, isVisible, delay }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      className={`h-full transform motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-8 scale-95 -rotate-2'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="animated-border-wrapper h-full">
        <Card className="p-0 h-full flex flex-col overflow-hidden group border-none">
          <div className="relative overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={`${project.title} screenshot`}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110 ${isLoaded ? 'image-loaded' : 'image-loading'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                      <span key={tag} className="bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-semibold px-2.5 py-0.5 rounded-full transition-transform duration-200 hover:scale-110 cursor-default">
                          {tag}
                      </span>
                  ))}
              </div>
          </div>

          <div className="mt-auto p-6 pt-0 flex items-center justify-between">
              <div className="flex items-center gap-4">
                  {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm dynamic-text hover:underline">
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" /> Live
                      </a>
                  )}
                  {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm dynamic-text hover:underline">
                          <CodeBracketIcon className="w-4 h-4" /> Code
                      </a>
                  )}
              </div>
          </div>
        </Card>
      </div>
    </div>
  );
};


const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <Section ref={ref} animate={false}>
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8 dynamic-gradient-text">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} isVisible={isVisible} delay={index * 150} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;