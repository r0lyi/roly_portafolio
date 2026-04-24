import { Outlet } from 'react-router-dom'
import SiteFooter from '../components/navigation/SiteFooter.jsx'
import SiteHeader from '../components/navigation/SiteHeader.jsx'

function MainLayout() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="page-shell">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
