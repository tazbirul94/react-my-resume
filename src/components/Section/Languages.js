// src/components/Section/Languages.js
import React from "react";
import { FormattedMessage } from "react-intl";
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

const Languages = ({ content }) => {
  const items = Array.isArray(content) ? content : [];

  return (
    // ⚠️ these three lines stay unchanged (as you requested)
    <section id="hobby">
      <div className="row hobby">
        <div className="two columns header-col">
          <h1>
            <FormattedMessage id="languages.title" defaultMessage="LANGUAGES" />
          </h1>
        </div>

        <div className="ten columns main-col">
          {items.length === 0 ? (
            <p className="hb-empty">No languages to show.</p>
          ) : (
            items.map((entry, i) => <Entry key={i} entry={entry} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Languages;
