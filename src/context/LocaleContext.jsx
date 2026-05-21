import { createContext, useContext, useState, useEffect } from 'react'
import enUI from '@/template/ui.en_US'
import deUI from '@/template/ui.de_DE'

const UI_MAPS = { 'en-US': enUI, 'de-DE': deUI }

export const SUPPORTED_LOCALES = [
  { code: 'en-US', label: 'EN' },
  { code: 'de-DE', label: 'DE' },
]

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() =>
    localStorage.getItem('resume-locale') || 'en-US'
  )

  useEffect(() => { localStorage.setItem('resume-locale', locale) }, [locale])

  const ui = UI_MAPS[locale] ?? UI_MAPS['en-US']

  function t(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], ui) ?? path
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => useContext(LocaleContext)
