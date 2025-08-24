import React from "react";
import { FormattedMessage } from "react-intl";
import "../../styles/hobby.css";

const Entry = ({ entry }) => {
  const keywords = Array.isArray(entry.keywords) ? entry.keywords : [];
  return (
    <div className="row item">
      <div className="twelve columns">
        {/* Hobby name styled differently from section title */}
        <h3 className="hb-entry-title">{entry.name}</h3>
        {keywords.length > 0 && (
          <div className="hb-tags">
            {keywords.map((k, i) => (
              <span key={i} className="hb-tag">
                {k}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Hobby = ({ content }) => {
  const items = Array.isArray(content)
    ? content
    : content && Array.isArray(content.interests)
    ? content.interests
    : [];

  return (
    <section id="hobby">
      <div className="row hobby">
        <div className="two columns header-col">
          <h1>
            <FormattedMessage id="hobby.title" defaultMessage="HOBBYS" />
          </h1>
        </div>
        <div className="ten columns main-col">
          {items.length === 0 ? (
            <p className="hb-empty">No interests to show.</p>
          ) : (
            items.map((entry, i) => <Entry key={i} entry={entry} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default Hobby;
