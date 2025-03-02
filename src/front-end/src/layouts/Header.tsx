import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-dark-700">
      {/* <h1 className="text-2xl font-bold text-light-300">ArenaPortfolio</h1> */}
      {/* <img src="/pf-logo.png" alt="Logo" className="px-5"></img> */}
      <p>Arena</p>
      <nav>
        <ul className="flex gap-6">
          <li><Link to="/" className="hover:text-light-500 hover:underline">Início</Link></li>
          <li><Link to="/sobre" className="hover:text-light-500 hover:underline">Sobre</Link></li>
        </ul>
      </nav>

      {/* Botão de Votar */}
      <button className="px-4 py-2 bg-light-300 text-dark-900 rounded-md hover:bg-light-500">
        Votar
      </button>
    </header>
  );
}
