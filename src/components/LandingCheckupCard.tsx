import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Scan, FileInput } from "lucide-react";

interface StatDetail {
  name: string;
  value: number;
  unit: string;
  normal: [number, number];
  state?: "normal" | "increased" | "decreased";
}

interface LandingCheckupCardProps {
  type: "TB_PNEUMONIA" | "MALARIA" | "RECORD";
  title: string;
  description: string;
  iconBg: string;
  icon: React.ReactNode;
  fileLabel: string;
}

const EXAMPLES_RECORD_STATS: StatDetail[] = [
  { name: "Hemoglobin", value: 13.9, unit: "g/dL", normal: [13.0, 17.0] },
  { name: "Leukocytes", value: 14.8, unit: "x10³/μL", normal: [4.0, 11.0] },
  { name: "Platelets", value: 140, unit: "x10³/μL", normal: [150, 400] },
  { name: "Blood glucose", value: 110, unit: "mg/dL", normal: [70, 99] },
  { name: "Cholesterol", value: 200, unit: "mg/dL", normal: [125, 199] },
];

const LandingCheckupCard: React.FC<LandingCheckupCardProps> = ({
  type,
  title,
  description,
  iconBg,
  icon,
  fileLabel
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const f = e.target.files[0];
      setFile(f);
      if (f.type.startsWith("image")) {
        setPreviewUrl(URL.createObjectURL(f));
      } else {
        setPreviewUrl(null);
      }
      setReport(null);
    }
  };

  const handleStartScan = () => {
    setScanning(true);
    setTimeout(() => {
      if (type === "TB_PNEUMONIA") {
        const positive = Math.random() > 0.5;
        setReport({
          detected: positive,
          confidence: (0.7 + Math.random() * 0.25).toFixed(2),
          findings: positive
            ? [
                "Nodular opacities in upper right lobe (above normal)",
                "Mild pleural effusion detected",
                "Signs of pulmonary infiltrates (increased findings)"
              ]
            : [
                "No significant abnormal opacity.",
                "Lung fields are clear.",
                "Pleura appear within normal limits."
              ]
        });
      } else if (type === "MALARIA") {
        const positive = Math.random() > 0.6;
        setReport({
          detected: positive,
          confidence: (0.72 + Math.random() * 0.22).toFixed(2),
          findings: positive
            ? [
                "Plasmodium parasite ring forms detected (increased parasite presence)",
                "Abnormal cell morphology noted"
              ]
            : [
                "No parasites detected.",
                "Normal blood cell morphology."
              ]
        });
      } else if (type === "RECORD") {
        setReport({
          assessment: Math.random() > 0.5 ? "Abnormal values found." : "All values within reference.",
          stats: EXAMPLES_RECORD_STATS.map(stat => {
            let state: "normal" | "increased" | "decreased" =
              stat.value < stat.normal[0]
                ? "decreased"
                : stat.value > stat.normal[1]
                ? "increased"
                : "normal";
            return { ...stat, state };
          }),
          notes:
            Math.random() > 0.5
              ? "Consult doctor for abnormal values, especially high leukocytes and cholesterol."
              : "Health status is stable, remember routine check-up in 6-12 months."
        });
      }
      setScanning(false);
    }, 2600);
  };

  return (
    <Card className={`flex flex-col h-full shadow-lg ${type === "RECORD" ? "bg-purple-50/40" : "bg-blue-50/40"}`}>
      <CardHeader>
        <div className={`rounded-lg p-4 flex items-center justify-center mb-3 ${iconBg}`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="mt-1 text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        {file ? (
          <div>
            {previewUrl && (
              <div className="mb-2 rounded-md overflow-hidden border border-gray-200">
                <img src={previewUrl} alt="Preview" className="w-full max-h-48 object-contain mx-auto" />
              </div>
            )}
            <div className="flex gap-2 items-center justify-between">
              <span className="text-gray-600 text-sm">{file.name}</span>
              <Button variant="outline" size="sm" onClick={() => { setFile(null); setPreviewUrl(null); setReport(null); }}>
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center pb-1">
            <label className="w-full flex flex-col items-center cursor-pointer">
              <input type="file"
                     accept={type === "RECORD" ? ".jpg,.jpeg,.png,.pdf" : ".jpg,.jpeg,.png"}
                     style={{ display: "none" }}
                     onChange={handleFile} />
              <div className="rounded-full p-3 bg-white border-2 border-acuveda-blue/30 hover:border-acuveda-blue mb-2 transition">
                <FileInput className="h-7 w-7 text-acuveda-blue" />
              </div>
              <span className="text-base font-medium">{fileLabel}</span>
              <span className="text-xs text-muted-foreground">JPG, PNG {type==="RECORD" && "/ PDF"} supported</span>
            </label>
          </div>
        )}
        {file && !scanning && !report && (
          <div className="mt-3">
            <Button className="w-full bg-acuveda-blue hover:bg-acuveda-blue/80 text-white"
              onClick={handleStartScan}>
              <Scan className="w-5 h-5 mr-2" />
              Start Scanning
            </Button>
          </div>
        )}
        {scanning && (
          <div className="flex flex-col gap-2 mt-5 items-center py-4 animate-fade-in">
            <div className="w-12 h-12 border-t-4 border-acuveda-blue rounded-full animate-spin" />
            <div className="font-medium text-acuveda-blue">Analyzing your file...</div>
            <div className="text-xs text-gray-500">This typically takes a few seconds.</div>
          </div>
        )}
        {report && (
          <div className="mt-4 animate-fade-in">
            {type === "TB_PNEUMONIA" && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Result:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${report.detected ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {report.detected ? "TB/Pneumonia Detected" : "No Disease Detected"}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Confidence:</span>
                  <span>{Math.round(report.confidence * 100)}%</span>
                </div>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  {report.findings.map((l, i) => (
                    <li key={i} className={l.includes("increased") ? "text-red-500" : ""}>{l}</li>
                  ))}
                </ul>
              </>
            )}
            {type === "MALARIA" && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Result:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${report.detected ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {report.detected ? "Malaria Detected" : "No Malaria Detected"}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Confidence:</span>
                  <span>{Math.round(report.confidence * 100)}%</span>
                </div>
                <ul className="list-disc pl-6 text-sm space-y-1">
                  {report.findings.map((l, i) => (
                    <li key={i} className={l.includes("increased") ? "text-red-500" : ""}>{l}</li>
                  ))}
                </ul>
              </>
            )}
            {type === "RECORD" && (
              <>
                <div className="font-medium mb-2">Detailed Health Stats:</div>
                <div className="mb-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2">
                  {report.stats.map((stat: StatDetail, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-white rounded shadow border border-gray-100">
                      <span className="font-medium w-32">{stat.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs 
                        ${stat.state === "increased"
                          ? "bg-red-100 text-red-600"
                          : stat.state === "decreased"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-700"
                        }`}>
                        {stat.value} {stat.unit}
                      </span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {stat.state === "increased"
                          ? "↑ Over range"
                          : stat.state === "decreased"
                          ? "↓ Below range"
                          : "Normal"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mb-2">
                  <div className="text-base mt-3 mb-1 font-medium">Summary:</div>
                  <div className="text-sm">{report.notes}</div>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full flex justify-center">
          {/* Optionally, download/report button can go here */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default LandingCheckupCard;
