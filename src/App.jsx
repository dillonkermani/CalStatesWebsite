import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './hooks/useTheme'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import HomePage from './pages/HomePage'
import SchedulePage from './pages/SchedulePage'
import LocationPage from './pages/LocationPage'
import CompetePage from './pages/CompetePage'
import RulesPage from './pages/RulesPage'
import ResultsPage from './pages/ResultsPage'
import LodgingPage from './pages/LodgingPage'
import SponsorsPage from './pages/SponsorsPage'
import ContactPage from './pages/ContactPage'

function App() {
  const location = useLocation()

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/location" element={<LocationPage />} />
              <Route path="/compete" element={<CompetePage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/lodging" element={<LodgingPage />} />
              <Route path="/sponsors" element={<SponsorsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
