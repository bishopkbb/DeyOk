import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Layout() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Symptoms', path: '/symptoms', icon: '🔍' },
    { name: 'Reminders', path: '/reminders', icon: '⏰' },
    { name: 'First Aid', path: '/first-aid', icon: '🚑' },
    { name: 'Health Tips', path: '/tips', icon: '💡' },
    { name: 'Facilities', path: '/facilities', icon: '🏥' },
  ]

  const isActive = (path) => location.pathname === path ||location.pathname.startsWith(path + '/')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      
      {/* Sidebar */}
      <aside style={{
        width: sidebarCollapsed ? '80px' : '280px',
        background: 'white',
        boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
        position: 'fixed',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: 'width 0.3s ease',
        zIndex: 1000
      }}>
        
        {/* Logo */}
        <div style={{
          padding: '2rem 1.5rem',
          borderBottom: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between'
        }}>
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                🏥
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1F2937' }}>DeyOk</div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>Health Companion</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: '#F3F4F6',
              border: 'none',
              borderRadius: '8px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.25rem'
            }}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* User Info */}
        {!sidebarCollapsed && (
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: 'white',
                fontWeight: '700'
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1F2937', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav style={{ padding: '1rem 0.75rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.875rem 1rem',
                marginBottom: '0.25rem',
                borderRadius: '12px',
                textDecoration: 'none',
                color: isActive(item.path) ? 'white' : '#6B7280',
                background: isActive(item.path) ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                fontWeight: isActive(item.path) ? '600' : '500',
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.background = '#F3F4F6'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.target.style.background = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div style={{ padding: '0 0.75rem 1.5rem' }}>
          <button
            onClick={() => {
              logout()
              navigate('/login')
            }}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              background: '#FEE2E2',
              color: '#DC2626',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              gap: '1rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.background = '#FECACA'}
            onMouseLeave={(e) => e.target.style.background = '#FEE2E2'}
          >
            <span style={{ fontSize: '1.25rem' }}>🚪</span>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        background: '#F9FAFB'
      }}>
        <div style={{ padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem', maxWidth: '1400px', margin: '0 auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout