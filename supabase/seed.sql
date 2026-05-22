-- Seed data for react-my-resume
-- Run in order: basics → profiles → work → education → skill_groups → skills → languages → interests → projects → certifications → testimonials

-- basics
INSERT INTO basics (name, label, picture, email, phone, website, summary, city, country_code, postal_code)
VALUES (
  'MD TAZBIRUL HAQUE',
  'SOFTWARE ENGINEER',
  'images/myself2.jpg',
  'tazbirul94@gmail.com',
  '+49 17657742207',
  NULL,
  ARRAY[
    '7+ years building enterprise .NET/C# systems — currently at CTS EVENTIM architecting microservices with Docker, Kubernetes, and RabbitMQ.',
    'Previously at Swiss Re (Movingdots) delivering telematics data pipelines on Azure for usage-based insurance. Master''s thesis on ML crash detection (Decision Tree, SVM, ANN).',
    'Master''s in Information Engineering · Hochschule Rhein-Waal · German B1 · Bremen, Germany.'
  ],
  'Bremen',
  'Germany',
  '28201'
);

-- profiles
INSERT INTO profiles (network, username, url, sort_order) VALUES
  ('github',   'Tazbirul94',    'https://github.com/tazbirul94',                      0),
  ('linkedin', 'tazbirul-haque','https://www.linkedin.com/in/tazbirul-haque',         1);

-- work
INSERT INTO work (company, logo, website, position, employment_type, location, start_date, end_date, summary, highlights, skills, sort_order)
VALUES
(
  'CTS EVENTIM AG & Co. KGaA',
  'images/eventim-logo.png',
  'https://karriere.eventim.de/en/',
  'Software Development Expert',
  'Full-Time',
  'Bremen, Germany',
  '2023-07-01',
  NULL,
  NULL,
  ARRAY[
    'Design and maintain enterprise applications using C#, ASP.NET Core, and modern modulith architecture.',
    'Implement and optimize RESTful APIs and GraphQL services for scalable system integrations.',
    'Manage MS SQL Server (stored procedures, indexing, optimization) and Entity Framework for ORM-based database access.',
    'Modernize legacy PowerBuilder applications to .NET with improved maintainability.',
    'Build event-driven workflows with RabbitMQ and deploy containerized services with Docker and Kubernetes.',
    'Automate CI/CD pipelines in GitLab using YAML and ArgoCD for faster, reliable deployments.'
  ],
  ARRAY['C#','ASP.NET Core','Docker','Kubernetes','RabbitMQ','MS SQL','GraphQL','GitLab CI/CD','Entity Framework','ArgoCD'],
  0
),
(
  'Swiss Re (Movingdots GmbH)',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Senior Full Stack Developer',
  'Full-Time',
  'Remote',
  '2023-04-01',
  '2023-06-30',
  NULL,
  ARRAY[
    'Led Databricks and Azure Data Factory pipelines to process large-scale telematics data for usage-based insurance.',
    'Built features enabling insurers to assess driver risk profiles and crash likelihood more accurately.',
    'Contributed to ADAS Risk Score product leveraging advanced driver-assistance system data.'
  ],
  ARRAY['C#','ASP.NET Core','Databricks','Azure Data Factory','React','Azure DevOps'],
  1
),
(
  'Swiss Re (Movingdots GmbH)',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Full Stack Developer',
  'Full-Time',
  'Remote',
  '2022-04-01',
  '2023-03-31',
  NULL,
  ARRAY[
    'Delivered production-grade APIs and optimized database queries with MS SQL, LINQ, and Entity Framework.',
    'Enhanced insurance telematics platforms with REST API integrations and cloud service connections.',
    'Implemented CI/CD pipelines with Git and Azure DevOps, automating builds and deployments.'
  ],
  ARRAY['C#','ASP.NET Core','MS SQL','LINQ','Entity Framework','Azure DevOps','React'],
  2
),
(
  'Swiss Re (Movingdots GmbH)',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Full Stack Developer',
  'Working Student',
  'Kleve, Germany',
  '2021-08-01',
  '2022-03-31',
  NULL,
  ARRAY[
    'Contributed to full-stack projects with C#, ASP.NET Core, ReactJS, React Native, and MS SQL.',
    'Completed Master''s thesis: "Crash Detection using ML Models (Decision Tree, SVM, ANN) with Hyperparameter Optimization" on real Swiss Re telematics data.'
  ],
  ARRAY['C#','ASP.NET Core','React','React Native','MS SQL','Python'],
  3
),
(
  'Netzlab GmbH',
  'images/netzlab_gmbh_logo.jpg',
  'https://netzlab.de/',
  'Software Engineer',
  'Working Student',
  'Düsseldorf, Germany',
  '2020-10-01',
  '2021-07-31',
  NULL,
  ARRAY[
    'Developed and maintained mobile and web applications using React Native, C#, ASP.NET Core, and MS SQL.',
    'Built REST APIs and managed version control with Azure DevOps.'
  ],
  ARRAY['C#','ASP.NET Core','React Native','React','MS SQL'],
  4
),
(
  'Convince Computer Limited',
  'images/CCL-logo.jpg',
  'https://www.convincebd.com/',
  'Programmer',
  'Full-Time',
  'Dhaka, Bangladesh',
  '2017-09-15',
  '2019-09-15',
  NULL,
  ARRAY[
    'Built business management web applications using ASP.NET MVC and C#.',
    'Processed and queried large datasets with MS SQL Server.'
  ],
  ARRAY['C#','ASP.NET MVC','MS SQL','JavaScript','HTML5','CSS3'],
  5
);

-- education
INSERT INTO education (institution, logo, website, degree, area, location, start_date, end_date, gpa, gpa_german, summary, courses, sort_order)
VALUES
(
  'Hochschule Rhein-Waal',
  'images/Hochschule_Rhein-Waal-logo.png',
  'https://www.hochschule-rhein-waal.de/',
  'Master of Science',
  'Master in Information Engineering and Computer Science',
  'Kleve, Germany',
  '2020-03-01',
  '2023-02-01',
  '1.8',
  '1.8',
  ARRAY[
    'Strong focus on software engineering, distributed systems, cloud computing, and data analytics.',
    'Master''s Thesis: "Crash Detection using Machine Learning Models (Decision Tree, SVM, and ANN) with Hyperparameter Optimization", developed with Swiss Re (Movingdots GmbH).'
  ],
  ARRAY[]::text[],
  0
),
(
  'Ahsanullah University of Science and Technology',
  'images/AUST.png',
  'https://aust.edu/',
  'Bachelor of Science',
  'Bachelor in Computer Science and Engineering',
  'Dhaka, Bangladesh',
  '2013-03-01',
  '2017-03-01',
  '3.34',
  '2.1',
  ARRAY['Comprehensive program covering software engineering, algorithms, operating systems, databases, and AI.'],
  ARRAY[]::text[],
  1
),
(
  'SOS Hermann Gmeiner College',
  'images/HGC.png',
  NULL,
  NULL,
  'Higher Secondary Certificate',
  'Dhaka, Bangladesh',
  '2010-06-01',
  '2012-06-01',
  '5.0',
  '1.0',
  ARRAY[]::text[],
  ARRAY[]::text[],
  2
);

-- skill_groups
INSERT INTO skill_groups (title, description, type, sort_order) VALUES
  ('Backend',           ARRAY[]::text[], 'hard', 0),
  ('Cloud & DevOps',    ARRAY[]::text[], 'hard', 1),
  ('Frontend & Mobile', ARRAY[]::text[], 'hard', 2),
  ('Data & ML',         ARRAY[]::text[], 'hard', 3);

-- skills (CTE joins on group title)
WITH sg AS (
  SELECT id, title FROM skill_groups
)
INSERT INTO skills (group_id, name, level, sort_order)
SELECT sg.id, s.name, s.level, s.sort_order
FROM (VALUES
  ('Backend',           'C#',                95, 0),
  ('Backend',           'ASP.NET Core',       92, 1),
  ('Backend',           'Entity Framework',   85, 2),
  ('Backend',           'REST APIs',          90, 3),
  ('Backend',           'GraphQL',            75, 4),
  ('Backend',           'MS SQL Server',      85, 5),
  ('Backend',           'RabbitMQ',           80, 6),
  ('Backend',           'LINQ',               85, 7),
  ('Cloud & DevOps',    'Docker',             85, 0),
  ('Cloud & DevOps',    'Kubernetes',         75, 1),
  ('Cloud & DevOps',    'Azure',              80, 2),
  ('Cloud & DevOps',    'GitLab CI/CD',       85, 3),
  ('Cloud & DevOps',    'Azure DevOps',       80, 4),
  ('Cloud & DevOps',    'ArgoCD',             70, 5),
  ('Cloud & DevOps',    'Git',                90, 6),
  ('Frontend & Mobile', 'React',              80, 0),
  ('Frontend & Mobile', 'React Native',       75, 1),
  ('Frontend & Mobile', 'JavaScript',         80, 2),
  ('Frontend & Mobile', 'TypeScript',         65, 3),
  ('Frontend & Mobile', 'HTML5 / CSS3',       80, 4),
  ('Frontend & Mobile', 'Tailwind CSS',       70, 5),
  ('Data & ML',         'Databricks',         75, 0),
  ('Data & ML',         'Azure Data Factory', 75, 1),
  ('Data & ML',         'Python',             65, 2),
  ('Data & ML',         'Machine Learning',   70, 3)
) AS s(group_title, name, level, sort_order)
JOIN sg ON sg.title = s.group_title;

-- languages
INSERT INTO languages (name, level, sort_order) VALUES
  ('German',  'B1',     0),
  ('English', 'B2',     1),
  ('Bengali', 'Native', 2);

-- interests
INSERT INTO interests (name, keywords, sort_order) VALUES
  ('Photography', ARRAY['Landscapes', 'Nature', 'Street'],         0),
  ('Travel',      ARRAY['City breaks', 'Hiking'],                  1),
  ('Cooking',     ARRAY['Bangladeshi', 'BBQ', 'Experimenting'],    2),
  ('DIY Projects',ARRAY['Quilling', 'Origami', 'Puzzles'],         3),
  ('Music',       ARRAY['Guitar', 'Piano', 'Spotify'],             4);

-- projects
INSERT INTO projects (name, category, publisher, website, release_date, keywords, sort_order) VALUES
(
  'ML Crash Detection',
  'Research / ML',
  'Hochschule Rhein-Waal × Swiss Re',
  'https://github.com/tazbirul94',
  '2023-02-01',
  ARRAY['Python', 'Machine Learning', 'SVM', 'Decision Tree', 'ANN', 'Telematics'],
  0
),
(
  'React Resume Portfolio',
  'Web App',
  'Personal',
  'https://tazbirul94.github.io/react-my-resume',
  '2024-01-01',
  ARRAY['React', 'Vite', 'Tailwind CSS', 'Supabase', 'i18n', 'GitHub Pages'],
  1
),
(
  'Insurance Telematics API',
  'Enterprise / Backend',
  'Swiss Re (Movingdots)',
  'https://www.movingdots.com/',
  '2023-03-01',
  ARRAY['C#', 'ASP.NET Core', 'Databricks', 'Azure', 'REST APIs', 'Telematics'],
  2
);

-- certifications
INSERT INTO certifications (title, issuer, logo, issue_date, credential_url, sort_order) VALUES
(
  'Telc German B1',
  'telc gGmbH',
  'images/telc.png',
  '2025-03-01',
  'https://results.telc.net/qr/qM2RD7IlSqC3FxHsVhgNkYwqmfcuck9Vjx217LH-8RzXJQ6WQxhBOIxE5r8xPoFM',
  0
),
(
  'C# (Basic)',
  'HackerRank',
  'images/hackerrank.png',
  '2021-10-01',
  'https://www.hackerrank.com/certificates/d976e40ae220',
  1
);

-- testimonials
INSERT INTO testimonials (name, position, company, reference, sort_order) VALUES
(
  'Md Shahabub Alam',
  'Research Assistant · NLP, Deep Learning & Computer Vision',
  'DFKI',
  'He is a very passionate person and highly skilled. In fact he knows what he is trying to do which can really be appreciated. He can also break complex problems into smaller ones, which helps solve them within a decent time.',
  0
);
