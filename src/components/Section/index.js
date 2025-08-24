import React from 'react';
import About from './About';
import Work from './Work';
import Education from './Education';
import Skills from './Skills';
import Portfolio from './Portfolio';
import References from './References';
import Footer from './Footer';
import Hobby from './Hobby';
import Languages from "./Languages";
import SoftSkills from './SoftSkills';
import Certifications from './Certifications';

const Section = ({
  basics,
  work,
  education,
  skills,
  softskills,
  languages,
  portfolio,
  certifications,
  references,
  hobby = []
}) => {
  return (
    <div>
      <About content={basics} />
      <Work content={work} />
      <Education content={education} />
      <Skills content={{ skills }} />
      <SoftSkills content={{ softskills }} />
      <Languages content={languages} />
      <Hobby content={hobby} />
      <Certifications content={certifications} />
      <Portfolio content={portfolio} />
      <References content={references} />
      <Footer content={basics} />
    </div>
  );
};

export default Section;