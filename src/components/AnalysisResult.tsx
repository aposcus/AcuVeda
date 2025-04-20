
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AnalysisResultProps {
  title: string;
  status: 'positive' | 'negative' | 'normal' | 'abnormal' | 'pending';
  confidence?: number;
  details?: string;
  imageSrc?: string;
  onDownload?: () => void;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  title,
  status,
  confidence,
  details,
  imageSrc,
  onDownload
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'positive':
      case 'abnormal':
        return 'text-acuveda-red';
      case 'negative':
      case 'normal':
        return 'text-acuveda-green';
      case 'pending':
      default:
        return 'text-gray-500';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'positive':
      case 'abnormal':
        return 'bg-acuveda-red/10';
      case 'negative':
      case 'normal':
        return 'bg-acuveda-green/10';
      case 'pending':
      default:
        return 'bg-gray-100';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'positive':
        return 'Detected';
      case 'negative':
        return 'Not Detected';
      case 'normal':
        return 'Normal';
      case 'abnormal':
        return 'Abnormal';
      case 'pending':
      default:
        return 'Analyzing...';
    }
  };

  return (
    <Card className="results-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Analysis Results</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-medium">Status:</div>
          <div className={`px-3 py-1 rounded-full ${getStatusBg()} ${getStatusColor()} font-semibold`}>
            {getStatusLabel()}
          </div>
        </div>
        
        {confidence !== undefined && (
          <div className="flex justify-between items-center">
            <div className="font-medium">Confidence:</div>
            <div className="font-semibold">{Math.round(confidence * 100)}%</div>
          </div>
        )}
        
        {details && (
          <div className="mt-2 border-t pt-3">
            <div className="font-medium mb-1">Details:</div>
            <div className="text-sm text-gray-700">{details}</div>
          </div>
        )}
        
        {imageSrc && (
          <div className="mt-4">
            <div className="font-medium mb-2">Visual Analysis:</div>
            <div className="border rounded-md overflow-hidden">
              <img src={imageSrc} alt="Analysis Result" className="w-full h-auto" />
            </div>
          </div>
        )}
      </CardContent>
      
      {onDownload && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full border-acuveda-blue text-acuveda-blue hover:bg-acuveda-blue hover:text-white"
            onClick={onDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AnalysisResult;
