import getHolidaysForYear from "./holidays";

const MONTHS_SL = [
  "januar",
  "februar",
  "marec",
  "april",
  "maj",
  "junij",
  "julij",
  "avgust",
  "september",
  "oktober",
  "november",
  "december",
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Returns 0 for Monday, 6 for Sunday
function getStartDay(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

function isWeekend(year: number, month: number, day: number): boolean {
  const d = new Date(year, month, day).getDay();
  return d === 0 || d === 6;
}

interface MonthGridProps {
  year: number;
  month: number;
}

export default function MonthGrid({ year, month }: MonthGridProps) {
  const holidays = getHolidaysForYear(year);
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDay(year, month);

  const isHoliday = (day: number) => {
    return holidays.some(
      (h) => h.getMonth() === month && h.getDate() === day
    );
  };

  const cells = [];

  for (let i = 0; i < startDay; i++) {
    cells.push(<div key={`e-${i}`} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const weekend = isWeekend(year, month, d);
    const holiday = isHoliday(d);

    let color = "bg-stone-300/50"; // workday
    if (holiday && weekend) color = "bg-rose-400";
    else if (holiday) color = "bg-emerald-400";
    else if (weekend) color = "bg-stone-400/70";

    cells.push(
      <div key={d} className={`aspect-square rounded-full ${color}`} />
    );
  }

  const totalCells = 6 * 7; // always 6 rows
  for (let i = cells.length; i < totalCells; i++) {
    cells.push(<div key={`t-${i}`} />);
  }

  return (
    <div>
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 text-center mb-1.5">
        {MONTHS_SL[month]}
      </p>
      <div className="grid grid-cols-7 grid-rows-6 gap-0.75 sm:gap-1">{cells}</div>
    </div>
  );
}
