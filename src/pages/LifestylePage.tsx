
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

// Helper to generate ARIA labels and tooltips
const accessible = {
  steps: {
    label: "How many steps today?",
    placeholder: "e.g., 8,000",
    aria: "Steps input field",
    tooltip: "Enter your daily steps here (numbers only)",
  },
  water: {
    label: "How much water? (cups)",
    placeholder: "e.g., 7",
    aria: "Water intake input field",
    tooltip: "Enter your water intake in cups (numbers only)",
  },
  sleep: {
    label: "How many hours did you sleep?",
    placeholder: "e.g., 7.5",
    aria: "Sleep hours input field",
    tooltip: "Enter your sleep duration in hours (e.g., 7.5)",
  }
};

type LifestyleFormData = {
  date: string;
  steps: string;
  water_intake: string;
  sleep_hours: string;
};

// For insights logic (simple demo rules)
function getInsights(history: {date:string, steps:number, sleep_hours:number, water_intake:number}[], bloodReports: any[]) {
  let insights: React.ReactNode[] = [];
  // Example: Sleep and BP trend correlation
  const sleepOver7Count = history.filter(d => d.sleep_hours > 7).length;
  if (bloodReports && bloodReports.length > 0) {
    // Find start/end blood pressure
    const firstBP = bloodReports[0]?.blood_pressure;
    const lastBP = bloodReports[bloodReports.length-1]?.blood_pressure;
    if (sleepOver7Count / history.length > 0.8 && firstBP && lastBP && lastBP < firstBP) {
      insights.push(<div key="sleep-bp"><span aria-label="Positive trend" className="text-green-600 mr-2">✔️</span> Improved sleep may have helped stabilize your blood pressure.</div>);
    }
    // Steps and cholesterol
    const highStepDays = history.filter(d => d.steps >= 10000).length;
    const firstChol = bloodReports[0]?.cholesterol;
    const lastChol = bloodReports[bloodReports.length-1]?.cholesterol;
    if (highStepDays / history.length > 0.5 && firstChol && lastChol && lastChol < firstChol) {
      insights.push(<div key="steps-chol"><span aria-label="Active lifestyle icon" className="text-green-600 mr-2">✔️</span> Your active lifestyle might be improving your cholesterol.</div>);
    }
  }
  if (!insights.length) {
    insights.push(
      <div key="keep-going"><span aria-label="Encourage" className="text-blue-600 mr-2">👍</span>
        Great job logging your lifestyle data! Keep it up for more insights.
      </div>
    );
  }
  return insights;
}

// Download CSV helper
function downloadCSV(data: any[], filename: string) {
  const header = "Date,Steps,Water Intake (cups),Sleep Hours,Source\n";
  const rows = data.map(
    x =>
      `${x.date},${x.steps},${x.water_intake},${x.sleep_hours},${x.source}`
  );
  const csv = header + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// ------- HISTORY COMPONENT -------
const LifestyleHistory: React.FC<{
  items: any[];
  onEdit: (item:any)=>void;
  onDelete: (id:string)=>void;
}> = ({ items, onEdit, onDelete }) => (
  <div className="w-full mt-2">
    {items.length === 0 ? (
      <p className="text-muted-foreground">No entries yet.</p>
    ) : (
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col md:flex-row md:items-center justify-between py-2">
            <div>
              <span className="font-semibold">{format(parseISO(item.date), "MMM dd, yyyy")}:</span>{" "}
              {item.steps ?? "-"} steps, {item.water_intake ?? "-"} cups, {item.sleep_hours ?? "-"} hrs sleep <span className="ml-2 text-xs text-gray-400">[{item.source}]</span>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button variant="outline" size="sm" aria-label="Edit entry" onClick={() => onEdit(item)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" aria-label="Delete entry" onClick={() => onDelete(item.id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const LifestylePage: React.FC = () => {
  const { user } = useAuth();
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<LifestyleFormData>({
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      steps: "",
      water_intake: "",
      sleep_hours: ""
    }
  });

  // State for lifestyle entries and loading
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any>(null);

  // State for blood report stub
  const [bloodReports, setBloodReports] = useState<any[]>([]);

  // Tabs state
  const [tab, setTab] = useState<"form"|"history">("form");

  // Fetch lifestyle data from Supabase
  async function loadEntries() {
    if (!user) {
      setEntries([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("lifestyle_data")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });
    if (error) {
      toast({ title: "Error", description: "Could not load lifestyle data." });
      setEntries([]);
    } else {
      setEntries(data || []);
    }
    setLoading(false);
  }

  // Stub: Fetch blood reports from Supabase (simulate for prototype)
  async function loadBloodReports() {
    if (!user) {
      setBloodReports([]);
      return;
    }
    // You can replace this select with real columns in your blood report table later.
    const { data, error } = await supabase
      .from("blood_reports")
      .select("date, blood_pressure, cholesterol")
      .eq("user_id", user.id)
      .order("date", { ascending: true });
    setBloodReports(data || []);
  }

  useEffect(() => {
    if (user) {
      loadEntries();
      loadBloodReports();
    }
  }, [user]);

  // On submit, save/update to Supabase
  const onSubmit = async (form: LifestyleFormData) => {
    if (!user) {
      toast({ title: "Error", description: "Please log in to save data." });
      return;
    }
    // Validation
    const steps = parseInt(form.steps, 10);
    const water = parseFloat(form.water_intake);
    const sleep = parseFloat(form.sleep_hours);
    if (isNaN(steps) || steps < 0) {
      toast({ title: "Error", description: "Please enter a valid number for steps." });
      return;
    }
    if (isNaN(water) || water < 0) {
      toast({ title: "Error", description: "Please enter a valid number for water intake." });
      return;
    }
    if (isNaN(sleep) || sleep < 0 || sleep > 24) {
      toast({ title: "Error", description: "Please enter a valid number for sleep hours." });
      return;
    }
    // Insert or update
    const payload = {
      user_id: user.id,
      date: form.date,
      steps,
      water_intake: water,
      sleep_hours: sleep,
      source: "manual",
    };
    let resp;
    if (editing && editing.id) {
      resp = await supabase.from("lifestyle_data").update(payload).eq("id", editing.id);
    } else {
      resp = await supabase.from("lifestyle_data").insert([payload]);
    }
    if (resp.error) {
      toast({ title: "Error", description: "Could not save data." });
    } else {
      toast({ title: "Data saved!", description: "Your lifestyle data has been recorded." });
      loadEntries();
      reset({
        date: format(new Date(), "yyyy-MM-dd"),
        steps: "",
        water_intake: "",
        sleep_hours: "",
      });
      setEditing(null);
      setTab("history");
    }
  };

  // Edit/delete history
  const handleEdit = (item:any) => {
    setEditing(item);
    setTab("form");
    setValue("date", item.date);
    setValue("steps", item.steps?.toString() || "");
    setValue("water_intake", item.water_intake?.toString() || "");
    setValue("sleep_hours", item.sleep_hours?.toString() || "");
  };

  const handleDelete = async (id:string) => {
    if (!window.confirm("Delete this entry?")) return;
    const { error } = await supabase.from("lifestyle_data").delete().eq("id", id);
    if (error) toast({ title: "Error", description: "Could not delete data." });
    else {
      toast({ title: "Deleted", description: "Entry deleted." });
      loadEntries();
    }
  };

  // CSV download handler
  const handleCSV = () => downloadCSV(entries, "lifestyle_data.csv");

  // Accessibility: Move focus to form if editing
  const formRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tab === "form" && formRef.current) formRef.current.focus();
  }, [tab]);

  // Accessibility: Keyboard navigation for tabs
  const tabList = [
    { key: "form", label: "Add Data" },
    { key: "history", label: "View History" },
  ];

  return (
    <div className="container max-w-xl py-7 px-2">
      <h1 className="text-2xl font-bold mb-2">Lifestyle Tracking</h1>
      <nav className="flex space-x-2 mb-6" aria-label="Lifestyle tabs">
        {tabList.map((t) => (
          <Button
            key={t.key}
            variant={tab === t.key ? "default" : "outline"}
            className="text-base font-semibold flex-1"
            aria-pressed={tab === t.key}
            tabIndex={0}
            onClick={() => setTab(t.key as "form"|"history")}
          >
            {t.label}
          </Button>
        ))}
      </nav>

      {tab === "form" && (
        <Card className="mb-6 p-6" tabIndex={-1} ref={formRef}>
          <form onSubmit={handleSubmit(onSubmit)} aria-label="Lifestyle input form">
            {/* Date Picker */}
            <div className="mb-3">
              <Label htmlFor="date" className="text-lg font-semibold mb-1">For which date?</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
                max={format(new Date(), "yyyy-MM-dd")}
                aria-label="Select date"
              />
            </div>
            {/* Steps */}
            <div className="mb-3">
              <Label htmlFor="steps" className="text-lg font-semibold mb-1">{accessible.steps.label}</Label>
              <Input
                id="steps"
                inputMode="numeric"
                aria-label={accessible.steps.aria}
                placeholder={accessible.steps.placeholder}
                {...register("steps", { required: true })}
                aria-describedby="steps-tip"
              />
              <span className="text-xs text-gray-500" id="steps-tip">{accessible.steps.tooltip}</span>
            </div>
            {/* Water */}
            <div className="mb-3">
              <Label htmlFor="water" className="text-lg font-semibold mb-1">{accessible.water.label}</Label>
              <Input
                id="water"
                inputMode="decimal"
                aria-label={accessible.water.aria}
                placeholder={accessible.water.placeholder}
                {...register("water_intake", { required: true })}
                aria-describedby="water-tip"
              />
              <span className="text-xs text-gray-500" id="water-tip">{accessible.water.tooltip}</span>
            </div>
            {/* Sleep */}
            <div className="mb-4">
              <Label htmlFor="sleep" className="text-lg font-semibold mb-1">{accessible.sleep.label}</Label>
              <Input
                id="sleep"
                inputMode="decimal"
                aria-label={accessible.sleep.aria}
                placeholder={accessible.sleep.placeholder}
                {...register("sleep_hours", { required: true })}
                aria-describedby="sleep-tip"
              />
              <span className="text-xs text-gray-500" id="sleep-tip">{accessible.sleep.tooltip}</span>
            </div>
            <div className="flex gap-2">
              <Button className="text-base px-6 py-2" type="submit">
                {editing ? "Update" : "Save"}
              </Button>
              {editing && (
                <Button type="button" variant="ghost" onClick={() => { setEditing(null); reset(); }}>
                  Cancel
                </Button>
              )}
            </div>
            {/* Error Display */}
            <div aria-live="polite">
              {Object.keys(errors).length > 0 &&
                <span className="text-red-500">Please fill in all required fields with valid values.</span>
              }
            </div>
          </form>
        </Card>
      )}

      {tab === "history" && (
        <Card className="mb-6 p-6">
          <div className="flex flex-col gap-2 mb-2 md:flex-row md:items-center md:justify-between">
            <h2 className="font-semibold text-lg">Your Data</h2>
            <div className="flex gap-2">
              <Button onClick={handleCSV} size="sm" variant="outline">
                Download My Data
              </Button>
            </div>
          </div>
          {loading ? <div>Loading...</div> :
            <LifestyleHistory
              items={entries}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          }
        </Card>
      )}

      {/* Connect Apps (placeholder) */}
      <Card className="mb-6 p-6" aria-label="Connect Apps">
        <h2 className="font-semibold text-lg mb-2">Connect Apps</h2>
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Button size="lg" variant="secondary" disabled>
            Connect to Fitbit (coming soon)
          </Button>
          <Button size="lg" variant="secondary" disabled>
            Connect to Apple Health (coming soon)
          </Button>
        </div>
        <span className="text-sm text-muted-foreground mt-2 block">App integrations are coming soon! For now, enter your lifestyle data manually above.</span>
      </Card>

      {/* Health Insights */}
      <Card className="mb-3 p-6" aria-label="Health Insights">
        <h2 className="font-semibold text-lg mb-2">Health Insights</h2>
        <div>
          {getInsights(entries, bloodReports)}
        </div>
        <span className="text-xs text-gray-500 block mt-3">
          These are general observations. Consult a doctor for medical advice.
        </span>
      </Card>
    </div>
  );
};

export default LifestylePage;
