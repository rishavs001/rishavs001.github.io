/**
 * Single source of truth for every piece of Resume content on the site.
 * Update here and the whole page follows.
 */

export const profile = {
  name: 'Rishav Shah',
  role: 'Full Stack Engineer',
  tagline: 'GenAI Platforms · Backend Microservices · Cloud-Native Infrastructure',
  location: 'Bengaluru, Karnataka, India',
  phone: '+91 8013073625',
  email: 'official.rishavs@gmail.com',
  linkedin: 'https://linkedin.com/in/rishav97',
  github: 'https://github.com/rishavs001',
  resumeFile: 'Rishav_Shah_Resume.pdf',
  summary:
    'Full Stack Engineer with 2+ years of experience in backend microservices, enterprise GenAI integration, and cloud-native infrastructure. Proven expertise in building low-latency API gateways, self-hosted LLM/Speech pipelines, and high-performance React applications. Alumnus of NIT Jamshedpur.',
} as const

/** Words cycled by the hero's rotating headline. */
export const roles = [
  'Enterprise GenAI Platforms',
  'Backend Microservices',
  'Low-Latency API Gateways',
  'Self-Hosted LLM Pipelines',
  'Cloud-Native Infrastructure',
] as const

export type Stat = { value: string; label: string }

export const stats: Stat[] = [
  { value: '2+', label: 'Years building production systems' },
  { value: '8+', label: 'Microservices orchestrated by AI routing' },
  { value: '100+', label: 'Internal users on the GenAI platform' },
  { value: '60%', label: 'Redundant API calls eliminated' },
]

export type Experience = {
  company: string
  role: string
  period: string
  location: string
  tags: string[]
  points: string[]
}

export const experience: Experience[] = [
  {
    company: 'Esyasoft Technologies Private Limited',
    role: 'Software Engineer',
    period: 'Aug 2025 — Present',
    location: 'Bengaluru, Karnataka',
    tags: ['Node.js', 'FastAPI', 'TypeScript', 'Keycloak', 'Whisper', 'Coqui TTS', 'Zod', 'Nginx'],
    points: [
      'Architected an enterprise GenAI platform using a Node.js API Gateway and FastAPI microservices handling conversational analytics across utility operations, serving 100+ internal users and high daily request volumes.',
      'Engineered an AI orchestration layer that classified natural language intent and dynamically routed requests across 8+ distributed microservices (load forecasting, billing analytics, asset management, and energy theft detection).',
      'Integrated multilingual speech processing pipelines using Whisper (STT) and Coqui (TTS) with FastAPI services, delivering low-latency voice interactions across English and 4 Indic languages.',
      'Implemented enterprise IAM with Keycloak, OAuth2, OIDC, JWT, and RBAC, establishing fine-grained, geography-aware data authorization across regional utility circles.',
      'Optimized platform performance using TanStack Query server-state caching and Nginx reverse proxy caching, eliminating 60% of redundant API calls and cutting page load latency by 1.5 seconds.',
      'Led primary backend development in TypeScript using Zod for strict type-safe validation, securing business workflows across distributed AI services.',
    ],
  },
  {
    company: 'Odoo India Private Limited',
    role: 'Software Developer Intern',
    period: 'Feb 2025 — Jun 2025',
    location: 'Gandhinagar, Gujarat',
    tags: ['Python', 'PostgreSQL', 'ORM', 'Odoo 18'],
    points: [
      'Shipped 6+ production-ready features across Payroll, Recruitment, Time Off, and Expenses modules; all changes were code-reviewed and merged into the official Odoo 18 upstream codebase.',
      'Developed backend business logic, PostgreSQL models, and ORM query optimizations following enterprise Python guidelines for high-concurrency environments.',
    ],
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Programmer',
    period: 'Feb 2021 — Jun 2022',
    location: 'Kolkata, West Bengal',
    tags: ['RHEL', 'Bash', 'Linux', 'Automation'],
    points: [
      'Managed 45 Red Hat Enterprise Linux (RHEL) servers supporting mission-critical airline operations, reducing incident downtime by 60% through proactive server monitoring and preventative maintenance.',
      'Automated backup replication, system patch management, and security compliance validation using Bash scripting, reducing manual operational workload by 40 hours monthly.',
    ],
  },
]

export type SkillGroup = { title: string; items: string[] }

export const skills: SkillGroup[] = [
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C++', 'HTML5', 'CSS3'],
  },
  {
    title: 'Backend & Microservices',
    items: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'Microservices', 'Zod', 'Swagger/OpenAPI'],
  },
  {
    title: 'AI & GenAI Systems',
    items: [
      'LLMs',
      'Self-hosted LLMs',
      'vLLM',
      'Prompt Engineering',
      'Intent Classification',
      'Whisper STT',
      'Coqui TTS',
      'NLP',
    ],
  },
  {
    title: 'Databases & Caching',
    items: ['PostgreSQL', 'Redis', 'Microsoft SQL Server', 'MongoDB', 'MySQL'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'Vite', 'Redux Toolkit', 'Mantine UI', 'Tailwind CSS'],
  },
  {
    title: 'DevOps & Security',
    items: [
      'Docker',
      'Docker Compose',
      'Nginx',
      'Keycloak (OAuth2/OIDC/JWT)',
      'Azure Pipelines',
      'Git',
      'Linux',
      'Bash',
    ],
  },
  {
    title: 'Core CS',
    items: [
      'Data Structures & Algorithms',
      'System Design',
      'DBMS',
      'Computer Networks',
      'Operating Systems',
    ],
  },
]

export type Project = {
  title: string
  blurb: string
  stack: string[]
  points: string[]
  link: string
  accent: 'cyan' | 'violet'
}

export const projects: Project[] = [
  {
    title: 'Meter Data Management System',
    blurb: 'Utility-grade MDMS automating electricity billing.',
    stack: ['ASP.NET Core', 'Entity Framework Core', 'MSSQL'],
    points: [
      'Delivered a utility-grade Meter Data Management System automating electricity billing through a configurable Time-of-Day tariff calculation engine.',
      'Designed normalized database schemas and hierarchical power-network models, exposing secure REST APIs for scalable billing, reporting, and analytics.',
    ],
    link: 'https://github.com/rishavs001',
    accent: 'cyan',
  },
  {
    title: 'Naya Nivas',
    blurb: 'Full-stack real estate marketplace.',
    stack: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    points: [
      'Built a full-stack real estate marketplace with a TypeScript-based React frontend, JWT authentication, REST APIs, and role-based property management.',
      'Integrated Google Cloud Storage for scalable media management across real estate property search, listing, buying, and renting workflows.',
    ],
    link: 'https://github.com/rishavs001',
    accent: 'violet',
  },
]

export type Education = {
  school: string
  degree: string
  period: string
  location: string
}

export const education: Education[] = [
  {
    school: 'National Institute of Technology, Jamshedpur',
    degree: 'Master of Computer Applications (MCA)',
    period: '2022 — 2025',
    location: 'Jamshedpur, Jharkhand',
  },
  {
    school: 'Techno India Institute of Technology',
    degree: 'Bachelor of Computer Applications (BCA)',
    period: '2017 — 2020',
    location: 'Kolkata, West Bengal',
  },
]

export type NavItem = { id: string; label: string }

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
