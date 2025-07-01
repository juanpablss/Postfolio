import React from 'react';

interface TechnologyBadgeProps {
  name: string;
  iconUrl?: string;
  className?: string;
}

const TechnologyBadge: React.FC<TechnologyBadgeProps> = ({ name, iconUrl, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 bg-indigo-800/70 p-2.5 rounded-lg text-indigo-200 text-sm transition-all hover:bg-indigo-700/90 ${className}`}>
      {iconUrl && (
        <img src={iconUrl} alt={`${name} icon`} className="w-5 h-5 object-contain" />
      )}
      {!iconUrl && ( 
        <span className="w-5 h-5 flex items-center justify-center text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </span>
      )}
      <span>{name}</span>
    </div>
  );
};

export default TechnologyBadge;
