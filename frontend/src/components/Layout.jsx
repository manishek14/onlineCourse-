import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <div className="background-gradient"></div>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
