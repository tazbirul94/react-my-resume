-- ============================================================
-- Bilingual resume update v4 for Supabase SQL Editor.
--
-- Source:
--   CV_Full_Stack_Engineer_Tazbirul_Haque.pdf  <- PRIMARY (both locales)
--   CV_AI_Engineer_Tazbirul_Haque.pdf          <- AI additions (current role)
--
-- Strategy: software-dev career as the foundation; AI engineering
-- added as the current chapter at CTS EVENTIM (not a separate identity).
--
-- Key fix vs v3:
--   The large WITH sg AS ... FROM (VALUES ...) JOIN sg statement
--   caused Supabase SQL Editor to misparse and report
--   'relation "AI" does not exist'.
--   v4 replaces that single complex statement with one small
--   INSERT per skill group, each using a simple CROSS JOIN VALUES.
--   All content is identical to v3.
-- ============================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

INSERT INTO locales (code, label, is_active, sort_order)
VALUES
  ('en-US', 'EN', true, 0),
  ('de-DE', 'DE', true, 1)
ON CONFLICT (code) DO UPDATE
SET label      = EXCLUDED.label,
    is_active  = EXCLUDED.is_active,
    sort_order = EXCLUDED.sort_order;

ALTER TABLE basics ADD COLUMN IF NOT EXISTS tagline    text;
ALTER TABLE basics ADD COLUMN IF NOT EXISTS hero_chips text[];
ALTER TABLE basics ADD COLUMN IF NOT EXISTS first_name text;
ALTER TABLE basics ADD COLUMN IF NOT EXISTS last_name  text;

CREATE UNIQUE INDEX IF NOT EXISTS basics_locale_unique ON basics (locale);

-- =============================================================
-- BASICS
-- =============================================================
INSERT INTO basics (
  locale, name, label, picture, email, phone, website,
  summary, city, country_code, postal_code,
  tagline, hero_chips, first_name, last_name, updated_at
)
VALUES
(
  'en-US',
  'MD Tazbirul Haque',
  'Senior Full-Stack Developer | C#/.NET - Angular - Kubernetes - AI Engineering',
  'images/myself2.jpg',
  'tazbirul94@gmail.com',
  '+49 176 57742207',
  'https://react-my-resume.tazbirul009.workers.dev/',
  ARRAY[
    'Senior Full-Stack Developer with 7+ years of production engineering experience delivering enterprise backend systems, full-stack applications, secure service integrations, cloud-native deployments, and legacy modernisation using C#/.NET, ASP.NET Core, Angular, SQL Server, Docker, Kubernetes, Helm, Argo CD, RabbitMQ, and Azure DevOps.',
    'Strong expertise in IAM and security (Keycloak, OAuth2/OIDC, RBAC), production observability (OpenTelemetry, Grafana, Prometheus), CI/CD pipeline ownership, and quality engineering - building reliable, maintainable software for business-critical high-availability environments.',
    'Currently expanding into AI engineering at CTS EVENTIM: architecting and delivering production agentic systems, RAG pipelines, multi-agent orchestration, LLM applications, AI evaluation, and AI governance - with 3 AI products live in customer-facing production and 5+ engineering teams enabled.'
  ],
  'Bremen',
  'Germany',
  '28201',
  'Senior full-stack engineer (C#/.NET, Angular, Kubernetes) - currently building production AI agents, RAG pipelines, and agentic systems at CTS EVENTIM.',
  ARRAY['C#/.NET', 'Angular', 'Kubernetes', 'OpenTelemetry', 'Keycloak', 'AI Engineering'],
  'MD',
  'Tazbirul Haque',
  now()
),
(
  'de-DE',
  'MD Tazbirul Haque',
  'Full-Stack Developer | Angular - C# .NET - Microservices - Kubernetes - Azure DevOps',
  'images/myself2.jpg',
  'tazbirul94@gmail.com',
  '+49 176 57742207',
  'https://react-my-resume.tazbirul009.workers.dev/',
  ARRAY[
    'Full-Stack Developer mit ueber 7 Jahren Berufserfahrung in der Entwicklung, dem Betrieb und der End-to-End-Verantwortung unternehmenskritischer Softwaresysteme in produktiven Hochverfuegbarkeitsumgebungen. Fundierte Expertise in Angular (TypeScript) und C#/.NET fuer skalierbare Microservices-Architekturen.',
    'Erfahren im vollstaendigen Applikations-Lifecycle von der Konzeption ueber CI/CD-basierte Deployments mit Azure DevOps und Kubernetes (Argo CD) bis zum produktiven Betrieb mit Monitoring und Observability (OpenTelemetry, Grafana, Prometheus). Deutsch B1+ (beruflich aktiv eingesetzt). M.Sc. Informationsingenieurwesen.',
    'Aktuell taetig im Bereich KI-Engineering bei CTS EVENTIM: Entwicklung und Betrieb von KI-Agentensystemen, RAG-Pipelines und Multi-Agent-Orchestrierung - 3 KI-Produkte live in Produktionsumgebungen, 5+ Engineering-Teams aktiv.'
  ],
  'Bremen',
  'Deutschland',
  '28201',
  'Full-Stack-Entwickler (C#/.NET, Angular, Kubernetes) - aktuell KI-Engineering mit Agentensystemen und RAG-Pipelines bei CTS EVENTIM.',
  ARRAY['Angular', 'C#/.NET', 'Kubernetes', 'OpenTelemetry', 'Keycloak', 'KI-Engineering'],
  'MD',
  'Tazbirul Haque',
  now()
)
ON CONFLICT (locale) DO UPDATE
SET name         = EXCLUDED.name,
    label        = EXCLUDED.label,
    picture      = EXCLUDED.picture,
    email        = EXCLUDED.email,
    phone        = EXCLUDED.phone,
    website      = EXCLUDED.website,
    summary      = EXCLUDED.summary,
    city         = EXCLUDED.city,
    country_code = EXCLUDED.country_code,
    postal_code  = EXCLUDED.postal_code,
    tagline      = EXCLUDED.tagline,
    hero_chips   = EXCLUDED.hero_chips,
    first_name   = EXCLUDED.first_name,
    last_name    = EXCLUDED.last_name,
    updated_at   = now();

-- =============================================================
-- PROFILES
-- =============================================================
DELETE FROM profiles WHERE locale IN ('en-US', 'de-DE');

INSERT INTO profiles (locale, network, username, url, sort_order) VALUES
  ('en-US', 'github',    'Tazbirul94',     'https://github.com/tazbirul94',                   0),
  ('en-US', 'linkedin',  'tazbirul-haque', 'https://www.linkedin.com/in/tazbirul-haque',       1),
  ('en-US', 'portfolio', 'myresume',       'https://react-my-resume.tazbirul009.workers.dev/', 2),
  ('de-DE', 'github',    'Tazbirul94',     'https://github.com/tazbirul94',                   0),
  ('de-DE', 'linkedin',  'tazbirul-haque', 'https://www.linkedin.com/in/tazbirul-haque',       1),
  ('de-DE', 'portfolio', 'myresume',       'https://react-my-resume.tazbirul009.workers.dev/', 2);

-- =============================================================
-- WORK
-- Sort order per locale:
--   0  CTS EVENTIM
--   1  Movingdots Senior (2022-07 to 2023-06)
--   2  Movingdots Full Stack Dev (2021-08 to 2022-06)
--   3  Netzlab GmbH
--   4  Computer Communication Ltd.
-- =============================================================
DELETE FROM work WHERE locale IN ('en-US', 'de-DE');

INSERT INTO work (locale, company, logo, website, position, employment_type, mode,
                  location, start_date, end_date, summary, highlights, skills, sort_order)
VALUES
(
  'en-US', 'CTS EVENTIM AG & Co. KGaA', 'images/eventim-logo.png',
  'https://karriere.eventim.de/en/', 'Software Development Expert', 'Full-Time', NULL,
  'Bremen, Germany', '2023-07-01', NULL,
  'Full-stack and backend software engineering for Europe''s leading ticketing company (25+ countries, 24/7 production). Currently also driving AI engineering: production agentic systems, RAG pipelines, and AI platform delivery.',
  ARRAY[
    'Legacy Modernisation: Migrated a business-critical PowerBuilder module to a modern Angular / C#/.NET microservice architecture with Swagger/OpenAPI REST APIs, RabbitMQ messaging, Docker, Kubernetes (Argo CD) GitOps deployment, MS SQL Server stored procedures and Entity Framework Core, and GraphQL endpoints.',
    'Security and IAM: Implemented Keycloak (OAuth2/OIDC, RBAC, SSO, JWT) for identity and access management across all microservices - enforcing authentication flows, role-based access control, and secure service-to-service authorisation in production.',
    'Observability: Introduced OpenTelemetry distributed tracing and metrics collection; built Grafana/Prometheus real-time dashboards for proactive monitoring and incident analysis - reducing Mean Time to Detect (MTTD) for production issues.',
    'CI/CD Pipeline Ownership: Full ownership of pipelines in Azure DevOps and GitLab CI (YAML Pipeline-as-Code) with NUnit and integration test gates, automated code-coverage checks, environment promotion, and release governance - reducing release cycles from 2 weeks to 3 days.',
    'SQL Server Engineering: Deep work with MS SQL Server - stored procedures, indexes, database roles, role members, permissions hierarchies, and query optimisation for high-volume production data.',
    'Quality and Code Reviews: Security-focused code reviews (OWASP-aligned), static analysis, automated test-coverage gates, clean code standards, and Jira/Confluence documentation in an agile Scrum team.',
    'AI Engineering (current focus): Production AI agents, multi-agent orchestration, planner-executor patterns, tool calling, agent memory, human-in-the-loop workflows, RAG pipelines, embedding generation, semantic search, hybrid search, retrieval quality evaluation, hallucination mitigation, prompt engineering, AI evaluation pipelines, and LLM monitoring via OpenTelemetry.',
    'AI Product Lifecycle and Governance: Led GitHub Copilot and Claude Code AI-assisted development PoC from concept through PoC to MVP to customer production to organisation-wide adoption. 3 AI products live; 5+ engineering teams enabled. Established AI governance: output validation, human review processes, responsible AI usage guidelines.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OAuth2/OIDC', 'OpenTelemetry', 'Prometheus', 'Grafana', 'NUnit', 'Azure DevOps', 'GitLab CI/CD', 'AI Agents', 'RAG Pipelines', 'GitHub Copilot', 'Claude Code', 'Jira', 'Confluence'],
  0
),
(
  'de-DE', 'CTS EVENTIM AG & Co. KGaA', 'images/eventim-logo.png',
  'https://karriere.eventim.de/en/', 'Software Development Expert', 'Vollzeit', NULL,
  'Bremen, Deutschland', '2023-07-01', NULL,
  'Full-Stack- und Backend-Softwareentwicklung fuer Europas fuehrendes Ticketing-Unternehmen (25+ Laender, 24/7-Betrieb). Aktuell zusaetzlich taetig im KI-Engineering.',
  ARRAY[
    'Legacy-Modernisierung: Migration eines unternehmensinternen PowerBuilder-Moduls auf eine moderne Angular / C#/.NET-Microservice-Architektur mit Swagger/OpenAPI REST-APIs, RabbitMQ-Messaging, Docker, Kubernetes (Argo CD) GitOps-Deployment, MS SQL Server mit Stored Procedures und Entity Framework Core sowie GraphQL-Schnittstellen.',
    'Security und IAM: Integration von Keycloak (OAuth2/OIDC, RBAC, SSO, JWT) ueber alle Microservices - Implementierung von Authentifizierungsflows, Role-Based Access Control und sicherer Service-zu-Service-Autorisierung fuer produktionskritische Systeme.',
    'Observability: Einfuehrung von OpenTelemetry Distributed Tracing und Metrics-Collection; Aufbau von Grafana/Prometheus-Echtzeit-Dashboards fuer proaktives Monitoring und Incident-Analyse - Reduzierung der Mean Time to Detect (MTTD) bei Produktionsstoerungen.',
    'CI/CD-Pipeline-Ownership: Vollstaendige Verantwortung fuer CI/CD-Pipelines in Azure DevOps und GitLab CI (YAML Pipeline-as-Code): NUnit- und Integrationstestgates, automatisierte Code-Coverage-Pruefungen, Umgebungspromotion und Release-Governance - Release-Zyklen von 2 Wochen auf 3 Tage verkuerzt.',
    'SQL Server Engineering: Intensiver Einsatz von MS SQL Server - Stored Procedures, Indizes, Datenbankrollen, Role Members, Berechtigungshierarchien und Query-Optimierung fuer hochvolumige Produktionsdaten.',
    'Qualitaetssicherung: Security-fokussierte Code Reviews (OWASP-orientiert), statische Analyse, automatisierte Testabdeckungs-Gates, Clean-Code-Standards und lueckenlose Jira/Confluence-Dokumentation im agilen Scrum-Team.',
    'KI-Engineering (aktueller Schwerpunkt): Entwicklung und Betrieb produktiver KI-Systeme - Agentensysteme, Multi-Agent-Orchestrierung, Planner-Executor-Muster, Tool Calling, Agent Memory, Human-in-the-Loop, RAG-Pipelines, Embedding-Generierung, Semantic Search, Hybrid Search, Retrieval-Qualitaetsbewertung, Halluzinationsminimierung, Prompt Engineering und KI-Observability.',
    'KI-Produkt-Lifecycle und Governance: GitHub Copilot und Claude Code KI-PoC von Konzept bis Produktionsdeployment und organisationsweiter Einfuehrung. 3 KI-Produkte live, 5+ Teams aktiv. KI-Governance-Standards etabliert: Output-Validierung, Human-Review-Prozesse und Richtlinien fuer verantwortungsvollen KI-Einsatz.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework', 'Docker', 'Kubernetes', 'Helm', 'Argo CD', 'RabbitMQ', 'GraphQL', 'Swagger/OpenAPI', 'Keycloak', 'OAuth2/OIDC', 'OpenTelemetry', 'Prometheus', 'Grafana', 'NUnit', 'Azure DevOps', 'GitLab CI', 'KI-Agenten', 'RAG-Pipelines', 'GitHub Copilot', 'Claude Code', 'Jira', 'Confluence'],
  0
),
(
  'en-US', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png',
  'https://www.movingdots.com/', 'Senior Full Stack Developer', 'Full-Time', NULL,
  'Bremen, Germany', '2022-07-01', '2023-06-30',
  'Led end-to-end technical ownership of the COLORED/Coloride telematics platform - architecture, security, cross-functional delivery, and team coordination.',
  ARRAY[
    'Promoted to Senior Developer with full technical ownership of Coloride: architecture reviews, security-focused code reviews (OWASP-aligned), international team coordination, and technical point of contact for internal and external stakeholders.',
    'Integrated OpenTelemetry distributed tracing across 15+ microservices with Grafana/Prometheus dashboards; ensured system reliability in production and reduced MTTR for production incidents.',
    'Independently coordinated feature delivery, prioritised technical debt, and collaborated closely with product and stakeholder teams to advance the Coloride platform.'
  ],
  ARRAY['C#', 'ASP.NET Core', 'Angular', 'React', 'Azure DevOps', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Architecture Reviews', 'Security Code Reviews'],
  1
),
(
  'de-DE', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png',
  'https://www.movingdots.com/', 'Senior Software Developer', 'Vollzeit', NULL,
  'Bremen, Deutschland', '2022-07-01', '2023-06-30',
  'Uebernahme der technischen Gesamtverantwortung fuer die Coloride-Telematikplattform als Senior Developer.',
  ARRAY[
    'Befoerderung zum Senior Software Developer: Uebernahme der technischen Gesamtverantwortung fuer Coloride - Architektur-Reviews, Security-fokussierte Code Reviews (OWASP-orientiert), internationale Teamkoordination und technischer Ansprechpartner fuer interne und externe Stakeholder.',
    'Integration von OpenTelemetry Distributed Tracing ueber 15+ Microservices mit Grafana/Prometheus-Dashboards; Sicherstellung der Systemzuverlaessigkeit im Produktivbetrieb und Reduzierung der MTTR bei Produktionsincidents.',
    'Eigenstaendige Koordination der Feature-Lieferung, Priorisierung von technischen Schulden und enge Zusammenarbeit mit Product- und Stakeholder-Teams zur Weiterentwicklung der Coloride-Plattform.'
  ],
  ARRAY['C#', 'ASP.NET Core', 'Angular', 'React', 'Azure DevOps', 'PostgreSQL', 'MongoDB', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Architektur-Reviews', 'Security Code Reviews'],
  1
),
(
  'en-US', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png',
  'https://www.movingdots.com/', 'Full Stack Developer', 'Working Student to Full-Time', NULL,
  'Bremen, Germany', '2021-08-01', '2022-06-30',
  'Built full-stack telematics features and delivered AI-based crash detection for the Coloride platform - Top 250 InsurTech 2022, DIAmond Award 2021.',
  ARRAY[
    'Applied ML for Master''s thesis (in cooperation with Movingdots/Swiss Re): designed, trained, and evaluated a real-time crash detection algorithm using SVM, ANN, and Decision Trees with systematic hyperparameter optimisation on live telematics sensor data.',
    'Full-stack feature development: React and Angular frontends with RxJS, C# / ASP.NET Core Web API backend via Azure DevOps with multi-environment Azure deployments, Azure Service Bus for event-driven communication, MongoDB (telemetry) and PostgreSQL (insurance data).',
    'Introduced a Mono-Repo architecture (Nx-Workspace) consolidating 6 separate React frontend projects - significantly reducing onboarding effort for new insurance partner integrations.',
    'Platform recognition: Coloride received Top 250 InsurTech 2022 (Digital Insurance Agenda) and DIAmond Award 2021 (Swiss Re / Digital Insurance Agenda).'
  ],
  ARRAY['C#', 'ASP.NET Core', 'React', 'Angular', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'SVM', 'ANN', 'Machine Learning', 'Python', 'Nx Mono-Repo'],
  2
),
(
  'de-DE', 'Swiss Re / Movingdots GmbH / Powerfleet', 'images/swiss-re-logo.png',
  'https://www.movingdots.com/', 'Full Stack Developer', 'Werkstudent zu Vollzeit', NULL,
  'Bremen, Deutschland', '2021-08-01', '2022-06-30',
  'Full-Stack-Feature-Entwicklung und KI-basierte Crash-Detection-Forschung fuer die Coloride-Plattform - Top 250 InsurTech 2022, DIAmond Award 2021.',
  ARRAY[
    'Einstieg als Werkstudent mit Abschluss der Masterarbeit im Unternehmen (in Kooperation mit Movingdots/Swiss Re): Entwicklung und Validierung eines Echtzeit-Kollisionserkennungsalgorithmus mittels SVM, ANN und Entscheidungsbaeumen mit Hyperparameter-Optimierung - produktionsreife Genauigkeit auf Live-Telemetriedaten.',
    'Full-Stack-Feature-Entwicklung fuer Coloride: React Frontend mit RxJS, C# / ASP.NET Core Web API Backend via Azure DevOps mit Multi-Environment-Azure-Deployments, Azure Service Bus fuer event-getriebene Kommunikation sowie MongoDB und PostgreSQL.',
    'Einfuehrung einer Mono-Repo-Architektur (Nx-Workspace) zur Konsolidierung von 6 separaten React-Frontend-Projekten - Onboarding-Aufwand fuer neue Versicherungspartner-Integrationen erheblich reduziert.',
    'Ausgezeichnete Plattform: Coloride erhielt Top 250 InsurTech 2022 und DIAmond Award 2021 (Swiss Re / Digital Insurance Agenda).'
  ],
  ARRAY['C#', 'ASP.NET Core', 'React', 'Angular', 'RxJS', 'Azure DevOps', 'Azure Service Bus', 'PostgreSQL', 'MongoDB', 'SVM', 'ANN', 'Machine Learning', 'Python', 'Nx Mono-Repo'],
  2
),
(
  'en-US', 'Netzlab GmbH', 'images/netzlab_gmbh_logo.jpg', 'https://netzlab.de/',
  'Software Developer', 'Working Student', NULL, 'Dortmund, Germany',
  '2020-10-01', '2021-07-31',
  'Developed and maintained C#/.NET backend systems and web services for a product-focused team building enterprise applications for ~70 SME clients in NRW.',
  ARRAY[
    'Structured and redeveloped internal software products including a mini-golf platform and in-house tools using C#, ASP.NET Core, MS SQL Server, Entity Framework, REST APIs, and GraphQL.',
    'Designed relational database schemas, implemented stored procedures, SQL role permissions, and index strategies for client reporting and business process automation.',
    'Contributed to team code quality through peer code reviews, structured bug triage, and technical documentation in agile delivery cycles.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'REST APIs', 'GraphQL', 'Stored Procedures', 'Database Design', 'Code Reviews'],
  3
),
(
  'de-DE', 'Netzlab GmbH', 'images/netzlab_gmbh_logo.jpg', 'https://netzlab.de/',
  'Softwareentwickler', 'Werkstudent', NULL, 'Dortmund, Deutschland',
  '2020-10-01', '2021-07-31',
  'Entwicklung und Wartung von C#/.NET-Backend-Systemen und Web-Services fuer ein produktorientiertes Engineering-Team mit ca. 70 Mittelstandskunden in NRW.',
  ARRAY[
    'Strukturierung und Neuentwicklung interner Softwareprodukte (u.a. Mini-Golf-Plattform und In-House-Tools) mit C#, ASP.NET Core, MS SQL Server (Stored Procedures, Indizes, Query-Optimierung), Entity Framework, REST-APIs und GraphQL.',
    'Entwurf relationaler Datenbankschemas, Implementierung von Stored Procedures, SQL-Rollenberechtigungen und Index-Strategien fuer Kunden-Reporting und Geschaeftsprozessautomatisierung.',
    'Beitrag zur Team-Codequalitaet durch Peer-Code-Reviews, strukturiertes Bug-Triage und technische Dokumentation in agilen Lieferzyklen.'
  ],
  ARRAY['C#', '.NET', 'ASP.NET Core', 'SQL Server', 'Entity Framework', 'REST-APIs', 'GraphQL', 'Stored Procedures', 'Datenbankdesign', 'Code Reviews'],
  3
),
(
  'en-US', 'Computer Communication Ltd.', 'images/CCL-logo.jpg', 'https://www.ccl.com.bd/',
  'Software Developer', 'Full-Time', NULL, 'Bangladesh', '2017-09-15', '2019-09-15',
  'Developed enterprise banking software for Citibank Bangladesh including cash management systems and regulatory reporting modules.',
  ARRAY[
    'Built a production-grade Cash Management System and Banking Reporting System for Citibank Bangladesh - transaction workflows, multi-currency reconciliation, regulatory reporting, and RBAC - using Blazor, ASP.NET MVC, C# .NET Core, and MS SQL Server.',
    'Implemented complex stored procedures, SQL role-based permissions (roles, role members), and optimised index structures for high-volume banking transaction processing.',
    'Collaborated directly with Citibank stakeholders on requirements analysis, UAT, and production sign-off.',
    'Gained strong enterprise software discipline in database design, production issue analysis, and secure handling of financial-domain data.'
  ],
  ARRAY['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'RBAC', 'Banking Software', 'Reporting'],
  4
),
(
  'de-DE', 'Computer Communication Ltd.', 'images/CCL-logo.jpg', 'https://www.ccl.com.bd/',
  'Softwareentwickler', 'Vollzeit', NULL, 'Bangladesch', '2017-09-15', '2019-09-15',
  'Entwicklung von Enterprise-Banking-Software fuer Citibank Bangladesch - Cash-Management-System und regulatorische Reporting-Module.',
  ARRAY[
    'Entwicklung eines Cash-Management-Systems und Banking-Reporting-Systems fuer Citibank Bangladesch - Transaktionsworkflows, Mehrwaehrungsabstimmung, regulatorisches Reporting und RBAC - mit Blazor, ASP.NET MVC, C# .NET Core und MS SQL Server.',
    'Implementierung komplexer Stored Procedures, SQL-rollenbasierter Berechtigungen (Roles, Role Members) und optimierter Index-Strukturen fuer volumengroses Banking-Transaction-Processing.',
    'Direkte Zusammenarbeit mit Citibank-Stakeholdern bei Anforderungsanalyse, UAT und Produktions-Abnahme.',
    'Aufbau solider Enterprise-Erfahrung in Datenbankdesign, Analyse produktiver Fehlerbilder und sicherem Umgang mit Daten aus dem Finanzbereich.'
  ],
  ARRAY['C#', '.NET Core', 'ASP.NET', 'Blazor', 'MVC', 'MS SQL Server', 'Stored Procedures', 'RBAC', 'Banking-Software', 'Reporting'],
  4
);

-- =============================================================
-- EDUCATION
-- Note: education.summary is text (not text[]) per schema.sql.
-- =============================================================
DELETE FROM education WHERE locale IN ('en-US', 'de-DE');

INSERT INTO education (locale, institution, logo, website, degree, area, location,
                       start_date, end_date, gpa, gpa_german, summary, courses, sort_order)
VALUES
(
  'en-US', 'Hochschule Rhein-Waal', 'images/Hochschule_Rhein-Waal-logo.png',
  'https://www.hochschule-rhein-waal.de/', 'Master''s degree',
  'Information Engineering and Computer Science', 'Germany',
  '2020-03-01', '2023-02-01', '1.8', '1.8',
  'Thesis: AI-based Crash Detection in Telematics Systems - real-time classification of vehicle crash events using SVM, ANN, and Decision Trees with systematic hyperparameter optimisation on live sensor telemetry data, in cooperation with Movingdots GmbH / Swiss Re.',
  ARRAY['Machine Learning (SVM, ANN, Decision Trees, Hyperparameter Optimisation)', 'Applied Python for Data Science and ML', 'Model Training, Evaluation and Benchmarking', 'Feature Engineering and Data Preprocessing', 'Signal Processing and Sensor Data Analysis', 'Software Engineering and Distributed Systems', 'Cloud Computing', 'Database Systems', 'Algorithm Design and Optimisation'],
  0
),
(
  'en-US', 'Ahsanullah University of Science and Technology', 'images/AUST.png',
  'https://aust.edu/', 'Bachelor of Science', 'Computer Science and Engineering', 'Bangladesh',
  '2013-03-01', '2017-03-01', '3.34', '2.1',
  'Four-year CSE program with a strong foundation in programming, algorithms, data structures, database systems, operating systems, computer networks, software engineering, and object-oriented design.',
  ARRAY['Programming Fundamentals', 'Object-Oriented Programming', 'Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Web Technologies', 'Artificial Intelligence Foundations', 'Compiler Design', 'Computer Architecture', 'Discrete Mathematics', 'Numerical Methods'],
  1
),
(
  'de-DE', 'Hochschule Rhein-Waal', 'images/Hochschule_Rhein-Waal-logo.png',
  'https://www.hochschule-rhein-waal.de/', 'Master',
  'Informationsingenieurwesen und Informatik', 'Deutschland',
  '2020-03-01', '2023-02-01', '1.8', '1.8',
  'Masterarbeit: Echtzeit-Kollisionserkennung fuer Fahrzeugtelematik mittels SVM, ANN und Entscheidungsbaeumen mit optimierten Hyperparametern - in Kooperation mit Movingdots GmbH / Swiss Re. Schwerpunkte: Softwarearchitektur, Machine Learning, Cloud-Computing, Verteilte Systeme, Datenbankengineering.',
  ARRAY['Machine Learning (SVM, ANN, Entscheidungsbaeume, Hyperparameter-Optimierung)', 'Angewandtes Python fuer Data Science und ML', 'Modelltraining, Evaluation und Benchmarking', 'Feature Engineering und Datenvorverarbeitung', 'Signalverarbeitung und Sensordatenanalyse', 'Software Engineering und Verteilte Systeme', 'Cloud-Computing', 'Datenbanksysteme', 'Algorithmendesign und Optimierung'],
  0
),
(
  'de-DE', 'Ahsanullah University of Science and Technology', 'images/AUST.png',
  'https://aust.edu/', 'Bachelor of Science', 'Informatik und Ingenieurwesen', 'Bangladesch',
  '2013-03-01', '2017-03-01', '3.34', '2.1',
  'Vierjähriges CSE-Studium mit starkem Fundament in Programmierung, Algorithmen, Datenstrukturen, Datenbanksystemen, Betriebssystemen, Rechnernetzen, Software Engineering und objektorientiertem Design.',
  ARRAY['Programmiergrundlagen', 'Objektorientierte Programmierung', 'Datenstrukturen', 'Algorithmen', 'Datenbanksysteme', 'Betriebssysteme', 'Rechnernetze', 'Software Engineering', 'Web-Technologien', 'Kuenstliche Intelligenz Grundlagen', 'Compilerbau', 'Computerarchitektur', 'Diskrete Mathematik', 'Numerische Methoden'],
  1
);

-- =============================================================
-- SKILLS
-- Groups first, then one INSERT per group (no CTE/VALUES JOIN).
-- en-US groups:  Languages, Backend, Frontend, Cloud & DevOps,
--                Security & IAM, Observability, Databases,
--                Quality & Tools, AI Engineering
-- de-DE groups:  Programmiersprachen, Frontend, Backend & APIs,
--                Architektur, Cloud & DevOps, Identity & Security,
--                Observability, Datenbanken, Testing & Qualitaet,
--                KI & Entwickler-Produktivitaet, Methoden & Tools
-- =============================================================
DELETE FROM skills
WHERE locale IN ('en-US', 'de-DE')
   OR group_id IN (SELECT id FROM skill_groups WHERE locale IN ('en-US', 'de-DE'));

DELETE FROM skill_groups WHERE locale IN ('en-US', 'de-DE');

INSERT INTO skill_groups (locale, title, description, type, sort_order) VALUES
  ('en-US', 'Languages',              ARRAY['Programming and query languages.'],                                     'hard',  0),
  ('en-US', 'Backend',                ARRAY['Backend engineering, API design, and service implementation.'],        'hard',  1),
  ('en-US', 'Frontend',               ARRAY['Frontend frameworks and UI implementation.'],                          'hard',  2),
  ('en-US', 'Cloud & DevOps',         ARRAY['Container orchestration, CI/CD, and cloud delivery.'],                'hard',  3),
  ('en-US', 'Security & IAM',         ARRAY['Identity, access control, and secure integration practices.'],        'hard',  4),
  ('en-US', 'Observability',          ARRAY['Distributed tracing, monitoring, and production visibility.'],         'hard',  5),
  ('en-US', 'Databases',              ARRAY['Relational and NoSQL database systems and optimisation.'],             'hard',  6),
  ('en-US', 'Quality & Tools',        ARRAY['Testing, quality assurance, and development tooling.'],               'hard',  7),
  ('en-US', 'AI Engineering',         ARRAY['Agentic systems, RAG pipelines, LLM applications - current work at CTS EVENTIM.'], 'hard', 8),
  ('de-DE', 'Programmiersprachen',    ARRAY['Programmier- und Abfragesprachen.'],                                    'hard',  0),
  ('de-DE', 'Frontend',               ARRAY['Frontend-Frameworks, TypeScript und UI-Implementierung.'],             'hard',  1),
  ('de-DE', 'Backend & APIs',         ARRAY['Backend-Entwicklung, API-Design und Service-Implementierung.'],       'hard',  2),
  ('de-DE', 'Architektur',            ARRAY['Microservices, Event-Driven Architecture und Systemdesign.'],         'hard',  3),
  ('de-DE', 'Cloud & DevOps',         ARRAY['Container-Orchestrierung, CI/CD und Cloud-Bereitstellung.'],          'hard',  4),
  ('de-DE', 'Identity & Security',    ARRAY['Identity, Zugriffskontrolle und sichere Integrationen.'],             'hard',  5),
  ('de-DE', 'Observability',          ARRAY['Distributed Tracing, Monitoring und Produktionssichtbarkeit.'],       'hard',  6),
  ('de-DE', 'Datenbanken',            ARRAY['Relationale und NoSQL-Datenbanken sowie Optimierung.'],               'hard',  7),
  ('de-DE', 'Testing & Qualitaet',    ARRAY['Tests, Qualitaetssicherung und Codequalitaet.'],                      'hard',  8),
  ('de-DE', 'KI & Entwickler-Produktivitaet', ARRAY['KI-Engineering, KI-gestuetzte Entwicklung und ML-Grundlagen - aktuell bei CTS EVENTIM.'], 'hard', 9),
  ('de-DE', 'Methoden & Tools',       ARRAY['Agile Methoden, Kollaborationstools und Entwicklungsumgebung.'],      'hard', 10);

-- ---------------------------------------------------------------
-- en-US skills  (one INSERT per group)
-- ---------------------------------------------------------------
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
  ('.NET', 92, 0), ('ASP.NET Core', 92, 1), ('ASP.NET Web API', 90, 2),
  ('Entity Framework', 85, 3), ('REST APIs', 90, 4), ('GraphQL', 78, 5),
  ('Swagger/OpenAPI', 82, 6), ('Microservices', 85, 7),
  ('Event-Driven Architecture', 80, 8), ('RabbitMQ', 82, 9), ('Azure Service Bus', 76, 10)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Backend';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Angular', 84, 0), ('React', 78, 1), ('Blazor', 72, 2), ('MVC', 78, 3)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Frontend';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Docker', 86, 0), ('Kubernetes', 82, 1), ('Helm', 76, 2), ('Argo CD', 76, 3),
  ('Azure DevOps', 82, 4), ('GitLab CI/CD', 84, 5), ('Azure Services', 78, 6), ('YAML Pipelines', 80, 7)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Cloud & DevOps';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Keycloak', 80, 0), ('OAuth2/OIDC', 80, 1), ('RBAC', 80, 2),
  ('SSO', 78, 3), ('JWT', 80, 4), ('Secure API Design', 80, 5)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Security & IAM';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('OpenTelemetry', 82, 0), ('Distributed Tracing', 80, 1),
  ('Prometheus', 76, 2), ('Grafana', 76, 3), ('Loki', 70, 4)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Observability';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('MS SQL Server', 88, 0), ('PostgreSQL', 78, 1), ('MongoDB', 72, 2),
  ('Stored Procedures', 84, 3), ('Indexes & Query Optimisation', 84, 4),
  ('Database Roles & Permissions', 78, 5), ('Relational Data Modelling', 82, 6)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Databases';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('NUnit', 78, 0), ('xUnit', 75, 1), ('Integration Testing', 82, 2), ('TDD', 75, 3),
  ('Git', 90, 4), ('Jira', 84, 5), ('Confluence', 82, 6),
  ('Visual Studio', 90, 7), ('VS Code', 86, 8), ('ReSharper', 80, 9), ('Postman', 80, 10)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'Quality & Tools';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'en-US', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('AI Agents', 82, 0), ('Multi-Agent Systems', 80, 1), ('RAG Pipelines', 82, 2),
  ('Agentic Workflows', 80, 3), ('Tool Calling', 80, 4), ('Prompt Engineering', 82, 5),
  ('Semantic Search & Embeddings', 78, 6), ('Human-in-the-Loop Workflows', 80, 7),
  ('AI Evaluation & Guardrails', 78, 8), ('LLM Monitoring', 78, 9),
  ('GitHub Copilot', 85, 10), ('Claude Code', 85, 11)
) AS v(name, level, so)
WHERE sg.locale = 'en-US' AND sg.title = 'AI Engineering';

-- ---------------------------------------------------------------
-- de-DE skills  (one INSERT per group)
-- ---------------------------------------------------------------
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
  ('Angular', 84, 0), ('TypeScript / Komponentenarchitektur', 82, 1),
  ('React', 78, 2), ('RxJS', 76, 3), ('Blazor', 72, 4),
  ('ASP.NET MVC', 78, 5), ('HTML5 / CSS3', 75, 6)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Frontend';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('.NET 6/7/8', 92, 0), ('ASP.NET Core Web API', 92, 1),
  ('Entity Framework Core', 85, 2), ('REST-APIs', 90, 3),
  ('GraphQL', 78, 4), ('Swagger/OpenAPI', 82, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Backend & APIs';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Microservices', 85, 0), ('Event-Driven Architecture', 80, 1),
  ('RabbitMQ', 82, 2), ('Azure Service Bus', 76, 3), ('CQRS', 72, 4), ('Mono-Repo Nx', 72, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Architektur';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Docker', 86, 0), ('Kubernetes mit Argo CD', 82, 1), ('Helm', 76, 2),
  ('Azure DevOps', 82, 3), ('GitLab CI', 84, 4), ('YAML Pipelines', 80, 5),
  ('Azure App Service / Blob Storage', 74, 6), ('Git', 90, 7)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Cloud & DevOps';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Keycloak', 80, 0), ('OAuth2/OIDC', 80, 1), ('JWT', 80, 2),
  ('RBAC', 80, 3), ('Security Code Reviews', 78, 4)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Identity & Security';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('OpenTelemetry', 82, 0), ('Distributed Tracing', 80, 1),
  ('Prometheus', 76, 2), ('Grafana', 76, 3), ('Loki', 70, 4), ('Incident-Analyse', 78, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Observability';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('MS SQL Server', 88, 0), ('Entity Framework Core', 85, 1), ('Stored Procedures', 84, 2),
  ('Indizes & Query-Optimierung', 84, 3), ('Datenbankrollen & Berechtigungen', 78, 4),
  ('PostgreSQL', 78, 5), ('MongoDB', 72, 6)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Datenbanken';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('NUnit', 78, 0), ('xUnit', 75, 1), ('Integrationstests', 82, 2),
  ('TDD', 75, 3), ('Clean Code / SOLID', 80, 4), ('Statische Codeanalyse', 76, 5)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Testing & Qualitaet';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('GitHub Copilot', 85, 0), ('Claude Code', 85, 1), ('KI-Agentensysteme', 80, 2),
  ('RAG-Pipelines', 80, 3), ('Prompt Engineering', 80, 4),
  ('Multi-Agent-Orchestrierung', 78, 5), ('KI-gestuetzte Entwicklung', 84, 6),
  ('SVM / ANN / Entscheidungsbaeume', 72, 7)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'KI & Entwickler-Produktivitaet';

INSERT INTO skills (locale, group_id, name, level, sort_order)
SELECT 'de-DE', sg.id, v.name, v.level::int, v.so::int
FROM skill_groups sg
CROSS JOIN (VALUES
  ('Agile / Scrum', 88, 0), ('Jira', 84, 1), ('Confluence', 82, 2),
  ('Visual Studio', 90, 3), ('VS Code', 86, 4), ('ReSharper', 80, 5),
  ('Postman', 80, 6), ('Swagger / OpenAPI', 82, 7)
) AS v(name, level, so)
WHERE sg.locale = 'de-DE' AND sg.title = 'Methoden & Tools';

-- =============================================================
-- LANGUAGES
-- =============================================================
DELETE FROM languages WHERE locale IN ('en-US', 'de-DE');

INSERT INTO languages (locale, name, level, sort_order) VALUES
  ('en-US', 'English', 'Fluent (C1)',                                                         0),
  ('en-US', 'German',  'B1+ / professional working proficiency (actively used at work)',      1),
  ('en-US', 'Bengali', 'Native',                                                              2),
  ('de-DE', 'Englisch',    'Fliessend (C1)',                                                  0),
  ('de-DE', 'Deutsch',     'B1+ / berufliche Arbeitskenntnisse (aktiv im Berufsalltag)',      1),
  ('de-DE', 'Bengalisch',  'Muttersprache',                                                   2);

COMMIT;

-- =============================================================
-- Verification queries (uncomment to run after COMMIT)
-- =============================================================
--
-- SELECT locale, label, tagline FROM basics WHERE locale IN ('en-US','de-DE') ORDER BY locale;
--
-- SELECT locale, company, position, start_date, end_date, sort_order
-- FROM work WHERE locale IN ('en-US','de-DE') ORDER BY locale, sort_order;
--
-- SELECT sg.locale, sg.sort_order, sg.title, s.name, s.level
-- FROM skill_groups sg JOIN skills s ON s.group_id = sg.id
-- WHERE sg.locale IN ('en-US','de-DE') ORDER BY sg.locale, sg.sort_order, s.sort_order;
--
-- SELECT locale, name, level FROM languages
-- WHERE locale IN ('en-US','de-DE') ORDER BY locale, sort_order;
