
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FileUploader from './FileUploader';
import AnalysisResult from './AnalysisResult';

const MedicalRecordAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    
    if (selectedFile.type.includes('image')) {
      // Create a preview URL for images
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    
    // Reset previous results
    setResult(null);
    
    // Simulate analysis process
    setAnalyzing(true);
    setTimeout(() => {
      // In a real app, this would be an API call to a medical record analysis service
      const mockResult = {
        status: Math.random() > 0.5 ? 'abnormal' : 'normal',
        confidence: 0.8 + Math.random() * 0.15,
        details: Math.random() > 0.5 
          ? 'Elevated blood pressure (145/90 mmHg) detected. Cholesterol levels above normal range. Recommendation: Follow up with healthcare provider, consider dietary changes and moderate exercise.'
          : 'All values within normal ranges. Recommendation: Maintain current health regimen and schedule next routine check-up in 12 months.',
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
          <CardTitle>Medical Record Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <FileUploader 
            onFileSelect={handleFileSelect} 
            acceptedFileTypes=".jpg,.jpeg,.png,.pdf" 
            label="Medical Record"
          />
        </CardContent>
      </Card>
      
      {previewUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Record</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md overflow-hidden">
              <img src={previewUrl} alt="Medical Record" className="w-full h-auto" />
            </div>
          </CardContent>
        </Card>
      )}
      
      {!previewUrl && file && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md p-4 text-center">
              <p className="text-lg font-medium">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {analyzing && (
        <div className="py-8 text-center">
          <div className="w-16 h-16 border-t-4 border-acuveda-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium">Analyzing medical record...</p>
          <p className="text-sm text-gray-500">This may take a few moments</p>
        </div>
      )}
      
      {result && (
        <AnalysisResult 
          title="Health Assessment" 
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

export default MedicalRecordAnalyzer;
