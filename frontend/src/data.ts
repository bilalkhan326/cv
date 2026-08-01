import type { CertificationItem, ExperienceItem, ProjectItem, SkillGroup } from './types'

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: ['React.js', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'Responsive Design'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'Authentication', 'Authorization', 'RBAC', 'MVC', 'CRUD', 'Middleware', 'Express Router', 'OAuth', 'WebSockets', 'Microservices'],
  },
  {
    title: 'Database',
    skills: ['MongoDB', 'PostgreSQL'],
  },
  {
    title: 'DevOps',
    skills: ['Docker', 'AWS EC2', 'AWS S3', 'AWS Lambda', 'CI/CD', 'GitHub Actions', 'Vercel', 'Netlify'],
  },
  {
    title: 'Testing',
    skills: ['Jest', 'Postman'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'npm', 'yarn', 'Figma', 'Jira', 'ClickUp', 'Agile'],
  },
]

export const experience: ExperienceItem[] = [
  {
    role: 'Full Stack Web Developer Intern',
    company: 'Al Raheem Technology',
    period: 'March 2026 – Present',
    responsibilities: ['React.js frontend development', 'Node.js backend', 'Express APIs', 'MongoDB', 'Tailwind CSS', 'Agile', 'Git', 'ClickUp'],
  },
  {
    role: 'Web Application Developer',
    company: 'Digi Inn IT Company',
    period: 'June 2024 – August 2024',
    responsibilities: ['React.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Bug fixing', 'Performance optimization', 'Agile collaboration'],
  },
]

export const projects: ProjectItem[] = [
  {
    title: 'E-Clearance Portal',
    description: 'Developed a web-based system that digitalizes the student clearance process with centralized management for students, departments, and administration.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    link: 'https://riphahclearanceportal.vercel.app/',
  },
  {
    title: 'Chand Motors',
    description: 'Built a polished automotive-focused web experience with modern UI patterns and seamless user experience for the business.',
    technologies: ['React.js', 'Tailwind CSS', 'Vercel'],
    link: 'https://chandmotorsg9.vercel.app/',
  },
]

export const certifications: CertificationItem[] = [
  { title: 'IT Essentials', issuer: 'Cisco Networking Academy' },
  { title: 'JavaScript Essentials 1', issuer: 'Cisco Networking Academy' },
  { title: 'JavaScript Essentials 2', issuer: 'Cisco Networking Academy' },
  { title: 'Python Essentials 1', issuer: 'Cisco Networking Academy' },
  { title: 'Python Essentials 2', issuer: 'Cisco Networking Academy' },
  { title: 'NDG Linux Essentials', issuer: 'Cisco Networking Academy' },
]
