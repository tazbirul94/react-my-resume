import React from "react";
import BulletPoints from "./BulletPoints";
import Datetime from "../../utils/datetime";
import { FormattedMessage, FormattedDate } from "react-intl";
import "../../styles/work.css";

/* build an absolute path that works on GitHub Pages (/myresume/) */
const asset = (p = "") =>
  `${process.env.PUBLIC_URL}/${String(p).replace(/^\/+/, "")}`;

/* Avatar: show company logo if provided, else initials */
const CompanyAvatar = ({ name, logo }) => {
  if (logo) {
    return (
      <div className="wk-avatar">
        <img src={asset(logo)} alt={name} className="wk-avatar-img" />
      </div>
    );
  }
  const initials = (name || "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return <div className="wk-avatar">{initials}</div>;
};

/* One role row inside a company card */
const RoleRow = ({ entry }) => {
  const startDate = Datetime.getDisplayFromDate(entry.startDate);
  const rawEnd = entry.endDate;
  const endDate = rawEnd === "Present" ? "Present" : Datetime.getDisplayFromDate(rawEnd);

  const hasHighlights =
    entry.highlights && Array.isArray(entry.highlights) && entry.highlights.length > 0;
  const skills = Array.isArray(entry.skills) ? entry.skills : [];
  const hasSkills = skills.length > 0;

  return (
    <div className="wk-role-row">
      <div className="wk-role-row-head">
        <h4 className="wk-role">{entry.position}</h4>
        <div className="wk-meta">
          <span className="wk-date">
            <FormattedDate value={startDate} year="numeric" month="short" />
            {" – "}
            {entry.endDate === "Present" ? (
              "Present"
            ) : (
              <FormattedDate value={endDate} year="numeric" month="short" />
            )}
          </span>
          {entry.mode && <span className="wk-chip">{entry.mode}</span>}
          {entry.employmentType && <span className="wk-chip">{entry.employmentType}</span>}
          {entry.location && <span className="wk-sep">·</span>}
          {entry.location && <span>{entry.location}</span>}
        </div>
      </div>

      {entry.summary && <p className="wk-summary">{entry.summary}</p>}

      {hasHighlights && (
        <div className="wk-bullets">
          <BulletPoints points={entry.highlights} />
        </div>
      )}

      {hasSkills && (
        <div className="wk-skills">
          {skills.map((s, i) => (
            <span key={i} className="wk-skill">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* One company block on the timeline (dot + card with all roles) */
const CompanyBlock = ({ isLast, company, website, logo, roles }) => {
  const sorted = roles
    .slice()
    .sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0));

  // prefer company-level logo; else first role logo if available
  let resolvedLogo = logo;
  if (!resolvedLogo) {
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] && sorted[i].logo) {
        resolvedLogo = sorted[i].logo;
        break;
      }
    }
  }

  return (
    <article className="wk-row">
      <div className="wk-rail">
        <span className="wk-dot" />
        {!isLast && <span className="wk-line" />}
      </div>

      <div className="wk-card">
        <div className="wk-card-head">
          <CompanyAvatar name={company} logo={resolvedLogo} />
          <div className="wk-head-text">
            <h3 className="wk-company-title">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer">
                  {company}
                </a>
              ) : (
                company
              )}
            </h3>
            {sorted[0] && sorted[0].location ? (
              <div className="wk-meta">{sorted[0].location}</div>
            ) : null}
          </div>
        </div>

        <div className="wk-roles">
          {sorted.map((r, i) => (
            <RoleRow key={i} entry={r} />
          ))}
        </div>
      </div>
    </article>
  );
};

/* Group flat content by company */
function groupByCompany(content) {
  const map = {};
  for (let i = 0; i < content.length; i++) {
    const e = content[i] || {};
    const key = (e.company || "Unknown").trim();
    if (!map[key]) {
      map[key] = {
        company: key,
        website: e.website || "",
        logo: e.logo || "",
        roles: []
      };
    }
    map[key].roles.push(e);
    if (!map[key].website && e.website) map[key].website = e.website;
    if (!map[key].logo && e.logo) map[key].logo = e.logo;
  }
  return Object.keys(map).map((k) => map[k]);
}

const Work = ({ content }) => {
  const list = Array.isArray(content) ? content : [];
  const grouped = groupByCompany(list);

  grouped.sort((a, b) => {
    const latest = (company) =>
      Math.max(...company.roles.map((r) => new Date(r.startDate || 0).getTime()));
    return latest(b) - latest(a);
  });

  return (
    <section id="work">
      <div className="row work">
        <div className="two columns header-col">
          <h1>
            <FormattedMessage id="work.title" defaultMessage="Work" />
          </h1>
        </div>

        <div className="ten columns main-col wk-main-col">
          {/* optional center constraint */}
          <div className="wk-container">
            {grouped.map((g, i) => (
              <CompanyBlock
                key={g.company + i}
                isLast={i === grouped.length - 1}
                company={g.company}
                website={g.website}
                logo={g.logo}
                roles={g.roles}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
