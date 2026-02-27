import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()

  const stats = [
    { label: 'دوره‌های من', value: '12', icon: '📚', color: 'primary' },
    { label: 'ساعت آموزش', value: '48', icon: '⏱️', color: 'secondary' },
    { label: 'گواهینامه', value: '5', icon: '🏆', color: 'success' },
    { label: 'امتیاز', value: '850', icon: '⭐', color: 'warning' },
  ]

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">سلام، {user?.name || 'کاربر'} 👋</h1>
        <p className="dashboard-subtitle">به داشبورد خود خوش آمدید</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`stat-card glass-card stat-${stat.color}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="content-section glass-card">
          <h2 className="section-title">دوره‌های در حال یادگیری</h2>
          <div className="courses-list">
            {[1, 2, 3].map((item) => (
              <div key={item} className="course-item glass">
                <div className="course-thumbnail">
                  <div className="course-progress">
                    <div className="progress-bar" style={{ width: `${item * 30}%` }}></div>
                  </div>
                </div>
                <div className="course-info">
                  <h3 className="course-title">دوره آموزشی {item}</h3>
                  <p className="course-instructor">مدرس: استاد محمدی</p>
                  <div className="course-meta">
                    <span>{item * 30}% تکمیل شده</span>
                    <span>12 ساعت</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card glass-card">
            <h3 className="sidebar-title">فعالیت اخیر</h3>
            <div className="activity-list">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="activity-item">
                  <div className="activity-icon">✓</div>
                  <div className="activity-content">
                    <p className="activity-text">درس {item} تکمیل شد</p>
                    <span className="activity-time">{item} ساعت پیش</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
