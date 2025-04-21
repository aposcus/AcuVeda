
import React from "react";
import LandingCheckupCard from "@/components/LandingCheckupCard";
import { FileInput, Scan, FileText } from "lucide-react";

const CheckupPage = () => {
  return (
    <div className="min-h-screen py-10 bg-gradient-to-b from-[#f2fce2] via-[#d3e4fd]/60 to-[#f1f0fb]">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-acuveda-blue mb-2">
            Start Your AI Health Check-up
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a medical image or report below, then scan for instant, AI-generated health insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LandingCheckupCard
            type="TB_PNEUMONIA"
            title="TB & Pneumonia Scan"
            description="Import your chest X-ray image. Our AI model checks for tuberculosis and pneumonia. Result will highlight abnormal opacities, nodules, and other lung findings with confidence score."
            iconBg="bg-gradient-to-tr from-blue-400 to-emerald-300"
            icon={<Scan className="h-10 w-10 text-white" />}
            fileLabel="Import Chest X-ray"
          />

          <LandingCheckupCard
            type="MALARIA"
            title="Malaria Detection"
            description="Upload a blood report or smear image. AI examines red blood cell morphology, detects Plasmodium parasites, and flags abnormal findings for malaria diagnosis."
            iconBg="bg-gradient-to-tr from-green-400 to-yellow-200"
            icon={<FileInput className="h-10 w-10 text-white" />}
            fileLabel="Import Blood Report"
          />

          <LandingCheckupCard
            type="RECORD"
            title="Quick Medical Record Analysis"
            description="Import a medical report or lab document (PDF or image). Get a summarized analysis with detailed stats. Increased and decreased values are flagged for your awareness."
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
