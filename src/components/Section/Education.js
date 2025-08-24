import React from "react";
import Datetime from "../../utils/datetime";
import { FormattedMessage, FormattedDate } from "react-intl";
import "../../styles/work.css"; // reuse the same styles

/* Build an absolute path that works on GitHub Pages (/myresume/) */
const asset = (p = "") =>
  `${process.env.PUBLIC_URL}/${String(p).replace(/^\/+/, "")}`;

/* Avatar: show school logo if provided, else initials */
const SchoolAvatar = ({ name, logo }) => {
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

/* Normalize summary into array of strings */
function toSummaryList(summary) {
  if (!summary) return [];
  if (Array.isArray(summary)) return summary.filter(Boolean);
  const parts = String(summary)
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : [String(summary)];
}

/* One degree/Program row */
const ProgramRow = ({ entry }) => {
  const startDate = Datetime.getDisplayFromDate(entry.startDate);
  const endDate =
    entry.endDate === "Present"
      ? "Present"
      : Datetime.getDisplayFromDate(entry.endDate);

  const bullets = toSummaryList(entry.summary);

  return (
    <div className="wk-role-row">
      <div className="wk-role-row-head">
        <h4 className="wk-role">
          {entry.degree || entry.program || entry.area || "Program"}
        </h4>
        <div className="wk-meta">
          <span className="wk-date">
            <FormattedDate value={startDate} year="numeric" month="short" />
            {" – "}
            {endDate === "Present" ? (
              "Present"
            ) : (
              <FormattedDate value={endDate} year="numeric" month="short" />
            )}
          </span>
          {entry.location && <span className="wk-sep">·</span>}
          {entry.location && <span>{entry.location}</span>}
        </div>
      </div>

      {(entry.gpa || entry.gpa_german || entry.grade) && (
        <p className="wk-summary" style={{ marginTop: 4 }}>
          <strong>Grade:</strong>{" "}
          {entry.gpa ? entry.gpa : entry.grade || ""}
          {entry.gpa && entry.gpa_german ? " · " : ""}
          {entry.gpa_german ? `German ${entry.gpa_german}` : ""}
        </p>
      )}

      {bullets.length > 0 && (
        <div className="wk-bullets">
          <ul>
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

/* One institution block (dot + card with all programs) */
const SchoolBlock = ({ isLast, institution, website, logo, programs }) => {
  const sorted = programs
    .slice()
    .sort((a, b) => new Date(b.startDate || 0) - new Date(a.startDate || 0));

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
          <SchoolAvatar name={institution} logo={resolvedLogo} />
          <div className="wk-head-text">
            <h3 className="wk-company-title">
              {website ? (
                <a href={website} target="_blank" rel="noreferrer">
                  {institution}
                </a>
              ) : (
                institution
              )}
            </h3>
            {sorted[0] && sorted[0].location ? (
              <div className="wk-meta">{sorted[0].location}</div>
            ) : null}
          </div>
        </div>

        <div className="wk-roles">
          {sorted.map((p, i) => (
            <ProgramRow key={i} entry={p} />
          ))}
        </div>
      </div>
    </article>
  );
};

/* Group flat content by institution */
function groupBySchool(content) {
  const map = {};
  for (let i = 0; i < content.length; i++) {
    const e = content[i] || {};
    const key = (e.institution || "Unknown").trim();
    if (!map[key]) {
      map[key] = {
        institution: key,
        website: e.website || "",
        logo: e.logo || "",
        programs: []
      };
    }
    map[key].programs.push(e);
    if (!map[key].website && e.website) map[key].website = e.website;
    if (!map[key].logo && e.logo) map[key].logo = e.logo;
  }
  return Object.keys(map).map((k) => map[k]);
}

const Education = ({ content }) => {
  const list = Array.isArray(content) ? content : [];
  const grouped = groupBySchool(list);

  grouped.sort((a, b) => {
    const latest = (s) =>
      Math.max(...s.programs.map((p) => new Date(p.startDate || 0).getTime()));
    return latest(b) - latest(a);
  });

  return (
    <section id="education">
      <div className="row education">
        <div className="two columns header-col">
          <h1>
            <FormattedMessage id="education.title" defaultMessage="Education" />
          </h1>
        </div>

        <div className="ten columns main-col wk-main-col">
          <div className="wk-container">
            {grouped.map((g, i) => (
              <SchoolBlock
                key={g.institution + i}
                isLast={i === grouped.length - 1}
                institution={g.institution}
                website={g.website}
                logo={g.logo}
                programs={g.programs}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
