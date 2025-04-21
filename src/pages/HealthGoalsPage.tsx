
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoalProgressBar from "@/components/GoalProgressBar";

type Goal = {
  id: number;
  description: string;
  targetDate: string;
  progress: number; // 0..100
};

const defaultGoals: Goal[] = [
  {
    id: 1,
    description: "Lower cholesterol by 10% in 6 months",
    targetDate: "2025-10-21",
    progress: 40,
  },
];

const HealthGoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [newGoal, setNewGoal] = useState("");
  const [newTargetDate, setNewTargetDate] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleAddGoal = () => {
    if (newGoal.trim() && newTargetDate) {
      setGoals([
        ...goals,
        {
          id: Date.now(),
          description: newGoal,
          targetDate: newTargetDate,
          progress: 0,
        },
      ]);
      setNewGoal("");
      setNewTargetDate("");
    }
  };

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-2xl font-bold mb-2">Health Goal Tracking</h1>
      <p className="text-muted-foreground mb-6">
        Set personal health goals, track progress, and get gentle reminders.
      </p>

      <Card className="p-4 mb-6">
        <h2 className="font-semibold mb-2">Add New Goal</h2>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <input
            type="text"
            className="border rounded px-3 py-2 mr-2 flex-1"
            placeholder='Your goal (e.g. "Lower cholesterol by 10%")'
            value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
          />
          <input
            type="date"
            className="border rounded px-3 py-2 mr-2"
            value={newTargetDate}
            onChange={e => setNewTargetDate(e.target.value)}
          />
          <Button onClick={handleAddGoal} className="bg-acuveda-blue">
            Add Goal
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-muted-foreground italic">No goals set yet.</div>
        ) : (
          goals.map(goal => (
            <Card key={goal.id} className="p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{goal.description}</div>
                  <div className="text-xs text-muted-foreground">
                    Target date: {goal.targetDate}
                  </div>
                </div>
                <div className="flex-1 mx-4">
                  <GoalProgressBar progress={goal.progress} />
                </div>
                <div>
                  {goal.progress === 100 ? (
                    <span className="text-green-600 font-semibold">Done</span>
                  ) : (
                    <span className="text-blue-500 font-semibold">{goal.progress}%</span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      {/* Gentle reminder area */}
      <div className="mt-8 bg-acuveda-light/70 border border-acuveda-blue/20 rounded p-4 flex items-center gap-3">
        <span role="img" aria-label="reminder" className="mr-2 text-xl">💡</span>
        <span>
          Time to upload your latest blood report to check your cholesterol goal. 
          {goals.length > 0 && (
            <Button 
              variant="link" 
              onClick={() => setReminder(!reminder)} 
              className="ml-2 underline text-acuveda-blue"
            >
              {reminder ? "Reminded!" : "Mark as Reminded"}
            </Button>
          )}
        </span>
      </div>
    </div>
  );
};
export default HealthGoalsPage;
