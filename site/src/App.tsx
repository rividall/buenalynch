import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout/Layout'
import { Home } from '@/pages/Home'
import { About } from '@/pages/About'
import { Projects } from '@/pages/Projects'
import { Personal } from '@/pages/Personal'
import { ProjectDetail } from '@/pages/ProjectDetail'
import { Blog } from '@/pages/Blog'
import { CategoryPage } from '@/pages/CategoryPage'
import { Contact } from '@/pages/Contact'
import { CoworkGuide } from '@/pages/CoworkGuide'
import { DevProtocolGuide } from '@/pages/DevProtocolGuide'
import { ArduinoChecklist } from '@/pages/ArduinoChecklist'
import { NotFound } from '@/pages/NotFound'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="personal" element={<Personal />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<ProjectDetail />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="cowork-guide" element={<CoworkGuide />} />
          <Route path="dev-protocol-guide" element={<DevProtocolGuide />} />
          <Route path="arduino-checklist" element={<ArduinoChecklist />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
