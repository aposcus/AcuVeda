
import React from "react";
import { useTranslation } from "react-i18next";
import LandingCheckupCard from "@/components/LandingCheckupCard";
import { FileInput, Scan, FileText } from "lucide-react";

const CheckupPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-[#f2fce2] via-[#d3e4fd]/60 to-[#f1f0fb]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-acuveda-blue mb-2">
            {t('checkup.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('checkup.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LandingCheckupCard
            type="TB_PNEUMONIA"
            title={t('checkup.tbScan')}
            description={t('checkup.tbDescription')}
            iconBg="bg-gradient-to-tr from-blue-400 to-emerald-300"
            icon={<Scan className="h-10 w-10 text-white" />}
            fileLabel="Import Chest X-ray"
          />

          <LandingCheckupCard
            type="MALARIA"
            title={t('checkup.malariaScan')}
            description={t('checkup.malariaDescription')}
            iconBg="bg-gradient-to-tr from-green-400 to-yellow-200"
            icon={<FileInput className="h-10 w-10 text-white" />}
            fileLabel="Import Blood Report"
          />

          <LandingCheckupCard
            type="RECORD"
            title={t('checkup.recordAnalysis')}
            description={t('checkup.recordDescription')}
            iconBg="bg-gradient-to-tr from-purple-400 to-pink-300"
            icon={<FileText className="h-10 w-10 text-white" />}
            fileLabel="Import Record"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckupPage;
