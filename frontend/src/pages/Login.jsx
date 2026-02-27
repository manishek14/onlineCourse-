import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    identifire: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.identifire, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'خطا در ورود')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="auth-container fade-in">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <h1 className="auth-title">خوش آمدید</h1>
          <p className="auth-subtitle">برای ادامه وارد حساب کاربری خود شوید</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message glass">
              {error}
            </div>
          )}

          <div className="input-group">
            <input
              type="text"
              name="identifire"
              className="input"
              placeholder="نام کاربری یا ایمیل"
              value={formData.identifire}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              className="input"
              placeholder="رمز عبور"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>

        <div className="auth-footer">
          <p>حساب کاربری ندارید؟ <Link to="/register" className="auth-link">ثبت‌نام کنید</Link></p>
        </div>
      </div>

      <div className="auth-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
        <div className="decoration-circle circle-3"></div>
      </div>
    </div>
  )
}

export default Login
