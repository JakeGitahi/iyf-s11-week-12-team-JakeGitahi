import { NavLink } from 'react-router-dom'
import Avatar from './Avatar'
import { currentUser } from '../data/mockData'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/feed', label: 'Feed' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2 text-lg font-extrabold text-primary">
            <span aria-hidden="true">🎓</span>
            CampusConnect
          </NavLink>

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-primary-light text-primary'
                      : 'text-ink hover:bg-primary-light hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="rounded-md p-2 text-ink-muted transition-colors duration-150 hover:bg-primary-light hover:text-primary"
          >
            🔔
          </button>
          <NavLink to="/profile" aria-label="Your profile">
            <Avatar initial={currentUser.initial} size="sm" />
          </NavLink>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-2 sm:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                isActive ? 'bg-primary-light text-primary' : 'text-ink-muted hover:text-primary'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
