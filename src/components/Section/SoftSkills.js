import React from 'react';
import { injectIntl } from 'react-intl';
import SkillBar from 'react-skillbars';
import '../../styles/SoftSkills.css';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { style: { background: '#313131' } };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() { this.setState({ style: { background: '#11ABB0' } }); }
  handleMouseLeave() { this.setState({ style: { background: '#313131' } }); }

  render() {
    return <SkillBar skills={this.props.skills} />;
  }
}

const SoftSkill = ({ title, content = [], summary = [] }) => {
  // bullet list for the three description lines
  const summaries = (
    <ul className="skill-summary-list">
      {summary.map((point, i) => (
        <li key={i} className="skill-summary">{point}</li>
      ))}
    </ul>
  );

  // map {name, level} -> {type, level} for react-skillbars
  const bars = content.map(s => ({ type: s.name, level: Number(s.level) || 0 }));

  return (
    <div className="row inside">
      {/* <h3>{title}</h3> */}
      {summaries}
      <div className="bars softskills-bars">
        <ul className="skills">
          <Entry skills={bars} />
        </ul>
      </div>
    </div>
  );
};

const SoftSkills = ({ content, intl }) => {
  // Accept either content = { softskills: [...] } OR content = [...]
  let softskillsArray = [];
  if (Array.isArray(content)) {
    softskillsArray = content;
  } else if (content && content.softskills) {
    softskillsArray = content.softskills;
  }

  const locale = intl && intl.locale ? String(intl.locale).toLowerCase() : '';
  const isDE = locale.indexOf('de') === 0;
  const titleText = isDE ? 'SOZIALE FÄHIGKEITEN' : 'SOFT SKILLS';

  return (
    <section id="hobby">
      <div className="row hobby">
        <div className="two columns header-col">
          <h1>{titleText}</h1>
        </div>

        <div className="ten columns main-col">
          {softskillsArray.map((skill, index) => (
            <SoftSkill
              key={index}
              title={skill.title}
              content={skill.skillDetails || []}
              summary={skill.description || []}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default injectIntl(SoftSkills);
