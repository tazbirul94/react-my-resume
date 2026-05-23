-- Migration: seed de-DE locale content
-- Run after migrate_add_locale.sql
-- Safe to re-run: DELETE + INSERT pattern per locale

-- ─── cleanup existing de-DE rows ────────────────────────────────────────────
DELETE FROM testimonials   WHERE locale = 'de-DE';
DELETE FROM certifications WHERE locale = 'de-DE';
DELETE FROM projects       WHERE locale = 'de-DE';
DELETE FROM interests      WHERE locale = 'de-DE';
DELETE FROM languages      WHERE locale = 'de-DE';
DELETE FROM skills         WHERE locale = 'de-DE';
DELETE FROM skill_groups   WHERE locale = 'de-DE';
DELETE FROM education      WHERE locale = 'de-DE';
DELETE FROM work           WHERE locale = 'de-DE';
DELETE FROM profiles       WHERE locale = 'de-DE';
DELETE FROM basics         WHERE locale = 'de-DE';

-- ─── basics ──────────────────────────────────────────────────────────────────
INSERT INTO basics (locale, name, first_name, last_name, label, picture, email, phone, website, summary, city, country_code, postal_code)
VALUES (
  'de-DE',
  'MD TAZBIRUL HAQUE',
  'Tazbirul',
  'Haque',
  'SOFTWAREENTWICKLER',
  'images/myself2.jpg',
  'tazbirul94@gmail.com',
  '+49 17657742207',
  NULL,
  ARRAY[
    'Leidenschaftlicher Software-Development-Experte mit über 7 Jahren Erfahrung im Aufbau skalierbarer Unternehmenssysteme.',
    'Derzeit tätig bei CTS Eventim, wo ich an der Modernisierung groß angelegter Plattformen mit Docker, .NET, REST-APIs, MS SQL und CI/CD-Pipelines mit YAML und ArgoCD arbeite. Zuvor bei Swiss Re (Movingdots), wo ich datengesteuerte Telematik- und Versicherungslösungen mit globaler Wirkung entwickelte, später übernommen von Powerfleet.',
    'Versiert in C#, ASP.NET Core, React und Cloud-nativen Architekturen mit einer starken Grundlage in agiler Softwareentwicklung.',
    'Masterabschluss in Information Engineering & Computer Science an der Hochschule Rhein-Waal, Deutschland.',
    'Meine Motivation ist es, komplexe Probleme mit eleganten Lösungen zu bewältigen, Modernisierungsinitiativen zu leiten und Teams zu befähigen, zukunftsfähige Produkte zu liefern.'
  ],
  'Bremen',
  'Deutschland',
  '28201'
);

-- ─── profiles ────────────────────────────────────────────────────────────────
INSERT INTO profiles (locale, network, username, url, sort_order) VALUES
  ('de-DE', 'github',   'Tazbirul94',     'https://github.com/tazbirul94',                    0),
  ('de-DE', 'linkedin', 'tazbirul-haque', 'https://www.linkedin.com/in/tazbirul-haque',       1);

-- ─── work ────────────────────────────────────────────────────────────────────
INSERT INTO work (locale, company, logo, website, position, employment_type, location, start_date, end_date, summary, highlights, skills, sort_order)
VALUES
(
  'de-DE',
  'CTS EVENTIM AG & Co. KGaA',
  'images/eventim-logo.png',
  'https://karriere.eventim.de/en/',
  'Software Development Experte',
  'Vollzeit',
  'Bremen, Deutschland',
  '2023-07-01',
  NULL,
  'C#, Asp.Net Core, RESTful API, YAML Gitlab CI/CD Pipeline, MS SQL, Entity Framework, RabbitMQ, Git, Docker',
  ARRAY[
    'Design, Entwicklung und Wartung von Unternehmensanwendungen mit C#, ASP.NET Core, Entity Framework und moderner Modulith-Architektur.',
    'Implementierung und Optimierung von RESTful APIs und GraphQL-Diensten für skalierbare Systemintegrationen.',
    'Umfassende Arbeit mit MS SQL Server (Abfragen, gespeicherte Prozeduren, Indizierung, Optimierung) und Entity Framework für ORM-basierten Datenzugriff.',
    'Modernisierung von Legacy-Anwendungen (z. B. PowerBuilder) in moderne .NET-Lösungen mit verbesserter Wartbarkeit.',
    'Implementierung asynchroner Kommunikation und ereignisgesteuerter Workflows mit RabbitMQ.',
    'Aufbau, Pflege und Automatisierung von CI/CD-Pipelines in GitLab mit YAML zur Sicherstellung schneller und zuverlässiger Deployments.',
    'Containerisierung von Anwendungen mit Docker und Verwaltung von Deployments in Kubernetes für Skalierbarkeit und Resilienz.',
    'Durchführung von Integrationstests zur Validierung von APIs und serviceübergreifenden Workflows.',
    'Zusammenarbeit in agilen Scrum-Teams, Teilnahme an Sprint-Planung, Backlog-Refinement und Daily Standups zur Sicherstellung kontinuierlicher Lieferung.',
    'Einsatz von Jira für Projekt-Tracking und Koordination über funktionsübergreifende Teams hinweg.'
  ],
  ARRAY['C#','ASP.NET Core','Docker','Kubernetes','RabbitMQ','MS SQL','GraphQL','GitLab CI/CD','Entity Framework','ArgoCD'],
  0
),
(
  'de-DE',
  'Swiss Re (Movingdots GmbH)',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Senior Full Stack Entwickler',
  'Vollzeit',
  'Remote',
  '2023-04-01',
  '2023-06-30',
  'C#, Asp.Net Core Web API, React, Javascript, CSS, Git, Azure DevOps, Databricks, Data Factory',
  ARRAY[
    'Leitung der Entwicklungs- und Integrationsarbeiten im Coloride-Telematikprojekt mit Verantwortung für Databricks und Azure Data Factory Pipelines zur Verarbeitung und Analyse von Telemetriedaten für nutzungsbasierte Versicherungen.',
    'Mitarbeit an Funktionen, die Versicherern ermöglichen, Risikoprofile, Fahrverhalten und Unfallwahrscheinlichkeit genauer einzuschätzen.',
    'Beitrag zu weiteren Versicherungslösungen von Movingdots/Swiss Re, wie z. B.: ADAS Risk Score – Nutzung von Fahrdaten zur Bewertung des Unfallrisikos.'
  ],
  ARRAY['C#','ASP.NET Core','Databricks','Azure Data Factory','React','Azure DevOps'],
  1
),
(
  'de-DE',
  'Swiss Re (Movingdots GmbH)',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Full Stack Entwickler',
  'Vollzeit',
  'Remote',
  '2022-04-01',
  '2023-03-31',
  NULL,
  ARRAY[
    'Übergang zum Full Stack Developer, Lieferung produktionsreifer Anwendungen, Modernisierung von Legacy-Modulen und Stärkung datengetriebener Funktionen.',
    'Entwurf, Entwicklung und Optimierung skalierbarer APIs und Datenbankabfragen mit MS SQL, LINQ und Entity Framework.',
    'Pflege und Weiterentwicklung von Telematikplattformen, Entwicklung von REST APIs, Integration mit Cloud-Diensten und Optimierung von Datenpipelines.',
    'Implementierung von CI/CD-Pipelines mit Git und Azure DevOps.',
    'Zusammenarbeit in agilen Scrum-Teams zur kontinuierlichen Lieferung von Features.'
  ],
  ARRAY['C#','ASP.NET Core','MS SQL','LINQ','Entity Framework','Azure DevOps','React'],
  2
),
(
  'de-DE',
  'Swiss Re (Movingdots GmbH)',
  'images/swiss-re-logo.png',
  'https://www.movingdots.com/',
  'Full Stack Entwickler',
  'Werkstudent',
  'Kleve, Deutschland',
  '2021-08-01',
  '2022-03-31',
  NULL,
  ARRAY[
    'Beginn als Werkstudent, Mitarbeit in Full-Stack-Projekten mit C#, ASP.NET Core, ReactJS, React Native und MS SQL.',
    'Masterarbeit bei Movingdots: "Crash Detection using Machine Learning Models (Decision Tree, SVM, and ANN) with Hyperparameter Optimization" - Anwendung von KI auf reale Telematik-Crashdaten.'
  ],
  ARRAY['C#','ASP.NET Core','React','React Native','MS SQL','Python'],
  3
),
(
  'de-DE',
  'Netzlab GmbH',
  'images/netzlab_gmbh_logo.jpg',
  'https://netzlab.de/',
  'Software Engineer',
  'Werkstudent',
  'Düsseldorf, Deutschland',
  '2020-10-01',
  '2021-07-31',
  NULL,
  ARRAY[
    'Entwicklung und Pflege von Anwendungen mit React Native, C#, Asp.Net Core, ReactJS, MS SQL, jQuery.',
    'Web API, REST API, MS SQL Server, LINQ, Versionskontrolle mit Azure.',
    'Arbeit in einem Team zur Pflege agiler Softwareentwicklung (SCRUM).'
  ],
  ARRAY['C#','ASP.NET Core','React Native','React','MS SQL'],
  4
),
(
  'de-DE',
  'Convince Computer Limited',
  'images/CCL-logo.jpg',
  'https://www.convincebd.com/',
  'Programmierer',
  'Vollzeit',
  'Dhaka, Bangladesch',
  '2017-09-15',
  '2019-09-15',
  NULL,
  ARRAY[
    'Implementierung von Geschäftslogik mit ASP.Net MVC, C# und Design von Verwaltungs-Webseiten.',
    'Verarbeitung großer Datenmengen mit MS SQL.',
    'Anforderungserhebung bei Kunden und Umsetzung, Versionierung mit Github.'
  ],
  ARRAY['C#','ASP.NET MVC','MS SQL','JavaScript','HTML5','CSS3'],
  5
),
(
  'de-DE',
  'China Railway Major Bridge Engineering Co., Ltd.',
  'images/mbec.jpg',
  'http://www.crecg.com/english/2687/3808/3938/index.html',
  'IT-Ingenieur',
  'Vollzeit',
  'Dhaka, Bangladesch',
  '2017-05-15',
  '2017-08-15',
  NULL,
  ARRAY[
    'Wartung und Überwachung der internen Server und relevanter Geräte.',
    'Lösung wichtiger Probleme im lokalen Netzwerksystem.'
  ],
  ARRAY['Netzwerkadministration','Server-Wartung'],
  6
);

-- ─── education ───────────────────────────────────────────────────────────────
INSERT INTO education (locale, institution, logo, website, degree, area, location, start_date, end_date, gpa, gpa_german, summary, courses, sort_order)
VALUES
(
  'de-DE',
  'Hochschule Rhein-Waal',
  'images/Hochschule_Rhein-Waal-logo.png',
  'https://www.hochschule-rhein-waal.de/',
  'Master of Science',
  'Master in Informationsingenieurwesen und Informatik',
  'Kleve, Deutschland',
  '2020-03-01',
  '2023-02-01',
  '1.8',
  '1.8',
  ARRAY[
    'Masterstudium mit Schwerpunkt Software Engineering, verteilte Systeme, Cloud Computing und Datenanalyse abgeschlossen.',
    'Masterarbeit: "Crash Detection using Machine Learning Models ..." entwickelt in Kooperation mit Swiss Re (Movingdots GmbH).'
  ],
  ARRAY[]::text[],
  0
),
(
  'de-DE',
  'Ahsanullah University of Science and Technology',
  'images/AUST.png',
  'https://aust.edu/',
  'Bachelor of Science',
  'Bachelor in Informatik und Ingenieurwesen',
  'Dhaka, Bangladesch',
  '2013-03-01',
  '2017-03-01',
  '3.34',
  '2.1',
  ARRAY[
    'Bachelorstudium in Informatik mit Fokus auf Software Engineering, Algorithmen, Betriebssysteme und Datenbanken.',
    'Praxis in objektorientierter Programmierung, Netzwerken, KI und verteilten Systemen.'
  ],
  ARRAY[]::text[],
  1
),
(
  'de-DE',
  'SOS Hermann Gmeiner College Dhaka',
  'images/HGC.png',
  NULL,
  NULL,
  'Abitur',
  'Dhaka, Bangladesch',
  '2010-06-01',
  '2012-06-01',
  '5.0',
  '1.0',
  ARRAY[]::text[],
  ARRAY[]::text[],
  2
);

-- ─── skill_groups ─────────────────────────────────────────────────────────────
INSERT INTO skill_groups (locale, title, description, type, sort_order) VALUES
  ('de-DE', 'Backend',           ARRAY[]::text[], 'hard', 0),
  ('de-DE', 'Cloud & DevOps',    ARRAY[]::text[], 'hard', 1),
  ('de-DE', 'Frontend & Mobile', ARRAY[]::text[], 'hard', 2),
  ('de-DE', 'Data & ML',         ARRAY[]::text[], 'hard', 3);

-- ─── skills ──────────────────────────────────────────────────────────────────
WITH sg AS (
  SELECT id, title FROM skill_groups WHERE locale = 'de-DE'
)
INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, s.name, s.level, s.sort_order
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

-- ─── languages ───────────────────────────────────────────────────────────────
INSERT INTO languages (locale, name, level, sort_order) VALUES
  ('de-DE', 'Deutsch',     'B1',          0),
  ('de-DE', 'Englisch',    'B2',          1),
  ('de-DE', 'Bengalisch',  'Muttersprache', 2);

-- ─── interests ───────────────────────────────────────────────────────────────
INSERT INTO interests (locale, name, keywords, sort_order) VALUES
  ('de-DE', 'Fotografie',   ARRAY['Landschaften', 'Natur', 'Straße'],              0),
  ('de-DE', 'Reisen',       ARRAY['Städtetrips', 'Wandern'],                       1),
  ('de-DE', 'Kochen',       ARRAY['Bangladeschisch', 'BBQ', 'Experimentieren'],    2),
  ('de-DE', 'DIY-Projekte', ARRAY['Quilling', 'Origami', 'Puzzles'],               3),
  ('de-DE', 'Musik',        ARRAY['Gitarre', 'Klavier', 'Spotify'],                4);

-- ─── projects ────────────────────────────────────────────────────────────────
INSERT INTO projects (locale, name, category, publisher, website, release_date, description, keywords, sort_order)
VALUES
(
  'de-DE',
  'ML Unfallerkennungssystem',
  'Forschung / ML',
  'Hochschule Rhein-Waal × Swiss Re',
  'https://github.com/tazbirul94',
  '2023-02-01',
  'Masterarbeit: Unfallerkennungssystem aus realen Telematikdaten mit Decision Tree, SVM und ANN mit Hyperparameter-Optimierung. Zusammenarbeit mit Swiss Re (Movingdots).',
  ARRAY['Python','Machine Learning','SVM','Decision Tree','ANN','Telematik'],
  0
),
(
  'de-DE',
  'React Lebenslauf-Portfolio',
  'Web-Anwendung',
  'Persönlich',
  'https://tazbirul94.github.io/react-my-resume',
  '2024-01-01',
  'Dynamische Lebenslauf-Website mit Supabase CMS, EN/DE Mehrsprachigkeit, Dark Mode, Druck-/PDF-Export und Admin-Panel. Entwickelt mit React, Vite und Tailwind CSS.',
  ARRAY['React','Vite','Tailwind CSS','Supabase','i18n','GitHub Pages'],
  1
),
(
  'de-DE',
  'Versicherungs-Telematik-API',
  'Enterprise / Backend',
  'Swiss Re (Movingdots)',
  'https://www.movingdots.com/',
  '2023-03-01',
  'Skalierbare Telematik-Datenpipelines auf Databricks und Azure Data Factory für nutzungsbasierte Versicherungsrisikobewertung. C# / ASP.NET Core REST APIs.',
  ARRAY['C#','ASP.NET Core','Databricks','Azure','REST APIs','Telematik'],
  2
);

-- ─── certifications ──────────────────────────────────────────────────────────
INSERT INTO certifications (locale, title, issuer, logo, issue_date, credential_url, sort_order) VALUES
(
  'de-DE',
  'Telc Deutsch B1',
  'telc gGmbH',
  'images/telc.png',
  '2025-03-01',
  'https://results.telc.net/qr/qM2RD7IlSqC3FxHsVhgNkYwqmfcuck9Vjx217LH-8RzXJQ6WQxhBOIxE5r8xPoFM',
  0
),
(
  'de-DE',
  'C# (Grundlagen)',
  'HackerRank',
  'images/hackerrank.png',
  '2021-10-01',
  'https://www.hackerrank.com/certificates/d976e40ae220',
  1
);

-- ─── testimonials ─────────────────────────────────────────────────────────────
INSERT INTO testimonials (locale, name, position, company, reference, sort_order) VALUES
(
  'de-DE',
  'Md Shahabub Alam',
  'Wissenschaftlicher Mitarbeiter | NLP, Deep Learning & Computer Vision',
  'DFKI',
  'Er ist sehr leidenschaftlich und hochqualifiziert. Er weiß genau, was er tut, was sehr geschätzt werden kann. Außerdem kann er komplexe Probleme in kleinere Teile zerlegen, was hilft, sie in angemessener Zeit zu lösen.',
  0
);
