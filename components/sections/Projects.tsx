'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectsProps } from '@/lib/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ProjectCard } from '@/components/ui';

/**
 * Projects Section Component
 * 
 * Displays portfolio projects in a responsive grid.
 * Features:
 * - Projects displayed using ProjectCard components
 * - Responsive grid layout
 * - Scroll-triggered animations for project cards
 * - Optional filtering by technology
 * - Semantic HTML (section, h2, article for each project)
 * - ARIA labels for accessibility
 * 
 * @param projects - Array of project objects
 * @param showFilter - Whether to show technology filter (default: false)
 */
export function Projects({ projects, showFilter = false }: ProjectsProps) {
  const [selectedTech, setSelectedTech] = useState<string>('all');

  // Get unique technologies from all projects
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  // Filter projects by selected technology
  const filteredProjects =
    selectedTech === 'all'
      ? projects
      : projects.filter((project) =>
          project.technologies.includes(selectedTech)
        );

  // Separate featured and regular projects
  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const regularProjects = filteredProjects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-white dark:bg-gray-900"
      aria-labelledby="projects-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recent work in mobile and web development
          </p>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mt-6" aria-hidden="true" />
        </motion.div>

        {/* Technology Filter */}
        {showFilter && allTechnologies.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedTech('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  selectedTech === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-label="Show all projects"
                aria-pressed={selectedTech === 'all'}
              >
                All Projects
              </button>
              {allTechnologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    selectedTech === tech
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-label={`Filter projects by ${tech}`}
                  aria-pressed={selectedTech === tech}
                >
                  {tech}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.h3
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-2xl font-semibold text-gray-900 dark:text-white mb-8"
            >
              Featured Work
            </motion.h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <motion.h3
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-2xl font-semibold text-gray-900 dark:text-white mb-8"
              >
                More Projects
              </motion.h3>
            )}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </div>
        )}

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found for the selected technology.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
