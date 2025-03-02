import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-dark-blue bg-opacity-25">
      <Link to="/" className="text-2xl font-bold text-light-300">POSTFOLIO</Link>
      <nav className="flex items-center gap-7">
        <ul className="flex gap-6">
          <li><Link to="/ranking" className="hover:text-light-500 hover:underline">Ranking</Link></li>
          <li><Link to="/sobre" className="hover:text-light-500 hover:underline">Sobre</Link></li>
        </ul>
        <button className="px-4 py-2 bg-light-pink text-dark-900 rounded-md hover:bg-dark-pink">Login</button>
      </nav>
    </header>
  );
}
