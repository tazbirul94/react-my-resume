import React from 'react';

const Photo = ({ content }) => (
  <section id="photo">
    <div className="row">
      <div className="twelve columns" style={{ textAlign: 'center', padding: '60px 0' }}>
        <img
          src={content.picture}
          alt={content.name}
          style={{ width: 200, height: 200, borderRadius: '50%', objectFit: 'cover' }}
        />
        <h2 style={{ marginTop: 20 }}>{content.name}</h2>
        <p>{content.label}</p>
      </div>
    </div>
  </section>
);

export default Photo;
