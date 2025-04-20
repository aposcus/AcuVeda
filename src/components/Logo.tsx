
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-10 w-10 rounded-lg bg-acuveda-blue flex items-center justify-center">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" 
            fill="white"
          />
          <path 
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" 
            fill="white"
          />
          <path 
            d="M12 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm0-4c-0.55 0-1 0.45-1 1s0.45 1 1 1 1-0.45 1-1-0.45-1-1-1z" 
            fill="acuveda-blue"
          />
          <circle 
            cx="12" 
            cy="12" 
            r="2" 
            fill="white" 
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="font-bold text-2xl tracking-tight text-acuveda-blue">
        AcuVeda<span className="text-acuveda-teal text-xs align-top">AI</span>
      </div>
    </div>
  );
};

export default Logo;

