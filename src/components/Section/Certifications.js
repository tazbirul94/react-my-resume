import React from 'react';
import { injectIntl } from 'react-intl';
import '../../styles/certifications.css';

// Build a public URL that works on GitHub Pages (/myresume/)
const asset = (p = '') =>
  `${process.env.PUBLIC_URL}/${String(p).replace(/^\/+/, '')}`;

// Very forgiving date formatter (outputs "Mar 2025", "Oct 2021", etc.)
const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(String(value).replace(/\//g, '-')); // supports YYYY/MM/DD and YYYY-MM-DD
  if (Number.isNaN(d.getTime())) return value;
  const opts = { year: 'numeric', month: 'short' };
  return d.toLocaleDateString(undefined, opts);
};

const CertCard = ({ cert, isDE }) => {
  const issuedLabel = isDE ? 'Ausgestellt' : 'Issued';
  const buttonText  = isDE ? 'Nachweis anzeigen' : 'Show credential';

  return (
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
            {issuedLabel} {formatDate(cert.issueDate || cert.issued)}
          </span>

          {/* {cert.language && (
            <span className="cert-language">
              <i className="fa fa-language" aria-hidden="true" /> {cert.language}
            </span>
          )} */}
        </div>

        {cert.credentialUrl && (
          <a
            className="cert-btn"
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonText} <i className="fa fa-external-link" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
};

const Certifications = ({ content = [], intl }) => {
  const locale = intl && intl.locale ? String(intl.locale).toLowerCase() : '';
  const isDE = locale.indexOf('de') === 0;
  const titleText = isDE ? 'Zertifikate' : 'Certifications';

  return (
    <section id="certification">
      <div className="row hobby">
        <div className="two columns header-col">
          <h1>{titleText}</h1>
        </div>

        <div className="ten columns main-col">
          {(content || []).map((c, i) => (
            <CertCard key={i} cert={c} isDE={isDE} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default injectIntl(Certifications);
