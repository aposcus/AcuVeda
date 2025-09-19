
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import FileUploader from './FileUploader';
import AnalysisResult from './AnalysisResult';

const TBChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    
    // Create a preview URL for the image
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    
    // Reset previous results
    setResult(null);
    
    // Start analysis
    setAnalyzing(true);
    
    try {
      // Convert file to base64 for the API
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        
        try {
          const { data, error } = await supabase.functions.invoke('tb-detection', {
            body: { imageUrl: base64 }
          });

          if (error) {
            console.error('Supabase function error:', error);
            throw new Error(error.message || 'Analysis failed');
          }

          setResult(data);
          toast({
            title: "Analysis Complete",
            description: "Your chest X-ray has been analyzed.",
          });
        } catch (error) {
          console.error('Analysis error:', error);
          toast({
            title: "Analysis Failed",
            description: "Please try again or consult a healthcare professional.",
            variant: "destructive"
          });
          
          // Show error result
          setResult({
            disease: 'Tuberculosis',
            status: 'error',
            confidence: 0,
            details: 'Analysis failed. Please try again with a clearer image or consult a healthcare professional.'
          });
        } finally {
          setAnalyzing(false);
        }
      };
      
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error('File reading error:', error);
      setAnalyzing(false);
      toast({
        title: "File Error",
        description: "Could not read the uploaded file.",
        variant: "destructive"
      });
    }
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
          <p className="text-lg font-medium">Analyzing chest X-ray for tuberculosis...</p>
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
