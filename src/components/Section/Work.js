import React from "react";
import BulletPoints from "./BulletPoints";
import Datetime from "../../utils/datetime";
import { FormattedMessage, FormattedDate } from "react-intl";
import "../../styles/work.css";

/* Avatar: show company logo if provided, else initials */
const CompanyAvatar = ({ name, logo }) => {
  if (logo) {
    return (
      <div className="wk-avatar">
        <img src={logo} alt={name} className="wk-avatar-img" />
      </div>
    );
  }
  const initials = (name || "")
    .split(" ")
    .filter(Boolean)
    .map(function (p) { return p[0]; })
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return <div className="wk-avatar">{initials}</div>;
};

/* One role row inside a company card */
const RoleRow = ({ entry }) => {
  const startDate = Datetime.getDisplayFromDate(entry.startDate);
  const rawEnd = entry.endDate; // don't convert yet
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
          {skills.map(function (s, i) {
            return (
              <span key={i} className="wk-skill">
                {s}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* One company block on the timeline (dot + card with all roles) */
const CompanyBlock = ({ isLast, company, website, logo, roles }) => {
  // sort roles by startDate desc
  const sorted = roles
    .slice()
    .sort(function (a, b) {
      return new Date(b.startDate || 0) - new Date(a.startDate || 0);
    });

  // prefer company-level logo; else first role logo if available
  var resolvedLogo = logo;
  if (!resolvedLogo) {
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i] && sorted[i].logo) {
        resolvedLogo = sorted[i].logo;
        break;
      }
    }
  }

  return (
    <article className="wk-row">
      {/* timeline rail */}
      <div className="wk-rail">
        <span className="wk-dot" />
        {!isLast && <span className="wk-line" />}
      </div>

      {/* card */}
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
          {sorted.map(function (r, i) {
            return <RoleRow key={i} entry={r} />;
          })}
        </div>
      </div>
    </article>
  );
};

/* Group flat content by company */
function groupByCompany(content) {
  var map = {};
  for (var i = 0; i < content.length; i++) {
    var e = content[i] || {};
    var key = (e.company || "Unknown").trim();
    if (!map[key]) {
      map[key] = {
        company: key,
        website: e.website || "",
        logo: e.logo || "",
        roles: []
      };
    }
    map[key].roles.push(e);

    // prefer the first non-empty website & logo if missing
    if (!map[key].website && e.website) map[key].website = e.website;
    if (!map[key].logo && e.logo) map[key].logo = e.logo;
  }
  // return as array
  var arr = [];
  for (var k in map) arr.push(map[k]);
  return arr;
}

const Work = ({ content }) => {
  const list = Array.isArray(content) ? content : [];
  const grouped = groupByCompany(list);

  // order companies by newest role start date
  grouped.sort(function (a, b) {
    function latestStart(company) {
      var max = 0;
      for (var i = 0; i < company.roles.length; i++) {
        var t = new Date(company.roles[i].startDate || 0).getTime();
        if (t > max) max = t;
      }
      return max;
    }
    return latestStart(b) - latestStart(a);
  });

  return (
    <section id="work">
      <div className="wk-container">
        <div className="wk-header-col">
          <h1>
            <FormattedMessage id="work.title" defaultMessage="Work" />
          </h1>
        </div>

        <div className="wk-main-col">
          {grouped.map(function (g, i) {
            return (
              <CompanyBlock
                key={g.company + i}
                isLast={i === grouped.length - 1}
                company={g.company}
                website={g.website}
                logo={g.logo}
                roles={g.roles}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;
