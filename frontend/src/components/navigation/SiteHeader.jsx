import { LayoutDashboard, LogIn, LogOut, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import { navigationLinks } from "../../constants/navigation.js";
import {
  authLinkClass,
  dangerButtonClass,
  secondaryButtonClass,
} from "../../styles/tailwindClasses.js";
import { scrollToSection } from "../../utils/scrollToSection.js";
import { useState } from "react";

function SiteHeader() {
  const { isAuthenticated, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleBrandClick() {
    if (isHomePage) {
      scrollToSection("hero");
      return;
    }

    navigate("/");
  }

  function handleLogout() {
    logout();
    navigate(pathname.startsWith("/admin") ? "/admin/login" : "/");
  }

  return (
    <header className="flex items-center justify-between gap-6 border-b border-[rgba(21,39,48,0.12)] px-7 py-5 max-[960px]:flex-col max-[960px]:items-start max-[960px]:px-[18px]">
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-[14px] border-0 bg-transparent p-0 text-left text-[#112029] transition duration-200 hover:-translate-y-px"
          onClick={handleBrandClick}
        >
          <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[linear-gradient(135deg,#143c46,#27695f)] font-extrabold text-white">
            R
          </span>
          <span className="flex flex-col gap-0.5 max-[640px]:hidden">
            <strong className="text-[0.98rem]">Roly Portfolio</strong>
            <span className="text-[0.83rem] text-[#5f7881]">
              React + Vite + FastAPI
            </span>
          </span>
        </button>

        {/* Botón de hamburguesa - solo visible en móvil/tablet */}
        <button
          type="button"
          className="hidden max-[960px]:grid max-[960px]:place-items-center max-[960px]:border-0 max-[960px]:bg-transparent max-[960px]:p-2 max-[960px]:text-[#112029]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Contenido del header */}
      <div
        className={`flex w-full items-center gap-3 max-[960px]:flex-col max-[960px]:items-stretch ${isMenuOpen ? "max-[960px]:flex" : "max-[960px]:hidden"} max-[640px]:flex`}
      >
        {/* Navegación - dentro del menú hamburguesa en móvil/tablet */}
        <nav
          className="flex flex-wrap gap-2.5 max-[960px]:order-2 max-[960px]:w-full max-[640px]:flex-col"
          aria-label={
            isHomePage ? "Secciones principales" : "Navegacion general"
          }
        >
          {isHomePage ? (
            navigationLinks.map((link) => (
              <button
                key={link.sectionId}
                type="button"
                className={`${secondaryButtonClass} max-[640px]:w-full`}
                onClick={() => {
                  scrollToSection(link.sectionId);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </button>
            ))
          ) : (
            <Link
              className={`${secondaryButtonClass} max-[640px]:w-full`}
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
          )}
        </nav>

        {/* Botón de Admin - siempre visible en móvil/tablet */}
        <div className="flex items-center gap-3 max-[960px]:order-1 max-[640px]:w-full">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className={`${authLinkClass} max-[640px]:w-full`}
                aria-label="Abrir panel de administracion"
              >
                <LayoutDashboard size={18} strokeWidth={2.2} />
                <span>Panel admin</span>
              </Link>

              <button
                type="button"
                className={`${dangerButtonClass} max-[640px]:w-full`}
                onClick={handleLogout}
                aria-label="Cerrar sesion"
              >
                <LogOut size={18} strokeWidth={2.2} />
                <span>Cerrar sesion</span>
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className={`${authLinkClass} max-[640px]:w-full`}
              aria-label="Iniciar sesion como administrador"
            >
              <LogIn size={18} strokeWidth={2.2} />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
