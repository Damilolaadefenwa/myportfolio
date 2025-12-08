import { Project, Education, SkillCategory } from './types';

// IMPORTANT: Ensure all image files (profile_image.jpg, ibw_connect_image.png, etc.) 
// are located inside the 'public/assets/' folder of your project.

// Extend the Project interface to include the image URL
export interface PortfolioProject extends Project {
    imageUrl: string;
}

export const personalInfo = {
    name: "Damilola Adefenwa",
    title: "Software Developer & UI/UX Designer",
    tagline: "Bridging the gap between functional code and intuitive design.",
    about: "I am a second-year Software Development undergraduate with a passion for building digital experiences. I combine technical programming skills in C# and Python with a strong foundation in UI/UX design. My goal is to create applications that are not only robust under the hood but also delightful to use.",
    email: "damilola.mercy@outlook.com",
    linkedin: "https://www.linkedin.com/in/damilolamercy17",
    github: "https://github.com/damilolaadefenwa",
    // FIXED PATH: Assumes profile_image.jpg is in public/assets/
    profileImageUrl: "./assets/profile_image.jpg",
};

export const skills: SkillCategory[] = [
    {
        title: "Programming & Web",
        skills: ["HTML5/CSS3", "JavaScript", "React & Next.js Basics", "Tailwind CSS", "Python", "C#", "WordPress"]
    },
    {
        title: "UI/UX Design",
        skills: [
            "Figma",
            "Adobe XD",
            "Wireframing",
            "Prototyping",
            "User Research",
            "Visual Design"
        ]
    },
    {
        title: "Tools & Data",
        skills: [
            "Git/GitHub",
            "MySQL",
            "MSSQL",
            "Google Sheets",
            "Microsoft Excel"
        ]
    }
];

export const education: Education[] = [
    {
        school: "Brigham-Young University, Idaho",
        degree: "Bachelor of Applied Science in Software Development",
        year: "Exp. 2027",
        details: ["Major in Software Development", "Focus on Full-Stack Engineering"]
    },
    {
        school: "Brigham Young University, Idaho",
        degree: "Certificate in Web and Computer Programming",
        year: "Aug 2025",
        details: ["Coursework: Programming with Classes, UI/UX Principles, Web Fundamentals, Dynamic Web Dev"]
    },
    {
        school: "Alison Online Advanced Learning Institute",
        degree: "CPD-UK Accredited Certificate in User Interface Design",
        year: "July 2025",
        details: ["Modules: User Research, Information Architecture, Prototyping, Design Systems"]
    }
];

// Update the projects array with the correct image paths
export const projects: PortfolioProject[] = [
    {
        id: 1,
        title: "IBW Connect",
        category: "Web",
        description: "A dynamic and scalable website design project. This project highlights my ability to translate design concepts into functional web interfaces.",
        tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        // FIXED PATH: Assumes ibw_connect_image.png is in public/assets/
        imageUrl: "./assets/ibw_connect_image.png",
        links: {
            demo: "https://damilolaadefenwa.github.io/wdd231/final/index.html",
            design: "https://www.behance.net/gallery/235862275/Dynamic-Scalable-Minimalist-Design-For-IBW-Connect"
        }
    },
    {
        id: 2,
        title: "Item Finder App",
        category: "Design",
        description: "A mobile app concept designed to help users track misplaced items using Bluetooth. Completed the full UX research phase including user journey mapping and low-fidelity wireframing.",
        tags: ["Figma", "UX Research", "Wireframing", "Prototyping"],
        // FIXED PATH: Assumes item_finder_image.png is in public/assets/
        imageUrl: "/.assets/item_finder_image.png",
        links: {
            design: "https://www.figma.com/board/W9WQEgxwJBPAMc3Zp1xxaX/Item-Finder-App-Project?node-id=0-1&t=1Do4jeJhvy8Jg7A8-1"
        }
    },
    {
        id: 3,
        title: "Personal Portfolio v1",
        category: "Web",
        description: "My first static website built using only HTML and CSS. This project helped me master the fundamentals of layout, box model, and responsive design principles.",
        tags: ["HTML", "CSS", "Web Design"],
        // FIXED PATH: Assumes whiteWater.png is in public/assets/
        imageUrl: "./assets/whiteWater.png",
        links: {
            demo: "https://damilolaadefenwa.github.io/wdd130/wwr/"
        }
    },
    {
        id: 4,
        title: "Fashion Word Games",
        category: "Scripting",
        description: "A text-based puzzle game testing fashion vocabulary. Implements core Python concepts like file I/O for word lists, random selection algorithms, and user input validation.",
        tags: ["Python", "Algorithms", "CSV", "APIs"],
        // FIXED PATH: Assumes python_image.png is in public/assets/
        imageUrl: "./assets/python_image.png",
        links: {
            repo: "https://github.com/damilolaadefenwa"
        }
    },
    {
        id: 5,
        title: "Exercise Tracker",
        category: "Scripting",
        description: "A console application for logging fitness activities. Demonstrates Object-Oriented Programming (OOP) principles including inheritance and encapsulation to handle different activity types.",
        tags: ["C#", ".NET", "OOP", "Classes"],
        // FIXED PATH: Assumes c-sharp-net_image.png is in public/assets/
        imageUrl: "./assets/c-sharp-net_image.png",
        links: {
            repo: "https://github.com/damilolaadefenwa"
        }
    }
];