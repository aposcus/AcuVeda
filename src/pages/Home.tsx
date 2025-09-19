
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-acuveda-light">
      <section className="container py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('home.subtitle')}
            </p>
            <div className="flex gap-4">
              <Link to="/checkup">
                <Button size="lg" className="bg-acuveda-blue hover:bg-acuveda-blue/90">
                  {t('home.startCheckup')}
                </Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline">
                  {t('home.learnMore')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1470" 
              alt="AI Medical Analysis" 
              className="w-full h-auto object-cover rounded-lg" 
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.featuresTitle')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80&w=1632" 
                alt="TB and Pneumonia Detection" 
                className="rounded-lg shadow-lg w-full" 
              />
            </div>
            <div className="space-y-4 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-acuveda-blue">{t('home.tbTitle')}</h3>
              <p className="text-gray-700">
                {t('home.tbDescription')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Opacities and consolidation in lung tissue</li>
                <li>Pleural effusion and fluid buildup</li>
                <li>Cavities and nodules characteristic of TB</li>
                <li>Infiltrates and interstitial patterns</li>
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-acuveda-blue">{t('home.malariaTitle')}</h3>
              <p className="text-gray-700">
                {t('home.malariaDescription')}
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Infected red blood cells (erythrocytes)</li>
                <li>Presence of ring forms, trophozoites, and gametocytes</li>
                <li>Abnormal cell morphology and pigmentation</li>
                <li>Parasitemia levels and infection density</li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=1470" 
                alt="Malaria Detection" 
                className="rounded-lg shadow-lg w-full" 
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-acuveda-light">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.ctaTitle')}</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            {t('home.ctaDscription')}
          </p>
          <Link to="/checkup">
            <Button size="lg" className="bg-acuveda-blue hover:bg-acuveda-blue/90">
              {t('home.getStarted')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
