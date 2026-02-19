import { useSyncExternalStore } from "preact/compat";
import { useCallback } from "preact/hooks";
import "./App.css";
import MonthGrid from "./MonthGrid";
import Verdict from "./Verdict";
import YearSelector from "./YearSelector";
import useSwipe from "./useSwipe";

function getYearFromHash(): number {
  const hash = window.location.hash.slice(1);
  const parsed = parseInt(hash, 10);
  if (parsed > 0) return parsed;
  const now = new Date();
  return now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
}

function subscribeToHash(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function App() {
  const year = useSyncExternalStore(subscribeToHash, getYearFromHash);

  useSwipe(
    useCallback(() => { window.location.hash = `#${year + 1}`; }, [year]),
    useCallback(() => { window.location.hash = `#${year - 1}`; }, [year]),
  );
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
