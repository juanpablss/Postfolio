import React from 'react';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiGlobe, FiPaperclip, FiExternalLink } from 'react-icons/fi'; 

interface ContactLinkDisplayProps {
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'behance' | 'portfolio' | 'other';
  value: string;
  label?: string;
  className?: string;
}

const ContactLinkDisplay: React.FC<ContactLinkDisplayProps> = ({ type, value, label, className = '' }) => {
  const getIcon = () => {
    switch (type) {
      case 'email': return <FiMail className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
      case 'phone': return <FiPhone className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
      case 'linkedin': return <FiLinkedin className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
      case 'github': return <FiGithub className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
      case 'behance': return <FiPaperclip className="w-5 h-5 text-indigo-400 flex-shrink-0" />; // Usando FiPaperclip como placeholder para Behance
      case 'portfolio': return <FiGlobe className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
      default: return <FiExternalLink className="w-5 h-5 text-indigo-400 flex-shrink-0" />;
    }
  };

  const getHref = () => {
    if (type === 'email') return `mailto:${value}`;
    if (type === 'phone') return `tel:${value}`;
    // Para URLs, verificar se já possuem protocolo, senão adicionar https://
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (type !== 'other' && type !== 'phone' && type !== 'email') return `https://${value}`; // Adiciona https para tipos conhecidos de URL
    return value; // Para 'other' ou casos não previstos, usa o valor como está (ou pode decidir não linkar)
  };

  const displayText = label || value;
  const href = getHref();

  // Para 'other' ou 'phone' sem protocolo, podemos apenas exibir o texto sem link <a>
  if ((type === 'other' && !(value.startsWith('http://') || value.startsWith('https://'))) || (type === 'phone' && !value.startsWith('tel:'))) {
    return (
      <div className={`flex items-center gap-2 text-indigo-200 ${className}`}>
        {getIcon()}
        <span className="truncate" title={displayText}>{displayText}</span>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 text-indigo-200 hover:text-indigo-100 hover:underline transition-colors ${className}`}
    >
      {getIcon()}
      <span className="truncate" title={displayText}>{displayText}</span>
    </a>
  );
};

export default ContactLinkDisplay;
