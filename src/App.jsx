import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import MobileNav from './components/layout/MobileNav'
import Sidebar from './components/layout/Sidebar'
import { HabitProvider } from './hooks/useHabits'
import CalendarPage from './pages/Calendar'
import DashboardPage from './pages/Dashboard'
import HabitDetailsPage from './pages/HabitDetails'
import HabitsPage from './pages/Habits'
import InsightsPage from './pages/Insights'
import NotFoundPage from './pages/NotFound'
import ProgressPage from './pages/Progress'
import SettingsPage from './pages/Settings'

function AppShell() {
  const location = useLocation()

  const titles = {
    '/': 'Dashboard',
    '/habits': 'My Habits',
    '/progress': 'Progress',
    '/calendar': 'Calendar',
    '/insights': 'Insights',
    '/settings': 'Settings',
  }

  const title = titles[location.pathname] || 'Dashboard'

  return (
    <div className="min-h-screen bg-slate-950 text-zinc-100">
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        <div className="min-h-screen flex-1">
          <Header title={title} />
          <main className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/habits" element={<HabitsPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/habits/:id" element={<HabitDetailsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
        </div>
      </div>
      <MobileNav />
    </div>
  )
}

export default function App() {
  return (
    <HabitProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HabitProvider>
  )
}
