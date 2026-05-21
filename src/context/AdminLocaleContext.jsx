import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const AdminLocaleContext = createContext(null)

export function AdminLocaleProvider({ children }) {
  const [adminLocale, setAdminLocaleState] = useState(
    () => localStorage.getItem('admin-locale') || 'en-US'
  )
  const [supportedLocales, setSupportedLocales] = useState([{ code: 'en-US', label: 'EN' }])

  useEffect(() => {
    if (!supabase) return
    supabase.from('locales').select('*').eq('is_active', true).order('sort_order')
      .then(({ data }) => { if (data?.length) setSupportedLocales(data) })
  }, [])

  function setAdminLocale(code) {
    localStorage.setItem('admin-locale', code)
    setAdminLocaleState(code)
  }

  return (
    <AdminLocaleContext.Provider value={{ adminLocale, setAdminLocale, supportedLocales }}>
      {children}
    </AdminLocaleContext.Provider>
  )
}

export const useAdminLocale = () => useContext(AdminLocaleContext)
