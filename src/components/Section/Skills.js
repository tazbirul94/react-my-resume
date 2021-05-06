
import React from 'react';
import { FormattedMessage } from 'react-intl';
import SkillBar from 'react-skillbars';

const skills = [
  {type: "C#", level: 80},
  {type: "Javascript", level: 75},
  {type: "React", level: 75},
  {type: "React Native", level: 80},
  {type: "Asp.Net Core", level: 65},
  {type: "Asp.Net MVC", level: 75},
  {type: "CSS3", level: 70},
  {type: "HTML5", level: 80},
  {type: "Microsoft SQL", level: 75},
  {type: "LINQ", level: 70},
  {type: "Postman", level: 70},
  {type: "Bootstrap", level: 65},
  {type: "Docker", level: 45},
  {type: "Git", level: 70},
  {type: "Azure", level: 65},
  {type: "Flutter", level: 50},
];

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { background: '#313131' }   
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() {
    this.setState({
      style: { background: '#11ABB0' }
    });
  }

  handleMouseLeave() {
    this.setState({
      style: { background: '#313131' }
    });
  }

  render() {
    return (
      // <li>
      //   <span
      //   className={`bar-expand percentage${this.props.entry.level}`}
      //   onMouseEnter={this.handleMouseEnter}
      //   onMouseLeave={this.handleMouseLeave}
      //   style={this.state.style}/>
      //   <em>{this.props.entry.name}</em>
       
      // </li>
      <SkillBar skills={skills}/>
    );
  }
}

const Skill = ({ title, content, summary }) => {

  const summaries = summary.map((point, index) => (
    <p key={index} className='skill-summary'>{point}</p>
  ));

  return (
    <div className="row inside">
      <h3>{title}</h3>
      {summaries}
      <div className="bars">
        <ul className="skills">
          {content.map((entry, index) =>(
          <Entry key={index} entry={entry}/>
        ))}
        </ul>
      </div>
    </div>
  );
};

const Skills = ({ content }) => (

  <section id="skill">
    <div className="row skill">
      <div className="two columns header-col">
        <h1>
        <FormattedMessage id="skills.title" defaultMessage="Skills"/>
        </h1>
      </div>
      <div className="ten columns main-col">
        {content.skills.map((skill, index) => (
          <Skill key={index} title={skill.title} content={skill.skillDetails} 
          summary={skill.description}/>
        ))}

      </div>
    </div>
  </section>
);

export default Skills;
