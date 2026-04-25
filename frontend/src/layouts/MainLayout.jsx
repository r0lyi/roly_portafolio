import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/navigation/SiteFooter.jsx'
import SiteHeader from '../components/navigation/SiteHeader.jsx'

function MainLayout() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const shellClassName = isHomePage
    ? 'min-h-screen bg-[#f2f0e8]'
    : 'mx-auto my-6 w-[min(1180px,calc(100%-32px))] overflow-hidden rounded-[36px] border border-[rgba(21,39,48,0.12)] bg-[rgba(255,252,245,0.7)] shadow-[0_24px_80px_rgba(17,32,41,0.12)] backdrop-blur-[22px] max-[960px]:my-2 max-[960px]:w-[min(1180px,calc(100%-16px))] max-[960px]:rounded-[24px]'
  const mainClassName = isHomePage ? '' : 'p-3'

  return (
    <div className={shellClassName}>
      {isHomePage ? null : <SiteHeader />}
      <main className={mainClassName}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}

export default MainLayout
