
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploader from './FileUploader';
import AnalysisResult from './AnalysisResult';

const TBChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Create a preview URL for the image
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    
    // Reset previous results
    setResult(null);
    
    // Simulate analysis process
    setAnalyzing(true);
    setTimeout(() => {
      // In a real app, this would be an API call to a TB detection model
      const mockResult = {
        disease: 'Tuberculosis',
        status: Math.random() > 0.5 ? 'positive' : 'negative',
        confidence: 0.75 + Math.random() * 0.2,
        details: Math.random() > 0.5 
          ? 'Abnormal opacities detected in upper right lobe, consistent with tuberculosis infection.'
          : 'No significant abnormalities detected in the chest X-ray.',
      };
      
      setResult(mockResult);
      setAnalyzing(false);
    }, 3000);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF report
    alert('Report download functionality will be implemented in the next phase.');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tuberculosis & Pneumonia Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader 
            onFileSelect={handleFileSelect} 
            acceptedFileTypes=".jpg,.jpeg,.png" 
            label="Chest X-Ray"
          />
        </CardContent>
      </Card>
      
      {previewUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded X-Ray</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <img src={previewUrl} alt="Chest X-Ray" className="w-full h-auto" />
            </div>
          </CardContent>
        </Card>
      )}
      
      {analyzing && (
        <div className="py-8 text-center">
          <div className="w-16 h-16 border-t-4 border-acuveda-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Analyzing your X-Ray...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      )}
      
      {result && (
        <AnalysisResult 
          title={result.disease} 
          status={result.status} 
          confidence={result.confidence} 
          details={result.details} 
          imageSrc={previewUrl || undefined} 
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};

export default TBChecker;
