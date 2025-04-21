
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="/lovable-uploads/34a0dcd9-b52f-4073-b383-b94cc26a9ebd.png" 
        alt="AcuVeda logo" 
        className="h-12 w-12 object-contain"
        aria-label="AcuVeda logo"
      />
      <div className="font-bold text-2xl tracking-tight text-acuveda-blue">
        AcuVeda
      </div>
    </div>
  );
};

export default Logo;

