import { LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

export function AppLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Topbar */}
      <header className="border-b border-border bg-card sticky top-0 z-40 h-12 flex items-center px-6">
        <div className="flex-1 flex items-center gap-2">
          <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center">
            <Users className="h-3 w-3 text-primary" />
          </div>
          <nav className="flex items-center gap-1 ml-4">
            <NavLink
              to="/persons"
              className={({ isActive }) =>
                `px-3 py-1 rounded text-sm transition-colors ${
                  isActive
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`
              }
            >
              Pessoas
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

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-6">
        <Outlet />
      </main>
    </div>
  )
}
