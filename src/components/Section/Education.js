import React from "react";
import Datetime from "../../utils/datetime";
import { FormattedMessage, FormattedDate } from "react-intl";
import "../../styles/work.css"; // reuse the same styles

/* Avatar: show school logo if provided, else initials */
const SchoolAvatar = ({ name, logo }) => {
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

/* One degree/Program row */
const ProgramRow = ({ entry }) => {
  const startDate = Datetime.getDisplayFromDate(entry.startDate);
  const endDate =
    entry.endDate === "Present"
      ? "Present"
      : Datetime.getDisplayFromDate(entry.endDate);

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

      {entry.grade && (
        <p className="wk-summary">
          <strong>Grade:</strong> {entry.grade}
        </p>
      )}

      {entry.summary && <p className="wk-summary">{entry.summary}</p>}
    </div>
  );
};

/* One institution block (dot + card with all programs) */
const SchoolBlock = ({ isLast, institution, website, logo, programs }) => {
  const sorted = programs
    .slice()
    .sort(function (a, b) {
      return new Date(b.startDate || 0) - new Date(a.startDate || 0);
    });

  // prefer institution logo; else first program logo
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
          {sorted.map(function (p, i) {
            return <ProgramRow key={i} entry={p} />;
          })}
        </div>
      </div>
    </article>
  );
};

/* Group flat content by institution */
function groupBySchool(content) {
  var map = {};
  for (var i = 0; i < content.length; i++) {
    var e = content[i] || {};
    var key = (e.institution || "Unknown").trim();
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
  var arr = [];
  for (var k in map) arr.push(map[k]);
  return arr;
}

const Education = ({ content }) => {
  const list = Array.isArray(content) ? content : [];
  const grouped = groupBySchool(list);

  // order schools by newest program start date
  grouped.sort(function (a, b) {
    function latestStart(s) {
      var max = 0;
      for (var i = 0; i < s.programs.length; i++) {
        var t = new Date(s.programs[i].startDate || 0).getTime();
        if (t > max) max = t;
      }
      return max;
    }
    return latestStart(b) - latestStart(a);
  });

  return (
    <section id="education">
      <div className="wk-container">
        <div className="wk-header-col">
          <h1>
            <FormattedMessage id="education.title" defaultMessage="Education" />
          </h1>
        </div>

        <div className="wk-main-col">
          {grouped.map(function (g, i) {
            return (
              <SchoolBlock
                key={g.institution + i}
                isLast={i === grouped.length - 1}
                institution={g.institution}
                website={g.website}
                logo={g.logo}
                programs={g.programs}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;