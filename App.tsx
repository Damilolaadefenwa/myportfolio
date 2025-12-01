/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import { personalInfo, skills, education, projects } from './data';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans" id="home">
      <Header />
      
      <main className="pt-16">
        {/* HERO SECTION */}
        <section className="relative bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-sm font-semibold tracking-wide uppercase text-blue-600 bg-blue-50 rounded-full mb-6 animate-fade-in">
                Open to Opportunities
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight mb-6 leading-tight">
                Hi, I'm {personalInfo.name}.
                <br />
                <span className="text-zinc-500 text-4xl md:text-6xl">{personalInfo.title}</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 max-w-2xl leading-relaxed mb-10">
                {personalInfo.tagline}
              </p>
              <div className="flex gap-4">
                <a 
                  href="#projects" 
                  className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View Work
                </a>
                <a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer" 
                  className="px-8 py-3 bg-white text-zinc-800 border border-zinc-200 font-semibold rounded-lg hover:bg-zinc-50 transition-all"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-900 mb-6">About Me</h2>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                        {personalInfo.about}
                    </p>
                </div>
                <div id="skills">
                    <h2 className="text-3xl font-bold text-zinc-900 mb-6">Technical Skills</h2>
                    <div className="space-y-8">
                        {skills.map((category) => (
                            <div key={category.title}>
                                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                                    {category.title}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span 
                                            key={skill}
                                            className="px-3 py-2 bg-white border border-zinc-200 rounded-md text-zinc-700 text-sm font-medium shadow-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="bg-zinc-100/50 py-20 border-y border-zinc-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-zinc-900 mb-4">Featured Projects</h2>
                        <p className="text-lg text-zinc-600 max-w-2xl">
                            A selection of my work in web development, UI/UX design, and scripting.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>

        {/* EDUCATION & CERTIFICATES */}
        <section id="education" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">Education & Certifications</h2>
            <div className="relative border-l-2 border-zinc-200 ml-4 md:ml-0 space-y-12">
                {education.map((edu, index) => (
                    <div key={index} className="relative pl-8 md:pl-12">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-600"></div>
                        
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                            <h3 className="text-xl font-bold text-zinc-900">{edu.school}</h3>
                            <span className="inline-block mt-1 sm:mt-0 px-3 py-1 bg-zinc-100 rounded-full text-xs font-semibold text-zinc-600">
                                {edu.year}
                            </span>
                        </div>
                        <div className="text-lg font-medium text-blue-600 mb-3">{edu.degree}</div>
                        <ul className="list-disc list-inside text-zinc-600 space-y-1">
                            {edu.details.map((detail, idx) => (
                                <li key={idx} className="text-sm leading-relaxed">{detail}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-900 text-zinc-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h4 className="text-white text-lg font-bold mb-1">{personalInfo.name}</h4>
                <p className="text-sm">Building the web, one pixel at a time.</p>
            </div>
            <div className="flex gap-6">
                <a href={personalInfo.github} className="hover:text-white transition-colors">GitHub</a>
                <a href={personalInfo.linkedin} className="hover:text-white transition-colors">LinkedIn</a>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">Email</a>
            </div>
            <div className="text-sm text-zinc-600">
                © {new Date().getFullYear()} All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;