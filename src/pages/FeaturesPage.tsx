
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from 'lucide-react';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light">
      <div className="container py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Features</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how AcuVeda's AI-powered health analysis tools can help detect diseases 
            early and provide valuable health insights.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            title="TB & Pneumonia Detection" 
            description="Advanced AI analysis of chest X-rays to detect tuberculosis and pneumonia with high accuracy."
            points={[
              "98.5% detection accuracy",
              "Identifies early-stage TB markers",
              "Detects bacterial and viral pneumonia",
              "Highlights affected areas visually"
            ]}
          />
          
          <FeatureCard 
            title="Malaria Detection" 
            description="State-of-the-art detection of malaria parasites in blood samples using computer vision."
            points={[
              "99.1% detection accuracy",
              "Identifies all Plasmodium species",
              "Quantifies parasitemia levels",
              "Detects early-stage infections"
            ]}
          />
          
          <FeatureCard 
            title="Medical Record Analysis" 
            description="Comprehensive analysis of medical records to identify abnormalities and health concerns."
            points={[
              "Reviews lab values across 200+ parameters",
              "Identifies critical health indicators",
              "Provides personalized health insights",
              "Generates easy-to-understand reports"
            ]}
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-acuveda-blue">TB & Pneumonia Detection</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Deep Learning Model:</strong> Uses a DenseNet121 convolutional neural network pre-trained on 112,000+ chest X-rays
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Abnormality Detection:</strong> Analyzes lung opacity patterns, consolidation, cavities, and pleural effusions
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Heat Mapping:</strong> Visual representation of affected areas with gradient highlighting
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Confidence Score:</strong> Provides probability scores for TB and pneumonia diagnoses
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-acuveda-blue">Malaria Detection</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Computer Vision:</strong> Analyzes blood smear images using a custom ResNet50 model trained on 27,500+ cell images
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Cell Analysis:</strong> Identifies infected red blood cells, ring forms, trophozoites, and schizonts
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Parasite Quantification:</strong> Estimates parasitemia levels and infection density
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Species Differentiation:</strong> Capable of distinguishing between P. falciparum, P. vivax, P. ovale, and P. malariae
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-acuveda-blue/5 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Medical Record Analysis Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-acuveda-blue">Blood Test Analysis</h3>
              <p className="text-gray-700 mb-4">
                Our system precisely analyzes common blood test parameters to identify abnormalities:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Complete Blood Count:</strong> Flags abnormal WBC, RBC, platelet counts, hemoglobin, and hematocrit levels
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Liver Function:</strong> Monitors ALT, AST, bilirubin, and alkaline phosphatase levels
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Kidney Function:</strong> Evaluates creatinine, BUN, and eGFR levels
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Lipid Profile:</strong> Assesses cholesterol, triglycerides, HDL, and LDL levels
                  </span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-acuveda-blue">Report Generation</h3>
              <p className="text-gray-700 mb-4">
                Our comprehensive reports provide clear insights into your health status:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Abnormality Highlights:</strong> Clear visualization of values outside normal ranges
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Trend Analysis:</strong> Comparison with previous results when available
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>Health Suggestions:</strong> Personalized recommendations based on detected abnormalities
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2 mt-1">
                    <Check size={16} className="text-acuveda-blue" />
                  </span>
                  <span>
                    <strong>PDF Export:</strong> Downloadable reports for sharing with healthcare providers
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, points }) => {
  return (
    <Card className="card-glow h-full">
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2">
          {points.map((point, index) => (
            <li key={index} className="flex items-center">
              <span className="bg-acuveda-blue/10 p-1 rounded-full mr-2">
                <Check size={16} className="text-acuveda-blue" />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeaturesPage;
