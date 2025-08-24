// src/components/Section/Portfolio.js
import React from "react";
import { injectIntl } from "react-intl";
import Random from "../../utils/random"; // assuming this exists

// Build a public URL that works on GitHub Pages (/myresume/)
function asset(p) {
  if (!p) return "";
  return process.env.PUBLIC_URL + "/" + String(p).replace(/^\/+/, "");
}

// Format like "Mar 2025" or pass-through if unparsable
function formatDate(value) {
  if (!value) return "";
  var d = new Date(String(value).replace(/\//g, "-"));
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function Card(props) {
  var p = props.p || {};
  var isDE = !!props.isDE;

  // thumbnail fallback logic
  var thumb = "";
  if (p.image) {
    if (typeof p.image === "string") thumb = p.image;
    else if (p.image.thumb) thumb = p.image.thumb;
    else if (p.image.modal) thumb = p.image.modal;
  } else if (p.thumb) {
    thumb = p.thumb;
  }

  var hasThumb = !!thumb;
  var href = p.website ? p.website : (p.url ? p.url : "");
  var buttonLabel = isDE ? "Öffnen" : "Open";
  var viewLabel = isDE ? "Ansehen" : "View";
  var category = p.category ? p.category : "";
  var publisher = p.publisher ? p.publisher : "";
  var release = p.releaseDate ? formatDate(p.releaseDate) : "";

  var keywords = Array.isArray(p.keywords) ? p.keywords : [];

  return (
    <div className="pf-card">
      {hasThumb ? (
        <a
          className="pf-thumb"
          href={href || "#"}
          target={href ? "_blank" : undefined}
          rel={href ? "noopener noreferrer" : undefined}
          onClick={href ? undefined : function (e) { e.preventDefault(); }}
        >
          <img
            src={asset(thumb)}
            alt={p.name || "project"}
            onError={function (e) { e.currentTarget.style.visibility = "hidden"; }}
          />
        </a>
      ) : (
        <div className="pf-thumb pf-thumb--placeholder" />
      )}

      <div className="pf-body">
        <div className="pf-title">{p.name || "-"}</div>

        {(publisher || category || release) ? (
          <div className="pf-meta">
            {publisher ? <span className="pf-meta-item">{publisher}</span> : null}

            {category ? (publisher ? <span className="pf-dot">·</span> : null) : null}
            {category ? <span className="pf-meta-item">{category}</span> : null}

            {release ? ((publisher || category) ? <span className="pf-dot">·</span> : null) : null}
            {release ? <span className="pf-meta-item">{release}</span> : null}
          </div>
        ) : null}

        {keywords.length > 0 ? (
          <div className="pf-tags">
            {keywords.slice(0, 6).map(function (k, i) {
              return <span key={i} className="pf-tag">{k}</span>;
            })}
          </div>
        ) : null}

        {href ? (
          <div className="pf-actions">
            <a
              className="pf-btn"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={viewLabel}
            >
              {buttonLabel}
            </a>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Portfolio({ content, intl }) {
  var locale = intl && intl.locale ? String(intl.locale).toLowerCase() : "";
  var isDE = locale.indexOf("de") === 0;

  var list = Array.isArray(content) ? content : [];
  var shuffled =
    Random && typeof Random.shuffleArray === "function"
      ? Random.shuffleArray(list)
      : list.slice();

  var portfolio = shuffled.slice(0, 8);

  var titleText = isDE ? "PROJEKTE" : "PROJECTS";
  var emptyText = isDE ? "Keine Projekte vorhanden." : "No projects to show.";

  return (
    <section id="portfolio">
      <div className="row">
        <div className="two columns header-col">
          <h1>{titleText}</h1>
        </div>

        <div className="ten columns main-col">
          {portfolio.length === 0 ? (
            <p className="pf-empty">{emptyText}</p>
          ) : (
            <div className="pf-grid">
              {portfolio.map(function (p, i) {
                return <Card key={i} p={p} isDE={isDE} />;
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default injectIntl(Portfolio);
