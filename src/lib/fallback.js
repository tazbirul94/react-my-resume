import deResume from '@/template/resume.de_DE'

// Fallback data derived from resume.example.en_US.js
// Used when Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing)
// Field names match Supabase column names (snake_case)

const basics = {
  name: 'MD TAZBIRUL HAQUE',
  first_name: 'MD',
  last_name: 'Tazbirul Haque',
  label: 'Senior Full-Stack Developer | C#/.NET - Angular - Kubernetes - DevOps',
  tagline: 'Senior Full-Stack Software Engineer - C#/.NET, Angular/TypeScript, microservices, Kubernetes, and observability for business-critical systems.',
  hero_chips: ['C#', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'Argo CD', 'OpenTelemetry', 'Keycloak', 'RabbitMQ', 'SQL Server', 'PostgreSQL', 'GraphQL', 'REST APIs', 'Claude Code'],
  picture: 'images/myself2.jpg',
  email: 'tazbirul94@gmail.com',
  phone: '+49 176 57742207',
  website: null,
  summary: [
    'Senior Full-Stack Software Engineer with 7+ years of professional experience (6+ years hands-on with C#/.NET), building and operating business-critical systems in high-availability production environments.',
    'Deep expertise in Angular/TypeScript frontend development and C#/.NET backend engineering for scalable microservices architectures. Experienced across the full application lifecycle - from design through CI/CD-based deployment with Azure DevOps and Kubernetes to production operations with OpenTelemetry-based observability.',
    'Led a GitHub Copilot and Claude Code AI-assisted development initiative from proof-of-concept through organisation-wide rollout. German B1+ (used daily in a professional context), English C1. Permanent residence permit (Niederlassungserlaubnis), Germany.',
  ],
  city: 'Bremen',
  country_code: 'Germany',
  postal_code: '28201',
}

const profiles = [
  { network: 'github', username: 'Tazbirul94', url: 'https://github.com/tazbirul94', sort_order: 0 },
  { network: 'linkedin', username: 'tazbirul-haque', url: 'https://www.linkedin.com/in/tazbirul-haque', sort_order: 1 },
]

const work = [
  {
    id: 'work-1',
    company: 'CTS EVENTIM AG & Co. KGaA',
    logo: 'images/eventim-logo.png',
    website: 'https://karriere.eventim.de/en/',
    position: 'Software Development Expert',
    employment_type: 'Full-Time',
    mode: null,
    location: 'Bremen, Germany',
    start_date: '2023-07-01',
    end_date: null,
    summary: 'Full-stack and backend engineering with end-to-end ownership of a PowerBuilder-to-Angular/.NET migration, CI/CD pipelines, and an organisation-wide AI-assisted development rollout.',
    highlights: [
      'Legacy Modernisation: Own end-to-end delivery of the migration of an internal PowerBuilder module to an Angular (TypeScript) / C#/.NET microservices architecture - Swagger/OpenAPI REST APIs, GraphQL, RabbitMQ messaging, MS SQL Server with Entity Framework Core, Docker containerisation, and Kubernetes (Argo CD) GitOps deployment.',
      'Security and IAM: Lead the Keycloak identity and access management integration - OAuth2/OIDC authentication flows (JWT) and Role-Based Access Control (RBAC) across all microservices to secure production systems.',
      'Observability: Established OpenTelemetry distributed tracing and Grafana/Prometheus dashboards across services, reducing mean time to detect (MTTD) for production incidents.',
      'CI/CD Ownership: Own pipelines in Azure DevOps and GitLab CI (YAML pipeline-as-code); reduced release cycles from 2 weeks to 3 days through automated test gates and release governance.',
      'SQL Server: Stored procedures, indexes, database roles and permissions, and query optimisation.',
      'Quality: Security-focused code reviews (OWASP-oriented), NUnit and integration tests, automated test-coverage gates, and Jira/Confluence documentation within an agile Scrum team.',
      'AI-Assisted Development: Architected and led a GitHub Copilot / Claude Code initiative from proof-of-concept through management approval to organisation-wide rollout; built and led the scaling team.',
    ],
    skills: ['C#', '.NET', 'ASP.NET Core', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OAuth2/OIDC', 'OpenTelemetry', 'Prometheus', 'Grafana', 'NUnit', 'Azure DevOps', 'GitLab CI', 'GitHub Copilot', 'Claude Code', 'Jira', 'Confluence'],
    sort_order: 0,
  },
  {
    id: 'work-2',
    company: 'Swiss Re / Movingdots GmbH / Powerfleet',
    logo: 'images/swiss-re-logo.png',
    website: 'https://www.movingdots.com/',
    position: 'Senior Full Stack Developer',
    employment_type: 'Full-Time',
    mode: null,
    location: 'Bremen, Germany',
    start_date: '2022-07-01',
    end_date: '2023-06-30',
    summary: 'Technical ownership of the Coloride telematics platform following promotion to Senior Developer.',
    highlights: [
      'Held end-to-end technical ownership of the Coloride platform: architecture reviews, security-focused code reviews, and international team coordination.',
      'Introduced OpenTelemetry distributed tracing across 15+ microservices with Grafana/Prometheus dashboards, reducing mean time to resolve (MTTR) for production incidents.',
    ],
    skills: ['C#', 'ASP.NET Core', 'React', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Architecture Reviews', 'Security Code Reviews'],
    sort_order: 1,
  },
  {
    id: 'work-3',
    company: 'Swiss Re / Movingdots GmbH / Powerfleet',
    logo: 'images/swiss-re-logo.png',
    website: 'https://www.movingdots.com/',
    position: 'Full Stack Developer',
    employment_type: 'Working Student to Full-Time',
    mode: null,
    location: 'Bremen, Germany',
    start_date: '2021-08-01',
    end_date: '2022-06-30',
    summary: 'Joined as Working Student (incl. M.Sc. thesis), then Full Stack Developer: full-stack telematics features and the crash-detection algorithm for Coloride.',
    highlights: [
      'Developed full-stack features using React (component-based architecture, RxJS) and C#/ASP.NET Core Web API, with Azure Service Bus for event-driven communication and MongoDB/PostgreSQL as data backends.',
      'Consolidated 6 separate React frontend projects into a single Nx mono-repo, reducing onboarding effort for new insurance-partner integrations.',
      'M.Sc. thesis: designed and validated a real-time crash-detection algorithm for the Coloride platform using SVM, ANN, and decision trees with hyperparameter optimisation.',
      'Platform recognition: Coloride received Top 250 InsurTech 2022 (Digital Insurance Agenda) and the DIAmond Award 2021 (Swiss Re / Digital Insurance Agenda).',
    ],
    skills: ['C#', 'ASP.NET Core', 'React', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'SVM', 'ANN', 'Machine Learning', 'Python', 'Nx Mono-Repo'],
    sort_order: 2,
  },
  {
    id: 'work-4',
    company: 'Netzlab GmbH',
    logo: 'images/netzlab_gmbh_logo.jpg',
    website: 'https://netzlab.de/',
    position: 'Software Developer',
    employment_type: 'Working Student',
    mode: null,
    location: 'Dortmund, Germany',
    start_date: '2020-10-01',
    end_date: '2021-07-31',
    summary: 'Development of internal software products for SME clients with C#/.NET.',
    highlights: [
      'Structured and rebuilt internal software products for SME clients using C#, ASP.NET Core, MS SQL Server (stored procedures, indexes, query optimisation), Entity Framework, REST APIs, and GraphQL.',
      'Designed relational database schemas and implemented stored procedures and index strategies for client reporting and business process automation.',
      'Raised team code quality through structured peer code reviews and technical documentation.',
    ],
    skills: ['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'REST APIs', 'GraphQL', 'Stored Procedures', 'Database Design', 'Code Reviews'],
    sort_order: 3,
  },
  {
    id: 'work-5',
    company: 'Convince Computer Limited',
    logo: 'images/CCL-logo.jpg',
    website: 'https://www.convincebd.com/',
    position: 'Software Developer',
    employment_type: 'Full-Time',
    mode: null,
    location: 'Bangladesh',
    start_date: '2017-09-15',
    end_date: '2019-09-15',
    summary: 'Enterprise software for Citibank Bangladesh (cash management, banking reporting) and supply-chain / procurement systems.',
    highlights: [
      'Built a cash management and banking reporting system for Citibank Bangladesh covering transaction workflows, multi-currency reconciliation, regulatory reporting, and RBAC, using Blazor, ASP.NET MVC, C#/.NET Core, and MS SQL Server.',
      'Developed supply chain management and procurement software, including buying-house management and audit reporting.',
      'Implemented complex stored procedures and SQL role-based permissions for high-volume transaction processing.',
      'Collaborated directly with Citibank stakeholders on requirements analysis, UAT, and production sign-off.',
    ],
    skills: ['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'RBAC', 'Banking Software', 'Supply Chain', 'Reporting'],
    sort_order: 4,
  },
]

const education = [
  {
    id: 'edu-1',
    institution: 'Hochschule Rhein-Waal',
    logo: 'images/Hochschule_Rhein-Waal-logo.png',
    website: 'https://www.hochschule-rhein-waal.de/',
    degree: 'Master of Science',
    area: 'Master in Information Engineering and Computer Science',
    location: 'Kleve, Germany',
    start_date: '2020-03-01',
    end_date: '2023-02-01',
    gpa: '1.8',
    gpa_german: '1.8',
    summary: [
      'Strong focus on software engineering, distributed systems, cloud computing, and data analytics.',
      'Master\'s Thesis: "Crash Detection using Machine Learning Models (Decision Tree, SVM, and ANN) with Hyperparameter Optimization", developed with Swiss Re (Movingdots GmbH).',
    ],
    courses: [],
    sort_order: 0,
  },
  {
    id: 'edu-2',
    institution: 'Ahsanullah University of Science and Technology',
    logo: 'images/AUST.png',
    website: 'https://aust.edu/',
    degree: 'Bachelor of Science',
    area: 'Bachelor in Computer Science and Engineering',
    location: 'Dhaka, Bangladesh',
    start_date: '2013-03-01',
    end_date: '2017-03-01',
    gpa: '3.34',
    gpa_german: '2.1',
    summary: [
      'Comprehensive program covering software engineering, algorithms, operating systems, databases, and AI.',
    ],
    courses: [],
    sort_order: 1,
  },
  {
    id: 'edu-3',
    institution: 'SOS Hermann Gmeiner College',
    logo: 'images/HGC.png',
    website: null,
    degree: null,
    area: 'Higher Secondary Certificate',
    location: 'Dhaka, Bangladesh',
    start_date: '2010-06-01',
    end_date: '2012-06-01',
    gpa: '5.0',
    gpa_german: '1.0',
    summary: [],
    courses: [],
    sort_order: 2,
  },
]

// skill_groups with nested skillDetails (matching useSkills hook shape)
const skillGroups = [
  { id: 'sg-0', title: 'Languages', description: [], type: 'hard', sort_order: 0 },
  { id: 'sg-1', title: 'Frontend', description: [], type: 'hard', sort_order: 1 },
  { id: 'sg-2', title: 'Backend & APIs', description: [], type: 'hard', sort_order: 2 },
  { id: 'sg-3', title: 'Architecture', description: [], type: 'hard', sort_order: 3 },
  { id: 'sg-4', title: 'DevOps & Containers', description: [], type: 'hard', sort_order: 4 },
  { id: 'sg-5', title: 'Cloud', description: [], type: 'hard', sort_order: 5 },
  { id: 'sg-6', title: 'Identity & Security', description: [], type: 'hard', sort_order: 6 },
  { id: 'sg-7', title: 'Observability', description: [], type: 'hard', sort_order: 7 },
  { id: 'sg-8', title: 'Databases', description: [], type: 'hard', sort_order: 8 },
  { id: 'sg-9', title: 'Testing & Quality', description: [], type: 'hard', sort_order: 9 },
  { id: 'sg-10', title: 'AI-Assisted Development', description: [], type: 'hard', sort_order: 10 },
  { id: 'sg-11', title: 'Methods & Tools', description: [], type: 'hard', sort_order: 11 },
  { id: 'sg-soft', title: 'Soft Skills', description: [], type: 'soft', sort_order: 12 },
]

const skills = [
  { id: 'sk-1', group_id: 'sg-0', name: 'C#', level: 95, sort_order: 0 },
  { id: 'sk-2', group_id: 'sg-0', name: 'SQL', level: 88, sort_order: 1 },
  { id: 'sk-3', group_id: 'sg-0', name: 'TypeScript', level: 82, sort_order: 2 },
  { id: 'sk-4', group_id: 'sg-0', name: 'JavaScript', level: 80, sort_order: 3 },
  { id: 'sk-5', group_id: 'sg-0', name: 'Python', level: 75, sort_order: 4 },
  { id: 'sk-6', group_id: 'sg-1', name: 'Angular', level: 84, sort_order: 0 },
  { id: 'sk-7', group_id: 'sg-1', name: 'TypeScript / Component Architecture', level: 82, sort_order: 1 },
  { id: 'sk-8', group_id: 'sg-1', name: 'React', level: 78, sort_order: 2 },
  { id: 'sk-9', group_id: 'sg-1', name: 'RxJS', level: 76, sort_order: 3 },
  { id: 'sk-10', group_id: 'sg-1', name: 'Blazor', level: 72, sort_order: 4 },
  { id: 'sk-11', group_id: 'sg-1', name: 'ASP.NET MVC', level: 78, sort_order: 5 },
  { id: 'sk-12', group_id: 'sg-1', name: 'HTML5 / CSS3', level: 75, sort_order: 6 },
  { id: 'sk-13', group_id: 'sg-2', name: '.NET 6/7/8', level: 92, sort_order: 0 },
  { id: 'sk-14', group_id: 'sg-2', name: 'ASP.NET Core Web API', level: 92, sort_order: 1 },
  { id: 'sk-15', group_id: 'sg-2', name: 'Entity Framework Core', level: 85, sort_order: 2 },
  { id: 'sk-16', group_id: 'sg-2', name: 'REST APIs', level: 90, sort_order: 3 },
  { id: 'sk-17', group_id: 'sg-2', name: 'GraphQL', level: 78, sort_order: 4 },
  { id: 'sk-18', group_id: 'sg-2', name: 'Swagger/OpenAPI', level: 82, sort_order: 5 },
  { id: 'sk-19', group_id: 'sg-3', name: 'Microservices', level: 85, sort_order: 0 },
  { id: 'sk-20', group_id: 'sg-3', name: 'Event-Driven Architecture', level: 80, sort_order: 1 },
  { id: 'sk-21', group_id: 'sg-3', name: 'RabbitMQ', level: 82, sort_order: 2 },
  { id: 'sk-22', group_id: 'sg-3', name: 'Azure Service Bus', level: 76, sort_order: 3 },
  { id: 'sk-23', group_id: 'sg-3', name: 'CQRS', level: 72, sort_order: 4 },
  { id: 'sk-24', group_id: 'sg-3', name: 'Nx Mono-Repo', level: 72, sort_order: 5 },
  { id: 'sk-25', group_id: 'sg-4', name: 'Docker', level: 86, sort_order: 0 },
  { id: 'sk-26', group_id: 'sg-4', name: 'Kubernetes (Argo CD)', level: 82, sort_order: 1 },
  { id: 'sk-27', group_id: 'sg-4', name: 'Helm', level: 76, sort_order: 2 },
  { id: 'sk-28', group_id: 'sg-4', name: 'Azure DevOps', level: 82, sort_order: 3 },
  { id: 'sk-29', group_id: 'sg-4', name: 'GitLab CI', level: 84, sort_order: 4 },
  { id: 'sk-30', group_id: 'sg-4', name: 'CI/CD Pipelines', level: 84, sort_order: 5 },
  { id: 'sk-31', group_id: 'sg-4', name: 'YAML', level: 80, sort_order: 6 },
  { id: 'sk-32', group_id: 'sg-4', name: 'Git', level: 90, sort_order: 7 },
  { id: 'sk-33', group_id: 'sg-5', name: 'Azure App Service', level: 76, sort_order: 0 },
  { id: 'sk-34', group_id: 'sg-5', name: 'Azure Service Bus', level: 76, sort_order: 1 },
  { id: 'sk-35', group_id: 'sg-5', name: 'Azure Deployment Environments', level: 72, sort_order: 2 },
  { id: 'sk-36', group_id: 'sg-5', name: 'Blob Storage', level: 74, sort_order: 3 },
  { id: 'sk-37', group_id: 'sg-6', name: 'Keycloak', level: 80, sort_order: 0 },
  { id: 'sk-38', group_id: 'sg-6', name: 'OAuth2/OIDC', level: 80, sort_order: 1 },
  { id: 'sk-39', group_id: 'sg-6', name: 'JWT', level: 80, sort_order: 2 },
  { id: 'sk-40', group_id: 'sg-6', name: 'RBAC', level: 80, sort_order: 3 },
  { id: 'sk-41', group_id: 'sg-6', name: 'Security Code Reviews', level: 78, sort_order: 4 },
  { id: 'sk-42', group_id: 'sg-7', name: 'OpenTelemetry', level: 82, sort_order: 0 },
  { id: 'sk-43', group_id: 'sg-7', name: 'Distributed Tracing', level: 80, sort_order: 1 },
  { id: 'sk-44', group_id: 'sg-7', name: 'Prometheus', level: 76, sort_order: 2 },
  { id: 'sk-45', group_id: 'sg-7', name: 'Grafana', level: 76, sort_order: 3 },
  { id: 'sk-46', group_id: 'sg-7', name: 'Loki', level: 70, sort_order: 4 },
  { id: 'sk-47', group_id: 'sg-7', name: 'Incident Analysis', level: 78, sort_order: 5 },
  { id: 'sk-48', group_id: 'sg-8', name: 'MS SQL Server', level: 88, sort_order: 0 },
  { id: 'sk-49', group_id: 'sg-8', name: 'Entity Framework Core', level: 85, sort_order: 1 },
  { id: 'sk-50', group_id: 'sg-8', name: 'Stored Procedures', level: 84, sort_order: 2 },
  { id: 'sk-51', group_id: 'sg-8', name: 'Indexes & Query Optimisation', level: 84, sort_order: 3 },
  { id: 'sk-52', group_id: 'sg-8', name: 'PostgreSQL', level: 78, sort_order: 4 },
  { id: 'sk-53', group_id: 'sg-8', name: 'MongoDB', level: 72, sort_order: 5 },
  { id: 'sk-54', group_id: 'sg-9', name: 'NUnit', level: 78, sort_order: 0 },
  { id: 'sk-55', group_id: 'sg-9', name: 'xUnit', level: 75, sort_order: 1 },
  { id: 'sk-56', group_id: 'sg-9', name: 'Integration Testing', level: 82, sort_order: 2 },
  { id: 'sk-57', group_id: 'sg-9', name: 'TDD', level: 75, sort_order: 3 },
  { id: 'sk-58', group_id: 'sg-9', name: 'Clean Code / SOLID', level: 80, sort_order: 4 },
  { id: 'sk-59', group_id: 'sg-10', name: 'GitHub Copilot', level: 85, sort_order: 0 },
  { id: 'sk-60', group_id: 'sg-10', name: 'Claude Code', level: 85, sort_order: 1 },
  { id: 'sk-61', group_id: 'sg-10', name: 'AI-Assisted Development Processes', level: 82, sort_order: 2 },
  { id: 'sk-62', group_id: 'sg-10', name: 'Machine Learning (SVM, ANN, Decision Trees)', level: 70, sort_order: 3 },
  { id: 'sk-63', group_id: 'sg-11', name: 'Agile / Scrum', level: 88, sort_order: 0 },
  { id: 'sk-64', group_id: 'sg-11', name: 'Jira', level: 84, sort_order: 1 },
  { id: 'sk-65', group_id: 'sg-11', name: 'Confluence', level: 82, sort_order: 2 },
  { id: 'sk-66', group_id: 'sg-11', name: 'Visual Studio', level: 90, sort_order: 3 },
  { id: 'sk-67', group_id: 'sg-11', name: 'VS Code', level: 86, sort_order: 4 },
  { id: 'sk-68', group_id: 'sg-11', name: 'ReSharper', level: 80, sort_order: 5 },
  { id: 'sk-69', group_id: 'sg-11', name: 'Postman', level: 80, sort_order: 6 },
  { id: 'sk-70', group_id: 'sg-soft',     name: 'Problem Solving',    icon: '🧩', level: 90, sort_order: 0 },
  { id: 'sk-71', group_id: 'sg-soft',     name: 'Team Collaboration', icon: '🤝', level: 90, sort_order: 1 },
  { id: 'sk-72', group_id: 'sg-soft',     name: 'Communication',      icon: '💬', level: 85, sort_order: 2 },
  { id: 'sk-73', group_id: 'sg-soft',     name: 'Adaptability',       icon: '🔄', level: 88, sort_order: 3 },
  { id: 'sk-74', group_id: 'sg-soft',     name: 'Critical Thinking',  icon: '🎯', level: 85, sort_order: 4 },
  { id: 'sk-75', group_id: 'sg-soft',     name: 'Time Management',    icon: '⏱',  level: 82, sort_order: 5 },
  { id: 'sk-76', group_id: 'sg-soft',     name: 'Mentoring',          icon: '🌱', level: 78, sort_order: 6 },
  { id: 'sk-77', group_id: 'sg-soft',     name: 'Agile / Scrum',      icon: '⚡', level: 88, sort_order: 7 },
]

const softSkillCategories = [
  { id: 'ssc-1', title: 'Communication',  icon: '💬', tags: ['Technical Writing', 'Stakeholder Presentation', 'Cross-cultural Collaboration'], sort_order: 0 },
  { id: 'ssc-2', title: 'Leadership',     icon: '🌱', tags: ['Team Mentoring', 'Code Review Culture', 'Initiative Taking'],                    sort_order: 1 },
  { id: 'ssc-3', title: 'Delivery',       icon: '⚡', tags: ['Agile / Scrum', 'Deadline-driven', 'Iterative Improvement'],                    sort_order: 2 },
  { id: 'ssc-4', title: 'Collaboration',  icon: '🤝', tags: ['Remote-first', 'Pair Programming', 'Knowledge Sharing'],                        sort_order: 3 },
]

const languages = [
  { id: 'lang-1', name: 'English', level: 'Fluent (C1)', sort_order: 0 },
  { id: 'lang-2', name: 'German',  level: 'B1+ / professional working proficiency (used daily)', sort_order: 1 },
  { id: 'lang-3', name: 'Bengali', level: 'Native', sort_order: 2 },
]

const interests = [
  { id: 'int-1', name: 'Photography', keywords: ['Landscapes', 'Nature', 'Street'],              sort_order: 0 },
  { id: 'int-2', name: 'Travel',      keywords: ['City breaks', 'Hiking'],                       sort_order: 1 },
  { id: 'int-3', name: 'Cooking',     keywords: ['Bangladeshi', 'BBQ', 'Experimenting'],         sort_order: 2 },
  { id: 'int-4', name: 'DIY Projects',keywords: ['Quilling', 'Origami', 'Puzzles'],              sort_order: 3 },
  { id: 'int-5', name: 'Music',       keywords: ['Guitar', 'Piano', 'Spotify'],                  sort_order: 4 },
]

const projects = [
  {
    id: 'proj-1',
    name: 'ML Crash Detection',
    image_thumb: null,
    image_modal: null,
    website: 'https://github.com/tazbirul94',
    category: 'Research / ML',
    publisher: 'Hochschule Rhein-Waal × Swiss Re',
    release_date: '2023-02-01',
    description: "Master's thesis: crash detection from real telematics data using Decision Tree, SVM, and ANN with hyperparameter optimization. Collaboration with Swiss Re (Movingdots).",
    keywords: ['Python', 'Machine Learning', 'SVM', 'Decision Tree', 'ANN', 'Telematics'],
    sort_order: 0,
  },
  {
    id: 'proj-2',
    name: 'React Resume Portfolio',
    image_thumb: null,
    image_modal: null,
    website: 'https://tazbirul94.github.io/react-my-resume',
    category: 'Web App',
    publisher: 'Personal',
    release_date: '2024-01-01',
    description: 'Dynamic resume website with Supabase CMS backend, EN/DE i18n, dark mode, print/PDF export, and admin panel. Built with React, Vite, and Tailwind CSS.',
    keywords: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'i18n', 'GitHub Pages'],
    sort_order: 1,
  },
  {
    id: 'proj-3',
    name: 'Insurance Telematics API',
    image_thumb: null,
    image_modal: null,
    website: 'https://www.movingdots.com/',
    category: 'Enterprise / Backend',
    publisher: 'Swiss Re (Movingdots)',
    release_date: '2023-03-01',
    description: 'Scalable telematics data pipelines on Databricks and Azure Data Factory for usage-based insurance risk scoring. C# / ASP.NET Core REST APIs.',
    keywords: ['C#', 'ASP.NET Core', 'Databricks', 'Azure', 'REST APIs', 'Telematics'],
    sort_order: 2,
  },
]

const certifications = [
  {
    id: 'cert-1',
    title: 'Telc German B1',
    issuer: 'telc gGmbH',
    issue_date: '2025-03-01',
    credential_url: 'https://results.telc.net/qr/qM2RD7IlSqC3FxHsVhgNkYwqmfcuck9Vjx217LH-8RzXJQ6WQxhBOIxE5r8xPoFM',
    logo: 'images/telc.png',
    sort_order: 0,
  },
  {
    id: 'cert-2',
    title: 'C# (Basic)',
    issuer: 'HackerRank',
    issue_date: '2021-10-01',
    credential_url: 'https://www.hackerrank.com/certificates/d976e40ae220',
    logo: 'images/hackerrank.png',
    sort_order: 1,
  },
]

const testimonials = [
  {
    id: 'ref-1',
    name: 'Md Shahabub Alam',
    position: 'Research Assistant · NLP, Deep Learning & Computer Vision',
    company: 'DFKI',
    reference: 'He is a very passionate person and highly skilled. In fact he knows what he is trying to do which can really be appreciated. He can also break complex problems into smaller ones, which helps solve them within a decent time.',
    sort_order: 0,
  },
]

export const fallbackData = {
  basics,
  profiles,
  work,
  education,
  skillGroups,
  skills,
  softSkillCategories,
  languages,
  interests,
  projects,
  certifications,
  testimonials,
}

function normalizeDE(de) {
  const loc = de.basics?.location ?? {}
  const deBasics = {
    ...de.basics,
    city: loc.city ?? de.basics.city ?? null,
    country_code: loc.countryCode ?? de.basics.country_code ?? null,
    postal_code: loc.postalCode ?? de.basics.postal_code ?? null,
  }
  delete deBasics.location
  delete deBasics.profiles

  const deProfiles = (de.basics?.profiles ?? []).map((p, i) => ({
    network: p.network,
    username: p.username,
    url: p.url,
    sort_order: i,
  }))

  const deWork = (de.work ?? []).map((w, i) => ({
    ...w,
    start_date: w.startDate ?? w.start_date ?? null,
    end_date: w.endDate === 'Present' ? null : (w.endDate ?? w.end_date ?? null),
    sort_order: i,
  }))

  const deEducation = (de.education ?? []).map((e, i) => ({
    ...e,
    start_date: e.startDate ?? e.start_date ?? null,
    end_date: e.endDate ?? e.end_date ?? null,
    sort_order: i,
  }))

  const deSkillGroups = (de.skills ?? []).map((g, i) => ({
    id: `de-group-${i}`,
    title: g.title,
    description: g.description,
    type: 'hard',
    sort_order: i,
  }))
  const deSkills = (de.skills ?? []).flatMap((g, gi) =>
    (g.skillDetails ?? []).map((s, si) => ({
      id: `de-skill-${gi}-${si}`,
      group_id: `de-group-${gi}`,
      name: s.name,
      level: s.level ?? null,
      sort_order: si,
    }))
  )

  const deCertifications = (de.certifications ?? []).map((c, i) => ({
    ...c,
    issue_date: c.issueDate ?? c.issue_date ?? null,
    credential_url: c.credentialUrl ?? c.credential_url ?? null,
    sort_order: i,
  }))

  const deTestimonials = (de.references ?? de.testimonials ?? []).map((r, i) => ({
    name: r.name,
    position: r.position,
    company: r.company,
    reference: r.reference,
    sort_order: i,
  }))

  return {
    basics: deBasics,
    profiles: deProfiles,
    work: deWork,
    education: deEducation,
    skillGroups: deSkillGroups,
    skills: deSkills,
    languages: de.languages ?? [],
    interests: de.interests ?? [],
    projects: de.projects ?? [],
    certifications: deCertifications,
    testimonials: deTestimonials,
  }
}

const deFallbackData = normalizeDE(deResume)

export function getFallback(key, locale) {
  if (locale === 'de-DE') return deFallbackData[key] ?? []
  return fallbackData[key] ?? []
}
