import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* Logo */}
      <h1 className="text-2xl font-bold">ArenaPortfolio</h1>

      {/* Menus */}
      <nav>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:text-gray-500">Início</Link></li>
          <li><Link to="/explorar" className="hover:text-gray-500">Explorar</Link></li>
          <li><Link to="/sobre" className="hover:text-gray-500">Sobre</Link></li>
        </ul>
      </nav>

      {/* Botão de Votar */}
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Votar
      </button>
    </header>
  );
}
