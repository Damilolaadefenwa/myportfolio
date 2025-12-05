/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  // CHANGED: Use HashRouter instead of BrowserRouter for static hosting compatibility
  HashRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from 'react-router-dom';

// --- PERSONAL INFO (Updated from user's data.ts) ---
const personalInfo = {
  name: "Damilola Adefenwa",
  title: "Software Developer & UI/UX Designer",
  tagline: "Bridging the gap between functional code and intuitive design.",
  // UPDATED: User's actual email
  email: "damilola.mercy@outlook.com",
  github: "https://github.com/damilolaadefenwa",
  // UPDATED: User's actual LinkedIn URL
  linkedin: "https://www.linkedin.com/in/damilolamercy17",
  about: "I am a second-year Software Development undergraduate with a passion for building digital experiences. I combine technical programming skills in C# and Python with a strong foundation in UI/UX design. My goal is to create applications that are not only robust under the hood but also delightful to use.",
};
// --- SKILLS (Updated from user's data.ts) ---
const skills = [
  { title: "Programming & Web", skills: ["HTML5/CSS3", "JavaScript", "React & Next.js Basics", "Tailwind CSS", "Python", "C#", "WordPress"] },
  { title: "UI/UX Design", skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research", "Visual Design"] },
  { title: "Tools & Data", skills: ["Git/GitHub", "MySQL", "MSSQL", "Google Sheets", "Microsoft Excel"] }
];
// --- EDUCATION (Updated from user's data.ts) ---
const education = [
  { school: "Brigham-Young University, Idaho", degree: "Bachelor of Applied Science in Software Development", year: "Exp. 2027", details: ["Major in Software Development", "Focus on Full-Stack Engineering"] },
  { school: "Brigham Young University, Idaho", degree: "Certificate in Web and Computer Programming", year: "Aug 2025", details: ["Coursework: Programming with Classes, UI/UX Principles, Web Fundamentals, Dynamic Web Dev"] },
  { school: "Alison Online Advanced Learning Institute", degree: "CPD-UK Accredited Certificate in User Interface Design", year: "July 2025", details: ["Modules: User Research, Information Architecture, Prototyping, Design Systems"] }
];

// --- PROJECTS (Updated to include separate demo and design links for IBW Connect) ---
const projects = [
  {
    id: 'ibw-connect',
    title: "IBW Connect",
    description: "A dynamic and scalable website design project. This project highlights my ability to translate design concepts into functional web interfaces.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    link: "/projects/ibw-connect",
    demo: "https://damilolaadefenwa.github.io/wdd231/final/index.html", // New field for Live Demo
    design: "https://www.behance.net/gallery/235862275/Dynamic-Scalable-Minimalist-Design-For-IBW-Connect" // New field for View Design
  },
  { id: 'item-finder-app', title: "Item Finder App", description: "A mobile app concept designed to help users track misplaced items using Bluetooth. Completed the full UX research phase including user journey mapping and low-fidelity wireframing.", tags: ["Figma", "UX Research", "Wireframing", "Prototyping"], link: "/projects/item-finder-app", design: "https://www.figma.com/board/W9WQEgxwJBPAMc3Zp1xxaX/Item-Finder-App-Project?node-id=0-1&t=1Do4jeJhvy8Jg7A8-1" },
  { id: 'portfolio-v1', title: "Personal Portfolio v1", description: "My first static website built using only HTML and CSS. This project helped me master the fundamentals of layout, box model, and responsive design principles.", tags: ["HTML", "CSS", "Web Design"], link: "/projects/portfolio-v1", demo: "https://damilolaadefenwa.github.io/wdd130/wwr/" },
  { id: 'fashion-word-games', title: "Fashion Word Games", description: "A text-based puzzle game testing fashion vocabulary. Implements core Python concepts like file I/O for word lists, random selection algorithms, and user input validation.", tags: ["Python", "Algorithms", "CSV"], link: "/projects/fashion-word-games", github: "https://github.com/damilolaadefenwa" },
  { id: 'exercise-tracker', title: "Exercise Tracker", description: "A console application for logging fitness activities. Demonstrates Object-Oriented Programming (OOP) principles including inheritance and encapsulation to handle different activity types.", tags: ["C#", ".NET", "OOP", "Classes"], link: "/projects/exercise-tracker", github: "https://github.com/damilolaadefenwa" }
];

// --- COMPONENTS (Original ./components/ProjectCard.jsx) ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  // Update interface to support new link fields
  github?: string;
  demo?: string;
  design?: string;
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  // Determine the button text based on the project's nature (Design vs. Code)
  const viewDetailsText = project.tags.includes('Figma') || project.tags.includes('Adobe XD') ? "View Design →" : "View Details →";

  // Define external links to display (ProjectCard displays all available links)
  const externalLinks = [];
  if (project.demo) {
    externalLinks.push({ label: 'Live Demo', href: project.demo });
  }
  if (project.design) {
    externalLinks.push({ label: 'View Design', href: project.design });
  }
  // Fallback/General link (e.g., for Code projects without specific demo/design links)
  if (project.github && !project.demo && !project.design) {
    externalLinks.push({ label: 'View Code', href: project.github });
  }


  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-100 flex flex-col">
      <h3 className="text-xl font-bold text-zinc-900 mb-2">{project.title}</h3>
      <p className="text-zinc-600 mb-4 flex-grow">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-auto flex gap-4 items-center">
        {/* Internal link to the Project Detail route */}
        <Link
          to={project.link}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          {viewDetailsText}
        </Link>

        {/* External Links */}
        {externalLinks.map((linkItem) => (
          <a
            key={linkItem.label}
            href={linkItem.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            {linkItem.label}
          </a>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTS (Original ./components/Header.jsx) ---

// Custom hook to handle scroll navigation when navigating to a section ID on the same page
const useScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    // If the path is not the root ('/'), we should not try to scroll sections.
    if (location.pathname !== '/') return;

    // Check if there is a hash in the URL (e.g., #about or #home)
    if (location.hash) {
      // Find the element by removing the '#'
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Use a short delay to ensure the browser has finished any route changes
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      // If navigating to the base path '/' with no hash, scroll to the top
      window.scrollTo(0, 0);
    }
  }, [location]);
};

const Header: React.FC = () => {
  // FIX: Removed the leading '/' from hash links, so Link only changes the hash part
  const navItems = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Education', path: '#education' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-zinc-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo / Name link back to home */}
        <Link to="/" className="text-xl font-bold text-zinc-900 hover:text-blue-600 transition-colors">
          {personalInfo.name.split(' ')[0]}<span className="text-blue-600">.</span>
        </Link>

        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                {/* Use Link for all internal navigation */}
                <Link
                  // Linking to a hash works correctly without the leading '/' when on the same route
                  to={item.path}
                  className="text-sm font-medium text-zinc-600 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={`mailto:${personalInfo.email}`}
          className="hidden md:inline-flex px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
        >
          Get In Touch
        </a>
      </div>
    </header>
  );
};


// --- PAGES ---

// 1. Home Page (Contains all the portfolio sections)
const HomePage: React.FC = () => {
  // This hook is called only when the HomePage component is rendered
  useScrollToSection();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="pt-16">
        {/* HERO SECTION */}
        <section id="home" className="relative bg-white border-b border-zinc-100">
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
                {/* Changed to hash-only link */}
                <Link
                  to="#projects"
                  className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-lg hover:bg-zinc-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  View Work
                </Link>
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

// 2. Project Detail Page (To demonstrate dynamic routing)
const ProjectDetail: React.FC = () => {
  // useParams is how you extract dynamic parts of the URL, like :id
  const { id } = useParams();
  // Projects array is now using string IDs, so find matches the id
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 p-8 text-center bg-zinc-50">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Project Not Found</h1>
        <p className="text-lg text-zinc-600">Could not find a project with the ID: `{id}`</p>
        <Link to="/" className="mt-6 inline-block text-blue-600 hover:text-blue-800 transition-colors font-medium">
          ← Back to Home
        </Link>
      </div>
    );
  }

  // Determine the external link set for the detail page
  const externalLinks = [];
  if (project.demo) {
    externalLinks.push({ label: 'Live Demo', href: project.demo });
  }
  if (project.design) {
    externalLinks.push({ label: 'View Design', href: project.design });
  }
  if (project.github && !project.demo && !project.design) {
    externalLinks.push({ label: 'View Code', href: project.github });
  }


  return (
    <div className="min-h-screen pt-32 p-8 bg-zinc-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-zinc-100">
        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors font-medium mb-4 inline-block">
          ← Back to Portfolio
        </Link>
        <h1 className="text-4xl font-extrabold text-zinc-900 mb-4">{project.title}</h1>
        <p className="text-xl text-zinc-700 mb-8">{project.description}</p>

        <div className="bg-zinc-100 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-zinc-800 mb-3">Technology Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="text-zinc-600 space-y-4">
          <p>This page demonstrates true multi-page navigation using `react-router-dom`.</p>
          <p>You can view the external link(s) for this project here:</p>
          <div className="flex gap-6 mt-4">
            {externalLinks.map((linkItem) => (
              <a
                key={linkItem.label}
                href={linkItem.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium inline-block"
              >
                {linkItem.label} →
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// 3. Main App Component (Responsible for setting up the router)
const App: React.FC = () => {
  return (
    // 1. HashRouter wraps the entire application.
    <HashRouter>
      {/* Header should always be visible, so it is outside the Routes block */}
      <Header />

      {/* 2. Routes define the area where components are conditionally rendered based on the URL. */}
      <Routes>
        {/* Route 1: Home page (path: /). Renders HomePage component. */}
        <Route path="/" element={<HomePage />} />

        {/* Route 2: Dynamic Project Detail page.
                    The :id part is a URL parameter captured by useParams(). */}
        <Route path="/projects/:id" element={<ProjectDetail />} />

        {/* Optional: A catch-all route for 404 Not Found pages */}
        <Route path="*" element={
          <div className="min-h-screen pt-32 p-8 text-center bg-zinc-50">
            <h1 className="text-3xl font-bold text-zinc-900 mb-4">404 - Page Not Found</h1>
            <Link to="/" className="mt-6 inline-block text-blue-600 hover:text-blue-800 transition-colors font-medium">
              Go Home
            </Link>
          </div>
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;
