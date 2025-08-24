// src/components/Section/Portfolio.js
import React from "react";
import Random from "../../utils/random"; // assuming this exists

const Portfolio = ({ content }) => {
  var list = Array.isArray(content) ? content : [];
  var shuffled = typeof Random !== "undefined" && Random.shuffleArray
    ? Random.shuffleArray(list)
    : list.slice(); // fallback: no shuffle

  var portfolio = shuffled.slice(0, 8);

  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns">
          {portfolio.length === 0 ? (
            <p className="pf-empty">No projects to show.</p>
          ) : (
            // ... your existing render of portfolio cards ...
            portfolio.map(function (p, i) {
              return <div key={i}>{p.name}</div>;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
