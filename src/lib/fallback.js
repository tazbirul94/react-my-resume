import deResume from '@/template/resume.de_DE'

// Fallback data derived from resume.example.en_US.js
// Used when Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing)
// Field names match Supabase column names (snake_case)

const basics = {
  name: 'MD TAZBIRUL HAQUE',
  label: 'SOFTWARE ENGINEER',
  tagline: '8+ years building enterprise .NET systems across Germany — microservices, cloud, and fintech.',
  hero_chips: ['C#', '.NET Core', 'Docker', 'Kubernetes', 'Azure', 'MS SQL', 'RabbitMQ', 'React'],
  picture: '../resouces/images/galaxy head.jpg',
  email: 'tazbirul94@gmail.com',
  phone: '+49 17657742207',
  website: null,
  summary: [
    '7+ years building enterprise .NET/C# systems — currently at CTS EVENTIM architecting microservices with Docker, Kubernetes, and RabbitMQ.',
    'Previously at Swiss Re (Movingdots) delivering telematics data pipelines on Azure for usage-based insurance. Master\'s thesis on ML crash detection (Decision Tree, SVM, ANN).',
    'Master\'s in Information Engineering · Hochschule Rhein-Waal · German B1 · Bremen, Germany.',
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
    summary: null,
    highlights: [
      'Design and maintain enterprise applications using C#, ASP.NET Core, and modern modulith architecture.',
      'Implement and optimize RESTful APIs and GraphQL services for scalable system integrations.',
      'Manage MS SQL Server (stored procedures, indexing, optimization) and Entity Framework for ORM-based database access.',
      'Modernize legacy PowerBuilder applications to .NET with improved maintainability.',
      'Build event-driven workflows with RabbitMQ and deploy containerized services with Docker and Kubernetes.',
      'Automate CI/CD pipelines in GitLab using YAML and ArgoCD for faster, reliable deployments.',
    ],
    skills: ['C#', 'ASP.NET Core', 'Docker', 'Kubernetes', 'RabbitMQ', 'MS SQL', 'GraphQL', 'GitLab CI/CD', 'Entity Framework', 'ArgoCD'],
    sort_order: 0,
  },
  {
    id: 'work-2',
    company: 'Swiss Re (Movingdots GmbH)',
    logo: 'images/swiss-re-logo.png',
    website: 'https://www.movingdots.com/',
    position: 'Senior Full Stack Developer',
    employment_type: 'Full-Time',
    mode: null,
    location: 'Remote',
    start_date: '2023-04-01',
    end_date: '2023-06-30',
    summary: null,
    highlights: [
      'Led Databricks and Azure Data Factory pipelines to process large-scale telematics data for usage-based insurance.',
      'Built features enabling insurers to assess driver risk profiles and crash likelihood more accurately.',
      'Contributed to ADAS Risk Score product leveraging advanced driver-assistance system data.',
    ],
    skills: ['C#', 'ASP.NET Core', 'Databricks', 'Azure Data Factory', 'React', 'Azure DevOps'],
    sort_order: 1,
  },
  {
    id: 'work-3',
    company: 'Swiss Re (Movingdots GmbH)',
    logo: 'images/swiss-re-logo.png',
    website: 'https://www.movingdots.com/',
    position: 'Full Stack Developer',
    employment_type: 'Full-Time',
    mode: null,
    location: 'Remote',
    start_date: '2022-04-01',
    end_date: '2023-03-31',
    summary: null,
    highlights: [
      'Delivered production-grade APIs and optimized database queries with MS SQL, LINQ, and Entity Framework.',
      'Enhanced insurance telematics platforms with REST API integrations and cloud service connections.',
      'Implemented CI/CD pipelines with Git and Azure DevOps, automating builds and deployments.',
    ],
    skills: ['C#', 'ASP.NET Core', 'MS SQL', 'LINQ', 'Entity Framework', 'Azure DevOps', 'React'],
    sort_order: 2,
  },
  {
    id: 'work-4',
    company: 'Swiss Re (Movingdots GmbH)',
    logo: 'images/swiss-re-logo.png',
    website: 'https://www.movingdots.com/',
    position: 'Full Stack Developer (Working Student)',
    employment_type: 'Working Student',
    mode: null,
    location: 'Kleve, Germany',
    start_date: '2021-08-01',
    end_date: '2022-03-31',
    summary: null,
    highlights: [
      'Contributed to full-stack projects with C#, ASP.NET Core, ReactJS, React Native, and MS SQL.',
      'Completed Master\'s thesis: "Crash Detection using ML Models (Decision Tree, SVM, ANN) with Hyperparameter Optimization" on real Swiss Re telematics data.',
    ],
    skills: ['C#', 'ASP.NET Core', 'React', 'React Native', 'MS SQL', 'Python'],
    sort_order: 3,
  },
  {
    id: 'work-5',
    company: 'Netzlab GmbH',
    logo: 'images/netzlab_gmbh_logo.jpg',
    website: 'https://netzlab.de/',
    position: 'Software Engineer (Working Student)',
    employment_type: 'Working Student',
    mode: null,
    location: 'Düsseldorf, Germany',
    start_date: '2020-10-01',
    end_date: '2021-07-31',
    summary: null,
    highlights: [
      'Developed and maintained mobile and web applications using React Native, C#, ASP.NET Core, and MS SQL.',
      'Built REST APIs and managed version control with Azure DevOps.',
    ],
    skills: ['C#', 'ASP.NET Core', 'React Native', 'React', 'MS SQL'],
    sort_order: 4,
  },
  {
    id: 'work-6',
    company: 'Convince Computer Limited',
    logo: 'images/CCL-logo.jpg',
    website: 'https://www.convincebd.com/',
    position: 'Programmer',
    employment_type: 'Full-Time',
    mode: null,
    location: 'Dhaka, Bangladesh',
    start_date: '2017-09-15',
    end_date: '2019-09-15',
    summary: null,
    highlights: [
      'Built business management web applications using ASP.NET MVC and C#.',
      'Processed and queried large datasets with MS SQL Server.',
    ],
    skills: ['C#', 'ASP.NET MVC', 'MS SQL', 'JavaScript', 'HTML5', 'CSS3'],
    sort_order: 5,
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
  { id: 'sg-backend',  title: 'Backend',           description: [], type: 'hard', sort_order: 0 },
  { id: 'sg-cloud',   title: 'Cloud & DevOps',     description: [], type: 'hard', sort_order: 1 },
  { id: 'sg-frontend', title: 'Frontend & Mobile', description: [], type: 'hard', sort_order: 2 },
  { id: 'sg-data',    title: 'Data & ML',          description: [], type: 'hard', sort_order: 3 },
  { id: 'sg-soft',    title: 'Soft Skills',        description: [], type: 'soft', sort_order: 4 },
]

const skills = [
  { id: 'sk-1',  group_id: 'sg-backend',  name: 'C#',               level: 95, sort_order: 0 },
  { id: 'sk-2',  group_id: 'sg-backend',  name: 'ASP.NET Core',     level: 92, sort_order: 1 },
  { id: 'sk-3',  group_id: 'sg-backend',  name: 'Entity Framework', level: 85, sort_order: 2 },
  { id: 'sk-4',  group_id: 'sg-backend',  name: 'REST APIs',        level: 90, sort_order: 3 },
  { id: 'sk-5',  group_id: 'sg-backend',  name: 'GraphQL',          level: 75, sort_order: 4 },
  { id: 'sk-6',  group_id: 'sg-backend',  name: 'MS SQL Server',    level: 85, sort_order: 5 },
  { id: 'sk-7',  group_id: 'sg-backend',  name: 'RabbitMQ',         level: 80, sort_order: 6 },
  { id: 'sk-8',  group_id: 'sg-backend',  name: 'LINQ',             level: 85, sort_order: 7 },
  { id: 'sk-9',  group_id: 'sg-cloud',    name: 'Docker',           level: 85, sort_order: 0 },
  { id: 'sk-10', group_id: 'sg-cloud',    name: 'Kubernetes',       level: 75, sort_order: 1 },
  { id: 'sk-11', group_id: 'sg-cloud',    name: 'Azure',            level: 80, sort_order: 2 },
  { id: 'sk-12', group_id: 'sg-cloud',    name: 'GitLab CI/CD',     level: 85, sort_order: 3 },
  { id: 'sk-13', group_id: 'sg-cloud',    name: 'Azure DevOps',     level: 80, sort_order: 4 },
  { id: 'sk-14', group_id: 'sg-cloud',    name: 'ArgoCD',           level: 70, sort_order: 5 },
  { id: 'sk-15', group_id: 'sg-cloud',    name: 'Git',              level: 90, sort_order: 6 },
  { id: 'sk-16', group_id: 'sg-frontend', name: 'React',            level: 80, sort_order: 0 },
  { id: 'sk-17', group_id: 'sg-frontend', name: 'React Native',     level: 75, sort_order: 1 },
  { id: 'sk-18', group_id: 'sg-frontend', name: 'JavaScript',       level: 80, sort_order: 2 },
  { id: 'sk-19', group_id: 'sg-frontend', name: 'TypeScript',       level: 65, sort_order: 3 },
  { id: 'sk-20', group_id: 'sg-frontend', name: 'HTML5 / CSS3',     level: 80, sort_order: 4 },
  { id: 'sk-21', group_id: 'sg-frontend', name: 'Tailwind CSS',     level: 70, sort_order: 5 },
  { id: 'sk-22', group_id: 'sg-data',     name: 'Databricks',       level: 75, sort_order: 0 },
  { id: 'sk-23', group_id: 'sg-data',     name: 'Azure Data Factory', level: 75, sort_order: 1 },
  { id: 'sk-24', group_id: 'sg-data',     name: 'Python',           level: 65, sort_order: 2 },
  { id: 'sk-25', group_id: 'sg-data',     name: 'Machine Learning', level: 70, sort_order: 3 },
  { id: 'sk-26', group_id: 'sg-soft',     name: 'Problem Solving',    icon: '🧩', level: 90, sort_order: 0 },
  { id: 'sk-27', group_id: 'sg-soft',     name: 'Team Collaboration', icon: '🤝', level: 90, sort_order: 1 },
  { id: 'sk-28', group_id: 'sg-soft',     name: 'Communication',      icon: '💬', level: 85, sort_order: 2 },
  { id: 'sk-29', group_id: 'sg-soft',     name: 'Adaptability',       icon: '🔄', level: 88, sort_order: 3 },
  { id: 'sk-30', group_id: 'sg-soft',     name: 'Critical Thinking',  icon: '🎯', level: 85, sort_order: 4 },
  { id: 'sk-31', group_id: 'sg-soft',     name: 'Time Management',    icon: '⏱',  level: 82, sort_order: 5 },
  { id: 'sk-32', group_id: 'sg-soft',     name: 'Mentoring',          icon: '🌱', level: 78, sort_order: 6 },
  { id: 'sk-33', group_id: 'sg-soft',     name: 'Agile / Scrum',      icon: '⚡', level: 88, sort_order: 7 },
]

const softSkillCategories = [
  { id: 'ssc-1', title: 'Communication',  icon: '💬', tags: ['Technical Writing', 'Stakeholder Presentation', 'Cross-cultural Collaboration'], sort_order: 0 },
  { id: 'ssc-2', title: 'Leadership',     icon: '🌱', tags: ['Team Mentoring', 'Code Review Culture', 'Initiative Taking'],                    sort_order: 1 },
  { id: 'ssc-3', title: 'Delivery',       icon: '⚡', tags: ['Agile / Scrum', 'Deadline-driven', 'Iterative Improvement'],                    sort_order: 2 },
  { id: 'ssc-4', title: 'Collaboration',  icon: '🤝', tags: ['Remote-first', 'Pair Programming', 'Knowledge Sharing'],                        sort_order: 3 },
]

const languages = [
  { id: 'lang-1', name: 'German',  level: 'B1',     sort_order: 0 },
  { id: 'lang-2', name: 'English', level: 'B2',     sort_order: 1 },
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
