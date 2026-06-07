-- Bilingual resume update for Supabase SQL Editor.
--
-- Source documents:
-- - MD_Tazbirul_Haque_CV_EN_HPA.docx
-- - MD_Tazbirul_Haque_Lebenslauf_DE_HPA.docx
--
-- Target auth/account email supplied by user: tazbirul.mbec@gmail.com
--
-- Live DB check on 2026-05-31:
-- - basics has en-US and de-DE rows.
-- - resume content tables are locale-scoped, not user-scoped.
-- - basics has extra live columns not present in the local schema:
--   tagline, hero_chips, first_name, last_name.
--
-- This script refreshes both English and German rows for:
-- basics, profiles, work, education, skill_groups, skills, languages.
--
-- It intentionally leaves projects, certifications, interests, and testimonials
-- untouched because the HPA CV files do not contain those sections.

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO locales (code, label, is_active, sort_order)
VALUES
  ('en-US', 'EN', true, 0),
  ('de-DE', 'DE', true, 1)
ON CONFLICT (code) DO UPDATE
SET label = EXCLUDED.label,
    is_active = EXCLUDED.is_active,
    sort_order = EXCLUDED.sort_order;

ALTER TABLE basics ADD COLUMN IF NOT EXISTS tagline text;
ALTER TABLE basics ADD COLUMN IF NOT EXISTS hero_chips text[];
ALTER TABLE basics ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE basics ADD COLUMN IF NOT EXISTS last_name text;

CREATE UNIQUE INDEX IF NOT EXISTS basics_locale_unique ON basics (locale);

DO $$
BEGIN
  IF to_regclass('auth.users') IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM auth.users WHERE email = 'tazbirul.mbec@gmail.com') THEN
      RAISE NOTICE 'Found Supabase auth user: tazbirul.mbec@gmail.com';
    ELSE
      RAISE NOTICE 'No auth.users row found for tazbirul.mbec@gmail.com. Resume content tables are locale-scoped, so continuing with en-US and de-DE.';
    END IF;
  END IF;
END $$;

-- Basics
INSERT INTO basics (
  locale,
  name,
  label,
  picture,
  email,
  phone,
  website,
  summary,
  city,
  country_code,
  postal_code,
  tagline,
  hero_chips,
  first_name,
  last_name,
  updated_at
)
VALUES
(
  'en-US',
  'MD Tazbirul Haque',
  'Senior Full-Stack Developer | C#/.NET, Angular, Kubernetes, DevOps',
  COALESCE((SELECT picture FROM basics WHERE locale = 'en-US' LIMIT 1), 'images/myself2.jpg'),
  'tazbirul.mbec@gmail.com',
  '+49 176 57742207',
  'https://tazbirul94.github.io/myresume',
  ARRAY[
    'Senior software developer with 7+ years of experience in enterprise software development, full-stack engineering, backend services, legacy modernization, and cloud-native delivery.',
    'Strong hands-on experience with C#/.NET, ASP.NET Core, Angular, SQL, RabbitMQ, Keycloak, OpenTelemetry, Docker, Kubernetes, Helm, Argo CD, Azure DevOps, CI/CD, automated testing, and code reviews.',
    'Experienced in building reliable, secure, and maintainable software for business-critical environments.'
  ],
  'Bremen',
  'Germany',
  '28201',
  'Full-stack developer for business-critical .NET and Angular systems, Kubernetes delivery, secure integrations, and legacy modernization.',
  ARRAY['C#/.NET', 'Angular', 'Kubernetes', 'RabbitMQ', 'Keycloak', 'OpenTelemetry'],
  'MD',
  'Tazbirul Haque',
  now()
),
(
  'de-DE',
  'MD Tazbirul Haque',
  'Senior Full-Stack Developer | C#/.NET, Angular, Kubernetes, DevOps',
  COALESCE((SELECT picture FROM basics WHERE locale = 'de-DE' LIMIT 1), 'images/myself2.jpg'),
  'tazbirul.mbec@gmail.com',
  '+49 176 57742207',
  'https://tazbirul94.github.io/myresume',
  ARRAY[
    'Softwareentwickler mit mehr als 7 Jahren Erfahrung in Enterprise-Softwareentwicklung, Full-Stack-Entwicklung, Backend-Systemen, Modernisierung von Legacy-Anwendungen und cloudnaher Softwarebereitstellung.',
    'Praxiserfahrung mit C#/.NET, ASP.NET Core, Angular, SQL, RabbitMQ, Keycloak, OpenTelemetry, Docker, Kubernetes, Helm, Argo CD, Azure DevOps, CI/CD, automatisierten Tests und Code Reviews.',
    'Stark in zuverlässigen, sicheren und wartbaren Anwendungen für geschäftskritische Umgebungen.'
  ],
  'Bremen',
  'Deutschland',
  '28201',
  'Full-Stack-Entwickler für geschäftskritische .NET- und Angular-Systeme, Kubernetes-Deployments, sichere Integrationen und Legacy-Modernisierung.',
  ARRAY['C#/.NET', 'Angular', 'Kubernetes', 'RabbitMQ', 'Keycloak', 'OpenTelemetry'],
  'MD',
  'Tazbirul Haque',
  now()
)
ON CONFLICT (locale) DO UPDATE
SET name = EXCLUDED.name,
    label = EXCLUDED.label,
    picture = EXCLUDED.picture,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    website = EXCLUDED.website,
    summary = EXCLUDED.summary,
    city = EXCLUDED.city,
    country_code = EXCLUDED.country_code,
    postal_code = EXCLUDED.postal_code,
    tagline = EXCLUDED.tagline,
    hero_chips = EXCLUDED.hero_chips,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    updated_at = now();

-- Profiles
DELETE FROM profiles WHERE locale IN ('en-US', 'de-DE');

INSERT INTO profiles (locale, network, username, url, sort_order)
VALUES
  ('en-US', 'github', 'Tazbirul94', 'https://github.com/tazbirul94', 0),
  ('en-US', 'linkedin', 'tazbirul-haque', 'https://www.linkedin.com/in/tazbirul-haque', 1),
  ('en-US', 'portfolio', 'myresume', 'https://tazbirul94.github.io/myresume', 2),
  ('de-DE', 'github', 'Tazbirul94', 'https://github.com/tazbirul94', 0),
  ('de-DE', 'linkedin', 'tazbirul-haque', 'https://www.linkedin.com/in/tazbirul-haque', 1),
  ('de-DE', 'portfolio', 'myresume', 'https://tazbirul94.github.io/myresume', 2);

-- Work
DELETE FROM work WHERE locale IN ('en-US', 'de-DE');

INSERT INTO work (
  locale,
  company,
  logo,
  website,
  position,
  employment_type,
  mode,
  location,
  start_date,
  end_date,
  summary,
  highlights,
  skills,
  sort_order
)
VALUES
(
  'en-US',
  'CTS EVENTIM AG & Co. KGaA',
  'images/eventim-logo.png',
  'https://karriere.eventim.de/en/',
  'Software Development Expert',
  'Full-Time',
  NULL,
  'Bremen, Germany',
  '2023-07-01',
  NULL,
  'Develop and modernize enterprise backend systems for business-critical environments.',
  ARRAY[
    'Develop and modernize enterprise backend systems using C#, .NET, ASP.NET Core, SQL Server, Entity Framework, Docker, Kubernetes, Helm, Argo CD, RabbitMQ, GraphQL, and Swagger/OpenAPI.',
    'Contribute to the migration of a legacy PowerBuilder module into a modern .NET-based architecture.',
    'Build and maintain secure integrations using Keycloak, authentication, authorization, and role-based access control.',
    'Work deeply with SQL Server, including stored procedures, indexes, database roles, role members, permissions, and query optimization.',
    'Improve observability and diagnostics using OpenTelemetry for distributed tracing and production visibility.',
    'Ensure quality through integration tests, NUnit tests, code reviews, clean code practices, Jira, and Confluence documentation.',
    'Led an accepted PoC for deeper AI-assisted development using GitHub Copilot and Claude Code; a new team was assigned under my responsibility to scale the approach.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OpenTelemetry', 'NUnit', 'Jira', 'Confluence'],
  0
),
(
  'en-US',
  'Swiss Re / Movingdots GmbH / Powerfleet',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Senior Full Stack Developer',
  'Full-Time',
  NULL,
  'Bremen, Germany',
  '2021-08-01',
  '2023-06-30',
  'Developed full-stack telematics software across frontend, backend, deployment environments, cloud services, and service integrations.',
  ARRAY[
    'Developed full-stack telematics software using C#, ASP.NET, Angular, React, Azure DevOps, Azure Services, Azure Service Bus, PostgreSQL, MongoDB, and OpenTelemetry.',
    'Worked across frontend, backend, deployment environments, cloud services, and service integrations.',
    'Completed a Master''s thesis on COLORED / Coloride, creating an AI-based crash detection algorithm using SVM, ANN, decision trees, and optimized hyperparameters.',
    'Promoted to Senior Software Developer with lead-like responsibility for the COLORED / Coloride project.'
  ],
  ARRAY['C#', 'ASP.NET', 'Angular', 'React', 'Azure DevOps', 'Azure Services', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Machine Learning'],
  1
),
(
  'en-US',
  'Netzlab GmbH',
  'images/netzlab_gmbh_logo.jpg',
  'https://netzlab.de/',
  'Software Developer',
  'Working Student',
  NULL,
  'Dortmund, Germany',
  '2020-10-01',
  '2021-07-31',
  'Developed and maintained C#/.NET software systems, backend and web components, databases, internal tools, and mini-golf related software in a small product-focused engineering team.',
  ARRAY[
    'Developed and maintained C#/.NET software systems, backend services, web components, databases, internal tools, and mini-golf related software.',
    'Implemented backend features and data access logic with C#, .NET, SQL, and structured database queries.',
    'Built and adjusted web components and internal application workflows, connecting frontend behavior with backend services.',
    'Supported bug fixing, software maintenance, refactoring, technical documentation, and system structuring in an agile working-student role.',
    'Strengthened practical engineering habits around readable code, maintainability, troubleshooting, and collaboration in a German software company.'
  ],
  ARRAY['C#', '.NET', 'SQL', 'Backend Development', 'Web Components', 'Databases', 'Internal Tools', 'Bug Fixing', 'Refactoring', 'Technical Documentation'],
  2
),
(
  'en-US',
  'Computer Communication Ltd.',
  'images/CCL-logo.jpg',
  'https://www.ccl.com.bd/',
  'Software Developer',
  'Full-Time',
  NULL,
  'Bangladesh',
  '2017-09-15',
  '2019-09-15',
  'Developed enterprise and banking software using C#, .NET Core, Blazor, MVC, ASP.NET, and MS SQL Server for business-critical financial workflows.',
  ARRAY[
    'Developed enterprise and banking software using C#, .NET Core, Blazor, MVC, ASP.NET, and MS SQL Server.',
    'Worked on banking cashing and reporting systems for Citi Bank in Bangladesh, supporting operational reporting and transaction-related workflows.',
    'Built and maintained database-backed modules with SQL queries, stored procedures, reporting logic, validation rules, and role-aware application behavior.',
    'Contributed to full software delivery tasks including requirement clarification, implementation, bug fixing, testing support, deployment preparation, and user-support follow-up.',
    'Gained strong early-career experience in enterprise software discipline, database design, production issue analysis, and secure handling of financial-domain data.'
  ],
  ARRAY['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'Reporting', 'Enterprise Software', 'Banking Software', 'Financial Workflows'],
  3
),
(
  'de-DE',
  'CTS EVENTIM AG & Co. KGaA',
  'images/eventim-logo.png',
  'https://karriere.eventim.de/en/',
  'Software Development Expert',
  'Vollzeit',
  NULL,
  'Bremen, Deutschland',
  '2023-07-01',
  NULL,
  'Entwicklung und Modernisierung von Enterprise-Backend-Systemen für geschäftskritische Umgebungen.',
  ARRAY[
    'Entwicklung und Modernisierung von Enterprise-Backend-Systemen mit C#, .NET, ASP.NET Core, SQL Server, Entity Framework, Docker, Kubernetes, Helm, Argo CD, RabbitMQ, GraphQL und Swagger/OpenAPI.',
    'Mitarbeit an der Migration eines älteren PowerBuilder-Moduls in eine moderne .NET-basierte Anwendung.',
    'Umsetzung sicherer Integrationen mit Keycloak, Authentifizierung, Autorisierung und rollenbasierter Zugriffskontrolle.',
    'Intensive Arbeit mit SQL Server, Stored Procedures, Indizes, Datenbankrollen, Berechtigungen und Query-Optimierung.',
    'Verbesserung von Observability und Diagnosemöglichkeiten mit OpenTelemetry und Distributed Tracing.',
    'Sicherung der Softwarequalität durch Integrationstests, NUnit-Tests, Code Reviews, Clean Code, Jira und Confluence.',
    'Durchführung eines akzeptierten Proof of Concept zur stärkeren Integration von GitHub Copilot und Claude Code in den Entwicklungsprozess; anschließend Übernahme von Verantwortung für die Skalierung dieses Ansatzes.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OpenTelemetry', 'NUnit', 'Jira', 'Confluence'],
  0
),
(
  'de-DE',
  'Swiss Re / Movingdots GmbH / Powerfleet',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Senior Full Stack Developer',
  'Vollzeit',
  NULL,
  'Bremen, Deutschland',
  '2021-08-01',
  '2023-06-30',
  'Full-Stack-Entwicklung von Telematik-Software über Frontend, Backend, Deployment-Umgebungen, Cloud Services und Systemintegrationen hinweg.',
  ARRAY[
    'Full-Stack-Entwicklung von Telematik-Software mit C#, ASP.NET, Angular, React, Azure DevOps, Azure Services, Azure Service Bus, PostgreSQL, MongoDB und OpenTelemetry.',
    'Arbeit an Frontend, Backend, Deployment-Umgebungen, Cloud Services und Systemintegrationen.',
    'Masterarbeit zum Projekt COLORED / Coloride mit Entwicklung eines KI-basierten Crash-Detection-Algorithmus mit SVM, ANN und Entscheidungsbäumen.',
    'Beförderung zum Senior Software Developer mit projektähnlicher Verantwortung für COLORED / Coloride.'
  ],
  ARRAY['C#', 'ASP.NET', 'Angular', 'React', 'Azure DevOps', 'Azure Services', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Machine Learning'],
  1
),
(
  'de-DE',
  'Netzlab GmbH',
  'images/netzlab_gmbh_logo.jpg',
  'https://netzlab.de/',
  'Softwareentwickler',
  'Werkstudent',
  NULL,
  'Dortmund, Deutschland',
  '2020-10-01',
  '2021-07-31',
  'Entwicklung und Wartung von C#/.NET-Systemen, Backend-/Web-Komponenten, Datenbanken, internen Tools und Software im Mini-Golf-Umfeld in einem produktorientierten Engineering-Team.',
  ARRAY[
    'Entwicklung und Wartung von C#/.NET-Systemen, Backend-Services, Web-Komponenten, Datenbanken, internen Tools und Software im Mini-Golf-Umfeld.',
    'Implementierung von Backend-Funktionen und Datenzugriffslogik mit C#, .NET, SQL und strukturierten Datenbankabfragen.',
    'Erstellung und Anpassung von Web-Komponenten und internen Workflows mit Verbindung zwischen Frontend-Verhalten und Backend-Services.',
    'Unterstützung bei Bugfixing, Wartung, Refactoring, technischer Dokumentation und Strukturierung von Softwaresystemen in einer agilen Werkstudentenrolle.',
    'Ausbau praktischer Engineering-Kompetenzen in lesbarem Code, Wartbarkeit, Fehlersuche und Zusammenarbeit in einem deutschen Softwareunternehmen.'
  ],
  ARRAY['C#', '.NET', 'SQL', 'Backend-Entwicklung', 'Web-Komponenten', 'Datenbanken', 'Interne Tools', 'Bugfixing', 'Refactoring', 'Technische Dokumentation'],
  2
),
(
  'de-DE',
  'Computer Communication Ltd.',
  'images/CCL-logo.jpg',
  'https://www.ccl.com.bd/',
  'Softwareentwickler',
  'Vollzeit',
  NULL,
  'Bangladesch',
  '2017-09-15',
  '2019-09-15',
  'Entwicklung von Enterprise- und Banking-Software mit C#, .NET Core, Blazor, MVC, ASP.NET und MS SQL Server für geschäftskritische Finanzprozesse.',
  ARRAY[
    'Entwicklung von Enterprise- und Banking-Software mit C#, .NET Core, Blazor, MVC, ASP.NET und MS SQL Server.',
    'Mitarbeit an Banking-Cashing- und Reporting-Systemen für Citi Bank in Bangladesch, inklusive operativer Reports und transaktionsnaher Workflows.',
    'Entwicklung und Wartung datenbankgestützter Module mit SQL-Abfragen, Stored Procedures, Reporting-Logik, Validierungsregeln und rollenbasiertem Anwendungsverhalten.',
    'Mitwirkung an Aufgaben über den gesamten Software-Lifecycle hinweg: Anforderungsabstimmung, Implementierung, Bugfixing, Testunterstützung, Deployment-Vorbereitung und Anwender-Support.',
    'Aufbau solider Enterprise-Erfahrung in Datenbankdesign, Analyse produktiver Fehlerbilder und sicherem Umgang mit Daten aus dem Finanzbereich.'
  ],
  ARRAY['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'Reporting', 'Enterprise-Software', 'Banking-Software', 'Finanzprozesse'],
  3
);

-- Education
DELETE FROM education WHERE locale IN ('en-US', 'de-DE');

INSERT INTO education (
  locale,
  institution,
  logo,
  website,
  degree,
  area,
  location,
  start_date,
  end_date,
  gpa,
  gpa_german,
  summary,
  courses,
  sort_order
)
VALUES
(
  'en-US',
  'Hochschule Rhein-Waal',
  'images/Hochschule_Rhein-Waal-logo.png',
  'https://www.hochschule-rhein-waal.de/',
  'Master''s degree',
  'Information Engineering and Computer Science',
  'Germany',
  '2020-03-01',
  '2023-02-01',
  '1.8',
  '1.8',
  ARRAY['Master''s thesis on COLORED / Coloride: AI-based crash detection using SVM, ANN, decision trees, and hyperparameter optimization.'],
  ARRAY['Information Engineering', 'Computer Science', 'Machine Learning', 'Cloud Computing', 'Distributed Systems'],
  0
),
(
  'en-US',
  'Ahsanullah University of Science and Technology',
  'images/AUST.png',
  'https://aust.edu/',
  'Bachelor of Science',
  'Computer Science and Engineering',
  'Bangladesh',
  '2013-03-01',
  '2017-03-01',
  '3.34',
  '2.1',
  ARRAY[
    'Four-year CSE program with a strong foundation in programming, algorithms, data structures, database systems, operating systems, computer networks, software engineering, and object-oriented design.',
    'Built practical software engineering depth through academic projects, lab work, and team assignments using C/C++, Java, C#, SQL, web technologies, and database-backed applications.',
    'Relevant foundation for enterprise development: analytical problem solving, requirements understanding, system design basics, relational database design, and secure application development concepts.'
  ],
  ARRAY['Programming Fundamentals', 'Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Web Technologies', 'Artificial Intelligence', 'Compiler Design', 'Computer Architecture', 'Discrete Mathematics', 'Numerical Methods'],
  1
),
(
  'de-DE',
  'Hochschule Rhein-Waal',
  'images/Hochschule_Rhein-Waal-logo.png',
  'https://www.hochschule-rhein-waal.de/',
  'Master',
  'Information Engineering and Computer Science',
  'Deutschland',
  '2020-03-01',
  '2023-02-01',
  '1.8',
  '1.8',
  ARRAY['Masterarbeit zum Projekt COLORED / Coloride: KI-basierte Crash Detection mit SVM, ANN, Entscheidungsbäumen und Hyperparameter-Optimierung.'],
  ARRAY['Information Engineering', 'Computer Science', 'Machine Learning', 'Cloud Computing', 'Verteilte Systeme'],
  0
),
(
  'de-DE',
  'Ahsanullah University of Science and Technology',
  'images/AUST.png',
  'https://aust.edu/',
  'Bachelor of Science',
  'Computer Science and Engineering',
  'Bangladesch',
  '2013-03-01',
  '2017-03-01',
  '3.34',
  '2.1',
  ARRAY[
    'Vierjähriges CSE-Studium mit starkem Fundament in Programmierung, Algorithmen, Datenstrukturen, Datenbanksystemen, Betriebssystemen, Rechnernetzen, Software Engineering und objektorientiertem Design.',
    'Praktische Vertiefung durch akademische Projekte, Laborarbeiten und Teamaufgaben mit C/C++, Java, C#, SQL, Web-Technologien und datenbankgestützten Anwendungen.',
    'Relevante Grundlage für Enterprise-Entwicklung: analytische Problemlösung, Anforderungsverständnis, Grundlagen des Systemdesigns, relationales Datenbankdesign und Konzepte sicherer Anwendungsentwicklung.'
  ],
  ARRAY['Programmiergrundlagen', 'Objektorientierte Programmierung', 'Datenstrukturen', 'Algorithmen', 'Datenbanksysteme', 'Betriebssysteme', 'Rechnernetze', 'Software Engineering', 'Web-Technologien', 'Künstliche Intelligenz', 'Compilerbau', 'Computerarchitektur', 'Diskrete Mathematik', 'Numerische Methoden'],
  1
);

-- Skills
DELETE FROM skills
WHERE locale IN ('en-US', 'de-DE')
   OR group_id IN (SELECT id FROM skill_groups WHERE locale IN ('en-US', 'de-DE'));

DELETE FROM skill_groups WHERE locale IN ('en-US', 'de-DE');

INSERT INTO skill_groups (locale, title, description, type, sort_order)
VALUES
  ('en-US', 'Languages', ARRAY['Programming and query languages from the HPA-tailored CV.'], 'hard', 0),
  ('en-US', 'Backend', ARRAY['Backend engineering, API design, and service implementation.'], 'hard', 1),
  ('en-US', 'Frontend', ARRAY['Frontend frameworks and UI implementation.'], 'hard', 2),
  ('en-US', 'Cloud & DevOps', ARRAY['Deployment, container orchestration, CI/CD, and cloud delivery.'], 'hard', 3),
  ('en-US', 'Messaging & Integration', ARRAY['Messaging, integration, and service communication technologies.'], 'hard', 4),
  ('en-US', 'Security & IAM', ARRAY['Identity, access control, and secure integration practices.'], 'hard', 5),
  ('en-US', 'Databases', ARRAY['Relational and NoSQL database systems and optimization work.'], 'hard', 6),
  ('en-US', 'Quality & Tools', ARRAY['Testing, observability, collaboration, and development tools.'], 'hard', 7),
  ('de-DE', 'Programmiersprachen', ARRAY['Programmier- und Abfragesprachen aus dem HPA-Lebenslauf.'], 'hard', 0),
  ('de-DE', 'Backend', ARRAY['Backend-Entwicklung, API-Design und Service-Implementierung.'], 'hard', 1),
  ('de-DE', 'Frontend', ARRAY['Frontend-Frameworks und UI-Implementierung.'], 'hard', 2),
  ('de-DE', 'Cloud & DevOps', ARRAY['Deployment, Container-Orchestrierung, CI/CD und Cloud-Bereitstellung.'], 'hard', 3),
  ('de-DE', 'Messaging & Integration', ARRAY['Messaging, Integration und Service-Kommunikation.'], 'hard', 4),
  ('de-DE', 'Security & IAM', ARRAY['Identity, Zugriffskontrolle und sichere Integrationen.'], 'hard', 5),
  ('de-DE', 'Datenbanken', ARRAY['Relationale und NoSQL-Datenbanken sowie Optimierung.'], 'hard', 6),
  ('de-DE', 'Qualität & Tools', ARRAY['Tests, Observability, Zusammenarbeit und Entwicklungstools.'], 'hard', 7);

WITH sg AS (
  SELECT id, locale, title
  FROM skill_groups
  WHERE locale IN ('en-US', 'de-DE')
)
INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT s.locale, sg.id, s.name, s.level, s.sort_order
FROM (VALUES
  ('en-US', 'Languages', 'C#', 95, 0),
  ('en-US', 'Languages', 'TypeScript', 82, 1),
  ('en-US', 'Languages', 'JavaScript', 82, 2),
  ('en-US', 'Languages', 'SQL', 88, 3),
  ('en-US', 'Backend', '.NET', 92, 0),
  ('en-US', 'Backend', 'ASP.NET Core', 92, 1),
  ('en-US', 'Backend', 'ASP.NET Web API', 88, 2),
  ('en-US', 'Backend', 'Entity Framework', 85, 3),
  ('en-US', 'Backend', 'REST APIs', 90, 4),
  ('en-US', 'Backend', 'GraphQL', 78, 5),
  ('en-US', 'Backend', 'Swagger/OpenAPI', 82, 6),
  ('en-US', 'Frontend', 'Angular', 84, 0),
  ('en-US', 'Frontend', 'React', 78, 1),
  ('en-US', 'Frontend', 'Blazor', 72, 2),
  ('en-US', 'Frontend', 'MVC', 78, 3),
  ('en-US', 'Cloud & DevOps', 'Azure DevOps', 82, 0),
  ('en-US', 'Cloud & DevOps', 'Azure Services', 78, 1),
  ('en-US', 'Cloud & DevOps', 'Docker', 86, 2),
  ('en-US', 'Cloud & DevOps', 'Kubernetes', 80, 3),
  ('en-US', 'Cloud & DevOps', 'Helm', 76, 4),
  ('en-US', 'Cloud & DevOps', 'Argo CD', 76, 5),
  ('en-US', 'Cloud & DevOps', 'GitLab CI/CD', 84, 6),
  ('en-US', 'Cloud & DevOps', 'YAML', 80, 7),
  ('en-US', 'Messaging & Integration', 'RabbitMQ', 82, 0),
  ('en-US', 'Messaging & Integration', 'Azure Service Bus', 76, 1),
  ('en-US', 'Security & IAM', 'Keycloak', 78, 0),
  ('en-US', 'Security & IAM', 'RBAC', 78, 1),
  ('en-US', 'Security & IAM', 'Authentication', 82, 2),
  ('en-US', 'Security & IAM', 'Authorization', 82, 3),
  ('en-US', 'Security & IAM', 'Secure Service Integration', 80, 4),
  ('en-US', 'Databases', 'MS SQL Server', 88, 0),
  ('en-US', 'Databases', 'PostgreSQL', 78, 1),
  ('en-US', 'Databases', 'MongoDB', 72, 2),
  ('en-US', 'Databases', 'Stored Procedures', 84, 3),
  ('en-US', 'Databases', 'Indexes', 84, 4),
  ('en-US', 'Databases', 'Query Optimization', 84, 5),
  ('en-US', 'Databases', 'Database Roles and Permissions', 78, 6),
  ('en-US', 'Quality & Tools', 'OpenTelemetry', 78, 0),
  ('en-US', 'Quality & Tools', 'NUnit', 78, 1),
  ('en-US', 'Quality & Tools', 'Integration Testing', 82, 2),
  ('en-US', 'Quality & Tools', 'Git', 90, 3),
  ('en-US', 'Quality & Tools', 'Jira', 84, 4),
  ('en-US', 'Quality & Tools', 'Confluence', 82, 5),
  ('en-US', 'Quality & Tools', 'Visual Studio', 90, 6),
  ('en-US', 'Quality & Tools', 'VS Code', 86, 7),
  ('en-US', 'Quality & Tools', 'ReSharper', 80, 8),
  ('de-DE', 'Programmiersprachen', 'C#', 95, 0),
  ('de-DE', 'Programmiersprachen', 'TypeScript', 82, 1),
  ('de-DE', 'Programmiersprachen', 'JavaScript', 82, 2),
  ('de-DE', 'Programmiersprachen', 'SQL', 88, 3),
  ('de-DE', 'Backend', '.NET', 92, 0),
  ('de-DE', 'Backend', 'ASP.NET Core', 92, 1),
  ('de-DE', 'Backend', 'ASP.NET Web API', 88, 2),
  ('de-DE', 'Backend', 'Entity Framework', 85, 3),
  ('de-DE', 'Backend', 'REST APIs', 90, 4),
  ('de-DE', 'Backend', 'GraphQL', 78, 5),
  ('de-DE', 'Backend', 'Swagger/OpenAPI', 82, 6),
  ('de-DE', 'Frontend', 'Angular', 84, 0),
  ('de-DE', 'Frontend', 'React', 78, 1),
  ('de-DE', 'Frontend', 'Blazor', 72, 2),
  ('de-DE', 'Frontend', 'MVC', 78, 3),
  ('de-DE', 'Cloud & DevOps', 'Azure DevOps', 82, 0),
  ('de-DE', 'Cloud & DevOps', 'Azure Services', 78, 1),
  ('de-DE', 'Cloud & DevOps', 'Docker', 86, 2),
  ('de-DE', 'Cloud & DevOps', 'Kubernetes', 80, 3),
  ('de-DE', 'Cloud & DevOps', 'Helm', 76, 4),
  ('de-DE', 'Cloud & DevOps', 'Argo CD', 76, 5),
  ('de-DE', 'Cloud & DevOps', 'GitLab CI/CD', 84, 6),
  ('de-DE', 'Cloud & DevOps', 'YAML', 80, 7),
  ('de-DE', 'Messaging & Integration', 'RabbitMQ', 82, 0),
  ('de-DE', 'Messaging & Integration', 'Azure Service Bus', 76, 1),
  ('de-DE', 'Security & IAM', 'Keycloak', 78, 0),
  ('de-DE', 'Security & IAM', 'RBAC', 78, 1),
  ('de-DE', 'Security & IAM', 'Authentifizierung', 82, 2),
  ('de-DE', 'Security & IAM', 'Autorisierung', 82, 3),
  ('de-DE', 'Security & IAM', 'Sichere Service-Integration', 80, 4),
  ('de-DE', 'Datenbanken', 'MS SQL Server', 88, 0),
  ('de-DE', 'Datenbanken', 'PostgreSQL', 78, 1),
  ('de-DE', 'Datenbanken', 'MongoDB', 72, 2),
  ('de-DE', 'Datenbanken', 'Stored Procedures', 84, 3),
  ('de-DE', 'Datenbanken', 'Indizes', 84, 4),
  ('de-DE', 'Datenbanken', 'Query-Optimierung', 84, 5),
  ('de-DE', 'Datenbanken', 'Datenbankrollen und Berechtigungen', 78, 6),
  ('de-DE', 'Qualität & Tools', 'OpenTelemetry', 78, 0),
  ('de-DE', 'Qualität & Tools', 'NUnit', 78, 1),
  ('de-DE', 'Qualität & Tools', 'Integrationstests', 82, 2),
  ('de-DE', 'Qualität & Tools', 'Git', 90, 3),
  ('de-DE', 'Qualität & Tools', 'Jira', 84, 4),
  ('de-DE', 'Qualität & Tools', 'Confluence', 82, 5),
  ('de-DE', 'Qualität & Tools', 'Visual Studio', 90, 6),
  ('de-DE', 'Qualität & Tools', 'VS Code', 86, 7),
  ('de-DE', 'Qualität & Tools', 'ReSharper', 80, 8)
) AS s(locale, group_title, name, level, sort_order)
JOIN sg ON sg.locale = s.locale AND sg.title = s.group_title;

-- Languages
DELETE FROM languages WHERE locale IN ('en-US', 'de-DE');

INSERT INTO languages (locale, name, level, sort_order)
VALUES
  ('en-US', 'English', 'Fluent', 0),
  ('en-US', 'German', 'B1 / professional working proficiency', 1),
  ('en-US', 'Bengali', 'Native', 2),
  ('de-DE', 'Englisch', 'fließend', 0),
  ('de-DE', 'Deutsch', 'B1 / berufliche Arbeitskenntnisse', 1),
  ('de-DE', 'Bengalisch', 'Muttersprache', 2);

COMMIT;

-- Verification queries
--
-- SELECT locale, name, label, email, phone, website, city, country_code, tagline, hero_chips, first_name, last_name
-- FROM basics
-- WHERE locale IN ('en-US', 'de-DE')
-- ORDER BY locale;
--
-- SELECT locale, company, position, start_date, end_date, sort_order
-- FROM work
-- WHERE locale IN ('en-US', 'de-DE')
-- ORDER BY locale, sort_order;
--
-- SELECT sg.locale, sg.title, s.name, s.level
-- FROM skill_groups sg
-- JOIN skills s ON s.group_id = sg.id
-- WHERE sg.locale IN ('en-US', 'de-DE')
-- ORDER BY sg.locale, sg.sort_order, s.sort_order;
