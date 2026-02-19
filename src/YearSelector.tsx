interface YearSelectorProps {
  year: number;
}

export default function YearSelector({ year }: YearSelectorProps) {
  return (
    <div className="flex items-center gap-6 mb-8">
      <a
        href={`#${year - 1}`}
        className="text-stone-400 hover:text-stone-600 transition-colors text-4xl sm:text-5xl"
      >
        ←
      </a>
      <h1 className="text-5xl sm:text-6xl font-bold text-stone-700 tracking-tight tabular-nums w-[4ch] text-center">
        {year}
      </h1>
      <a
        href={`#${year + 1}`}
        className="text-stone-400 hover:text-stone-600 transition-colors text-4xl sm:text-5xl"
      >
        →
      </a>
    </div>
  );
}
