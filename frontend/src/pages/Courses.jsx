import './Courses.css'

const Courses = () => {
  const courses = [
    { id: 1, title: 'React پیشرفته', instructor: 'استاد احمدی', students: 1250, rating: 4.8, price: '۲۵۰,۰۰۰', image: '📱' },
    { id: 2, title: 'Node.js و Express', instructor: 'استاد محمدی', students: 980, rating: 4.7, price: '۲۰۰,۰۰۰', image: '🚀' },
    { id: 3, title: 'طراحی UI/UX', instructor: 'استاد رضایی', students: 1500, rating: 4.9, price: '۳۰۰,۰۰۰', image: '🎨' },
    { id: 4, title: 'Python برای علم داده', instructor: 'استاد کریمی', students: 850, rating: 4.6, price: '۲۸۰,۰۰۰', image: '🐍' },
    { id: 5, title: 'DevOps و Docker', instructor: 'استاد حسینی', students: 720, rating: 4.8, price: '۳۵۰,۰۰۰', image: '🐳' },
    { id: 6, title: 'MongoDB و NoSQL', instructor: 'استاد علوی', students: 650, rating: 4.5, price: '۱۸۰,۰۰۰', image: '🍃' },
  ]

  return (
    <div className="courses-page fade-in">
      <div className="courses-header">
        <h1 className="courses-title">دوره‌های آموزشی</h1>
        <p className="courses-subtitle">بهترین دوره‌ها برای یادگیری</p>
      </div>

      <div className="courses-filters glass">
        <button className="filter-btn active">همه</button>
        <button className="filter-btn">برنامه‌نویسی</button>
        <button className="filter-btn">طراحی</button>
        <button className="filter-btn">DevOps</button>
        <button className="filter-btn">دیتابیس</button>
      </div>

      <div className="courses-grid">
        {courses.map((course, index) => (
          <div 
            key={course.id} 
            className="course-card glass-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="course-image">
              <span className="course-emoji">{course.image}</span>
              <div className="course-badge">جدید</div>
            </div>
            
            <div className="course-content">
              <h3 className="course-card-title">{course.title}</h3>
              <p className="course-instructor-name">{course.instructor}</p>
              
              <div className="course-stats">
                <div className="stat-item">
                  <span className="stat-icon">👥</span>
                  <span>{course.students.toLocaleString('fa-IR')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-icon">⭐</span>
                  <span>{course.rating.toLocaleString('fa-IR')}</span>
                </div>
              </div>

              <div className="course-footer">
                <div className="course-price">{course.price} تومان</div>
                <button className="btn btn-primary btn-sm">مشاهده دوره</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
