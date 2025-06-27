import { useState, useEffect, useRef, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiAward,
  FiInfo,
  FiMail,
  FiGithub,
  FiInstagram,
  FiUser, // Added for user icon if no photo is available
  FiBriefcase, // Icon for 'Contratante'
  FiPlusCircle, // Icon for 'Criar Conta'
  FiLogOut, // Icon for 'Sair'
} from "react-icons/fi";
import { createPortal } from "react-dom";

// Placeholder for user data. In a real app, this would come from an API.
// Simulate different user types for demonstration
const mockUserData = {
  name: "José Cássios",
  email: "jose.cassios@example.com",
  photo: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg", // Example photo
  userType: "freelancer", // Can be 'freelancer' or 'contractor'
};
// Uncomment and modify this if you want to test contractor flow
// const mockUserData = {
//   name: "Maria Silva",
//   email: "maria.silva@example.com",
//   photo: "https://images.unsplash.com/photo-1573496359142-b8d877341ace?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   userType: "contractor",
// };


const navLinks = [
  {
    label: "Competição",
    path: "competicao",
    icon: <FiAward className="mr-3 text-lg text-blue-300" />,
  },
  {
    label: "Sobre",
    path: "sobre",
    icon: <FiInfo className="mr-3 text-lg text-indigo-200" />,
  },
  {
    label: "Contato",
    path: "contato",
    icon: <FiMail className="mr-3 text-lg text-blue-200" />,
  },
];

function MobileMenu({
  menuOpen,
  setMenuOpen,
  isLoggedIn,
  user,
  handleLogout,
  handleToggleUserType,
}: {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  user: {
    email: ReactNode; name: string; photo?: string; userType: string 
} | null;
  handleLogout: () => void;
  handleToggleUserType: () => void;
}) {
  const navigate = useNavigate();

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).id === "mobile-menu-overlay") {
      setMenuOpen(false);
    }
  };

  if (!menuOpen) return null;

  return createPortal(
    <div
      id="mobile-menu-overlay"
      className="fixed inset-0 z-[9999] bg-black/60 flex"
      onClick={handleOverlayClick}
    >
      <div
        className="
          relative ml-auto w-4/5 max-w-xs h-full
          bg-gradient-to-b from-blue-900 via-indigo-900 to-purple-900
          rounded-l-3xl shadow-2xl
          flex flex-col items-center pt-12 pb-4 px-6
          animate-slide-in
          border-l-4 border-blue-800
        "
        style={{
          boxShadow: "0 0 40px 0 rgba(40,80,180,0.12)",
        }}
      >
        {/* Botão de fechar */}
        <button
          className="absolute top-4 right-4 text-4xl text-blue-200 hover:text-indigo-300 p-2 rounded-full transition"
          onClick={() => setMenuOpen(false)}
          aria-label="Fechar Menu"
        >
          <FiX />
        </button>

        {isLoggedIn && user ? (
          <div className="w-full mb-6 px-2 text-center">
            {user.photo ? (
              <img
                className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-indigo-400"
                src={user.photo}
                alt={user.name}
              />
            ) : (
              <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center bg-indigo-700 text-white text-4xl">
                <FiUser />
              </div>
            )}
            <div className="font-medium text-lg text-white mb-1">
              {user.name}
            </div>
            <div className="truncate text-sm text-indigo-200 mb-4">
              {user.email}
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate(`/profile/${user.name.toLowerCase().replace(/\s/g, "")}`);
              }}
              className="w-full px-4 py-3 rounded-lg bg-indigo-700 text-white font-semibold shadow hover:bg-indigo-800 transition mb-3"
            >
              Ver Perfil
            </button>
            {user.userType === "contractor" ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleToggleUserType();
                }}
                className="w-full px-4 py-3 rounded-lg bg-purple-700 text-white font-semibold shadow hover:bg-purple-800 transition mb-3"
              >
                Trocar para Freelancer
              </button>
            ) : (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleToggleUserType(); // Call the handler to toggle type
                }}
                className="w-full px-4 py-3 rounded-lg bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition mb-3"
              >
                Trocar para Contratante
              </button>
            )}
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout(); // Call the logout handler
              }}
              className="w-full px-4 py-3 rounded-lg bg-transparent border border-red-300 text-red-200 hover:bg-red-600 hover:text-white transition"
            >
              Sair
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-4 mt-8">
            <Link
              to="/login"
              className="w-full text-center px-4 py-2 rounded-full bg-transparent border-2 border-blue-400 text-blue-100 font-medium shadow hover:border-white hover:bg-blue-800 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full text-center px-4 py-2 rounded-full bg-blue-700 border-2 border-blue-700 text-white font-medium shadow hover:bg-blue-800 transition"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}

        <div className="flex flex-col w-full gap-2 mt-8">
          {navLinks.map(({ label, path, icon }) => (
            <Link
              key={path}
              to={`/${path}`}
              className="flex items-center w-full text-xl font-semibold py-3 px-4 rounded-lg text-blue-100 hover:bg-gradient-to-r hover:from-blue-800 hover:to-indigo-900 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        {/* Informações extras no rodapé */}
        <div className="mt-auto w-full flex flex-col items-center gap-2 pt-8 border-t border-blue-900">
          <span className="text-xs text-blue-300">
            © {new Date().getFullYear()} Postfolio
          </span>
          <span className="text-xs text-indigo-200">
            Integrando experiências e conhecimentos
          </span>
          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com/seuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white text-xl transition"
            >
              <FiGithub />
            </a>
            <a
              href="https://instagram.com/seuusuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:text-white text-xl transition"
            >
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.3s cubic-bezier(0.4,0,0.2,1);
          }
        `}
      </style>
    </div>,
    document.body
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for desktop dropdown
  const dropdownRef = useRef(null); // Ref for dropdown element
  const navigate = useNavigate();

  // Simulate fetching user data on component mount
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setDropdownOpen(false); // Close dropdown on logout
    setMenuOpen(false); // Close mobile menu on logout
    navigate("/login");
  };

  const handleToggleUserType = () => {
    if (user) {
      const newType = user.userType === "contractor" ? "freelancer" : "contractor";
      // In a real application, you would send this update to your backend
      // fetch('your-backend-api/user/update-type', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      //   body: JSON.stringify({ userType: newType })
      // })
      // .then(response => response.json())
      // .then(data => {
      //   setUser({ ...user, userType: newType });
      //   alert(`Tipo de usuário alterado para ${newType === 'contractor' ? 'Contratante' : 'Freelancer'}.`);
      // })
      // .catch(error => console.error("Failed to update user type:", error));

      // For now, simulate update
      setUser({ ...user, userType: newType });
      alert(`Tipo de usuário alterado para ${newType === 'contractor' ? 'Contratante' : 'Freelancer'}.`);
    }
    setDropdownOpen(false); // Close dropdown after action
    setMenuOpen(false); // Close mobile menu after action
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
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8 font-medium text-blue-100">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <Link
                  to={`/${path}`}
                  className="hover:text-blue-400 text-blue-200 transition-colors duration-200"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop botões e Dropdown do Usuário */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                id="dropdownAvatarNameButton"
                className="flex items-center text-sm pe-1 font-medium text-blue-100 rounded-full hover:text-blue-400 focus:ring-4 focus:ring-blue-300/30 transition"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                {user.photo ? (
                  <img
                    className="w-9 h-9 me-2 rounded-full border-2 border-indigo-400 object-cover"
                    src={user.photo}
                    alt={user.name}
                  />
                ) : (
                  <div className="w-9 h-9 me-2 rounded-full bg-indigo-700 flex items-center justify-center text-white text-xl">
                    <FiUser />
                  </div>
                )}
                {user.name}
                <svg
                  className={`w-2.5 h-2.5 ms-3 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              <div
                id="dropdownAvatarName"
                className={`absolute right-0 mt-2 z-10 bg-indigo-900/95 divide-y divide-indigo-800 rounded-lg shadow-xl w-52 backdrop-blur-md transition-all duration-200 ease-out transform ${
                  dropdownOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="px-4 py-3 text-sm text-white">
                  <div className="font-bold text-base">{user.name}</div>
                  <div className="truncate text-indigo-200">{user.email}</div>
                </div>
                <ul className="py-2 text-sm text-indigo-100">
                  <li>
                    <Link
                      to={`/profile/${user.name.toLowerCase().replace(/\s/g, "")}`}
                      className="flex items-center px-4 py-2 hover:bg-indigo-700 hover:text-white transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FiUser className="mr-2" /> Ver Perfil
                    </Link>
                  </li>
                  <li>
                    {user.userType === "contractor" ? (
                      <button
                        onClick={handleToggleUserType}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-purple-700 hover:text-white transition"
                      >
                        <FiBriefcase className="mr-2" /> Trocar para Freelancer
                      </button>
                    ) : (
                      <button
                        onClick={handleToggleUserType}
                        className="flex items-center w-full text-left px-4 py-2 hover:bg-green-700 hover:text-white transition"
                      >
                        <FiPlusCircle className="mr-2" /> Criar Conta de Contratante
                      </button>
                    )}
                  </li>
                </ul>
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-200 hover:bg-red-700 hover:text-white transition"
                  >
                    <FiLogOut className="mr-2" /> Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-7 py-1 rounded-full bg-transparent border-blue-400 border-opacity-30 hover:border-white hover:border-opacity-55 border-2 text-blue-100 font-medium shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-7 py-1 rounded-full bg-blue-700 border-blue-700 border-2 text-white font-medium shadow-md hover:bg-blue-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Botão do menu mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="text-blue-200 text-3xl ml-2"
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
        user={user}
        handleLogout={handleLogout}
        handleToggleUserType={handleToggleUserType}
      />
    </>
  );
}