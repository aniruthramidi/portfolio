import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects';

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="work" aria-label="Selected Work" className="relative bg-paper text-ink py-24 px-6 md:px-12 grid-lines">
      {/* Section Top Bar */}
      <div className="flex justify-between items-start pb-8 border-b border-ink/20 text-xs font-mono tracking-widest text-ink-soft uppercase">
        <span>PROJECT SHOWCASE</span>
        <span>03 / 07</span>
      </div>

      {/* Sub-header grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-ink/20 text-sm md:text-base font-medium text-ink-soft">
        <p>engineered with precision.<br />driven by user impact.</p>
        <p className="md:text-center">full-stack architecture —<br />react, node &amp; web audio</p>
        <p className="md:text-right">from concept to production.<br />clean code &amp; scale</p>
      </div>

      {/* Projects List */}
      <div className="my-16 flex flex-col gap-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            style={{ willChange: 'transform' }}
            onClick={() => setSelectedProject(project)}
            className="group relative cursor-pointer border border-ink/20 bg-ink text-paper rounded-xl overflow-hidden shadow-lg hover:border-ink/60 transition-colors duration-500 gpu-accelerated select-none"
          >
            {/* Card Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 items-center">
              {/* Media Preview Frame */}
              <div className="lg:col-span-7 overflow-hidden rounded-lg border border-paper/15 relative h-64 md:h-96">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] gpu-accelerated"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                
                {/* Floating Code Badge */}
                <div className="absolute top-4 left-4 font-mono text-xl md:text-3xl font-extrabold text-paper bg-ink/80 px-3 py-1 rounded border border-paper/20 group-hover:scale-105 transition-transform duration-300">
                  {project.code}
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full py-2">
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-paper-soft mb-2">
                    <span>{project.year}</span>
                    <span className="flex items-center gap-1 group-hover:text-paper transition-colors">
                      VIEW CASE STUDY <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-extrabold font-display tracking-tight text-paper group-hover:text-paper-soft transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-xs md:text-sm font-medium text-paper-soft mt-3 line-clamp-2">
                    {project.category}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-paper/15 flex justify-between items-center text-xs font-mono text-paper-soft">
                  <span>{project.client}</span>
                  <span className="px-3 py-1 rounded-full border border-paper/30 text-paper group-hover:bg-paper group-hover:text-ink transition-colors duration-300">
                    DETAILS ↘
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="flex justify-center pt-8">
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            if (window.__lenis) {
              window.__lenis.scrollTo('#contact', { duration: 1.2 });
            } else {
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-ink text-paper font-mono text-sm md:text-base font-bold hover:bg-ink/80 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md"
        >
          <span>LET'S BUILD SOMETHING TOGETHER</span>
          <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300 ease-out" size={18} />
        </a>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
