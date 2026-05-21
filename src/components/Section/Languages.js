// src/components/Section/Languages.js
import React from "react";
import { injectIntl } from "react-intl";
import "../../styles/hobby.css"; // reuse the chip + title styles

const Entry = ({ entry }) => {
  const level = entry && entry.level ? String(entry.level) : "";
  return (
    <div className="row item">
      <div className="twelve columns">
        {/* same typography as hobby titles */}
        <h3 className="hb-entry-title">{entry.name}</h3>
        {level && (
          <div className="hb-tags">
            <span className="hb-tag">{level}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Languages = ({ content, intl }) => {
  const items = Array.isArray(content) ? content : [];
  // no optional chaining (compatible with older CRA)
  const locale = intl && intl.locale ? String(intl.locale).toLowerCase() : "";
  const isDE = locale.indexOf("de") === 0;
  const titleText = isDE ? "SPRACHEN" : "LANGUAGES";

  return (
    // ⚠️ these three lines stay unchanged (as requested)
    <section id="hobby">
      <div className="row hobby">
        <div className="two columns header-col">
          <h1>{titleText}</h1>
        </div>

        <div className="ten columns main-col">
          {items.length === 0 ? (
            <p className="hb-empty">{isDE ? "Keine Sprachen vorhanden." : "No languages to show."}</p>
          ) : (
            items.map((entry, i) => <Entry key={i} entry={entry} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default injectIntl(Languages);
