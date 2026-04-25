import { Outlet, useLocation } from 'react-router-dom'
import SiteFooter from '../components/navigation/SiteFooter.jsx'
import SiteHeader from '../components/navigation/SiteHeader.jsx'

function MainLayout() {
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'
  const shellClassName = isHomePage
    ? 'min-h-screen bg-[#f2f0e8]'
    : 'min-h-screen bg-[#f2f0e8] px-3 py-3 max-[960px]:px-2 max-[960px]:py-2'
  const frameClassName = isHomePage
    ? 'min-h-screen'
    : 'mx-auto flex min-h-[calc(100vh-24px)] w-full max-w-[1180px] flex-col border-[4px] border-[#101010] bg-[#fffef8] shadow-[12px_12px_0_rgba(16,16,16,0.16)] max-[960px]:min-h-[calc(100vh-16px)] max-[960px]:shadow-[8px_8px_0_rgba(16,16,16,0.16)]'
  const mainClassName = isHomePage ? '' : 'flex-1 px-3 py-3 sm:px-4 sm:py-4'

  return (
    <div className={shellClassName}>
      <div className={frameClassName}>
        {isHomePage ? null : <SiteHeader />}
        <main className={mainClassName}>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}

export default MainLayout
