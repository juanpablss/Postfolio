import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones para menu

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-dark-blue bg-opacity-25">
      <Link to="/" className="text-2xl font-bold text-light-300">POSTFOLIO</Link>

      <nav className="hidden md:flex items-center gap-7">
        <ul className="flex gap-6">
          <li><Link to="/ranking" className="hover:text-light-500 hover:underline">Ranking</Link></li>
          <li><Link to="/sobre" className="hover:text-light-500 hover:underline">Sobre</Link></li>
        </ul>
        <button className="px-4 py-2 bg-light-pink text-dark-900 rounded-md hover:bg-dark-pink">Login</button>
      </nav>

      {/* Ícone do Menu no Mobile */}
      <button 
        className="md:hidden text-light-300 text-2xl ml-4"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />} {/* Alterna entre os ícones */}
      </button>

      {/* Menu lateral (search menu) */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-3/4 h-full bg-dark-blue bg-opacity-95 text-light-300 p-6 flex flex-col items-center space-y-6 transition-all">
          <Link to="/ranking" className="text-xl hover:underline" onClick={() => setMenuOpen(false)}>Ranking</Link>
          <Link to="/sobre" className="text-xl hover:underline" onClick={() => setMenuOpen(false)}>Sobre</Link>
          <button 
            className="px-4 py-2 bg-light-pink text-dark-900 rounded-md hover:bg-dark-pink"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
