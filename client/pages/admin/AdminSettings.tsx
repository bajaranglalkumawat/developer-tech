import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSettings = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex items-center gap-3 rounded-lg border p-4">
        <p className="font-medium">Admin Theme</p>
        <Button variant="outline" onClick={() => setDark((v) => !v)}>
          {dark ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          {dark ? "Switch to Light" : "Switch to Dark"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
