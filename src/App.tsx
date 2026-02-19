import { useSyncExternalStore } from "preact/compat";
import "./App.css";
import MonthGrid from "./MonthGrid";
import Verdict from "./Verdict";
import YearSelector from "./YearSelector";

function getYearFromHash(): number {
  const hash = window.location.hash.slice(1);
  const parsed = parseInt(hash, 10);
  return parsed > 0 ? parsed : new Date().getFullYear();
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function App() {
  const year = useSyncExternalStore(subscribeToHash, getYearFromHash);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <YearSelector year={year} />

      <Verdict year={year} />

      <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full">
        {Array.from({ length: 12 }, (_, i) => (
          <MonthGrid key={i} year={year} month={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
