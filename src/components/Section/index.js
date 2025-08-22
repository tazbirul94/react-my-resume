import React from 'react';
import About from './About';
import Work from './Work';
import Education from './Education';
import Skills from './Skills';
import Portfolio from './Portfolio';
import References from './References';
import Footer from './Footer';
import Hobby from './Hobby';

const Section = ({
  basics,
  work,
  education,
  skills,
  languages,
  portfolio,
  references,
  hobby = []   // 👈 make sure hobby is defined
}) => {
  return (
    <div>
      <About content={basics} />
      <Work content={work} />
      <Education content={education} />
      {/* Skills expects an object with a .skills array */}
      <Skills content={{ skills }} />
      <Hobby content={hobby} />
      <Portfolio content={portfolio} />
      <References content={references} />
      <Footer content={basics} />
    </div>
  );
};

export default Section;