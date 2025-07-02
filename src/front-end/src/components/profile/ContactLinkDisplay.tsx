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
    switch (type) {
      case 'email':
        return `mailto:${value}`;
      case 'phone':
        return `tel:${value}`;
      case 'linkedin':
      case 'github':
      case 'behance':
      case 'portfolio':
        // Para esses tipos “URL”, garante protocolo
        return /^(https?:\/\/)/.test(value)
          ? value
          : `https://${value}`;
      default:
        // 'other'
        // já vem “raw” — você pode optar por não linkar, ou linkar assim mesmo
        return value;
    }
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
