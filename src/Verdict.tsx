import getHolidaysForYear from "./holidays";

interface VerdictProps {
  year: number;
}

export default function Verdict({ year }: VerdictProps) {
  const holidays = getHolidaysForYear(year);
  const workdayHolidays = holidays.filter((h) => {
    const day = h.getDay();
    return day !== 0 && day !== 6;
  }).length;

  let verdict: string;
  if (workdayHolidays >= 11)
    verdict = `${workdayHolidays} dela prostih dni, odlična letina 🥳`;
  else if (workdayHolidays >= 9)
    verdict = `${workdayHolidays} dela prostih dni, srednja letina 😐`;
  else verdict = `${workdayHolidays} dela prostih dni, obupna letina 🤮`;

  return (
    <p className="text-sm sm:text-base text-stone-500 text-center -mt-6 mb-8">
      {verdict}
    </p>
  );
}
