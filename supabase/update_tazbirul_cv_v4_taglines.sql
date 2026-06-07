-- ============================================================
-- Tagline and Hero Tech Chips updates for v4
-- ============================================================

UPDATE basics
SET tagline = 'C#, ASP.NET Core, Angular, React, TypeScript, Docker, Kubernetes, Argo CD, Azure DevOps, Keycloak, OpenTelemetry, Prometheus, Grafana, SQL Server, PostgreSQL, Entity Framework, GraphQL, REST APIs, AI Agents, RAG Pipelines, Multi-Agent Systems'
WHERE locale = 'en-US';

UPDATE basics
SET tagline = 'C#, ASP.NET Core, Angular, React, TypeScript, Docker, Kubernetes, Argo CD, Azure DevOps, Keycloak, OpenTelemetry, Prometheus, Grafana, SQL Server, PostgreSQL, Entity Framework, GraphQL, REST APIs, KI-Agenten, RAG-Pipelines, Multi-Agent-Systeme'
WHERE locale = 'de-DE';

UPDATE basics
SET hero_chips = ARRAY['C#', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'Argo CD', 'OpenTelemetry', 'Keycloak', 'SQL Server', 'PostgreSQL', 'GraphQL', 'REST APIs', 'AI Agents', 'RAG Pipelines']
WHERE locale = 'en-US';

UPDATE basics
SET hero_chips = ARRAY['C#', 'ASP.NET Core', 'Angular', 'React', 'TypeScript', 'Docker', 'Kubernetes', 'Argo CD', 'OpenTelemetry', 'Keycloak', 'SQL Server', 'PostgreSQL', 'GraphQL', 'REST APIs', 'KI-Agenten', 'RAG-Pipelines']
WHERE locale = 'de-DE';
