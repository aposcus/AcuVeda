
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import FeatureCard from '@/components/FeatureCard';
import TBChecker from '@/components/TBChecker';
import MalariaChecker from '@/components/MalariaChecker';
import MedicalRecordAnalyzer from '@/components/MedicalRecordAnalyzer';
import { Calendar, Activity, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const handleFeatureSelect = (feature: string) => {
    setActiveFeature(feature);
  };
  
  const handleBack = () => {
    setActiveFeature(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light">
      <div className="container px-4 py-8 mx-auto">
        <header className="flex items-center justify-between mb-12">
          <Logo />
          <p className="text-sm text-muted-foreground">
            AI-Powered Health Monitoring
          </p>
        </header>
        
        {!activeFeature ? (
          <>
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                AI Medical Analysis & Disease Detection
              </h1>
              <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
                Upload medical records, chest X-rays, or blood reports for AI-powered analysis and disease detection
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FeatureCard
                title="TB & Pneumonia Detection"
                description="Upload a chest X-ray to check for tuberculosis and pneumonia."
                icon={<Activity className="h-6 w-6 text-acuveda-blue" />}
                onClick={() => handleFeatureSelect('tb')}
              />
              
              <FeatureCard
                title="Malaria Detection"
                description="Upload blood reports to check for malaria."
                icon={<Calendar className="h-6 w-6 text-acuveda-blue" />}
                onClick={() => handleFeatureSelect('malaria')}
              />
              
              <FeatureCard
                title="Medical Record Analysis"
                description="Upload medical records for AI analysis and health insights."
                icon={<FileText className="h-6 w-6 text-acuveda-blue" />}
                onClick={() => handleFeatureSelect('records')}
              />
            </div>
            
            <div className="mt-12 text-center text-sm text-muted-foreground">
              <p className="mb-2">Privacy Notice: All uploads are processed securely.</p>
              <p>AcuVeda AI monitors health data to provide insights. Not a substitute for professional medical advice.</p>
            </div>
          </>
        ) : (
          <div className="mb-10">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack} 
                className="flex items-center mr-4"
              >
                <X className="h-4 w-4 mr-1" /> Close
              </Button>
              
              <h2 className="text-2xl font-bold">
                {activeFeature === 'tb' && 'TB & Pneumonia Detection'}
                {activeFeature === 'malaria' && 'Malaria Detection'}
                {activeFeature === 'records' && 'Medical Record Analysis'}
              </h2>
            </div>
            
            {activeFeature === 'tb' && <TBChecker />}
            {activeFeature === 'malaria' && <MalariaChecker />}
            {activeFeature === 'records' && <MedicalRecordAnalyzer />}
          </div>
        )}
      </div>
      
      <footer className="border-t mt-auto py-4 bg-white">
        <div className="container flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AcuVeda Health AI
          </p>
          <div className="text-sm">
            <a href="#" className="text-acuveda-blue hover:underline mr-4">Privacy Policy</a>
            <a href="#" className="text-acuveda-blue hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
