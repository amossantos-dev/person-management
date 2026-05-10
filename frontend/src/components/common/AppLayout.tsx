import { LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export function AppLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Glassmorphism topbar */}
      <header
        className="sticky top-0 z-40 h-12 flex items-center px-6"
        style={{
          background: 'rgba(8, 8, 15, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="flex-1 flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
            <Users className="h-3 w-3 text-primary" />
          </div>

          <span className="text-sm font-semibold gradient-text ml-1">Pessoas</span>

          <nav className="flex items-center gap-1 ml-4">
            <NavLink
              to="/persons"
              className={({ isActive }) =>
                `relative px-3 py-1 rounded text-sm transition-colors ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded"
                      style={{ background: 'rgba(124, 58, 237, 0.15)' }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Pessoas</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sair
        </button>
      </header>

      {/* Content with page transitions */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
