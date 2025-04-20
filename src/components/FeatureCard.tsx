
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  onClick,
  className 
}) => {
  return (
    <Card className={`card-glow h-full ${className}`}>
      <CardHeader className="pb-3">
        <div className="w-12 h-12 rounded-lg bg-acuveda-blue/10 flex items-center justify-center mb-3">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={onClick} 
          className="w-full bg-acuveda-blue hover:bg-acuveda-blue/90"
        >
          Launch Tool
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
