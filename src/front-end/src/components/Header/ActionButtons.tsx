import { Link } from "react-router-dom";
// FiMessageSquare e FiBell movidos para ActionIcons
// FiUser pode ser removido se UserDropdown sempre mostrar a foto/ícone
import UserDropdown from "./UserDropdown";
import ActionIcons from "./ActionIcons"; // Importando ActionIcons
import { ReactNode } from "react";

interface User {
  username: string;
  name: string;
  email: string | ReactNode;
  photo?: string;
  userType: string;
}

interface ActionButtonsProps {
  isLoggedIn: boolean;
  user: User | null;
  handleLogout: () => void;
  handleToggleUserType: () => void;
  // Adicionar quaisquer outras props que os ícones ou UserDropdown possam precisar indiretamente
  // Por exemplo, se o número de notificações viesse de uma prop:
  // notificationCount?: number;
}

export default function ActionButtons({
  isLoggedIn,
  user,
  handleLogout,
  handleToggleUserType,
  // notificationCount = 3, // Exemplo de valor padrão
}: ActionButtonsProps) {
  if (isLoggedIn && user) {
    return (
      <>
        {/* Ícones de Mensagens e Notificações */}
        <ActionIcons /* notificationCount={...} // Passar a contagem real se disponível */ />

        {/* Dropdown do Usuário */}
        <UserDropdown
          user={user}
          handleLogout={handleLogout}
          handleToggleUserType={handleToggleUserType}
        />
      </>
    );
  } else {
    return (
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
    );
  }
}
