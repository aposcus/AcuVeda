
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  gradient?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  onClick,
  className,
  gradient = "from-acuveda-blue to-acuveda-blue/70"
}) => {
  return (
    <Card className={`card-glow h-full overflow-hidden ${className}`}>
      <div className={`h-32 bg-gradient-to-r ${gradient} relative`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onClick} 
          className="w-full bg-acuveda-blue hover:bg-acuveda-blue/90 flex items-center gap-2 justify-center"
        >
          Launch Tool
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
