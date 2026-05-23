const ui = {
  navigation: {
    home: 'Startseite',
    about: 'Über mich',
    work: 'Berufserfahrung',
    education: 'Ausbildung',
    skill: 'Fähigkeiten',
    skills: 'Fähigkeiten',
    portfolio: 'Portfolio',
    hobbys: 'Interessen',
    interests: 'Interessen',
    certification: 'Zertifizierung',
    certifications: 'Zertifizierungen',
    testimonials: 'Referenzen',
    references: 'Referenzen',
    photo: 'Foto',
  },
  navMenu: {
    showNav: 'Navigation anzeigen',
    hideNav: 'Navigation ausblenden',
  },
  hero: {
    viewResume: 'Lebenslauf ansehen',
    contactMe: 'Kontakt aufnehmen',
    scroll: 'Scrollen',
    statsYears: 'Jahre Erfahrung',
    statsTech: 'Technologien',
    statsCountries: 'Länder',
  },
  sections: {
    about:         { eyebrow: 'Über mich',        title: 'Wer ich bin' },
    work:          { eyebrow: 'Berufserfahrung',   title: 'Wo ich gebaut habe' },
    education:     { eyebrow: 'Ausbildung',        title: 'Akademischer Werdegang' },
    skills:        { eyebrow: 'Fähigkeiten',       title: 'Womit ich arbeite' },
    languages:     { eyebrow: 'Sprachen',          title: 'Sprachen, die ich spreche' },
    interests:     { eyebrow: 'Interessen',        title: 'Abseits des Schreibtischs' },
    portfolio:     { eyebrow: 'Portfolio',         title: 'Was ich entwickelt habe' },
    certifications:{ eyebrow: 'Zertifizierungen',  title: 'Nachweise' },
    references:    { eyebrow: 'Referenzen',        title: 'Was andere sagen' },
    softSkills:    { eyebrow: 'Soziale Kompetenz', title: 'Soft Skills' },
  },
  work: {
    present: 'Heute',
    current: 'Aktuell',
    title: 'Berufserfahrung',
    showMoreSingle: '↓ {count} frühere Stelle anzeigen',
    showMorePlural: '↓ {count} frühere Stellen anzeigen',
    showLess: '↑ Weniger anzeigen',
    employmentTypes: [
      { value: 'Vollzeit',    label: 'Vollzeit' },
      { value: 'Teilzeit',    label: 'Teilzeit' },
      { value: 'Werkstudent', label: 'Werkstudent' },
      { value: 'Minijob',     label: 'Minijob' },
      { value: 'Sonstiges',   label: 'Sonstiges' },
    ],
  },
  about: {
    title: 'Über mich',
    subtitle: 'Kontaktdaten',
    openBadge: 'Offen für Angebote',
    yearsExp: '{years}+ Jahre Erfahrung',
  },
  skills: {
    title: 'Fähigkeiten',
  },
  modal: {
    details: 'Details',
    close: 'Schließen',
  },
  portfolio: {
    title: 'Portfolio',
  },
  certification: {
    title: 'Zertifizierung',
    verify: 'Verifizieren',
  },
  education: {
    title: 'Ausbildung',
    present: 'Heute',
    gradeLabel: 'Note',
    gradeScaleTitle: 'Deutsche Notenskala',
    thesisLabel: 'Masterarbeit',
  },
  hobbys: {
    title: 'Interessen',
  },
  references: {
    title: 'Referenzen',
    moreNote: 'Weitere Referenzen auf Anfrage erhältlich.',
    requestBtn: 'Referenzschreiben anfordern',
    requestSubject: 'Referenzanfrage',
    requestBody: 'Hallo%2C%20ich%20m%C3%B6chte%20ein%20Referenzschreiben%20anfordern.',
  },
  gradeScale: {
    veryGood: 'Sehr gut',
    good: 'Gut',
    satisfactory: 'Befriedigend',
    sufficient: 'Ausreichend',
    fail: 'Nicht bestanden',
  },
  print: {
    saveButton: 'PDF speichern',
  },
  theme: {
    toggleLabel: 'Design wechseln',
  },
  footer: {
    description: 'Entworfen und entwickelt in React.js von {author1}',
    authorName: 'Tazbirul Haque',
  },
}

export default ui
