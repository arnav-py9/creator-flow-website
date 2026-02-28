import React from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, showText = true, className = "" }) => {
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center', gap: size * 0.25 }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 40 40" 
        fill="none" 
        style={{ flexShrink: 0 }}
      >
        <rect width="40" height="40" rx="9" fill="#2563EB"/>
        <path d="M11 13 L22 20 L11 27" stroke="white" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M18 20 L29 20" stroke="white" stroke-width="3.2" stroke-linecap="round"/>
      </svg>
      {showText && (
        <div 
          className="logo-text" 
          style={{ 
            fontFamily: "'Plus Jakarta Sans', sans-serif", 
            fontWeight: 900, 
            letterSpacing: '-0.04em',
            fontSize: size * 0.8,
            lineHeight: 1,
            display: 'flex'
          }}
        >
          <span style={{ color: '#ffffff' }}>Creator</span>
          <span style={{ color: '#2563EB' }}>Flow</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
