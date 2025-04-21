
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light">
      <div className="container py-16 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Why AcuVeda Matters</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're bridging healthcare gaps with AI to make quality medical diagnostics accessible 
            to everyone, especially in underserved communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1474" 
              alt="Rural landscape" 
              className="rounded-lg shadow-lg" 
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-acuveda-blue">The Healthcare Gap</h2>
            <p className="text-gray-700">
              In many rural and underserved areas worldwide, access to quality healthcare remains a significant 
              challenge. Millions of people lack access to timely diagnosis for preventable and treatable conditions, 
              leading to preventable suffering and mortality.
            </p>
            <p className="text-gray-700">
              The World Health Organization estimates that half the world lacks access to essential health services, 
              with diagnostic capabilities being particularly limited in remote areas. This gap is especially 
              pronounced for conditions like tuberculosis and malaria that require specialized equipment and trained personnel.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl font-bold text-acuveda-blue">The Burden of TB and Malaria</h2>
            <p className="text-gray-700">
              Tuberculosis remains one of the world's deadliest infectious diseases, claiming 1.5 million 
              lives annually. Early detection is critical for successful treatment, yet many cases go 
              undiagnosed due to limited access to X-ray facilities and trained radiologists.
            </p>
            <p className="text-gray-700">
              Similarly, malaria affects over 200 million people yearly, with the highest burden in 
              regions with limited laboratory facilities. Delayed diagnosis leads to severe complications 
              and preventable deaths, particularly among children under five.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-acuveda-blue mb-1">1.5M</div>
                <div className="text-sm text-gray-600">Annual TB deaths worldwide</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="text-3xl font-bold text-acuveda-blue mb-1">200M+</div>
                <div className="text-sm text-gray-600">Annual malaria cases</div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=1470" 
              alt="Medical examination" 
              className="rounded-lg shadow-lg" 
            />
          </div>
        </div>
        
        <Card className="bg-acuveda-blue/5 border-none mb-16">
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Solution: AI-Powered Diagnostics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3 text-acuveda-blue">Accessibility</h3>
                <p className="text-gray-700">
                  AcuVeda brings advanced diagnostic capabilities to any location with an internet connection. 
                  Our technology works on basic smartphones and tablets, making it accessible even in 
                  resource-constrained settings.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3 text-acuveda-blue">Accuracy</h3>
                <p className="text-gray-700">
                  Our AI models match or exceed the diagnostic accuracy of human specialists. Trained on 
                  diverse datasets from around the world, they recognize disease patterns across different 
                  populations and presentation types.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3 text-acuveda-blue">Affordability</h3>
                <p className="text-gray-700">
                  By reducing the need for specialized equipment and personnel, AcuVeda significantly lowers 
                  the cost of diagnosis. This makes regular screenings financially viable in low-resource settings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We envision a world where everyone, regardless of location or economic status, 
            has access to high-quality diagnostic services for preventable and treatable conditions. 
            Through AI-powered healthcare solutions, we're working to make this vision a reality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
