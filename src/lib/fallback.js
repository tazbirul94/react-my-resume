import deResume from '@/template/resume.de_GER'

// Fallback data derived from resume.example.en_US.js
// Used when Supabase is not configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing)
// Field names match Supabase column names (snake_case)

const basics = {
  name: 'MD TAZBIRUL HAQUE',
  label: 'SOFTWARE ENGINEER',
  picture: '../resouces/images/galaxy head.jpg',
  email: 'tazbirul94@gmail.com',
  phone: '+49 17657742207',
  website: '<WEBSITE>',
  summary: [
    'Doing Masters in Information Engineering and Computer Science in Hochschule Rhein-Waal',
    'Currently working as a Software Engineer(Werkstudent) in Netzlab GmbH',
    "Driven web programmer with more than 2 year's experience in Asp.Net, Asp.Net Core web API & C#. Also worked as both front and back end developer.",
  ],
  city: 'Essen',
  country_code: 'Germany',
  postal_code: '45141',
}

const profiles = [
  {
    network: 'github',
    username: 'Tazbirul94',
    url: 'https://github.com/tazbirul94',
    sort_order: 0,
  },
]

const work = [
  {
    company: 'Netzlab GmbH',
    logo: null,
    website: 'https://netzlab.de/',
    position: 'Software Engineer (Working Student)',
    employment_type: null,
    mode: null,
    location: null,
    start_date: '2020-10-01',
    end_date: null,
    summary: '<C#, Asp.Net Core Web API, React Native, React, Javascript, CSS, Git, Azure>',
    highlights: [
      'Developing and maintaining application using React Native, C#, Asp.Net Core, ReactJS, MS SQL, jQuery.',
      'Web API, REST API, MS SQL Server, LINQ, Version Controlling with Azure.',
      'Working with a team with responsibilities maintaining Agile Software Development(SCRUM).',
    ],
    skills: null,
    sort_order: 0,
  },
  {
    company: 'Convince Computer Limited',
    logo: null,
    website: 'https://www.convincebd.com/',
    position: 'Programmer (Full-Time)',
    employment_type: null,
    mode: null,
    location: null,
    start_date: '2017-09-15',
    end_date: '2019-09-15',
    summary: '<C#, Asp.Net MVC, Javascript, Html 5, CSS3, Github>',
    highlights: [
      'Implemented business logics using ASP.Net MVC, C# and designed management websites.',
      'Worked and manipulated large amount of data using MS SQL.',
      'Gathered information from clients and implemented them and Version controlled with Github.',
    ],
    skills: null,
    sort_order: 1,
  },
  {
    company: 'China Railway Major Bridge Engineering Co., Ltd.',
    logo: null,
    website: 'http://www.crecg.com/english/2687/3808/3938/index.html',
    position: 'IT Engineer (Full-Time)',
    employment_type: null,
    mode: null,
    location: null,
    start_date: '2017-05-15',
    end_date: '2017-08-15',
    summary: '',
    highlights: [
      'Maintained and monitored the internal servers and other relevant devices.',
      'Solved the major issues the local network system.',
    ],
    skills: null,
    sort_order: 2,
  },
]

const education = [
  {
    institution: 'Hochschule Rhein-Waal',
    logo: null,
    website: null,
    degree: null,
    area: 'Master in Information Engineering and Computer Science',
    location: null,
    start_date: '2020-03-01',
    end_date: null,
    gpa: '<GRADE_POINT_AVERAGE>',
    gpa_german: null,
    summary: '<SUMMARY>',
    courses: ['<COURSE_1>', '<COURSE_2>', '<COURSE_3>'],
    sort_order: 0,
  },
  {
    institution: 'Ahsanullah University of Science and Technology',
    logo: null,
    website: null,
    degree: null,
    area: 'Bacholer in Computer Science and Engineering',
    location: null,
    start_date: '2013-03-01',
    end_date: '2017-03-01',
    gpa: '3.34',
    gpa_german: '2.1',
    summary: '<SUMMARY>',
    courses: ['<COURSE_1>', '<COURSE_2>', '<COURSE_3>'],
    sort_order: 1,
  },
  {
    institution: 'SOS Hermann Gmeiner College',
    logo: null,
    website: null,
    degree: null,
    area: 'Higher Seconday Certificate',
    location: null,
    start_date: '2010-06-01',
    end_date: '2012-06-01',
    gpa: '5',
    gpa_german: '1',
    summary: '<SUMMARY>',
    courses: ['<COURSE_1>', '<COURSE_2>', '<COURSE_3>'],
    sort_order: 2,
  },
]

// skill_groups with nested skillDetails (matching useSkills hook shape)
const skillGroups = [
  {
    id: 'fallback-group-1',
    title: '<DESCRIPTION_TITLE>',
    description: ['<DESCRIPTION_1>', '<DESCRIPTION_2>', '<DESCRIPTION_3>'],
    type: 'hard',
    sort_order: 0,
  },
]

const skills = [
  {
    id: 'fallback-skill-1',
    group_id: 'fallback-group-1',
    name: '<SKILL_NAME>',
    level: null,
    sort_order: 0,
  },
]

const languages = [
  {
    name: '<LANGUAGE_NAME>',
    level: '<LANGUAGE_LEVEL>',
    sort_order: 0,
  },
]

const interests = [
  {
    name: '<INTEREST_NAME>',
    keywords: ['<KEYWORD_1>', '<KEYWORD_2>', '<KEYWORD_3>'],
    sort_order: 0,
  },
]

const projects = [
  {
    name: '<PUBLICATION_NAME>',
    image_thumb: '<THUMBNAIL_IMAGE>',
    image_modal: '<MODAL_IMAGE>',
    website: '<WEBSITE>',
    category: '<CATEGORY>',
    publisher: '<PUBLISHER>',
    release_date: null,
    keywords: ['<KEYWORD_1>', '<KEYWORD_2>', '<KEYWORD_3>'],
    sort_order: 0,
  },
]

const certifications = []

const testimonials = [
  {
    name: '<REFERENCE_NAME>',
    position: '<POSITION>',
    company: '<COMPANY>',
    reference: '<SUMMARY>',
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
