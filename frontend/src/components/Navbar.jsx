import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar glass">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎓</span>
          <span className="logo-text">پلتفرم آموزشی</span>
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">داشبورد</Link>
              <Link to="/courses" className="nav-link">دوره‌ها</Link>
              <Link to="/profile" className="nav-link">پروفایل</Link>
              <button onClick={handleLogout} className="btn btn-primary">
                خروج
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">ورود</Link>
              <Link to="/register" className="btn btn-primary">
                ثبت‌نام
              </Link>
            </>
          )}
          
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="تغییر تم"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
