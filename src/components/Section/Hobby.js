import React from 'react';
import Datetime from '../../utils/datetime';
import { FormattedMessage, FormattedDate } from 'react-intl';
const Entry = ({ entry }) => {

  return (
    <div className="row item">
      <div className="twelve columns">
          <h3>{entry.institution}</h3>
      </div>
    </div>
)};

const Hobby = ({ content }) => (
  <section id='hobby'>
    <div className='row hobby'>
      <div className='two columns header-col'>
        <h1>
        <FormattedMessage id="hobby.title" defaultMessage="hobby"/>
        </h1>
      </div>
      <div className='ten columns main-col'>
        {content.map((entry, index) => (
          <Entry key={index} entry={entry}/>
        ))}
      </div>
    </div>
  </section>
);

export default Hobby;