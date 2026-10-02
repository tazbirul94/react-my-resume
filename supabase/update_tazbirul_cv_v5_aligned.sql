-- ============================================================
-- Resume alignment v5 (CV <-> website) for Supabase SQL Editor.
--
-- Source of truth:
--   Tazbirul_Haque_CV_Standard_EN.pdf
--   Tazbirul_Haque_CV_Standard_DE.pdf
--
-- Supersedes v4 content for: basics (summary/label/tagline/chips),
-- work, skill_groups + skills (hard).
-- Untouched: profiles, education, languages, projects, certifications,
-- interests, testimonials, soft_skill_categories. No schema change.
--
-- What changed vs v4: claims the CV does not support were removed
-- ("3 AI products live", "5+ teams enabled", production agents / RAG /
-- multi-agent / AI governance, Angular at Movingdots, SSO, invented
-- scale numbers). The AI line now matches the CV: Copilot / Claude Code
-- initiative from PoC to organisation-wide rollout.
-- Company name corrected to "Convince Computer Limited" (as on CV).
-- Skill levels (progress bars) are unchanged from v4.
-- ============================================================

BEGIN;

-- BASICS (update only; keeps picture, contact, website)
UPDATE basics SET
  label = 'Senior Full-Stack Developer | C#/.NET - Angular - Kubernetes - DevOps',
  summary = ARRAY['Senior Full-Stack Software Engineer with 7+ years of professional experience (6+ years hands-on with C#/.NET), building and operating business-critical systems in high-availability production environments.', 'Deep expertise in Angular/TypeScript frontend development and C#/.NET backend engineering for scalable microservices architectures. Experienced across the full application lifecycle - from design through CI/CD-based deployment with Azure DevOps and Kubernetes to production operations with OpenTelemetry-based observability.', 'Led a GitHub Copilot and Claude Code AI-assisted development initiative from proof-of-concept through organisation-wide rollout. German B1+ (used daily in a professional context), English C1. Permanent residence permit (Niederlassungserlaubnis), Germany.'],
  tagline = 'Senior Full-Stack Software Engineer - C#/.NET, Angular/TypeScript, microservices, Kubernetes, and observability for business-critical systems.',
  hero_chips = ARRAY['C#', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'Argo CD', 'OpenTelemetry', 'Keycloak', 'RabbitMQ', 'SQL Server', 'PostgreSQL', 'GraphQL', 'REST APIs', 'Claude Code'],
  updated_at = now()
WHERE locale = 'en-US';

UPDATE basics SET
  label = 'Senior Full-Stack Developer | C#/.NET - Angular - Kubernetes - DevOps',
  summary = ARRAY['Senior Full-Stack Software Engineer mit über 7 Jahren Berufserfahrung (davon 6+ Jahre praktisch mit C#/.NET) in der Entwicklung und dem Betrieb unternehmenskritischer Systeme in produktiven Hochverfügbarkeitsumgebungen.', 'Fundierte Expertise in Angular/TypeScript-Frontend-Entwicklung sowie C#/.NET-Backend-Entwicklung für skalierbare Microservices-Architekturen. Erfahren im vollständigen Applikations-Lifecycle - von der Konzeption über CI/CD-basierte Deployments mit Azure DevOps und Kubernetes bis zum produktiven Betrieb mit OpenTelemetry-basierter Observability.', 'Leitete eine KI-gestützte Entwicklungsinitiative (GitHub Copilot, Claude Code) vom Proof-of-Concept bis zum organisationsweiten Rollout. Deutsch B1+ (beruflich täglich eingesetzt), Englisch C1. Niederlassungserlaubnis, Deutschland.'],
  tagline = 'Senior Full-Stack Software Engineer - C#/.NET, Angular/TypeScript, Microservices, Kubernetes und Observability für unternehmenskritische Systeme.',
  hero_chips = ARRAY['C#', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'Argo CD', 'OpenTelemetry', 'Keycloak', 'RabbitMQ', 'SQL Server', 'PostgreSQL', 'GraphQL', 'REST-APIs', 'Claude Code'],
  updated_at = now()
WHERE locale = 'de-DE';

-- WORK (replaced; sort order per locale: CTS, Movingdots Senior, Movingdots Dev, Netzlab, Convince)
DELETE FROM work WHERE locale IN ('en-US', 'de-DE');

INSERT INTO work (locale, company, logo, website, position, employment_type, mode,
                  location, start_date, end_date, summary, highlights, skills, sort_order)
VALUES
('en-US', 'CTS EVENTIM AG & Co. KGaA', 'images/eventim-logo.png', 'https://karriere.eventim.de/en/', 'Software Development Expert', 'Full-Time', NULL, 'Bremen, Germany', '2023-07-01', NULL,
  'Full-stack and backend engineering with end-to-end ownership of a PowerBuilder-to-Angular/.NET migration, CI/CD pipelines, and an organisation-wide AI-assisted development rollout.',
  ARRAY[
    'Legacy Modernisation: Own end-to-end delivery of the migration of an internal PowerBuilder module to an Angular (TypeScript) / C#/.NET microservices architecture - Swagger/OpenAPI REST APIs, GraphQL, RabbitMQ messaging, MS SQL Server with Entity Framework Core, Docker containerisation, and Kubernetes (Argo CD) GitOps deployment.',
    'Security and IAM: Lead the Keycloak identity and access management integration - OAuth2/OIDC authentication flows (JWT) and Role-Based Access Control (RBAC) across all microservices to secure production systems.',
    'Observability: Established OpenTelemetry distributed tracing and Grafana/Prometheus dashboards across services, reducing mean time to detect (MTTD) for production incidents.',
    'CI/CD Ownership: Own pipelines in Azure DevOps and GitLab CI (YAML pipeline-as-code); reduced release cycles from 2 weeks to 3 days through automated test gates and release governance.',
    'SQL Server: Stored procedures, indexes, database roles and permissions, and query optimisation.',
    'Quality: Security-focused code reviews (OWASP-oriented), NUnit and integration tests, automated test-coverage gates, and Jira/Confluence documentation within an agile Scrum team.',
    'AI-Assisted Development: Architected and led a GitHub Copilot / Claude Code initiative from proof-of-concept through management approval to organisation-wide rollout; built and led the scaling team.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OAuth2/OIDC', 'OpenTelemetry', 'Prometheus', 'Grafana', 'NUnit', 'Azure DevOps', 'GitLab CI', 'GitHub Copilot', 'Claude Code', 'Jira', 'Confluence'],
  0),
('de-DE', 'CTS EVENTIM AG & Co. KGaA', 'images/eventim-logo.png', 'https://karriere.eventim.de/en/', 'Software Development Expert', 'Vollzeit', NULL, 'Bremen, Deutschland', '2023-07-01', NULL,
  'Full-Stack- und Backend-Entwicklung mit End-to-End-Verantwortung für eine PowerBuilder-zu-Angular/.NET-Migration, CI/CD-Pipelines und den organisationsweiten Rollout KI-gestützter Entwicklung.',
  ARRAY[
    'Legacy-Modernisierung: Verantwortung für die vollständige Migration eines unternehmensinternen PowerBuilder-Moduls auf eine Angular (TypeScript) / C#/.NET-Microservice-Architektur - Swagger/OpenAPI REST-APIs, GraphQL, RabbitMQ-Messaging, MS SQL Server mit Entity Framework Core, Docker-Containerisierung und Kubernetes (Argo CD) GitOps-Deployment.',
    'Security und IAM: Leitung der Identity-and-Access-Management-Integration mit Keycloak - OAuth2/OIDC-Authentifizierungsflows (JWT) und Role-Based Access Control (RBAC) über alle Microservices zur Absicherung produktiver Systeme.',
    'Observability: Einführung von OpenTelemetry Distributed Tracing und Grafana/Prometheus-Dashboards über alle Services - Reduzierung der Mean Time to Detect (MTTD) bei Produktionsstörungen.',
    'CI/CD-Ownership: Verantwortung für CI/CD-Pipelines in Azure DevOps und GitLab CI (YAML Pipeline-as-Code); Release-Zyklen von 2 Wochen auf 3 Tage verkürzt durch automatisierte Testgates und Release-Governance.',
    'SQL Server: Stored Procedures, Indizes, Datenbankrollen und Berechtigungen sowie Query-Optimierung.',
    'Qualität: Sicherheitsfokussierte Code Reviews (OWASP-orientiert), NUnit- und Integrationstests, automatisierte Testabdeckungs-Gates und Jira/Confluence-Dokumentation im agilen Scrum-Team.',
    'KI-gestützte Entwicklung: Konzeption und Leitung einer Initiative mit GitHub Copilot und Claude Code vom Proof-of-Concept über die Management-Freigabe bis zum organisationsweiten Rollout; Aufbau und Leitung des Skalierungsteams.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OAuth2/OIDC', 'OpenTelemetry', 'Prometheus', 'Grafana', 'NUnit', 'Azure DevOps', 'GitLab CI', 'GitHub Copilot', 'Claude Code', 'Jira', 'Confluence'],
  0),
('en-US', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png', 'https://www.movingdots.com/', 'Senior Full Stack Developer', 'Full-Time', NULL, 'Bremen, Germany', '2022-07-01', '2023-06-30',
  'Technical ownership of the Coloride telematics platform following promotion to Senior Developer.',
  ARRAY[
    'Held end-to-end technical ownership of the Coloride platform: architecture reviews, security-focused code reviews, and international team coordination.',
    'Introduced OpenTelemetry distributed tracing across 15+ microservices with Grafana/Prometheus dashboards, reducing mean time to resolve (MTTR) for production incidents.'
  ],
  ARRAY['C#', 'ASP.NET Core', 'React', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Architecture Reviews', 'Security Code Reviews'],
  1),
('de-DE', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png', 'https://www.movingdots.com/', 'Senior Full Stack Developer', 'Vollzeit', NULL, 'Bremen, Deutschland', '2022-07-01', '2023-06-30',
  'Technische Gesamtverantwortung für die Coloride-Telematikplattform nach Beförderung zum Senior Developer.',
  ARRAY[
    'Technische Gesamtverantwortung für die Coloride-Plattform: Architektur-Reviews, sicherheitsfokussierte Code Reviews und internationale Teamkoordination.',
    'Einführung von OpenTelemetry Distributed Tracing über 15+ Microservices mit Grafana/Prometheus-Dashboards - Reduzierung der Mean Time to Resolve (MTTR) bei Produktionsstörungen.'
  ],
  ARRAY['C#', 'ASP.NET Core', 'React', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Architektur-Reviews', 'Security Code Reviews'],
  1),
('en-US', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png', 'https://www.movingdots.com/', 'Full Stack Developer', 'Working Student to Full-Time', NULL, 'Bremen, Germany', '2021-08-01', '2022-06-30',
  'Joined as Working Student (incl. M.Sc. thesis), then Full Stack Developer: full-stack telematics features and the crash-detection algorithm for Coloride.',
  ARRAY[
    'Developed full-stack features using React (component-based architecture, RxJS) and C#/ASP.NET Core Web API, with Azure Service Bus for event-driven communication and MongoDB/PostgreSQL as data backends.',
    'Consolidated 6 separate React frontend projects into a single Nx mono-repo, reducing onboarding effort for new insurance-partner integrations.',
    'M.Sc. thesis: designed and validated a real-time crash-detection algorithm for the Coloride platform using SVM, ANN, and decision trees with hyperparameter optimisation.',
    'Platform recognition: Coloride received Top 250 InsurTech 2022 (Digital Insurance Agenda) and the DIAmond Award 2021 (Swiss Re / Digital Insurance Agenda).'
  ],
  ARRAY['C#', 'ASP.NET Core', 'React', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'SVM', 'ANN', 'Machine Learning', 'Python', 'Nx Mono-Repo'],
  2),
('de-DE', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png', 'https://www.movingdots.com/', 'Full Stack Developer', 'Werkstudent zu Vollzeit', NULL, 'Bremen, Deutschland', '2021-08-01', '2022-06-30',
  'Einstieg als Werkstudent (inkl. Masterarbeit), anschließend Full Stack Developer: Full-Stack-Features und Kollisionserkennungsalgorithmus für Coloride.',
  ARRAY[
    'Full-Stack-Feature-Entwicklung mit React (komponentenbasierte Architektur, RxJS) und C#/ASP.NET Core Web API, mit Azure Service Bus für event-getriebene Kommunikation sowie MongoDB/PostgreSQL als Datenbackends.',
    'Konsolidierung von 6 separaten React-Frontend-Projekten in ein einheitliches Nx-Mono-Repo - reduzierter Onboarding-Aufwand für neue Versicherungspartner-Integrationen.',
    'Masterarbeit: Entwicklung und Validierung eines Echtzeit-Kollisionserkennungsalgorithmus für die Coloride-Plattform mittels SVM, ANN und Entscheidungsbäumen mit Hyperparameter-Optimierung.',
    'Ausgezeichnete Plattform: Coloride erhielt Top 250 InsurTech 2022 (Digital Insurance Agenda) und den DIAmond Award 2021 (Swiss Re / Digital Insurance Agenda).'
  ],
  ARRAY['C#', 'ASP.NET Core', 'React', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'SVM', 'ANN', 'Machine Learning', 'Python', 'Nx Mono-Repo'],
  2),
('en-US', 'Netzlab GmbH', 'images/netzlab_gmbh_logo.jpg', 'https://netzlab.de/', 'Software Developer', 'Working Student', NULL, 'Dortmund, Germany', '2020-10-01', '2021-07-31',
  'Development of internal software products for SME clients with C#/.NET.',
  ARRAY[
    'Structured and rebuilt internal software products for SME clients using C#, ASP.NET Core, MS SQL Server (stored procedures, indexes, query optimisation), Entity Framework, REST APIs, and GraphQL.',
    'Designed relational database schemas and implemented stored procedures and index strategies for client reporting and business process automation.',
    'Raised team code quality through structured peer code reviews and technical documentation.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'REST APIs', 'GraphQL', 'Stored Procedures', 'Database Design', 'Code Reviews'],
  3),
('de-DE', 'Netzlab GmbH', 'images/netzlab_gmbh_logo.jpg', 'https://netzlab.de/', 'Softwareentwickler', 'Werkstudent', NULL, 'Dortmund, Deutschland', '2020-10-01', '2021-07-31',
  'Entwicklung interner Softwareprodukte für Mittelstandskunden mit C#/.NET.',
  ARRAY[
    'Strukturierung und Neuentwicklung interner Softwareprodukte für Mittelstandskunden mit C#, ASP.NET Core, MS SQL Server (Stored Procedures, Indizes, Query-Optimierung), Entity Framework, REST-APIs und GraphQL.',
    'Entwurf relationaler Datenbankschemas sowie Implementierung von Stored Procedures und Index-Strategien für Kunden-Reporting und Geschäftsprozessautomatisierung.',
    'Steigerung der Team-Codequalität durch strukturierte Peer-Code-Reviews und technische Dokumentation.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'REST-APIs', 'GraphQL', 'Stored Procedures', 'Datenbankdesign', 'Code Reviews'],
  3),
('en-US', 'Convince Computer Limited', 'images/CCL-logo.jpg', 'https://www.convincebd.com/', 'Software Developer', 'Full-Time', NULL, 'Bangladesh', '2017-09-15', '2019-09-15',
  'Enterprise software for Citibank Bangladesh (cash management, banking reporting) and supply-chain / procurement systems.',
  ARRAY[
    'Built a cash management and banking reporting system for Citibank Bangladesh covering transaction workflows, multi-currency reconciliation, regulatory reporting, and RBAC, using Blazor, ASP.NET MVC, C#/.NET Core, and MS SQL Server.',
    'Developed supply chain management and procurement software, including buying-house management and audit reporting.',
    'Implemented complex stored procedures and SQL role-based permissions for high-volume transaction processing.',
    'Collaborated directly with Citibank stakeholders on requirements analysis, UAT, and production sign-off.'
  ],
  ARRAY['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'RBAC', 'Banking Software', 'Supply Chain', 'Reporting'],
  4),
('de-DE', 'Convince Computer Limited', 'images/CCL-logo.jpg', 'https://www.convincebd.com/', 'Software Developer', 'Vollzeit', NULL, 'Bangladesch', '2017-09-15', '2019-09-15',
  'Enterprise-Software für Citibank Bangladesch (Cash Management, Banking-Reporting) sowie Supply-Chain- und Procurement-Systeme.',
  ARRAY[
    'Entwicklung eines Cash-Management- und Banking-Reporting-Systems für Citibank Bangladesch - Transaktionsworkflows, Mehrwährungsabstimmung, regulatorisches Reporting und RBAC - mit Blazor, ASP.NET MVC, C#/.NET Core und MS SQL Server.',
    'Entwicklung von Supply-Chain-Management- und Procurement-Software, einschließlich Buying-House-Management und Audit-Reporting.',
    'Implementierung komplexer Stored Procedures und SQL-rollenbasierter Berechtigungen für volumengroßes Transaction-Processing.',
    'Direkte Zusammenarbeit mit Citibank-Stakeholdern bei Anforderungsanalyse, UAT und Produktions-Abnahme.'
  ],
  ARRAY['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'RBAC', 'Banking-Software', 'Supply Chain', 'Reporting'],
  4);

-- SKILLS (hard skills replaced; soft groups, if any, are left alone)
-- Groups mirror the CV skill headings. One small INSERT per group (no CTE).
DELETE FROM skills
WHERE locale IN ('en-US', 'de-DE')
  AND group_id IN (SELECT id FROM skill_groups WHERE locale IN ('en-US', 'de-DE') AND (type = 'hard' OR type IS NULL));

DELETE FROM skill_groups
WHERE locale IN ('en-US', 'de-DE') AND (type = 'hard' OR type IS NULL);

INSERT INTO skill_groups (locale, title, description, type, sort_order) VALUES
  ('en-US', 'Languages', ARRAY['Programming and query languages.'], 'hard', 0),
  ('en-US', 'Frontend', ARRAY['Frontend frameworks and UI implementation.'], 'hard', 1),
  ('en-US', 'Backend & APIs', ARRAY['Backend engineering and API design.'], 'hard', 2),
  ('en-US', 'Architecture', ARRAY['Microservices, event-driven architecture, and system design.'], 'hard', 3),
  ('en-US', 'DevOps & Containers', ARRAY['Container orchestration and CI/CD.'], 'hard', 4),
  ('en-US', 'Cloud', ARRAY['Cloud services.'], 'hard', 5),
  ('en-US', 'Identity & Security', ARRAY['Identity, access control, and secure integrations.'], 'hard', 6),
  ('en-US', 'Observability', ARRAY['Distributed tracing, monitoring, and incident analysis.'], 'hard', 7),
  ('en-US', 'Databases', ARRAY['Relational and NoSQL databases and optimisation.'], 'hard', 8),
  ('en-US', 'Testing & Quality', ARRAY['Testing and code quality.'], 'hard', 9),
  ('en-US', 'AI-Assisted Development', ARRAY['AI-assisted development and ML fundamentals.'], 'hard', 10),
  ('en-US', 'Methods & Tools', ARRAY['Agile methods and development tooling.'], 'hard', 11),
  ('de-DE', 'Programmiersprachen', ARRAY['Programmier- und Abfragesprachen.'], 'hard', 0),
  ('de-DE', 'Frontend', ARRAY['Frontend-Frameworks, TypeScript und UI-Implementierung.'], 'hard', 1),
  ('de-DE', 'Backend & APIs', ARRAY['Backend-Entwicklung und API-Design.'], 'hard', 2),
  ('de-DE', 'Architektur', ARRAY['Microservices, Event-Driven Architecture und Systemdesign.'], 'hard', 3),
  ('de-DE', 'DevOps & Container', ARRAY['Container-Orchestrierung und CI/CD.'], 'hard', 4),
  ('de-DE', 'Cloud', ARRAY['Cloud-Services.'], 'hard', 5),
  ('de-DE', 'Identity & Security', ARRAY['Identity, Zugriffskontrolle und sichere Integrationen.'], 'hard', 6),
  ('de-DE', 'Observability', ARRAY['Distributed Tracing, Monitoring und Incident-Analyse.'], 'hard', 7),
  ('de-DE', 'Datenbanken', ARRAY['Relationale und NoSQL-Datenbanken sowie Optimierung.'], 'hard', 8),
  ('de-DE', 'Testing & Qualität', ARRAY['Tests und Codequalität.'], 'hard', 9),
  ('de-DE', 'KI-gestützte Entwicklung', ARRAY['KI-gestützte Entwicklung und ML-Grundlagen.'], 'hard', 10),
  ('de-DE', 'Methoden & Tools', ARRAY['Agile Methoden und Entwicklungstools.'], 'hard', 11);

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('C#', 95, 0), ('SQL', 88, 1), ('TypeScript', 82, 2), ('JavaScript', 80, 3), ('Python', 75, 4)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Languages';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Angular', 84, 0), ('TypeScript / Component Architecture', 82, 1), ('React', 78, 2), ('RxJS', 76, 3), ('Blazor', 72, 4), ('ASP.NET MVC', 78, 5), ('HTML5 / CSS3', 75, 6)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Frontend';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('.NET 6/7/8', 92, 0), ('ASP.NET Core Web API', 92, 1), ('Entity Framework Core', 85, 2), ('REST APIs', 90, 3), ('GraphQL', 78, 4), ('Swagger/OpenAPI', 82, 5)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Backend & APIs';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Microservices', 85, 0), ('Event-Driven Architecture', 80, 1), ('RabbitMQ', 82, 2), ('Azure Service Bus', 76, 3), ('CQRS', 72, 4), ('Nx Mono-Repo', 72, 5)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Architecture';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Docker', 86, 0), ('Kubernetes (Argo CD)', 82, 1), ('Helm', 76, 2), ('Azure DevOps', 82, 3), ('GitLab CI', 84, 4), ('CI/CD Pipelines', 84, 5), ('YAML', 80, 6), ('Git', 90, 7)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'DevOps & Containers';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Azure App Service', 76, 0), ('Azure Service Bus', 76, 1), ('Azure Deployment Environments', 72, 2), ('Blob Storage', 74, 3)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Cloud';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Keycloak', 80, 0), ('OAuth2/OIDC', 80, 1), ('JWT', 80, 2), ('RBAC', 80, 3), ('Security Code Reviews', 78, 4)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Identity & Security';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('OpenTelemetry', 82, 0), ('Distributed Tracing', 80, 1), ('Prometheus', 76, 2), ('Grafana', 76, 3), ('Loki', 70, 4), ('Incident Analysis', 78, 5)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Observability';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('MS SQL Server', 88, 0), ('Entity Framework Core', 85, 1), ('Stored Procedures', 84, 2), ('Indexes & Query Optimisation', 84, 3), ('PostgreSQL', 78, 4), ('MongoDB', 72, 5)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Databases';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('NUnit', 78, 0), ('xUnit', 75, 1), ('Integration Testing', 82, 2), ('TDD', 75, 3), ('Clean Code / SOLID', 80, 4)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Testing & Quality';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('GitHub Copilot', 85, 0), ('Claude Code', 85, 1), ('AI-Assisted Development Processes', 82, 2), ('Machine Learning (SVM, ANN, Decision Trees)', 70, 3)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'AI-Assisted Development';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Agile / Scrum', 88, 0), ('Jira', 84, 1), ('Confluence', 82, 2), ('Visual Studio', 90, 3), ('VS Code', 86, 4), ('ReSharper', 80, 5), ('Postman', 80, 6)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Methods & Tools';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('C#', 95, 0), ('SQL', 88, 1), ('TypeScript', 82, 2), ('JavaScript', 80, 3), ('Python', 75, 4)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Programmiersprachen';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Angular', 84, 0), ('TypeScript / Komponentenarchitektur', 82, 1), ('React', 78, 2), ('RxJS', 76, 3), ('Blazor', 72, 4), ('ASP.NET MVC', 78, 5), ('HTML5 / CSS3', 75, 6)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Frontend';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('.NET 6/7/8', 92, 0), ('ASP.NET Core Web API', 92, 1), ('Entity Framework Core', 85, 2), ('REST-APIs', 90, 3), ('GraphQL', 78, 4), ('Swagger/OpenAPI', 82, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Backend & APIs';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Microservices', 85, 0), ('Event-Driven Architecture', 80, 1), ('RabbitMQ', 82, 2), ('Azure Service Bus', 76, 3), ('CQRS', 72, 4), ('Nx Mono-Repo', 72, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Architektur';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Docker', 86, 0), ('Kubernetes (Argo CD)', 82, 1), ('Helm', 76, 2), ('Azure DevOps', 82, 3), ('GitLab CI', 84, 4), ('CI/CD-Pipelines', 84, 5), ('YAML', 80, 6), ('Git', 90, 7)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'DevOps & Container';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Azure App Service', 76, 0), ('Azure Service Bus', 76, 1), ('Azure Deployment Environments', 72, 2), ('Blob Storage', 74, 3)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Cloud';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Keycloak', 80, 0), ('OAuth2/OIDC', 80, 1), ('JWT', 80, 2), ('RBAC', 80, 3), ('Security Code Reviews', 78, 4)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Identity & Security';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('OpenTelemetry', 82, 0), ('Distributed Tracing', 80, 1), ('Prometheus', 76, 2), ('Grafana', 76, 3), ('Loki', 70, 4), ('Incident-Analyse', 78, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Observability';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('MS SQL Server', 88, 0), ('Entity Framework Core', 85, 1), ('Stored Procedures', 84, 2), ('Indizes & Query-Optimierung', 84, 3), ('PostgreSQL', 78, 4), ('MongoDB', 72, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Datenbanken';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('NUnit', 78, 0), ('xUnit', 75, 1), ('Integrationstests', 82, 2), ('TDD', 75, 3), ('Clean Code / SOLID', 80, 4)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Testing & Qualität';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('GitHub Copilot', 85, 0), ('Claude Code', 85, 1), ('KI-gestützte Entwicklungsprozesse', 82, 2), ('Machine Learning (SVM, ANN, Entscheidungsbäume)', 70, 3)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'KI-gestützte Entwicklung';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Agile / Scrum', 88, 0), ('Jira', 84, 1), ('Confluence', 82, 2), ('Visual Studio', 90, 3), ('VS Code', 86, 4), ('ReSharper', 80, 5), ('Postman', 80, 6)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Methoden & Tools';

COMMIT;

-- Verification (run after COMMIT)
-- SELECT locale, label, tagline, hero_chips FROM basics ORDER BY locale;
-- SELECT locale, company, position, start_date, end_date, sort_order FROM work ORDER BY locale, sort_order;
-- SELECT sg.locale, sg.sort_order, sg.title, count(s.id) FROM skill_groups sg LEFT JOIN skills s ON s.group_id = sg.id GROUP BY 1,2,3 ORDER BY 1,2;
