import React from 'react';
import { FormattedMessage } from 'react-intl';
import '../../styles/certifications.css';

// Build a public URL that works on GitHub Pages (/myresume/)
const asset = (p = '') =>
  `${process.env.PUBLIC_URL}/${String(p).replace(/^\/+/, '')}`;

// Very forgiving date formatter (outputs "Mar 2025", "Oct 2021", etc.)
const formatDate = (value) => {
  if (!value) return '';
  // Accept "YYYY/MM/DD", "YYYY-MM-DD", or just "YYYY-MM"
  const d = new Date(value.replace(/\//g, '-'));
  if (Number.isNaN(d.getTime())) return value;
  const opts = { year: 'numeric', month: 'short' };
  return d.toLocaleDateString(undefined, opts);
};

const CertCard = ({ cert }) => (
  <div className="cert-card">
    <img
      className="cert-logo"
      src={asset(cert.logo)}
      alt={cert.issuer || cert.title}
      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
    />

    <div className="cert-body">
      <div className="cert-title">{cert.title}</div>
      <div className="cert-issuer">{cert.issuer}</div>

      <div className="cert-meta">
        <span className="cert-issued">
          <FormattedMessage
            id="certs.issued"
            defaultMessage="Issued {date}"
            values={{ date: formatDate(cert.issueDate || cert.issued) }}
          />
        </span>

        {cert.language && (
          <span className="cert-language">
            <i className="fa fa-language" aria-hidden="true" />
            {' '}
            {cert.language}
          </span>
        )}
      </div>

      {cert.credentialUrl && (
        <a
          className="cert-btn"
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="certs.show" defaultMessage="Show credential" />
          {' '}
          <i className="fa fa-external-link" aria-hidden="true" />
        </a>
      )}
    </div>
  </div>
);


const Certifications = ({ content = [] }) => (
  <section id="hobby">
    <div className="row hobby">
      <div className="two columns header-col">
        <h1>
          <FormattedMessage
            id="certs.title"
            defaultMessage="Certifications"
          />
        </h1>
      </div>

      <div className="ten columns main-col">
        {(content || []).map((c, i) => (
          <CertCard key={i} cert={c} />
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
