/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  // Using HashRouter for compatibility with static hosting environments
  HashRouter,
  Routes,
  Route,
  Link,
  useParams,
  useLocation
} from 'react-router-dom';

// ----------------------------------------------------------------------
// 1. IMAGE IMPORTS (CRITICAL FIX)
// ALTERNATIVE FIX: Using the public folder standard for relative paths that work on deployment.
// If you place these files (profile_image.jpg, ibw_connect_image.png, etc.) 
// into your project's `public/assets/` folder, these paths will work globally:
const PUBLIC_BASE_PATH = "./assets";

const profileImage = `${PUBLIC_BASE_PATH}/profile_image.png`;
const ibwConnectImage = `${PUBLIC_BASE_PATH}/ibw_connect_image.jpg`;
const itemFinderImage = `${PUBLIC_BASE_PATH}/item_finder_image.jpg`;
const whiteWaterImage = `${PUBLIC_BASE_PATH}/whiteWater.jpg`;
const pythonImage = `${PUBLIC_BASE_PATH}/python_image.png`;
const cSharpNetImage = `${PUBLIC_BASE_PATH}/c-sharp-net_image.png`;

// NOTE: For this fix to work, you MUST move all image files into:
// <PROJECT_ROOT>/public/assets/
// ----------------------------------------------------------------------


// --- PERSONAL INFO (Updated with imported image variable) ---
const personalInfo = {
  name: "Damilola Adefenwa",
  title: "Software Developer & UI/UX Designer",
  tagline: "Bridging the gap between functional code and intuitive design.",
  email: "damilola.mercy@outlook.com",
  github: "https://github.com/damilolaadefenwa",
  linkedin: "https://www.linkedin.com/in/damilolamercy17",
  about: "I am a second-year Software Development undergraduate with a passion for building digital experiences. I combine technical programming skills in C# and Python with a strong foundation in UI/UX design. My goal is to create applications that are not only robust under the hood but also delightful to use.",
  // FIX: Using the root-relative path variable for public assets
  profileImageUrl: profileImage,
};

// --- SKILLS (Updated from user's data.ts) ---
const skills = [
  { title: "Programming & Web", skills: ["HTML5/CSS3", "JavaScript", "API Integration", "React & Next.js", "TypeScript", "Tailwind CSS", "Python", "C#", "SQL", "WordPress"] },
  { title: "UI/UX Design", skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "User Research", "Visual Design"] },
  { title: "Tools & Data", skills: ["Git/GitHub", "VScode", "MySQL", "MSSQL", "Google Sheets", "Microsoft Excel"] }
];

// --- EDUCATION (Updated from user's data.ts) ---
const education = [
  { school: "Brigham-Young University, Idaho", degree: "Bachelor of Applied Science in Software Development", year: "Exp. 2027", details: ["Major in Software Development", "Focus on Full-Stack Engineering"] },
  { school: "Brigham Young University, Idaho", degree: "Certificate in Web and Computer Programming", year: "Aug 2025", details: ["Coursework: Programming with Classes, UI/UX Principles, Web Fundamentals, Dynamic Web Dev"] },
  { school: "Alison Online Advanced Learning Institute", degree: "CPD-UK Accredited Certificate in User Interface Design", year: "July 2025", details: ["Modules: User Research, Information Architecture, Prototyping, Design Systems"] }
];

// --- PROJECT INTERFACE (Updated to include imageUrl) ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  demo?: string;
  design?: string;
  imageUrl: string; // New field for project images
}

// --- PROJECTS (Updated with public asset paths) ---
const projects: Project[] = [
  {
    id: 'ibw-connect',
    title: "IBW Connect",
    description: "A dynamic and scalable website design project. This project highlights my ability to translate design concepts into functional web interfaces.",
    tags: ["HTML", "CSS", "JavaScript", "API", "Responsive Design"],
    link: "/projects/ibw-connect",
    demo: "https://damilolaadefenwa.github.io/wdd231/final/index.html",
    design: "https://www.behance.net/gallery/235862275/Dynamic-Scalable-Minimalist-Design-For-IBW-Connect",
    // FIX: Using the public path variable
    imageUrl: ibwConnectImage,
  },
  {
    id: 'item-finder-app',
    title: "Item Finder App",
    description: "A mobile app concept designed to help users track misplaced items using Bluetooth. Completed the full UX research phase including user journey mapping and low-fidelity wireframing.",
    tags: ["Figma", "UX Research", "Wireframing", "Prototyping"],
    link: "/projects/item-finder-app",
    design: "https://www.figma.com/board/W9WQEgxwJBPAMc3Zp1xxaX/Item-Finder-App-Project?node-id=0-1&t=1Do4jeJhvy8Jg7A8-1",
    // FIX: Using the public path variable
    imageUrl: itemFinderImage,
  },
  {
    id: 'portfolio-v1',
    title: "White-Water Rafting",
    description: "My first static website built using only HTML and CSS. This project helped me master the fundamentals of layout, box model, and responsive design principles.",
    tags: ["HTML5", "CSS3", "Web Design"],
    link: "/projects/portfolio-v1",
    demo: "https://damilolaadefenwa.github.io/wdd130/wwr/",
    // FIX: Using the public path variable
    imageUrl: whiteWaterImage,
  },
  {
    id: 'fashion-word-games',
    title: "Fashion Word Games",
    description: "A text-based puzzle game testing fashion vocabulary. Implements core Python concepts like file I/O for word lists, random selection algorithms, and user input validation.",
    tags: ["Python", "Algorithms", "CSV"],
    link: "/projects/fashion-word-games",
    github: "https://github.com/damilolaadefenwa",
    // FIX: Using the public path variable
    imageUrl: pythonImage,
  },
  {
    id: 'exercise-tracker',
    title: "Exercise Tracker",
    description: "A console application for logging fitness activities. Demonstrates Object-Oriented Programming (OOP) principles including inheritance and encapsulation to handle different activity types.",
    tags: ["C#", ".NET", "OOP", "Classes"],
    link: "/projects/exercise-tracker",
    github: "https://github.com/damilolaadefenwa",
    // FIX: Using the public path variable
    imageUrl: cSharpNetImage,
  }
];

// --- PROJECT CARD COMPONENT (No change needed here, it uses project.imageUrl) ---
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {

  // Define external links to display
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

  // Fallback for placeholder text when image loading fails
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/400x200/e5e5e5/3f3f46?text=${project.title.replace(/\s/g, '+')}`;
    e.currentTarget.className = "w-full h-full object-contain p-4"; // Adjust class for text placeholder
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-zinc-100 flex flex-col">
      {/* Project Image */}
      <div className="mb-4 rounded-lg overflow-hidden h-40 bg-zinc-100 flex items-center justify-center">
        <img
          // This now uses the correct public path
          src={project.imageUrl}
          alt={`Preview of ${project.title}`}
          className="w-full h-full object-cover"
          onError={handleError}
        />
      </div>

      <h3 className="text-xl font-bold text-zinc-900 mb-2">{project.title}</h3>
      <p className="text-zinc-600 mb-4 flex-grow text-sm">{project.description}</p>
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
          View Details →
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

// --- SCROLL HOOK (Ensures navigation links scroll correctly) ---
const useScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
};

// --- HEADER COMPONENT ---
const Header: React.FC = () => {
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
                <Link
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


// 1. Home Page (Contains all the portfolio sections)
const HomePage: React.FC = () => {
  useScrollToSection();

  // Fallback for placeholder text when image loading fails
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/300x300/e5e5e5/3f3f46?text=${personalInfo.name.split(' ')[0]}`;
    e.currentTarget.className = "w-full max-w-xs h-auto rounded-full object-contain border-4 border-white shadow-xl aspect-square p-4";
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <main className="pt-16">
        {/* HERO SECTION (Updated to include profile image) */}
        <section id="home" className="relative bg-white border-b border-zinc-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

            {/* Profile Image Display - Now visible on all screen sizes */}
            <div className="flex lg:col-span-1 justify-center order-first lg:order-last mb-10 lg:mb-0">
              <img
                // This now uses the public path variable
                src={personalInfo.profileImageUrl}
                alt={personalInfo.name}
                className="w-full max-w-xs h-auto rounded-full object-cover border-4 border-white shadow-xl aspect-square"
                onError={handleError}
              />
            </div>

            <div className="max-w-3xl lg:col-span-2">
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

// 2. Project Detail Page (Dynamic route for /projects/:id)
const ProjectDetail: React.FC = () => {
  const { id } = useParams();
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
  if (project.github) {
    externalLinks.push({ label: 'View Code', href: project.github });
  }

  // Fallback for placeholder text when image loading fails
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://placehold.co/800x400/e5e5e5/3f3f46?text=${project.title.replace(/\s/g, '+')}`;
    e.currentTarget.className = "w-full h-auto rounded-lg object-contain p-8";
  };


  return (
    <div className="min-h-screen pt-32 p-8 bg-zinc-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-2xl border border-zinc-100">
        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors font-medium mb-6 inline-block">
          ← Back to Portfolio
        </Link>

        {/* Detail Image/Placeholder */}
        <div className="mb-8 rounded-lg overflow-hidden h-64 bg-zinc-100 flex items-center justify-center">
          <img
            // This now uses the public path variable
            src={project.imageUrl}
            alt={`Preview of ${project.title}`}
            className="w-full h-full object-cover"
            onError={handleError}
          />
        </div>

        <h1 className="text-4xl font-extrabold text-zinc-900 mb-4">{project.title}</h1>
        <p className="text-xl text-zinc-700 mb-8">{project.description}</p>

        <div className="bg-zinc-100 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-zinc-800">Technology Stack</h3>
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-zinc-800">Links</h3>
          <div className="flex gap-6 mt-4">
            {externalLinks.map((linkItem) => (
              <a
                key={linkItem.label}
                href={linkItem.href}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium inline-block text-base"
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
    // HashRouter is used for routing within a single page, which is great for static portfolios.
    <HashRouter>
      <Header />

      {/* Routes define which page component to display based on the URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />

        {/* 404 Catch-all */}
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
