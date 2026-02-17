'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Smartphone } from 'lucide-react';
import { Project } from '@/lib/types';
import { scaleIn, hoverLift } from '@/lib/animations';

interface ProjectCardProps {
  project: Project;
  layout?: 'grid' | 'list';
}

/**
 * ProjectCard Component
 * 
 * Displays a project with image, description, and links.
 * Features:
 * - Lazy-loaded image with Next.js Image
 * - Technology badges
 * - Hover overlay with description
 * - Action buttons for links
 * - Error handling for image loading
 * - ARIA labels and semantic HTML
 * 
 * @param project - Project object with details
 * @param layout - Card layout style (default: 'grid')
 */
export function ProjectCard({ project, layout = 'grid' }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${
        layout === 'list' ? 'flex flex-col md:flex-row' : ''
      }`}
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden ${layout === 'list' ? 'md:w-1/2' : 'aspect-video'}`}>
        {!imageError ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title} application`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              console.log('errrrrrrrr', e);
              setImageError(true)
              
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <Smartphone className="h-16 w-16 text-gray-400" aria-hidden="true" />
          </div>
        )}
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className={`p-6 ${layout === 'list' ? 'md:w-1/2' : ''}`}>
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded"
              role="listitem"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {project.links && (
          <div className="flex flex-wrap gap-3" role="group" aria-label="Project links">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`View ${project.title} demo`}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Demo
              </a>
            )}
            
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Code
              </a>
            )}
            
            {project.links.appStore && (
              <a
                href={project.links.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`Download ${project.title} on App Store`}
              >
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                App Store
              </a>
            )}
            
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label={`Download ${project.title} on Play Store`}
              >
                <Smartphone className="h-4 w-4" aria-hidden="true" />
                Play Store
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
