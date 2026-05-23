import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { LocaleProvider } from '@/context/LocaleContext'
import { AuthProvider } from '@/hooks/useAuth'
import { Resume } from '@/pages/Resume'
import { AdminLogin } from '@/pages/admin/Login'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { ProtectedRoute } from '@/components/admin/ProtectedRoute'
import { AdminDashboard } from '@/pages/admin/Dashboard'
import { BasicsAdmin } from '@/pages/admin/BasicsAdmin'
import { WorkAdmin } from '@/pages/admin/WorkAdmin'
import { EducationAdmin } from '@/pages/admin/EducationAdmin'
import { SkillsAdmin } from '@/pages/admin/SkillsAdmin'
import { LanguagesAdmin } from '@/pages/admin/LanguagesAdmin'
import { InterestsAdmin } from '@/pages/admin/InterestsAdmin'
import { ProjectsAdmin } from '@/pages/admin/ProjectsAdmin'
import { CertificationsAdmin } from '@/pages/admin/CertificationsAdmin'
import { TestimonialsAdmin } from '@/pages/admin/TestimonialsAdmin'
import { SoftSkillsAdmin } from '@/pages/admin/SoftSkillsAdmin'
import { AdminLocaleProvider } from '@/context/AdminLocaleContext'
import { LocalesAdmin } from '@/pages/admin/LocalesAdmin'

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <BrowserRouter basename="/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>

            <Routes>
              <Route path="/" element={<Resume />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLocaleProvider>
                      <AdminLayout />
                    </AdminLocaleProvider>
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="locales" element={<LocalesAdmin />} />
                <Route path="basics" element={<BasicsAdmin />} />
                <Route path="work" element={<WorkAdmin />} />
                <Route path="education" element={<EducationAdmin />} />
                <Route path="skills" element={<SkillsAdmin />} />
                <Route path="languages" element={<LanguagesAdmin />} />
                <Route path="interests" element={<InterestsAdmin />} />
                <Route path="projects" element={<ProjectsAdmin />} />
                <Route path="certifications" element={<CertificationsAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
                <Route path="soft-skills" element={<SoftSkillsAdmin />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
