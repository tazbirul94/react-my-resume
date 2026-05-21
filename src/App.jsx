import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/hooks/useAuth'
import { Layout } from '@/components/layout/Layout'
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

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter basename="/react-my-resume">
          <Routes>
            <Route path="/" element={<Layout><Resume /></Layout>} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="basics" element={<BasicsAdmin />} />
              <Route path="work" element={<WorkAdmin />} />
              <Route path="education" element={<EducationAdmin />} />
              <Route path="skills" element={<SkillsAdmin />} />
              <Route path="languages" element={<LanguagesAdmin />} />
              <Route path="interests" element={<InterestsAdmin />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="certifications" element={<CertificationsAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
