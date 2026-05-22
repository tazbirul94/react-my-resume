import React from "react";
import { FormattedMessage } from "react-intl";
import "../../styles/hobby.css";

const INTEREST_MAP = {
  photography: { icon: "📷", color: "245 158 11"  },  // amber
  travel:      { icon: "✈️",  color: "14 165 233"  },  // sky
  cooking:     { icon: "🍳", color: "249 115 22"  },  // orange
  diy:         { icon: "🔨", color: "34 197 94"   },  // green
  music:       { icon: "🎵", color: "168 85 247"  },  // purple
  reading:     { icon: "📚", color: "99 102 241"  },  // indigo
  gaming:      { icon: "🎮", color: "244 63 94"   },  // rose
  fitness:     { icon: "🏋️", color: "20 184 166"  },  // teal
  hiking:      { icon: "🥾", color: "132 204 22"  },  // lime
  art:         { icon: "🎨", color: "236 72 153"  },  // pink
  writing:     { icon: "✍️",  color: "234 179 8"   },  // yellow
  sports:      { icon: "⚽", color: "16 185 129"  },  // emerald
  cycling:     { icon: "🚴", color: "59 130 246"  },  // blue
  yoga:        { icon: "🧘", color: "168 85 247"  },  // purple
};

function getProfile(name = "") {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(INTEREST_MAP)) {
    if (key.includes(k)) return v;
  }
  return { icon: "✨", color: "0 113 227" };
}

const Card = ({ entry }) => {
  const keywords = Array.isArray(entry.keywords) ? entry.keywords : [];
  const { icon, color } = getProfile(entry.name);

  return (
    <div className="hb-card" style={{ "--hb-color": color }}>
      <div className="hb-icon-wrap">
        <span className="hb-icon">{icon}</span>
      </div>
      <div className="hb-card-body">
        <p className="hb-card-name">{entry.name}</p>
        {keywords.length > 0 && (
          <div className="hb-tags">
            {keywords.map((k, i) => (
              <span key={i} className="hb-tag">{k}</span>
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
            <FormattedMessage id="hobby.title" defaultMessage="INTERESTS" />
          </h1>
        </div>
        <div className="ten columns main-col">
          {items.length === 0 ? (
            <p className="hb-empty">No interests to show.</p>
          ) : (
            <div className="hb-grid">
              {items.map((entry, i) => (
                <Card key={i} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hobby;
