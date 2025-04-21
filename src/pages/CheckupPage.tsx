
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, FileText, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckupPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light py-12">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Select Your Check-up</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the type of analysis you need. Each check-up uses specialized AI models trained 
            for specific health conditions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="card-glow h-full overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="h-20 w-20 text-white opacity-75" />
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle>TB & Pneumonia Check</CardTitle>
              <CardDescription>
                Upload chest X-rays for analysis of tuberculosis and pneumonia markers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                Our system analyzes X-ray images for:
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1 text-gray-700">
                <li>Lung opacity patterns</li>
                <li>Nodular lesions characteristic of TB</li>
                <li>Consolidation typical of pneumonia</li>
                <li>Pleural effusion and infiltrates</li>
              </ul>
              <Link 
                to="#" 
                onClick={() => document.querySelector('button[data-feature="tb"]')?.click()}
                className="block w-full mt-4"
              >
                <button className="w-full py-2 bg-acuveda-blue text-white rounded-md hover:bg-acuveda-blue/90 transition">
                  Start TB & Pneumonia Check
                </button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-glow h-full overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-teal-500 to-green-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Search className="h-20 w-20 text-white opacity-75" />
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle>Malaria Detection</CardTitle>
              <CardDescription>
                Upload blood reports or smear images to check for malaria parasites
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                Our system identifies malaria by detecting:
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1 text-gray-700">
                <li>Plasmodium parasite presence</li>
                <li>Infected red blood cells</li>
                <li>Characteristic ring forms and trophozoites</li>
                <li>Abnormal cell morphology and pigmentation</li>
              </ul>
              <Link 
                to="#" 
                onClick={() => document.querySelector('button[data-feature="malaria"]')?.click()}
                className="block w-full mt-4"
              >
                <button className="w-full py-2 bg-acuveda-blue text-white rounded-md hover:bg-acuveda-blue/90 transition">
                  Start Malaria Check
                </button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="card-glow h-full overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-amber-500 to-orange-600 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="h-20 w-20 text-white opacity-75" />
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle>Quick Medical Record Analysis</CardTitle>
              <CardDescription>
                Upload medical reports for comprehensive AI analysis and insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700">
                Our system analyzes medical records for:
              </p>
              <ul className="text-sm list-disc pl-5 space-y-1 text-gray-700">
                <li>Abnormal lab values (elevated or decreased)</li>
                <li>Critical health indicators requiring attention</li>
                <li>Trends and patterns across multiple tests</li>
                <li>Risk factors and potential health concerns</li>
              </ul>
              <Link 
                to="#" 
                onClick={() => document.querySelector('button[data-feature="records"]')?.click()}
                className="block w-full mt-4"
              >
                <button className="w-full py-2 bg-acuveda-blue text-white rounded-md hover:bg-acuveda-blue/90 transition">
                  Start Record Analysis
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckupPage;
