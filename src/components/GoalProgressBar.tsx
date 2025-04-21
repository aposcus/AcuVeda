
import React from "react";
import { Progress } from "@/components/ui/progress";

const GoalProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="flex items-center gap-3">
      <Progress value={progress} className="h-3 w-32 bg-gray-200" />
    </div>
  );
};

export default GoalProgressBar;
