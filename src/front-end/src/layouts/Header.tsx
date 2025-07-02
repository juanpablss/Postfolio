import { useState, useEffect, useRef, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiAward,
  FiInfo,
  FiGithub,
  FiInstagram,
  FiUser,
  FiBriefcase,
  FiPlusCircle,
  FiLogOut,
  FiHome,
  FiMessageSquare,
  FiBell,
} from "react-icons/fi";
// import { createPortal } from "react-dom"; // Removido, pois MobileMenu agora gerencia seu próprio portal
import MobileMenu from "../components/Header/MobileMenu";
import DesktopNavigation from "../components/Header/DesktopNavigation";
// UserDropdown é usado dentro de ActionButtons, então não precisa ser importado aqui diretamente se ActionButtons for o único local
// import UserDropdown from "../components/Header/UserDropdown";
import ActionButtons from "../components/Header/ActionButtons"; // Importando ActionButtons

const mockUserData = {
  name: "José Cássios",
  username: "jose-cassios",
  email: "jose.cassios@example.com",
  photo: "cassios.png",
  userType: "freelancer",
};

const navLinks = [
  {
    label: "Home",
    path: "",
    icon: <FiHome className="mr-3 text-lg text-green-300" />,
  },
  {
    label: "Competição",
    path: "competicao",
    icon: <FiAward className="mr-3 text-lg text-blue-300" />,
  },
  {
    label: "Sobre",
    path: "about-us",
    icon: <FiInfo className="mr-3 text-lg text-indigo-200" />,
  },
];

// A função MobileMenu foi movida para src/front-end/src/components/Header/MobileMenu.tsx

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    username: string;
    name: string;
    email: string;
    photo: string;
    userType: string;
} | null>(null);
  // const [dropdownOpen, setDropdownOpen] = useState(false); // Movido para UserDropdown
  // const dropdownRef = useRef<HTMLDivElement | null>(null); // Movido para UserDropdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // In a real application, you'd fetch user data from your backend
      // using the token, e.g.:
      // fetch('your-backend-api/user/me', { headers: { Authorization: `Bearer ${token}` } })
      //   .then(res => res.json())
      //   .then(data => {
      //     setUser(data);
      //     setIsLoggedIn(true);
      //   })
      //   .catch(error => {
      //     console.error("Failed to fetch user data:", error);
      //     localStorage.removeItem("token"); // Clear invalid token
      //     setIsLoggedIn(false);
      //   });

      // For now, use mock data:
      setUser(mockUserData);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Close dropdown when clicking outside // Lógica movida para UserDropdown.tsx
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setDropdownOpen(false);
  //     }
  //   };
  //
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    // setDropdownOpen(false); // Não é mais necessário aqui
    setMenuOpen(false);
    navigate("/login");
  };

  const handleToggleUserType = () => {
    if (user) {
      const newType = user.userType === "contractor" ? "freelancer" : "contractor";
      // Simulação de atualização do backend
      setUser({ ...user, userType: newType });
      alert(`Tipo de usuário alterado para ${newType === 'contractor' ? 'Contratante' : 'Freelancer'}.`);
    }
    // setDropdownOpen(false); // Não é mais necessário aqui, o UserDropdown gerencia seu estado
    setMenuOpen(false); // Fechar menu mobile se estiver aberto
  };


  return (
    <>
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-5 py-3 bg-gradient-to-b from-blue-900/90 to-transparent shadow-lg z-50 backdrop-blur-md">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 drop-shadow-lg select-none"
          style={{ letterSpacing: "2px" }}
        >
          Postfolio
        </Link>

        {/* Desktop nav */}
        <DesktopNavigation navLinks={navLinks} />

        {/* Ícones à direita e Dropdown do Usuário (Desktop) */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <ActionButtons
            isLoggedIn={isLoggedIn}
            user={user}
            handleLogout={handleLogout}
            handleToggleUserType={handleToggleUserType}
          />
        </div>

        {/* Botão do menu mobile */}
        <div className="flex md:hidden items-center gap-3">
           {/* Ícones de Mensagens e Notificações (Mobile, se logado) */}
           {isLoggedIn && (
            <>
              <Link to="/messages" className="text-blue-200 hover:text-indigo-300 transition-colors" title="Mensagens">
                <FiMessageSquare size={24} />
              </Link>
              <button className="relative text-blue-200 hover:text-indigo-300 transition-colors" title="Notificações">
                <FiBell size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
            </>
          )}
          <button
            className="text-blue-200 text-3xl"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir Menu"
          >
            <FiMenu />
          </button>
        </div>
      </header>

      {/* Menu lateral mobile via Portal */}
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isLoggedIn={isLoggedIn}
        user={user} // O user agora pode ter a propriedade username, que MobileMenu espera
        handleLogout={handleLogout}
        handleToggleUserType={handleToggleUserType}
        navLinks={navLinks} // Passando navLinks para o MobileMenu
      />
    </>
  );
}
