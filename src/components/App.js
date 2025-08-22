import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';

import resume_en_US from '../template/resume.en_US';
import resume_de_GER from '../template/resume.de_GER';

import ui_en_US from '../template/ui.en_US';
import ui_de_GER from '../template/ui.de_GER';

import Home from './Home';
import flattenMessages from '../utils/flattenMessages';

// locale data (react-intl v2 style)
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

addLocaleData([...en, ...de]);

const SUPPORT_LOCALES = [
  { name: 'English', value: 'en-US' },
  { name: 'Deutsch', value: 'de-GER' }
];

class App extends Component {
  state = {
    // lang: short ISO for IntlProvider; locale: full code for the <select>
    lang: 'en',
    locale: 'en-US',
    messages: ui_en_US,
    resume: resume_en_US
  };

  constructor(props) {
    super(props);
    this.onSelectLocale = this.onSelectLocale.bind(this);
  }

  renderLocaleSelector() {
    return (
      <select
        onChange={this.onSelectLocale}
        value={this.state.locale}
        className="locale-selector"
      >
        {SUPPORT_LOCALES.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.name}
          </option>
        ))}
      </select>
    );
  }

  onSelectLocale(e) {
    const locale = e.target.value;      // 'en-US' | 'de-GER'
    const lang = locale.slice(0, 2);    // 'en'    | 'de'

    if (locale === 'de-GER') {
      this.setState({
        lang,
        locale,
        messages: ui_de_GER,
        resume: resume_de_GER
      });
    } else {
      this.setState({
        lang,
        locale,
        messages: ui_en_US,
        resume: resume_en_US
      });
    }
    // optional: persist in URL
    // window.location.search = `?lang=${locale}`;
  }

  render() {
    const { lang, messages, resume } = this.state;
    const flattenedMessages = flattenMessages(messages);

    return (
      <div className="App">
        <IntlProvider locale={lang} messages={flattenedMessages}>
          <Home resume={resume} navigation={messages.navigation} />
        </IntlProvider>
        {this.renderLocaleSelector()}
      </div>
    );
  }
}

export default App;