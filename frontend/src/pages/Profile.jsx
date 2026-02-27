import { useAuth } from '../context/AuthContext'
import './Profile.css'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="profile-page fade-in">
      <div className="profile-header glass-card">
        <div className="profile-avatar">
          <span className="avatar-emoji">👤</span>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user?.name || 'کاربر'}</h1>
          <p className="profile-username">@{user?.username || 'username'}</p>
          <div className="profile-badges">
            <span className="badge badge-primary">کاربر فعال</span>
            {user?.role === 'ADMIN' && <span className="badge badge-admin">مدیر</span>}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section glass-card">
          <h2 className="section-title">اطلاعات شخصی</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">ایمیل</span>
              <span className="info-value">{user?.email || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">شماره تلفن</span>
              <span className="info-value">{user?.phoneNumber || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">نقش</span>
              <span className="info-value">{user?.role === 'ADMIN' ? 'مدیر' : 'کاربر'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">تاریخ عضویت</span>
              <span className="info-value">۱۴۰۲/۱۲/۱۵</span>
            </div>
          </div>
          <button className="btn btn-primary">ویرایش اطلاعات</button>
        </div>

        <div className="profile-section glass-card">
          <h2 className="section-title">آمار یادگیری</h2>
          <div className="learning-stats">
            <div className="learning-stat">
              <div className="learning-icon">📚</div>
              <div className="learning-info">
                <div className="learning-value">12</div>
                <div className="learning-label">دوره تکمیل شده</div>
              </div>
            </div>
            <div className="learning-stat">
              <div className="learning-icon">⏱️</div>
              <div className="learning-info">
                <div className="learning-value">48</div>
                <div className="learning-label">ساعت آموزش</div>
              </div>
            </div>
            <div className="learning-stat">
              <div className="learning-icon">🏆</div>
              <div className="learning-info">
                <div className="learning-value">5</div>
                <div className="learning-label">گواهینامه</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
